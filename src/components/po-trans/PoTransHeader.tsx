import type { Location, PoTransStatus, Provider, User } from "@/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { QrCode } from "../common/QrCode";

export interface PoTransHeaderProps {
  title?: string;
  orderId: string;
  location?: Location;
  user?: User;
  provider?: Provider;
  status?: PoTransStatus;
  total?: number;
}

export default function PoTransHeader({
  title = "Orden de Compra:",
  orderId,
  location,
  user,
  provider,
  status,
  total,
}: PoTransHeaderProps) {
  return (
    <div className="w-full flex flex-col items-end justify-end gap-2 p-2 rounded-sm">
      <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-4 sm:gap-10">
        <div className="flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-10">
          <div className="flex flex-col items-start justify-start gap-1">
            <h1 className="text-sm font-semibold">{title}</h1>
            <QrCode text={orderId} size={120} />
          </div>

          <div className="flex flex-col items-start justify-start gap-3">
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="text-muted-foreground truncate text-xs">
                Proveedor:
              </span>
              <div className="flex items-center gap-2 text-left text-sm">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage src={provider?.avatar} alt={provider?.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(provider?.name ?? "Location")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{provider?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {provider?.email}
                  </span>
                </div>
              </div>
            </div>

            <h1
              className={cn(
                "text-sm",
                status !== "INVOICED" ? "text-blue-600" : "text-green-600"
              )}
            >
              {status}
            </h1>

            <h1 className="text-2xl font-bold text-red-600">
              {total?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
          </div>
        </div>

        <div className="flex flex-1 flex-col sm:flex-row lg:flex-col xl:flex-row items-start justify-start gap-3">
          <div className="flex flex-col items-start justify-start gap-1">
            <span className="text-muted-foreground truncate text-xs">
              Localidad:
            </span>
            <div className="flex flex-1 items-center gap-2 text-left text-sm">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={location?.avatar} alt={location?.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(location?.name ?? "Location")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{location?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {location?.type}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
            <span className="text-muted-foreground truncate text-xs">
              Operador:
            </span>
            <div className="flex flex-1 items-center gap-2 text-left text-sm">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user?.name ?? "Location")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
