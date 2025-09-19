import { selectUsersFilterSlice } from "@/store/slices";
import type { Role, UsersFilterState, UserStatus } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
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
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

export interface UserFiltersProps {
  onFilterChange?: (filters: UsersFilterState) => void;
}

export default function UsersFilter({ onFilterChange }: UserFiltersProps) {
  const usersFilterState = useSelector(selectUsersFilterSlice);

  const [text, setText] = useState<string>(usersFilterState.criteria ?? "");

  const handleChange = useCallback(
    (partial: UsersFilterState) => {
      onFilterChange?.(partial);
    },
    [onFilterChange]
  );

  const debouncedHandleNameChange = useDebouncedCallback((value: string) => {
    handleChange({ criteria: value });
  }, 300);

  useEffect(() => {
    if (text !== usersFilterState.criteria) {
      debouncedHandleNameChange(text);
    }
  }, [debouncedHandleNameChange, text, usersFilterState.criteria]);

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-gray-100 p-2 rounded-md">
      <div className="flex flex-col gap-1">
        <Label>Buscar</Label>
        <Input
          type="text"
          placeholder="Buscar nombre o email"
          value={text}
          className="w-[180px]"
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Estado</Label>
        <Select
          onValueChange={(status: UserStatus) => handleChange({ status })}
          defaultValue={usersFilterState.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="PENDING">Pendiente</SelectItem>
              <SelectItem value="ACTIVE">Activo</SelectItem>
              <SelectItem value="INACTIVE">Inactivo</SelectItem>
              <SelectItem value="DELETED">Eliminado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Rol</Label>
        <Select
          onValueChange={(role: Role) => handleChange({ role })}
          defaultValue={usersFilterState.role}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="USER">Usuario</SelectItem>
              <SelectItem value="ADMIN">Administrador</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
