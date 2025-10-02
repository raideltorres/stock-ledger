import { type MouseEvent, useCallback, useEffect } from "react";
import { Portal } from "@/components/common/Portal";

type CustomDialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onDismiss?: () => void;
};

export const CustomDialog = ({
  isOpen = false,
  children,
  onDismiss,
}: CustomDialogProps) => {
  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onDismiss?.();
    },
    [onDismiss]
  );

  useEffect(() => {
    if (isOpen) {
      // Store original overflow style
      const originalStyle = window.getComputedStyle(document.body).overflow;

      // Lock scroll
      document.body.style.overflow = "hidden";

      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <Portal containerId="custom-dialog-portal">
      {isOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 pointer-events-auto cursor-pointer"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 min-w-sm w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};
