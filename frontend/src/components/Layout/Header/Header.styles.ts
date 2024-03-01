import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";

export const useStyles = () => {
  const { locale } = useLocale();
  const { top: topInset } = useSafeAreaInsets();

  return StyleSheet.create({
    header: {
      position: "absolute",
      left: 0,
      right: 0,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.16,
      shadowRadius: 1.51,
      elevation: 2,
    },
    mobileHeader: {
      // Extends the height of the header by the height of the status bar
      height: MOBILE_HEADER_HEIGHT + topInset,
      paddingTop: topInset,
      top: -topInset,
    },
    desktopHeader: {
      height: DESKTOP_HEADER_HEIGHT,
    },
    desktopHeaderLeftSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 16,
    },
    desktopHeaderRightSection: {
      flexDirection: "row",
      justifyContent: "center",
      paddingRight: 32,
    },
    logoMobileContainer: {
      height: MOBILE_HEADER_HEIGHT,
      justifyContent: "center",
      paddingHorizontal: 12,
    },
    logoMobile: {
      height: 60,
      width: 60,
    },
    logoDesktopContainer: {
      height: DESKTOP_HEADER_HEIGHT - 32,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    logoDesktop: {
      height: 45,
      width: 253,
    },
    navLinksContainer: {
      flexDirection: "row",
    },
    navLink: {
      marginHorizontal: 8,
      padding: 14,
    },
    navText: {
      fontFamily:
        locale === "en" ? "KumbhSans_500Medium" : "NotoSansKR_500Medium",
      color: "#2A2A2A",
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    navTextHovered: {
      color: theme.colors.primary[0],
      borderBottomColor: theme.colors.primary[0],
      borderBottomWidth: 1,
    },
    navTextActive: {
      fontFamily: locale === "en" ? "KumbhSans_700Bold" : "NotoSansKR_700Bold",
      color: theme.colors.primary[0],
      letterSpacing: 0.4,
    },
    icon: {
      width: 80,
      height: MOBILE_HEADER_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      color: theme.colors.primary[0],
    },
  });
};
