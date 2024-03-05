import { useWindowDimensions } from "react-native";

import { MOBILE_BREAKPOINT } from "@/config/constants";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;

  return { isMobile };
};
