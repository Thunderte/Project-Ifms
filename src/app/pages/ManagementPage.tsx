import { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Filters } from '../components/Filters';
import { RoomMap } from '../components/RoomMap';
import { RoomInfo } from '../components/RoomInfo';
import { ReservationsTable } from '../components/ReservationsTable';
import { useFloorMap, useBlocks } from '../hooks/useFloorMap';
import type { GridData, RoomDetails } from '../data/roomsApi';

type ManagementSection = 'cadastro' | 'reservas' | 'usuarios';

interface ManagementPageProps {
  section?: ManagementSection;
}

const sectionMeta: Record<ManagementSection, { title: string; subtitle: string }> = {
  cadastro: {
    title: 'Cadastro e Mapa de Salas',
    subtitle: 'Gerencie o layout dos blocos e os detalhes das salas em um unico fluxo.',
  },
  reservas: {
    title: 'Gestao de Reservas',
    subtitle: 'Acompanhe a ocupacao, sincronize dados e exporte relatorios operacionais.',
  },
  usuarios: {
    title: 'Gestao de Usuarios',
    subtitle: 'Centralize perfis de acesso, papeis e responsaveis pelo uso das salas.',
  },
};

export function ManagementPage({ section = 'cadastro' }: ManagementPageProps) {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [blockId, setBlockId] = useState('A');
  const [floorId, setFloorId] = useState('A-1');
  const [detailsCollapseSignal, setDetailsCollapseSignal] = useState(0);

  const { blocks } = useBlocks();
  const { floor, loading, saving, saveLayout, saveRoomDetails } = useFloorMap(blockId, floorId);

  // Quando muda o bloco, seleciona o primeiro andar disponível
  useEffect(() => {
    const block = blocks.find(b => b.id === blockId);
    if (block && block.floors.length > 0) {
      setFloorId(block.floors[0].id);
    }
  }, [blockId, blocks]);

  const floorLabel = floor
    ? `${floor.name} – Bloco ${blockId}`
    : 'Carregando...';

  const selectedRoomTile = useMemo(() => {
    if (!floor || !selectedRoom) return null;

    const roomEntry = Object.values(floor.grid).find(tile => (
      tile.type === 'room' && tile.label === selectedRoom
    ));

    return roomEntry ?? null;
  }, [floor, selectedRoom]);

  const handleSaveLayout = async (grid: GridData, cols: number, rows: number) => {
    await saveLayout({ grid, cols, rows });
    setDetailsCollapseSignal(signal => signal + 1);
  };

  const handleSaveRoomDetails = async (roomLabel: string, detailsPatch: RoomDetails) => {
    await saveRoomDetails(roomLabel, detailsPatch);
    setDetailsCollapseSignal(signal => signal + 1);
  };

  const users = useMemo(() => ([
    { id: 'U-01', name: 'Ana Souza', role: 'Administradora', status: 'Ativo', unit: 'Diretoria Academica' },
    { id: 'U-02', name: 'Paulo Lima', role: 'Coordenador', status: 'Ativo', unit: 'Secretaria' },
    { id: 'U-03', name: 'Carlos Nunes', role: 'Servidor', status: 'Pendente', unit: 'Bloco C' },
    { id: 'U-04', name: 'Maria Rocha', role: 'Docente', status: 'Ativo', unit: 'Bloco A' },
  ]), []);

  const meta = sectionMeta[section];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation />

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1f3c68] mb-2">
            {meta.title}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{meta.subtitle}</p>
          <div className="h-px bg-gray-200"></div>
        </div>

        {section === 'cadastro' && (
          <>
            <div className="mb-8">
              <Filters
                blockId={blockId}
                floorId={floorId}
                onBlockChange={setBlockId}
                onFloorChange={setFloorId}
              />
            </div>

            {loading ? (
              <div className="bg-white rounded-xl shadow-md p-12 flex items-center justify-center text-gray-400 gap-3 mb-8">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Carregando mapa...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-8 items-start">
                <RoomMap
                  floorName={floorLabel}
                  initialGrid={floor?.grid}
                  initialCols={floor?.cols}
                  initialRows={floor?.rows}
                  onSave={handleSaveLayout}
                  saving={saving}
                  onRoomSelect={setSelectedRoom}
                />
                <RoomInfo
                  roomId={selectedRoom}
                  blockId={blockId}
                  floorName={floor?.name ?? ''}
                  roomTile={selectedRoomTile}
                  saving={saving}
                  collapseSignal={detailsCollapseSignal}
                  onSaveDetails={handleSaveRoomDetails}
                />
              </div>
            )}
          </>
        )}

        {section === 'reservas' && (
          <>
            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-[#1f3c68]">
              Visualizacao dedicada para operacao de reservas. Os dados abaixo ajudam no acompanhamento diario da ocupacao.
            </div>
            <ReservationsTable />
          </>
        )}

        {section === 'usuarios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">Usuarios ativos</p>
                <p className="text-3xl font-bold text-[#1f3c68] mt-2">32</p>
                <p className="text-sm text-gray-500 mt-1">Com acesso operacional ao sistema</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">Perfis administrativos</p>
                <p className="text-3xl font-bold text-emerald-700 mt-2">6</p>
                <p className="text-sm text-gray-500 mt-1">Permissao para editar mapa e detalhes</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">Aguardando aprovacao</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">3</p>
                <p className="text-sm text-gray-500 mt-1">Solicitacoes pendentes de liberacao</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#1f3c68] mb-4">Equipe com acesso</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b bg-gray-50">
                      <th className="py-3 px-3 font-semibold">ID</th>
                      <th className="py-3 px-3 font-semibold">Nome</th>
                      <th className="py-3 px-3 font-semibold">Perfil</th>
                      <th className="py-3 px-3 font-semibold">Unidade</th>
                      <th className="py-3 px-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50/70">
                        <td className="py-3 px-3 font-medium text-[#1f3c68]">{user.id}</td>
                        <td className="py-3 px-3">{user.name}</td>
                        <td className="py-3 px-3">{user.role}</td>
                        <td className="py-3 px-3 text-gray-600">{user.unit}</td>
                        <td className="py-3 px-3">
                          <span
                            className={[
                              'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                              user.status === 'Ativo'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700',
                            ].join(' ')}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-[#1f3c68] mb-2">Regras de permissao</h3>
              <p className="text-sm text-gray-600">
                Administradores podem editar layout e detalhes de sala. Coordenadores validam reservas e servidores registram uso.
                Mantenha a revisao de perfis em ciclo mensal para reduzir riscos operacionais.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-600">
          © 2026 IFMS - Instituto Federal de Mato Grosso do Sul
        </div>
      </div>
    </div>
  );
}
