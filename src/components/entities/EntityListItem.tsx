import { Card } from "@/components/ui/card";
import type { Action, ActionData, Entity, EntityArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Store } from "lucide-react";
import { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EntityChangeStatus from "./EntityChangeStatus";

export interface EntityListItemProps {
  entity: Entity;
  onTap?: (data: Entity) => void;
  onAction?: (data: ActionData<EntityArgs>) => void;
}

export function EntityListItem({
  entity,
  onTap,
  onAction,
}: EntityListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(entity);
  }, [onTap, entity]);

  const handleOnAction = useCallback(
    (partial: Entity, action: Action) => {
      onAction?.({ _id: entity._id, partial, action });
    },
    [onAction, entity]
  );

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/3 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={entity.avatar} alt={entity.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(entity.name ?? "Entity")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{entity.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {entity.description}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {entity.status}
        </span>
      </div>

      <div
        className="flex flex-row items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* status */}
        <Popover>
          <PopoverTrigger asChild>
            <Store />
          </PopoverTrigger>
          <PopoverContent>
            <EntityChangeStatus
              entity={entity}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
