import { StyleSheet } from "react-native";

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import { theme } from "@/config/theme";

export const styles = StyleSheet.create({
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
    height: MOBILE_HEADER_HEIGHT,
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
    flex: 1,
    height: MOBILE_HEADER_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  logoMobile: {
    height: 60,
    width: 60,
  },
  logoDesktopContainer: {
    flex: 1,
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
    flex: 1,
    marginHorizontal: 8,
    padding: 14,
  },
  navText: {
    fontFamily: "KumbhSans_500Medium",
    color: "#2A2A2A",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  activeNavText: {
    fontFamily: "KumbhSans_700Bold",
    color: theme.colors.primary[0],
  },
  icon: {
    width: 80,
    height: MOBILE_HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.primary[0],
  },
});
