import { Button } from "@/components/ui/button";

export interface ConfirmReceivePoProps {
  onConfirm?: () => void;
}

export default function ConfirmReceivePo({ onConfirm }: ConfirmReceivePoProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Confirmación</h4>
      </div>
      <div className="grid gap-2">
        <p>Va a ingresar esta orden de compra al inventario?</p>
        <Button type="button" onClick={() => onConfirm?.()}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
