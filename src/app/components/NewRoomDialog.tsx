import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Home } from 'lucide-react';

interface NewRoomDialogProps {
  trigger?: React.ReactNode;
}

export function NewRoomDialog({ trigger }: NewRoomDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    type: '',
    block: '',
    floor: '',
    equipment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova Sala:', formData);
    // Aqui você adicionaria a lógica para salvar a sala
    alert(`Sala criada!\nNome: ${formData.name}\nCapacidade: ${formData.capacity} pessoas\nTipo: ${formData.type}\nBloco: ${formData.block}\nAndar: ${formData.floor}`);
    setOpen(false);
    // Reset form
    setFormData({
      name: '',
      capacity: '',
      type: '',
      block: '',
      floor: '',
      equipment: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="border-[#1f3c68] text-[#1f3c68] hover:bg-[#1f3c68] hover:text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Sala
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1f3c68]">Nova Sala</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova sala.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Nome da Sala */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Sala *</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Sala 107"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="pl-10"
                />
                <Home className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Capacidade e Tipo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidade *</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Ex: 30"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Sala *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comum">Sala Comum</SelectItem>
                    <SelectItem value="laboratorio">Laboratório</SelectItem>
                    <SelectItem value="auditorio">Auditório</SelectItem>
                    <SelectItem value="reuniao">Sala de Reunião</SelectItem>
                    <SelectItem value="informatica">Informática</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bloco e Andar */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="block">Bloco *</Label>
                <Select
                  value={formData.block}
                  onValueChange={(value) => setFormData({ ...formData, block: value })}
                  required
                >
                  <SelectTrigger id="block">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Bloco A</SelectItem>
                    <SelectItem value="B">Bloco B</SelectItem>
                    <SelectItem value="C">Bloco C</SelectItem>
                    <SelectItem value="D">Bloco D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Andar *</Label>
                <Select
                  value={formData.floor}
                  onValueChange={(value) => setFormData({ ...formData, floor: value })}
                  required
                >
                  <SelectTrigger id="floor">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Térreo</SelectItem>
                    <SelectItem value="1">1º Andar</SelectItem>
                    <SelectItem value="2">2º Andar</SelectItem>
                    <SelectItem value="3">3º Andar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Equipamentos */}
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipamentos Disponíveis</Label>
              <Input
                id="equipment"
                type="text"
                placeholder="Ex: Projetor, Computador, Quadro Digital"
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              />
              <p className="text-xs text-gray-500">Separe os equipamentos por vírgula</p>
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
              className="bg-[#1f3c68] hover:bg-[#2d4d7f] text-white"
            >
              Cadastrar Sala
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
