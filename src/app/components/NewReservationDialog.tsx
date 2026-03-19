import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Calendar, Clock } from 'lucide-react';

interface NewReservationDialogProps {
  trigger?: React.ReactNode;
  defaultRoom?: string;
}

export function NewReservationDialog({ trigger, defaultRoom }: NewReservationDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    room: defaultRoom || '',
    date: '',
    startTime: '',
    endTime: '',
    responsible: '',
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova Reserva:', formData);
    // Aqui você adicionaria a lógica para salvar a reserva
    alert(`Reserva criada!\nSala: ${formData.room}\nData: ${formData.date}\nHorário: ${formData.startTime} - ${formData.endTime}\nResponsável: ${formData.responsible}`);
    setOpen(false);
    // Reset form
    setFormData({
      room: defaultRoom || '',
      date: '',
      startTime: '',
      endTime: '',
      responsible: '',
      purpose: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Reserva
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1f3c68]">Nova Reserva</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova reserva de sala.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Sala */}
            <div className="space-y-2">
              <Label htmlFor="room">Sala *</Label>
              <Select
                value={formData.room}
                onValueChange={(value) => setFormData({ ...formData, room: value })}
                required
              >
                <SelectTrigger id="room">
                  <SelectValue placeholder="Selecione uma sala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="101">Sala 101 - 25 lugares</SelectItem>
                  <SelectItem value="102">Sala 102 - 30 lugares</SelectItem>
                  <SelectItem value="103">Sala 103 - 35 lugares</SelectItem>
                  <SelectItem value="104">Sala 104 - 25 lugares</SelectItem>
                  <SelectItem value="105">Sala 105 - 30 lugares</SelectItem>
                  <SelectItem value="106">Sala 106 - 35 lugares</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="pl-10"
                />
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Horário Início *</Label>
                <div className="relative">
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                    className="pl-10"
                  />
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Horário Fim *</Label>
                <div className="relative">
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                    className="pl-10"
                  />
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável *</Label>
              <Input
                id="responsible"
                type="text"
                placeholder="Nome do responsável"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                required
              />
            </div>

            {/* Finalidade */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Finalidade</Label>
              <Input
                id="purpose"
                type="text"
                placeholder="Ex: Aula de Matemática, Reunião, etc."
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Criar Reserva
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
