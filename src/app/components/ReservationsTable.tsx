import { useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, RefreshCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { NewReservationDialog } from './NewReservationDialog';
import { NewRoomDialog } from './NewRoomDialog';
import { defaultRecentReservations, getRecentReservations, type RecentReservation } from '../data/reservationsApi';

export function ReservationsTable() {
  const [reservations, setReservations] = useState<RecentReservation[]>(defaultRecentReservations);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [dataSource, setDataSource] = useState<'api' | 'default'>('default');
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const syncReservations = async () => {
    setLoadingReservations(true);
    const response = await getRecentReservations();

    setReservations(response.reservations);
    setDataSource(response.source);
    setLastSync(new Date());
    setLoadingReservations(false);
  };

  useEffect(() => {
    void syncReservations();
  }, []);

  const sourceInfo = useMemo(() => {
    if (loadingReservations) {
      return {
        label: 'Sincronizando reservas...',
        className: 'bg-blue-600 text-white hover:bg-blue-600',
      };
    }

    if (dataSource === 'api') {
      return {
        label: 'Dados da API externa',
        className: 'bg-emerald-600 text-white hover:bg-emerald-600',
      };
    }

    return {
      label: 'Valores padrao de exibicao',
      className: 'bg-amber-500 text-white hover:bg-amber-500',
    };
  }, [dataSource, loadingReservations]);

  const lastSyncLabel = useMemo(() => {
    if (!lastSync) {
      return 'Sincronizacao pendente';
    }

    return `Ultima sincronizacao: ${lastSync.toLocaleTimeString('pt-BR')}`;
  }, [lastSync]);

  const getStatusClass = (status: RecentReservation['status']) => {
    if (status === 'Concluida') {
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    }

    if (status === 'Cancelada') {
      return 'bg-rose-600 hover:bg-rose-700 text-white';
    }

    return 'bg-emerald-600 hover:bg-emerald-700 text-white';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1f3c68]">Reservas Recentes</h2>
          <p className="text-sm text-gray-500 mt-1">{lastSyncLabel}</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Badge className={sourceInfo.className}>{sourceInfo.label}</Badge>
          <Button
            onClick={() => void syncReservations()}
            variant="outline"
            disabled={loadingReservations}
            className="flex items-center gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${loadingReservations ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {dataSource === 'default' && !loadingReservations && (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          API indisponivel no momento. Exibindo valores padrao automaticamente.
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="101">Sala 101</SelectItem>
            <SelectItem value="102">Sala 102</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Responsável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="joao">João Silva</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativa</SelectItem>
          </SelectContent>
        </Select>

        <Button className="ml-auto bg-green-700 hover:bg-green-800 text-white flex items-center gap-2">
          Exportar
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Sala</TableHead>
              <TableHead className="font-semibold">Data</TableHead>
              <TableHead className="font-semibold">Horário</TableHead>
              <TableHead className="font-semibold">Responsável</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <TableRow key={reservation.id} className="h-14">
                  <TableCell className="font-medium">{reservation.room}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#dbe8f9] text-[#1f3c68] rounded-full flex items-center justify-center text-xs font-bold">
                        {reservation.avatar}
                      </div>
                      <span>{reservation.responsible}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusClass(reservation.status)}>{reservation.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-16 text-center text-gray-500">
                  Nenhuma reserva recente encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="default" size="sm" className="w-9 h-9 p-0 bg-[#1f3c68] hover:bg-[#2d4d7f]">
          1
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          2
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          3
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          4
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          5
        </Button>
        <span className="px-2">...</span>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="w-9 h-9 p-0">
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <NewReservationDialog />
        <NewRoomDialog />
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
        <Select>
          <SelectTrigger className="w-40 ml-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <SelectValue placeholder="Exportar" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}