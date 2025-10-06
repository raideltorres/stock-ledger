import { Card } from "@/components/ui/card";
import type { ActionData, SoTrans, SoTransArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useCallback } from "react";

export interface SoTransListItemProps {
  soTrans: SoTrans;
  onTap?: (data: SoTrans) => void;
  onAction?: (data: ActionData<SoTransArgs>) => void;
}

export function SoTransListItem({ soTrans, onTap }: SoTransListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(soTrans);
  }, [onTap, soTrans]);

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage
            src={soTrans.location?.avatar}
            alt={soTrans.location?.name}
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(soTrans.location?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{soTrans.location?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {soTrans.location?.type}
          </span>
        </div>
      </div>

      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={soTrans.user?.avatar} alt={soTrans.user?.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(soTrans.user?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{soTrans.user?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {soTrans.user?.email}
          </span>
        </div>
      </div>

      <div className="min-w-1/4 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage
            src={soTrans.customer?.avatar}
            alt={soTrans.customer?.name}
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(soTrans.customer?.name ?? "Location")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{soTrans.customer?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {soTrans.customer?.email}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {soTrans.status}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {soTrans.amount?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </Card>
  );
}
