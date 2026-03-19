import { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Filters } from '../components/Filters';
import { RoomMap } from '../components/RoomMap';
import { RoomInfo } from '../components/RoomInfo';
import { ReservationsTable } from '../components/ReservationsTable';
import { useFloorMap, useBlocks } from '../hooks/useFloorMap';

export function ManagementPage() {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [blockId, setBlockId] = useState('A');
  const [floorId, setFloorId] = useState('A-1');

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation />

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1f3c68] mb-2">
            Central de Salas IFMS
          </h1>
          <div className="h-px bg-gray-200"></div>
        </div>

        {/* Filters */}
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
              onSave={(grid, cols, rows) => saveLayout({ grid, cols, rows })}
              saving={saving}
              onRoomSelect={setSelectedRoom}
            />
            <RoomInfo
              roomId={selectedRoom}
              blockId={blockId}
              floorName={floor?.name ?? ''}
              roomTile={selectedRoomTile}
              saving={saving}
              onSaveDetails={saveRoomDetails}
            />
          </div>
        )}

        {/* Reservations Table */}
        <ReservationsTable />

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-600">
          © 2024 IFMS - Instituto Federal de Mato Grosso do Sul
        </div>
      </div>
    </div>
  );
}
