import { cn } from "@/lib/utils";

type PageHeaderProps = {
  text: string;
  textClassName?: string;
};

const PageHeader = ({ text, textClassName }: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-center text-[14px] font-medium text-gray-600",
        textClassName
      )}
    >
      <h1 className="text-2xl font-bold  px-6">{text}</h1>
    </div>
  );
};

export type { PageHeaderProps };
export { PageHeader };
