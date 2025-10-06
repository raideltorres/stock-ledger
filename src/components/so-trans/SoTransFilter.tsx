import { selectSoTransFilterSlice } from "@/store/slices";
import type {
  Location,
  SoTransFilterState,
  SoTransStatus,
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

export interface SoTransFilterProps {
  locations?: Location[];
  users?: User[];
  customers?: Provider[];
  onFilterChange?: (filters: SoTransFilterState) => void;
}

export default function SoTransFilter({
  locations = [],
  users = [],
  customers = [],
  onFilterChange,
}: SoTransFilterProps) {
  const soTransFilterState = useSelector(selectSoTransFilterSlice);

  const handleChange = useCallback(
    (partial: SoTransFilterState) => {
      onFilterChange?.(partial);
    },
    [onFilterChange]
  );

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-gray-100 p-2 rounded-md">
      <div className="flex flex-col gap-1">
        <Label>Localidad</Label>
        <Select
          onValueChange={(location: string) => handleChange({ location })}
          defaultValue={soTransFilterState.location}
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

      <div className="flex flex-col gap-1">
        <Label>Operador</Label>
        <Select
          onValueChange={(user: string) => handleChange({ user })}
          defaultValue={soTransFilterState.user}
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

      <div className="flex flex-col gap-1">
        <Label>Cliente</Label>
        <Select
          onValueChange={(customer: string) => handleChange({ customer })}
          defaultValue={soTransFilterState.customer}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              {customers?.map((customer, index) => (
                <SelectItem
                  key={`customer-item-${index}`}
                  value={customer._id!}
                >
                  {customer.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Estado</Label>
        <Select
          onValueChange={(status: SoTransStatus) => handleChange({ status })}
          defaultValue={soTransFilterState.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="QUOTED">Pedido</SelectItem>
              <SelectItem value="SOLD">Vendido</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
