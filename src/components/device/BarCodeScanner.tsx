"use client";

import { useEffect, useState } from "react";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Card, CardContent } from "@/components/ui/card";

type BarcodeScannerProps = {
  formats?: BarcodeFormat[];
  onResult: (result: IDetectedBarcode[]) => void;
};

export function BarcodeScanner({
  formats = ["ean_13", "ean_8"],
  onResult,
}: BarcodeScannerProps) {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setHasCamera(videoInputs.length > 0);
      } catch (error) {
        console.error("Error al detectar cámara:", error);
        setHasCamera(false);
      }
    }
    checkCamera();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center">
        {hasCamera === null && <span>Detectando dispositivos...</span>}

        {hasCamera === false && (
          <div className="flex flex-col items-center justify-center p-4">
            <span>No se detectó dispositivo</span>
            <span>
              Conecta un dispositivo con cámara o un lector de códigos de
              barras.
            </span>
          </div>
        )}

        {hasCamera && (
          <div className="rounded-sm overflow-hidden border shadow">
            <Scanner
              formats={formats}
              onScan={(result) => {
                onResult(result);
              }}
              onError={(error) => console.error("Error escáner:", error)}
              constraints={{
                facingMode: "environment",
              }}
              styles={{
                video: {
                  width: "100%",
                  height: "auto",
                },
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
