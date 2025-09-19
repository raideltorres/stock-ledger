import { Card } from "@/components/ui/card";
import type { Action, ActionData, User } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Shield, UserCogIcon } from "lucide-react";
import { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserChangeStatus from "./UserChangeStatus";

export interface UserListItemProps {
  user: User;
  onTap?: (data: User) => void;
  onAction?: (data: ActionData<User>) => void;
}

export function UserListItem({ user, onTap, onAction }: UserListItemProps) {
  const handleOnTap = useCallback(() => {
    onTap?.(user);
  }, [onTap, user]);

  const handleOnAction = useCallback(
    (partial: User, action: Action) => {
      onAction?.({ _id: user._id, partial, action });
    },
    [onAction, user]
  );

  return (
    <Card
      className="w-full flex flex-row flex-wrap items-center justify-between gap-1 p-2 cursor-pointer"
      onClick={handleOnTap}
    >
      <div className="min-w-1/3 flex flex-1 items-center gap-2 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(user.name ?? "User")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {user.email}
          </span>
        </div>
      </div>

      <div className="grid flex-1 text-center text-sm leading-tight">
        <span className="text-muted-foreground truncate text-xs">
          {user.role}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {user.status}
        </span>
      </div>

      <div
        className="flex flex-row items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* status */}
        <Popover>
          <PopoverTrigger asChild>
            <UserCogIcon />
          </PopoverTrigger>
          <PopoverContent>
            <UserChangeStatus
              user={user}
              onChange={(partial) => handleOnAction?.(partial, "EDIT")}
            />
          </PopoverContent>
        </Popover>

        {/* change password */}
        <Shield />
      </div>
    </Card>
  );
}
