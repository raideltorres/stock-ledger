import { Card } from "@/components/ui/card";
import type { Action, ActionData, PoTransLine } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, X } from "lucide-react";
import { useCallback } from "react";
import EditPoTransLine from "./EditPoTransLine";
import DeletePoTransLine from "./DeletePoTransLine";

export interface PoTransLineItemProps {
  index: number;
  line: PoTransLine;
  editable?: boolean;
  onAction?: (index: number, data: ActionData<PoTransLine>) => void;
}

export function PoTransLineItem({
  index,
  line,
  editable = false,
  onAction,
}: PoTransLineItemProps) {
  const handleOnAction = useCallback(
    (partial: PoTransLine, action: Action) => {
      onAction?.(index, { partial, action });
    },
    [index, onAction]
  );

  return (
    <Card className="w-full flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2 sm:gap-5 p-2 cursor-pointer">
      <div className="min-w-1/2 sm:min-w-1/3 flex items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={line.product?.avatar} alt={line.product?.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(line.product?.name ?? "Product")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight gap-1">
          <span className="truncate font-medium">{line.product?.name}</span>
          <span className="text-muted-foreground truncate text-md">
            {line.product?.barcode}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {`cantidad: ${line.qty ?? 0}`}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {`costo: ${(line.unitPrice ?? 0).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`}
        </span>
        <span className="text-red-600 truncate text-xs ">
          {`subtotal: ${(line.amount ?? 0).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`}
        </span>
      </div>

      {editable && (
        <div
          className="flex flex-row items-center justify-end gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* qty */}
          <Popover>
            <PopoverTrigger asChild>
              <Edit />
            </PopoverTrigger>
            <PopoverContent>
              <EditPoTransLine
                line={line}
                onChange={(partial) =>
                  handleOnAction?.(
                    { ...line, unitPrice: partial.unitPrice, qty: partial.qty },
                    "EDIT"
                  )
                }
              />
            </PopoverContent>
          </Popover>

          {/* unit price */}
          <Popover>
            <PopoverTrigger asChild>
              <X />
            </PopoverTrigger>
            <PopoverContent>
              <DeletePoTransLine
                line={line}
                onConfirm={(partial) =>
                  handleOnAction?.({ ...partial }, "DELETE")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </Card>
  );
}
