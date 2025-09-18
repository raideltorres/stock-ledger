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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Menu items.
const menuItems: SideMenuItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: <UserCog />,
  },
  {
    title: "Ordenes de venta",
    url: "/admin/so",
    icon: <BanknoteArrowUp />,
  },
  {
    title: "Ordenes de compra",
    url: "/admin/po",
    icon: <BanknoteArrowDown />,
  },
  {
    title: "Entidades",
    url: "/admin/entities",
    icon: <Store />,
  },
  {
    title: "Localidades",
    url: "/admin/locations",
    icon: <Box />,
  },
  {
    title: "Clientes",
    url: "/admin/clients",
    icon: <CircleUser />,
  },
  {
    title: "Proveedores",
    url: "/admin/suppliers",
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
                    <Link to={item.url ?? "#"}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
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
                  <Link to={item.url ?? "#"}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
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
