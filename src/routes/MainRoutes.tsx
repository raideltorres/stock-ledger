import { Routes, Route } from "react-router-dom";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { VerticalLayout } from "@/components/layout/VerticalLayout";
import WithSidebarLayout from "@/components/layout/WithSidebarLayout";

import AuthenticatedRoute from "./AuthenticatedRoute";
import AdministrativeRoute from "./AdministrativeRoute";

import { SignIn } from "@/pages/auth/SignIn";
import { SignUp } from "@/pages/auth/SignUp";

import { Sales } from "@/pages/root/sales/Sales";

import { Dashboard } from "@/pages/root/dashboard/Dashboard";
import { Clients } from "@/pages/root/clients/Clients";
import { Entities } from "@/pages/root/entities/Entities";
import { Inventory } from "@/pages/root/inventory/Inventory";
import { Locations } from "@/pages/root/locations/Locations";
import { PurchaseOrders } from "@/pages/root/po/PurchaseOrders";
import { SaleOrders } from "@/pages/root/so/SaleOrders";
import { Suppliers } from "@/pages/root/suppliers/Suppliers";
import { Users } from "@/pages/root/users/Users";

import Forbidden from "@/pages/Forbidden";
import NotFound from "@/pages/NotFound";

export default function MainRoutes() {
  return (
    <Routes>
      {/* Auth section */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      {/* Vertical layout section  */}
      <Route element={<VerticalLayout />}>
        {/* Authentication guard section */}
        <Route element={<AuthenticatedRoute />}>
          <Route path="sales" element={<Sales />} />
          <Route path="forbidden" element={<Forbidden />} />
        </Route>
      </Route>

      {/* With sidebar layout section  */}
      <Route element={<WithSidebarLayout />}>
        {/* Authorization guard section */}
        <Route path="admin" element={<AdministrativeRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="entities" element={<Entities />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="locations" element={<Locations />} />
          <Route path="po" element={<PurchaseOrders />} />
          <Route path="so" element={<SaleOrders />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
