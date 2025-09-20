import { Card } from "@/components/ui/card";
import type { Action, ActionData, Provider, ProviderArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { SquareUser } from "lucide-react";
import { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProviderChangeStatus from "./ProviderChangeStatus";

export interface ProviderListItemProps {
  provider: Provider;
  onTap?: (data: Provider) => void;
  onAction?: (data: ActionData<ProviderArgs>) => void;
}

export function ProviderListItem({
  provider,
  onTap,
  onAction,
}: ProviderListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(provider);
  }, [onTap, provider]);

  const handleOnAction = useCallback(
    (partial: Provider, action: Action) => {
      onAction?.({ _id: provider._id, partial, action });
    },
    [onAction, provider]
  );

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/3 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={provider.avatar} alt={provider.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(provider.name ?? "Provider")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{provider.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {provider.email}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {provider.status}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {provider.description}
        </span>
      </div>

      <div
        className="flex flex-row items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* status */}
        <Popover>
          <PopoverTrigger asChild>
            <SquareUser />
          </PopoverTrigger>
          <PopoverContent>
            <ProviderChangeStatus
              provider={provider}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
