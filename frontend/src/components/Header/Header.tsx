import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import theme from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { AppNavigator, navRoutes } from "@/navigation/AppNavigator";

const ANIMATION_TIME = 250;

interface MobileNavMenuProps {
  opened: boolean;
  navigateTo: (route: string) => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  opened,
  navigateTo,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <>
      {opened && (
        <>
          <Animated.View
            style={styles.dimOverlay}
            entering={FadeIn.duration(ANIMATION_TIME)}
            exiting={FadeOut.duration(ANIMATION_TIME)}
            pointerEvents="box-none"
          />
          <Animated.View
            style={styles.menu}
            entering={SlideInRight.duration(ANIMATION_TIME)}
            exiting={SlideOutRight.duration(ANIMATION_TIME)}
            testID="menu-container"
          >
            <ScrollView>
              {navRoutes.map((route) => (
                <TouchableOpacity
                  key={route}
                  onPress={() => navigateTo(route)}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuText}>{t(`nav.${route}`)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </>
      )}
    </>
  );
};

const Header = () => {
  const { isMobile } = useResponsiveLayout();
  const { t } = useTranslation();
  const styles = useStyles();

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const navigateTo = (name: string) => {
    setMenuOpen(false);
    navigation.navigate(name);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Close menu if no longer mobile layout
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        // Mobile header
        <>
          <View style={styles.mobileHeaderContainer} testID="mobile-header">
            <View style={{ width: 40 }} />
            <TouchableOpacity
              onPress={() => navigateTo("Home")}
              activeOpacity={0.6}
            >
              <Image
                source={require("@/assets/logo.png")}
                style={styles.logoMobile}
              />
            </TouchableOpacity>
            <TouchableOpacity onPressOut={toggleMenu} style={styles.hamburger}>
              <Icon
                name={isMenuOpen ? "close" : "menu"}
                size={40}
                color={theme.colors.primary[0]}
                testID="menu-icon"
              />
            </TouchableOpacity>
          </View>
        </>
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
      )}
      <View style={styles.screenContainer}>
        <AppNavigator />
      </View>
      <MobileNavMenu opened={isMenuOpen} navigateTo={navigateTo} />
    </>
  );
};

const useStyles = () => {
  const { top: topInset } = useSafeAreaInsets();
  const { isMobile } = useResponsiveLayout();
  const headerHeight = isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;

  return StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: "white",
    },
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
    backChevron: {
      width: 40,
    },
    hamburger: {
      width: 40,
      color: theme.colors.primary[0],
    },
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

export default Header;
