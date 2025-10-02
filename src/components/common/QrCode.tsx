import { QRCodeCanvas } from "qrcode.react";

type QrCodeProps = {
  text: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
};

export function QrCode({
  text,
  size = 100,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "H",
}: QrCodeProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <QRCodeCanvas
        value={text}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
    </div>
  );
}
