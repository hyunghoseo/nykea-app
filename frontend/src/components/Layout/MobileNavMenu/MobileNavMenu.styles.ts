import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const useStyles = () => {
  const { top: topInset } = useSafeAreaInsets();
  const { isMobile } = useResponsiveLayout();
  const headerHeight = isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;

  return StyleSheet.create({
    dimOverlay: {
      position: "absolute",
      width: "100%",
      top: headerHeight + topInset,
      left: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
    },
    menu: {
      position: "absolute",
      top: headerHeight + topInset,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      backgroundColor: "white",
    },
    menuItem: {
      paddingHorizontal: 30,
      paddingVertical: 25,
    },
    menuText: {
      fontFamily: "KumbhSans_600SemiBold",
      color: "#2A2A2A",
      fontSize: 18,
      lineHeight: 32,
      letterSpacing: 0.75,
    },
  });
};
