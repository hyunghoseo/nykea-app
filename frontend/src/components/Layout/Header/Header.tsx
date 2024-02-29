import { Image, Text, TouchableOpacity, View } from "react-native";

import { navRoutes } from "@/config/navigation";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";

import { styles } from "./Header.styles";

interface HeaderProps {
  variant: "mobile" | "desktop";
  mobileLeftIcon?: React.ReactNode;
  mobileRightIcon?: React.ReactNode;
  onClickMobileLeftIcon?: () => void;
  onClickMobileRightIcon?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  variant,
  mobileLeftIcon,
  mobileRightIcon,
  onClickMobileLeftIcon,
  onClickMobileRightIcon,
}) => {
  const { t } = useTranslation();
  const { navigationRef } = useNavigationRef();

  return variant === "mobile" ? (
    // Mobile header
    <View style={[styles.header, styles.mobileHeader]} testID="mobile-header">
      <TouchableOpacity
        onPress={onClickMobileLeftIcon}
        style={styles.icon}
        disabled={!mobileLeftIcon || !onClickMobileLeftIcon}
      >
        {mobileLeftIcon}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate("Home")}
        style={styles.logoMobileContainer}
        activeOpacity={0.6}
      >
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logoMobile}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onClickMobileRightIcon}
        style={styles.icon}
        disabled={!mobileRightIcon || !onClickMobileRightIcon}
      >
        {mobileRightIcon}
      </TouchableOpacity>
    </View>
  ) : (
    // Desktop header
    <View style={[styles.header, styles.desktopHeader]} testID="desktop-header">
      <View style={styles.desktopHeaderLeftSection}>
        <TouchableOpacity
          onPress={() => navigationRef.navigate("Home")}
          style={styles.logoDesktopContainer}
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
              style={styles.navLink}
              onPress={() => navigationRef.navigate(route)}
            >
              <Text style={styles.navText}>{t(`nav.${route}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.desktopHeaderRightSection}>
        <LanguageDropdown />
      </View>
    </View>
  );
};
