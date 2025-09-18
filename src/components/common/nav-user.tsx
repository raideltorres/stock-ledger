import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Action, User } from "@/utils/types";
import { Bell, LogOut, UserCircle } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCallback } from "react";

export type NavUserProps = {
  user: User;
};

export function NavUser({ user }: NavUserProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleAction = useCallback(
    (action: Action) => {
      switch (action) {
        case "GO_TO_PROFILE":
          // Navigate to profile page
          navigate("/profile");
          break;

        case "GO_TO_NOTIFICATIONS":
          // Navigate to profile page
          navigate("/profile");
          break;

        default:
          // Handle logout
          logout();
          break;
      }
    },
    [logout, navigate]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 border rounded-lg grayscale cursor-pointer">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(user.name ?? "User")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
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
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleAction("GO_TO_PROFILE")}>
            <UserCircle />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("GO_TO_NOTIFICATIONS")}>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("LOG_OUT")}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
