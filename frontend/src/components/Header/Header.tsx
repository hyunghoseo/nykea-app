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
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { navigationLinks } from "../../navigation/navigationLinks";
import useResponsiveLayout from "../../utils/useResponsiveLayout";
import theme from "../../constants/theme";

const MOBILE_HEADER_HEIGHT = 110;
const DESKTOP_HEADER_HEIGHT = 90;
const ANIMATION_TIME = 250;

const Header = () => {
  const { isMobile } = useResponsiveLayout();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const headerHeight = isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT;
  const styles = getStyles(headerHeight);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const navigateTo = (name: string) => {
    setMenuOpen(false);
    navigation.navigate(name);
  };

  // Animation stuff
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
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
        <View style={styles.mobileHeaderContainer}>
          <View style={styles.backChevron} />
          <TouchableOpacity onPress={() => navigateTo("Home")}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logoMobile}
            />
          </TouchableOpacity>
          <TouchableOpacity onPressOut={toggleMenu} style={styles.hamburger}>
            <Icon
              name={isMenuOpen ? "close" : "menu"}
              size={40}
              color={theme.colors.primary[0]}
            />
          </TouchableOpacity>
        </View>
      ) : (
        // Desktop header
        <View style={styles.desktopHeaderContainer}>
          <TouchableOpacity onPress={() => navigateTo("Home")}>
            <Image
              source={require("../../assets/logo-large.png")}
              style={styles.logoDesktop}
            />
          </TouchableOpacity>
          <View style={styles.navLinksContainer}>
            {navigationLinks.map((link) => (
              <TouchableOpacity
                key={link.route}
                onPress={() => navigateTo(link.route)}
                style={styles.navLink}
              >
                <Text style={styles.navText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {isMobile && (
        <>
          <View style={styles.menuContainer}>
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
                {navigationLinks.map((link) => (
                  <TouchableOpacity
                    key={link.route}
                    onPress={() => navigateTo(link.route)}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuText}>{link.title}</Text>
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

const getStyles = (headerHeight: number) =>
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
      paddingHorizontal: 30,
      height: headerHeight,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    logoMobile: {
      height: 70,
      width: 70,
    },
    logoDesktop: {
      height: 37,
      width: 247,
    },
    navLinksContainer: {
      flexDirection: "row",
    },
    navLink: {
      marginLeft: 38,
    },
    navText: {
      fontSize: 14,
      fontWeight: "500",
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
      top: headerHeight,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent overlay
      zIndex: 50,
    },
    menuContainer: {
      position: "absolute",
      top: headerHeight,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      backgroundColor: "transparent",
      pointerEvents: "none",
      zIndex: 101,
    },
    menu: {
      position: "relative",
      top: 0, // Adjust as needed
      left: 0,
      right: 0,
      backgroundColor: "white",
      zIndex: 100,
    },
    menuItem: {
      paddingHorizontal: 30,
      paddingVertical: 25,
    },
    menuText: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: 0.75,
    },
  });

export default Header;
