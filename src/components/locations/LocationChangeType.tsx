import type { Location, LocationArgs, LocationType } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LocationChangeTypeProps {
  location: Location;
  onChange?: (partial: LocationArgs) => void;
}

export default function LocationChangeType({
  location,
  onChange,
}: LocationChangeTypeProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Cambiar tipo</h4>
      </div>
      <div className="grid gap-2">
        <Select
          onValueChange={(type: LocationType) => onChange?.({ type })}
          defaultValue={location.type}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="WAREHOUSE">Almacén</SelectItem>
              <SelectItem value="SALES_FLOOR">Piso de venta</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
