import { Card } from "@/components/ui/card";
import type { Action, ActionData, Location, LocationArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Boxes, Store } from "lucide-react";
import { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LocationChangeStatus from "./LocationChangeStatus";
import LocationChangeType from "./LocationChangeType";

export interface LocationListItemProps {
  location: Location;
  onTap?: (data: Location) => void;
  onAction?: (data: ActionData<LocationArgs>) => void;
}

export function LocationListItem({
  location,
  onTap,
  onAction,
}: LocationListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(location);
  }, [onTap, location]);

  const handleOnAction = useCallback(
    (partial: LocationArgs, action: Action) => {
      onAction?.({ _id: location._id, partial, action });
    },
    [onAction, location]
  );

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/3 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={location.avatar} alt={location.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(location.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium text-[10px]">
            {location.entity?.name}
          </span>
          <span className="truncate font-medium">{location.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {location.description}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {location.type}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {location.status}
        </span>
      </div>

      <div
        className="flex flex-row items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* type */}
        <Popover>
          <PopoverTrigger asChild>
            <Boxes />
          </PopoverTrigger>
          <PopoverContent>
            <LocationChangeType
              location={location}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>

        {/* status */}
        <Popover>
          <PopoverTrigger asChild>
            <Store />
          </PopoverTrigger>
          <PopoverContent>
            <LocationChangeStatus
              location={location}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
