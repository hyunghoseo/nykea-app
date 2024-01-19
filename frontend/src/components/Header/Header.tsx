import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { navigationLinks } from "../../navigation/navigationLinks";
import useResponsiveLayout from "../../utils/useResponsiveLayout";
import theme from "../../constants/theme";
import { StackNavigationProp } from "@react-navigation/stack";

const Header = () => {
  const { isMobile } = useResponsiveLayout();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const navigateTo = (name: string) => {
    setMenuOpen(false);
    navigation.navigate(name);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.backChevron} />
        <Image
          source={require("../../assets/logo.png")}
          style={isMobile ? styles.logoMobile : styles.logoDesktop}
        />
        {isMobile && (
          <TouchableOpacity onPressOut={toggleMenu} style={styles.hamburger}>
            <Icon
              name={isMenuOpen ? "close" : "menu"}
              size={40}
              color={theme.colors.primary[0]}
            />
          </TouchableOpacity>
        )}
        {!isMobile && (
          <View style={styles.navLinksContainer}>
            {navigationLinks.map((link) => (
              <TouchableOpacity key={link.route} style={styles.navLink}>
                <Text>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {isMobile && isMenuOpen && (
        <View style={styles.menu}>
          {navigationLinks.map((link) => (
            <TouchableOpacity
              key={link.route}
              onPress={() => navigateTo(link.route)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoMobile: {
    height: 70,
    width: 70,
  },
  logoDesktop: {},
  navLinksContainer: {
    flexDirection: "row",
  },
  navLink: {
    marginLeft: 20,
  },
  backChevron: {
    width: 40,
  },
  hamburger: {
    width: 40,
    color: theme.colors.primary[0],
  },
  menu: {
    position: "absolute",
    top: 110, // Adjust as needed
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
