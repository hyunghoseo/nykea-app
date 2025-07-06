import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/config/constants";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import NavClose from "@/assets/nav-close.svg";
import NavMenu from "@/assets/nav-menu.svg";

import { Header } from "./Header/Header";
import { MobileNavMenu } from "./MobileNavMenu/MobileNavMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout();
  const { currentRoute } = useNavigationRef();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu if no longer mobile layout
  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

  // Close menu if current route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentRoute]);

  return (
    <View style={styles.layoutContainer}>
      <View
        style={[
          styles.screenContainer,
          isMobile || isTablet
            ? styles.screenContainerMobile
            : styles.screenContainerDesktop,
        ]}
      >
        {children}
      </View>
      <Header
        variant={isMobile || isTablet ? "mobile" : "desktop"}
        mobileRightIcon={
          isMenuOpen ? (
            <NavClose style={styles.icon} />
          ) : (
            <NavMenu style={styles.icon} />
          )
        }
        mobileRightText={isMenuOpen ? t(`icon.Close`) : t(`icon.Menu`)}
        onClickMobileRightIcon={toggleMenu}
      />
      {/* The NavMenu must go after the rest of the app in order for it 
        to render on top when it mounts */}
      <MobileNavMenu
        opened={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  screenContainerMobile: {
    marginTop: MOBILE_HEADER_HEIGHT,
  },
  screenContainerDesktop: {
    marginTop: DESKTOP_HEADER_HEIGHT,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
