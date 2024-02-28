import { Image, Text, TouchableOpacity, View } from "react-native";

import { useTranslation } from "@/hooks/useTranslation";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import { navRoutes } from "@/navigation/AppNavigator";

import { useStyles } from "./Header.styles";

interface HeaderProps {
  variant: "mobile" | "desktop";
  mobileLeftIcon?: React.ReactNode;
  mobileRightIcon?: React.ReactNode;
  onClickMobileLeftIcon?: () => void;
  onClickMobileRightIcon?: () => void;
  navigateTo: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  variant,
  mobileLeftIcon,
  mobileRightIcon,
  onClickMobileLeftIcon,
  onClickMobileRightIcon,
  navigateTo,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return variant === "mobile" ? (
    // Mobile header
    <View style={styles.mobileHeaderContainer} testID="mobile-header">
      <TouchableOpacity onPressOut={onClickMobileLeftIcon} style={styles.icon}>
        {mobileLeftIcon}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo("Home")} activeOpacity={0.6}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logoMobile}
        />
      </TouchableOpacity>
      <TouchableOpacity onPressOut={onClickMobileRightIcon} style={styles.icon}>
        {mobileRightIcon}
      </TouchableOpacity>
    </View>
  ) : (
    // Desktop header
    <View style={styles.desktopHeaderContainer} testID="desktop-header">
      <View style={styles.desktopHeaderSection}>
        <TouchableOpacity
          onPress={() => navigateTo("Home")}
          activeOpacity={0.6}
        >
          <Image
            source={require("@/assets/logo-large.png")}
            style={styles.logoDesktop}
          />
        </TouchableOpacity>
        <View style={styles.navLinksContainer}>
          {navRoutes.map((route) => (
            <TouchableOpacity
              key={route}
              onPress={() => navigateTo(route)}
              style={styles.navLink}
            >
              <Text style={styles.navText}>{t(`nav.${route}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.desktopHeaderSection}>
        <LanguageDropdown />
      </View>
    </View>
  );
};
