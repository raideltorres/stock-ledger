import type { SoTransLine } from "@/utils/types";

import { Button } from "@/components/ui/button";

export interface DeleteSoTransLineProps {
  line: SoTransLine;
  onConfirm?: (partial: SoTransLine) => void;
}

export default function DeleteSoTransLine({
  line,
  onConfirm,
}: DeleteSoTransLineProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Confirmación</h4>
      </div>
      <div className="grid gap-2">
        <p>Desea eliminar esta línea</p>
        <Button type="button" onClick={() => onConfirm?.({ ...line })}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
