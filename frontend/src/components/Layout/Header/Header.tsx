import { Link } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import { navRoutes } from "@/navigation/AppNavigator";

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
        onPressOut={onClickMobileLeftIcon}
        style={styles.icon}
        disabled={!mobileLeftIcon || !onClickMobileLeftIcon}
      >
        {mobileLeftIcon}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate("Home")}
        activeOpacity={0.6}
      >
        <Link to={{ screen: "Home" }} style={styles.logoMobileContainer}>
          <Image
            source={require("@/assets/logo.png")}
            style={styles.logoMobile}
          />
        </Link>
      </TouchableOpacity>
      <TouchableOpacity
        onPressOut={onClickMobileRightIcon}
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
          activeOpacity={0.6}
        >
          <Link to={{ screen: "Home" }} style={styles.logoDesktopContainer}>
            <Image
              source={require("@/assets/logo-large.png")}
              style={styles.logoDesktop}
            />
          </Link>
        </TouchableOpacity>
        <View style={styles.navLinksContainer}>
          {navRoutes.map((route) => (
            <TouchableOpacity
              key={route}
              onPress={() => navigationRef.navigate(route)}
            >
              <Link to={{ screen: route }} style={styles.navLink}>
                <Text style={styles.navText}>{t(`nav.${route}`)}</Text>
              </Link>
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
