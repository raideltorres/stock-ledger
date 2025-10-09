import { Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { VerticalLayout } from "@/components/layout/VerticalLayout";
import WithSidebarLayout from "@/components/layout/WithSidebarLayout";

import AuthenticatedRoute from "./AuthenticatedRoute";
import AdministrativeRoute from "./AdministrativeRoute";

import { SignIn } from "@/pages/auth/SignIn";
import { SignUp } from "@/pages/auth/SignUp";

import { Sales } from "@/pages/root/sales/Sales";
import { Purchases } from "@/pages/root/purchases/Purchases";

import { Dashboard } from "@/pages/root/dashboard/Dashboard";
import { Customers } from "@/pages/root/customers/Customers";
import { Entities } from "@/pages/root/entities/Entities";
import { Inventory } from "@/pages/root/inventory/Inventory";
import { Locations } from "@/pages/root/locations/Locations";
import { PoTransPage } from "@/pages/root/po-trans/PoTransPage";
import { EditPoTransPage } from "@/pages/root/po-trans/EditPoTransPage";
import { SoTransPage } from "@/pages/root/so-trans/SoTransPage";
import { EditSoTransPage } from "@/pages/root/so-trans/EditSoTransPage";
import { Providers } from "@/pages/root/providers/Providers";
import { Users } from "@/pages/root/users/Users";

import Forbidden from "@/pages/Forbidden";
import NotFound from "@/pages/NotFound";

export default function MainRoutes() {
  return (
    <Routes>
      {/* Redirect from "/" to "/admin/dashboard" */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

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
          <Route path="sale/:transId/edit" element={<EditSoTransPage />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="purchase/:transId/edit" element={<EditPoTransPage />} />
          <Route path="forbidden" element={<Forbidden />} />
        </Route>
      </Route>

      {/* With sidebar layout section  */}
      <Route element={<WithSidebarLayout />}>
        {/* Authorization guard section */}
        <Route path="admin" element={<AdministrativeRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="entities" element={<Entities />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="locations" element={<Locations />} />
          <Route path="po" element={<PoTransPage />} />
          <Route path="po/:transId/edit" element={<EditPoTransPage />} />
          <Route path="so" element={<SoTransPage />} />
          <Route path="so/:transId/edit" element={<EditSoTransPage />} />
          <Route path="providers" element={<Providers />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
