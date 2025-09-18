import { Legal } from "../common/legal";

export function Footer() {
  return (
    <div className="w-full flex flex-col p-3 bg-gray-200">
      <Legal
        legalText={"© 2025 Inventory Legder. Todos los derechos reservados."}
      />
    </div>
  );
}
