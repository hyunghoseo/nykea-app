import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const useTypographyStyles = () => {
  const { locale } = useLocale();
  const { isMobile } = useResponsiveLayout();

  const defaultStyles: TextStyle | ViewStyle = {
    color: theme.colors.black,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "normal",
  };

  return StyleSheet.create({
    h1: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 36,
            lineHeight: 44,
          }
        : {
            fontSize: 48,
            lineHeight: 58,
            letterSpacing: 0.25,
          }),
    },
    h2: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 28,
            lineHeight: 40,
          }
        : {
            fontSize: 36,
            lineHeight: 46,
            letterSpacing: 0.25,
          }),
    },
    h3: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 22,
            lineHeight: 32,
            letterSpacing: 0.1,
          }
        : {
            fontSize: 26,
            lineHeight: 36,
            letterSpacing: 0.25,
          }),
    },
    h4: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 20,
            lineHeight: 28,
            letterSpacing: 0.15,
          }
        : {
            fontSize: 24,
            lineHeight: 32,
            letterSpacing: 0.25,
          }),
    },
    h5: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 18,
            lineHeight: 24,
            letterSpacing: 0.15,
          }
        : {
            fontSize: 20,
            lineHeight: 28,
            letterSpacing: 0.5,
          }),
    },
    h6: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_600SemiBold" : "NotoSansKR_500Medium",
      ...(isMobile
        ? {
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.25,
          }
        : {
            fontSize: 18,
            lineHeight: 32,
            letterSpacing: 0.75,
          }),
    },
    overline: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "KumbhSans_500SemiBold" : "NotoSansKR_500Medium",
      color: theme.colors.black,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 1.25,
    },
    tag: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "NotoSans_400Regular" : "NotoSansKR_400Regular",
      color: theme.colors.black,
      fontSize: 13,
      lineHeight: 23,
    },
    bodyLarge: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "NotoSans_400Regular" : "NotoSansKR_400Regular",
      color: theme.colors.black,
      fontSize: 18,
      lineHeight: 34,
    },
    bodyNormal: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "NotoSans_400Regular" : "NotoSansKR_400Regular",
      color: theme.colors.black,
      fontSize: 16,
      lineHeight: 32,
    },
    bodySmall: {
      ...defaultStyles,
      fontFamily:
        locale === "en" ? "NotoSans_400Regular" : "NotoSansKR_400Regular",
      color: theme.colors.black,
      fontSize: 14,
      lineHeight: 26,
    },
    link: {
      color: theme.colors.primary[0],
      textDecorationLine: "underline",
    },
  });
};
