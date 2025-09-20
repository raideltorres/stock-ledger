import { selectLocationsFilterSlice } from "@/store/slices";
import type {
  LocationsFilterState,
  LocationType,
  LocationStatus,
  Entity,
} from "@/utils/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";

export interface LocationsFilterProps {
  entities?: Entity[];
  onFilterChange?: (filters: LocationsFilterState) => void;
}

export default function LocationsFilter({
  entities = [],
  onFilterChange,
}: LocationsFilterProps) {
  const locationsFilterState = useSelector(selectLocationsFilterSlice);

  const [criteria, setCriteria] = useState<string>(
    locationsFilterState.criteria ?? ""
  );

  const handleChange = useCallback(
    (partial: LocationsFilterState) => {
      onFilterChange?.(partial);
    },
    [onFilterChange]
  );

  const handleInputChange = useMemo(
    () =>
      debounce((value: string) => {
        handleChange({ criteria: value });
      }, 500),
    [handleChange]
  );

  // Clean up the memorized handleInputChange
  useEffect(() => {
    return () => {
      handleInputChange.cancel();
    };
  }, [handleInputChange]);

  const onChangeCriteria = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCriteria(e.target.value);
    handleInputChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-gray-100 p-2 rounded-md">
      <div className="flex flex-col gap-1">
        <Label>Buscar</Label>
        <Input
          type="text"
          placeholder="Buscar nombre o descripción"
          value={criteria}
          className="w-[180px]"
          onChange={onChangeCriteria}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Entidad</Label>
        <Select
          onValueChange={(entity: string) => handleChange({ entity })}
          defaultValue={locationsFilterState.entity}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione una entidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todas</SelectItem>
              {entities?.map((entity, index) => (
                <SelectItem key={`entity-item-${index}`} value={entity._id!}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Tipo</Label>
        <Select
          onValueChange={(type: LocationType) => handleChange({ type })}
          defaultValue={locationsFilterState.type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="WAREHOUSE">Almacén</SelectItem>
              <SelectItem value="SALES_FLOOR">Piso de venta</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Estado</Label>
        <Select
          onValueChange={(status: LocationStatus) => handleChange({ status })}
          defaultValue={locationsFilterState.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
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
