import { useWindowDimensions } from "react-native";

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/config/constants";

type Layout = "mobile" | "tablet" | "desktop";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width < TABLET_BREAKPOINT && !isMobile;
  const isDesktop = !isMobile && !isTablet;

  const layout: Layout = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  return {
    isMobile,
    isTablet,
    isDesktop,
    layout,
  };
};
