import type { Location, LocationArgs, LocationStatus } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LocationChangeStatusProps {
  location: Location;
  onChange?: (partial: LocationArgs) => void;
}

export default function LocationChangeStatus({
  location,
  onChange,
}: LocationChangeStatusProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Cambiar estado</h4>
      </div>
      <div className="grid gap-2">
        <Select
          onValueChange={(status: LocationStatus) => onChange?.({ status })}
          defaultValue={location.status}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ACTIVE">Activo</SelectItem>
              <SelectItem value="INACTIVE">Inactivo</SelectItem>
              <SelectItem value="DELETED">Eliminado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
