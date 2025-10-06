import { Button } from "@/components/ui/button";

export interface ConfirmSellSoProps {
  onConfirm?: () => void;
}

export default function ConfirmSellSo({ onConfirm }: ConfirmSellSoProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Confirmación</h4>
      </div>
      <div className="grid gap-2">
        <p>Va a cerrar esta orden de compra?</p>
        <Button type="button" onClick={() => onConfirm?.()}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
