import { Platform, useWindowDimensions } from "react-native";

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/config/constants";

type Layout = "mobile" | "tablet" | "desktop";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width < TABLET_BREAKPOINT && !isMobile;
  const isDesktop = !isMobile && !isTablet;

  // Platform detection
  const isWeb = Platform.OS === "web";
  const isNative = Platform.OS === "ios" || Platform.OS === "android";

  // Desktop detection (web platform + desktop screen size)
  const isDesktopWeb = isWeb && isDesktop;

  const layout: Layout = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWeb,
    isNative,
    isDesktopWeb,
    layout,
    width,
  };
};
