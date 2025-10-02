import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      setIsMobile(mql.matches);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback for older browsers
      mql.addListener(onChange);
      setIsMobile(mql.matches);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return !!isMobile;
}
