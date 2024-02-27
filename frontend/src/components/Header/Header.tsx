import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import theme from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { navRoutes } from "@/navigation/AppNavigator";

const ANIMATION_TIME = 250;

const Header = () => {
  const { top } = useSafeAreaInsets();
  const { isMobile } = useResponsiveLayout();
  const { t } = useTranslation();

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const headerHeight = isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;
  const styles = getStyles(headerHeight, top);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const navigateTo = (name: string) => {
    setMenuOpen(false);
    navigation.navigate(name);
  };

  // Animation stuff
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width,
  );
  const menuAnimation = useRef(new Animated.Value(screenWidth)).current;
  const dimAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? 0 : screenWidth,
      duration: ANIMATION_TIME,
      useNativeDriver: true,
    }).start();
    Animated.timing(dimAnimation, {
      toValue: isMenuOpen ? 1 : 0,
      duration: ANIMATION_TIME,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, menuAnimation]);

  // Handle screen resize
  useEffect(() => {
    const updateWidth = () => {
      const newWidth = Dimensions.get("window").width;
      setScreenWidth(newWidth);
      if (!isMenuOpen) {
        menuAnimation.setValue(newWidth); // Instantly update position without animation
      }
    };

    const event = Dimensions.addEventListener("change", updateWidth);

    return () => {
      event.remove();
    };
  }, [isMenuOpen]);

  return (
    <>
      {isMobile ? (
        // Mobile header
        <View style={styles.mobileHeaderContainer} testID="mobile-header">
          <LanguageDropdown />
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

      {isMobile && (
        <>
          <View style={styles.menuContainer} testID="menu-container">
            <Animated.View
              style={[
                styles.menu,
                {
                  transform: [{ translateX: menuAnimation }],
                  pointerEvents: isMenuOpen ? "auto" : "none",
                  height: Dimensions.get("window").height - headerHeight,
                },
              ]}
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
          </View>

          <Animated.View
            pointerEvents={isMenuOpen ? "auto" : "none"}
            style={[
              styles.dimOverlay,
              {
                opacity: dimAnimation,
                height: Dimensions.get("window").height - headerHeight,
              },
            ]}
          />
        </>
      )}
    </>
  );
};

const getStyles = (headerHeight: number, top: number) =>
  StyleSheet.create({
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
      top: headerHeight + top,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent overlay
      zIndex: 50,
    },
    menuContainer: {
      position: "absolute",
      top: headerHeight + top,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "visible",
      backgroundColor: "transparent",
      zIndex: 100,
    },
    menu: {
      position: "relative",
      top: 0,
      left: 0,
      right: 0,
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

export default Header;
