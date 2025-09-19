import { Card } from "@/components/ui/card";
import type { Action, ActionData, Customer, CustomerArgs } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomerChangeStatus from "./CustomerChangeStatus";

export interface CustomerListItemProps {
  customer: Customer;
  onTap?: (data: Customer) => void;
  onAction?: (data: ActionData<CustomerArgs>) => void;
}

export function CustomerListItem({
  customer,
  onTap,
  onAction,
}: CustomerListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(customer);
  }, [onTap, customer]);

  const handleOnAction = useCallback(
    (partial: Customer, action: Action) => {
      onAction?.({ _id: customer._id, partial, action });
    },
    [onAction, customer]
  );

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/3 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={customer.avatar} alt={customer.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(customer.name ?? "Customer")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{customer.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {customer.email}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {customer.status}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {customer.description}
        </span>
      </div>

      <div
        className="flex flex-row items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* status */}
        <Popover>
          <PopoverTrigger asChild>
            <CircleUser />
          </PopoverTrigger>
          <PopoverContent>
            <CustomerChangeStatus
              customer={customer}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
