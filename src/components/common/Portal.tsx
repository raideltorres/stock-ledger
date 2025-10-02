import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  containerId?: string;
};

export const Portal = ({
  children,
  containerId = "portal-root",
}: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    try {
      let portalContainer = document.getElementById(containerId);

      if (!portalContainer) {
        portalContainer = document.createElement("div");
        portalContainer.id = containerId;
        portalContainer.style.position = "fixed";
        portalContainer.style.top = "0";
        portalContainer.style.left = "0";
        portalContainer.style.width = "100%";
        portalContainer.style.height = "100%";
        portalContainer.style.pointerEvents = "none";
        portalContainer.style.zIndex = "9999";

        if (document.body) {
          document.body.appendChild(portalContainer);
        }
      }

      setContainer(portalContainer);

      return () => {
        try {
          if (
            portalContainer &&
            portalContainer.parentNode &&
            portalContainer.children.length === 0
          ) {
            portalContainer.parentNode.removeChild(portalContainer);
          }
        } catch (error) {
          console.warn("Portal cleanup error:", error);
        }
      };
    } catch (error) {
      console.error("Portal setup error:", error);
    }
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};
