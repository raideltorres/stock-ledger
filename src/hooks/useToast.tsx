import { toast } from "sonner";

const baseClass = "rounded-lg border shadow-md text-sm px-4 py-2 font-medium";

const variants = {
  success: "bg-emerald-100 text-emerald-800 border-emerald-300",
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export function useToast() {
  return {
    success: (message: string, options = {}) =>
      toast.success(message, {
        richColors: true,
        className: `${baseClass} ${variants.success}`,
        ...options,
      }),
    error: (message: string, options = {}) =>
      toast.error(message, {
        richColors: true,
        className: `${baseClass} ${variants.error}`,
        ...options,
      }),
    info: (message: string, options = {}) =>
      toast(message, {
        richColors: true,
        className: `${baseClass} ${variants.info}`,
        ...options,
      }),
    warning: (message: string, options = {}) =>
      toast(message, {
        richColors: true,
        className: `${baseClass} ${variants.warning}`,
        ...options,
      }),
  };
}
