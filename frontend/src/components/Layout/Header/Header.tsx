import { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useHover } from "react-native-web-hooks";

import { navRoutes } from "@/config/navigation";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelectDropdown } from "@/components/LanguageSelect";

import { styles } from "./Header.styles";

interface NavItemProps {
  route: (typeof navRoutes)[number];
}

export const NavItem: React.FC<NavItemProps> = ({ route }) => {
  const { t } = useTranslation();
  const { navigationRef, currentRoute } = useNavigationRef();

  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);

  return (
    <TouchableOpacity
      ref={ref}
      key={route}
      style={styles.navLink}
      onPress={() => navigationRef.navigate(route)}
    >
      <Text
        style={[
          styles.navText,
          route === currentRoute && styles.navTextActive,
          isHovered && styles.navTextHovered,
        ]}
      >
        {t(`nav.${route}`)}
      </Text>
    </TouchableOpacity>
  );
};

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
            <NavItem key={route} route={route} />
          ))}
        </View>
      </View>
      <View style={styles.desktopHeaderRightSection}>
        <LanguageSelectDropdown />
      </View>
    </View>
  );
};
