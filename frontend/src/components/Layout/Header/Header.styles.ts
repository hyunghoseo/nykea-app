import { StyleSheet } from "react-native";

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import theme from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const useStyles = () => {
  const { isMobile } = useResponsiveLayout();
  const headerHeight = isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;

  return StyleSheet.create({
    mobileHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      height: headerHeight,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    desktopHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: headerHeight,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    desktopHeaderSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    logoMobile: {
      height: 60,
      width: 60,
    },
    logoDesktop: {
      height: 45,
      width: 253,
    },
    navLinksContainer: {
      flexDirection: "row",
    },
    navLink: {
      marginLeft: 30,
      padding: 8,
    },
    navText: {
      fontFamily: "KumbhSans_500Medium",
      color: "#2A2A2A",
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    icon: {
      width: 40,
      color: theme.colors.primary[0],
    },
  });
};
