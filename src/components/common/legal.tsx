import { cn } from "@/lib/utils";

type LegalProps = {
  legalText: string;
  legalTextClassName?: string;
  termsAndConditionsText?: string;
  termsAndConditionsHref?: string;
  termsAndConditionsClassName?: string;
  privacyPolicyText?: string;
  privacyPolicyHref?: string;
  privacyPolicyClassName?: string;
};

const Legal = ({
  legalText,
  legalTextClassName,
  termsAndConditionsText,
  termsAndConditionsHref,
  termsAndConditionsClassName,
  privacyPolicyText,
  privacyPolicyHref,
  privacyPolicyClassName,
}: LegalProps) => {
  return (
    <span
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center text-[14px] font-normal text-gray-400 gap-0 sm:gap-2.5",
        legalTextClassName
      )}
    >
      {legalText}
      <a
        href={termsAndConditionsHref ?? "#"}
        className={cn(
          "text-[14px] font-medium text-gray-900 hover:underline",
          termsAndConditionsClassName
        )}
      >
        {termsAndConditionsText}
      </a>
      <a
        href={privacyPolicyHref ?? "#"}
        className={cn(
          "text-[14px] font-medium text-gray-900 hover:underline",
          privacyPolicyClassName
        )}
      >
        {privacyPolicyText}
      </a>
    </span>
  );
};

export type { LegalProps };
export { Legal };
