import { StyleSheet } from "react-native";

import { MOBILE_HEADER_HEIGHT } from "@/config/constants";

export const styles = StyleSheet.create({
  dimOverlay: {
    position: "absolute",
    width: "100%",
    top: MOBILE_HEADER_HEIGHT,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
  },
  menu: {
    position: "absolute",
    top: MOBILE_HEADER_HEIGHT,
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