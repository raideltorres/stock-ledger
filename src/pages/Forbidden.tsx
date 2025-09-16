import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserSlice } from "@/store/slices";

export default function Forbidden() {
  const navigate = useNavigate();
  const userState = useSelector(selectUserSlice);

  const handleBackToHome = () => {
    if (userState.user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userState.user.role === "USER") {
      navigate("/sales");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div className="flex size-full min-h-screen items-center justify-center bg-muted/20 p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl">403 - Acceso Prohibido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            No tienes permisos para acceder a esta página.
          </p>
          <Button onClick={() => handleBackToHome()}>Volver al inicio</Button>
        </CardContent>
      </Card>
    </div>
  );
}
