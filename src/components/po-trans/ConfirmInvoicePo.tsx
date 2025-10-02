import { Button } from "@/components/ui/button";

export interface ConfirmInvoicePoProps {
  onConfirm?: () => void;
}

export default function ConfirmInvoicePo({ onConfirm }: ConfirmInvoicePoProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Confirmación</h4>
      </div>
      <div className="grid gap-2">
        <p>Vas a pagar esta orden de compra al proveedor?</p>
        <Button type="button" onClick={() => onConfirm?.()}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
