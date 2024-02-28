import { useEffect, useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

import theme from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

import { Header } from "./Header/Header";
import { MobileNavMenu } from "./MobileNavMenu/MobileNavMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useResponsiveLayout();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const navigateTo = (route: string) => {
    setIsMenuOpen(false);
    navigation.navigate(route);
  };

  // Close menu if no longer mobile layout
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <Header
        variant={isMobile ? "mobile" : "desktop"}
        mobileRightIcon={
          // TODO: Replace with custom svg
          <Icon
            name={isMenuOpen ? "close" : "menu"}
            size={40}
            color={theme.colors.primary[0]}
          />
        }
        onClickMobileRightIcon={toggleMenu}
        navigateTo={navigateTo}
      />
      <View style={styles.screenContainer}>{children}</View>
      {/* The NavMenu must go after the rest of the app in order for it 
        to render on top when it mounts */}
      <MobileNavMenu opened={isMenuOpen} navigateTo={navigateTo} />
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
