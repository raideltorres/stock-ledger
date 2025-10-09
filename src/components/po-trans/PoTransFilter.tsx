import { selectPoTransFilterSlice } from "@/store/slices";
import type {
  Location,
  PoTransFilterState,
  PoTransStatus,
  Provider,
  User,
} from "@/utils/types";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface PoTransFilterProps {
  locations?: Location[];
  users?: User[];
  providers?: Provider[];
  onFilterChange?: (filters: PoTransFilterState) => void;
}

export default function PoTransFilter({
  locations,
  users,
  providers,
  onFilterChange,
}: PoTransFilterProps) {
  const poTransFilterState = useSelector(selectPoTransFilterSlice);

  const handleChange = useCallback(
    (partial: PoTransFilterState) => {
      onFilterChange?.(partial);
    },
    [onFilterChange]
  );

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-gray-100 p-2 rounded-md">
      {locations && (
        <div className="flex flex-col gap-1">
          <Label>Localidad</Label>
          <Select
            onValueChange={(location: string) => handleChange({ location })}
            defaultValue={poTransFilterState.location}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione una localidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">Todas</SelectItem>
                {locations?.map((location, index) => (
                  <SelectItem
                    key={`location-item-${index}`}
                    value={location._id!}
                  >
                    {location.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {users && (
        <div className="flex flex-col gap-1">
          <Label>Operador</Label>
          <Select
            onValueChange={(user: string) => handleChange({ user })}
            defaultValue={poTransFilterState.user}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione un operador" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">Todos</SelectItem>
                {users?.map((user, index) => (
                  <SelectItem key={`user-item-${index}`} value={user._id!}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {providers && (
        <div className="flex flex-col gap-1">
          <Label>Proveedor</Label>
          <Select
            onValueChange={(provider: string) => handleChange({ provider })}
            defaultValue={poTransFilterState.provider}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione un proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">Todos</SelectItem>
                {providers?.map((provider, index) => (
                  <SelectItem
                    key={`provider-item-${index}`}
                    value={provider._id!}
                  >
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <Label>Estado</Label>
        <Select
          onValueChange={(status: PoTransStatus) => handleChange({ status })}
          defaultValue={poTransFilterState.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="QUOTED">Pedido</SelectItem>
              <SelectItem value="RECEIVED">Recibido</SelectItem>
              <SelectItem value="INVOICED">Facturado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
