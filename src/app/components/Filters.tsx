import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { useBlocks, useFloors } from '../hooks/useFloorMap';

interface FiltersProps {
  blockId: string;
  floorId: string;
  onBlockChange: (blockId: string) => void;
  onFloorChange: (floorId: string) => void;
}

export function Filters({ blockId, floorId, onBlockChange, onFloorChange }: FiltersProps) {
  const { blocks, loading: loadingBlocks } = useBlocks();
  const { floors, loading: loadingFloors } = useFloors(blockId);

  return (
    <div className="flex items-center gap-4">
      {/* Bloco */}
      <div className="flex-1 max-w-xs">
        <Select
          value={blockId}
          onValueChange={(val) => {
            onBlockChange(val);
          }}
          disabled={loadingBlocks}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Bloco" />
          </SelectTrigger>
          <SelectContent>
            {blocks.map(b => (
              <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Andar */}
      <div className="flex-1 max-w-xs">
        <Select
          value={floorId}
          onValueChange={onFloorChange}
          disabled={loadingFloors || floors.length === 0}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Andar" />
          </SelectTrigger>
          <SelectContent>
            {floors.map(f => (
              <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
