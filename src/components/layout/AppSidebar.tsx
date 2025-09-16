import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Action, SideMenuItem } from "@/utils/types";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Box,
  CircleUser,
  LayoutDashboard,
  LogOut,
  SquareUser,
  Store,
  UserCog,
} from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Menu items.
const menuItems: SideMenuItem[] = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Usuarios",
    url: "users",
    icon: <UserCog />,
  },
  {
    title: "Ordenes de venta",
    url: "so",
    icon: <BanknoteArrowUp />,
  },
  {
    title: "Ordenes de compra",
    url: "po",
    icon: <BanknoteArrowDown />,
  },
  {
    title: "Entidades",
    url: "entities",
    icon: <Store />,
  },
  {
    title: "Localidades",
    url: "locations",
    icon: <Box />,
  },
  {
    title: "Clientes",
    url: "clients",
    icon: <CircleUser />,
  },
  {
    title: "Proveedores",
    url: "suppliers",
    icon: <SquareUser />,
  },
];

// Menu footer items
const footerItems: SideMenuItem[] = [
  {
    title: "Cerrar sesión",
    action: "LOG_OUT",
    icon: <LogOut />,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleAction = useCallback(
    (action: Action) => {
      switch (action) {
        case "GO_TO_SALES":
          // Navigate to sales page
          navigate("/sales");
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
    <Sidebar className="absolute top-0 left-0 h-full">
      <SidebarHeader></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                {item.url ? (
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <Button onClick={() => handleAction(item.action!)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Button>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
