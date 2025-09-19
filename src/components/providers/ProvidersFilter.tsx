import { selectProvidersFilterSlice } from "@/store/slices";
import type { ProvidersFilterState, ProviderStatus } from "@/utils/types";
import { useCallback, useMemo, useState } from "react";
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

export interface ProvidersFilterProps {
  onFilterChange?: (filters: ProvidersFilterState) => void;
}

export default function ProvidersFilter({
  onFilterChange,
}: ProvidersFilterProps) {
  const providersFilterState = useSelector(selectProvidersFilterSlice);

  const [criteria, setCriteria] = useState<string>(
    providersFilterState.criteria ?? ""
  );

  const handleChange = useCallback(
    (partial: ProvidersFilterState) => {
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
          placeholder="Buscar nombre o email"
          value={criteria}
          className="w-[180px]"
          onChange={onChangeCriteria}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Estado</Label>
        <Select
          onValueChange={(status: ProviderStatus) => handleChange({ status })}
          defaultValue={providersFilterState.status}
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
