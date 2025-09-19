import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type AuthChangePageProps = {
  text: string;
  textClassName?: string;
  linkTextText?: string;
  linkTextHref?: string;
  linkTextClassName?: string;
};

const AuthChangePage = ({
  text,
  textClassName,
  linkTextText,
  linkTextHref,
  linkTextClassName,
}: AuthChangePageProps) => {
  return (
    <span
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center text-[14px] font-medium text-gray-500 gap-0 sm:gap-2.5",
        textClassName
      )}
    >
      {text}
      <Link
        to={linkTextHref ?? "#"}
        className={cn(
          "text-[14px] text-blue-500 hover:underline",
          linkTextClassName
        )}
      >
        {linkTextText}
      </Link>
    </span>
  );
};

export type { AuthChangePageProps };
export { AuthChangePage };
