import { Card } from "@/components/ui/card";
import type { ActionData, PoTrans, PoTransArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useCallback } from "react";

export interface PoTransListItemProps {
  poTrans: PoTrans;
  onTap?: (data: PoTrans) => void;
  onAction?: (data: ActionData<PoTransArgs>) => void;
}

export function PoTransListItem({ poTrans, onTap }: PoTransListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(poTrans);
  }, [onTap, poTrans]);

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage
            src={poTrans.location?.avatar}
            alt={poTrans.location?.name}
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(poTrans.location?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{poTrans.location?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {poTrans.location?.type}
          </span>
        </div>
      </div>

      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={poTrans.user?.avatar} alt={poTrans.user?.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(poTrans.user?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{poTrans.user?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {poTrans.user?.email}
          </span>
        </div>
      </div>

      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage
            src={poTrans.provider?.avatar}
            alt={poTrans.provider?.name}
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(poTrans.provider?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{poTrans.provider?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {poTrans.provider?.email}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {poTrans.status}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {poTrans.amount?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </Card>
  );
}
