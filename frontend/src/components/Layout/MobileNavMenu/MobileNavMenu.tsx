import { useEffect, useRef } from "react";
import {
  BackHandler,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { useHover } from "react-native-web-hooks";

import { navRoutes } from "@/config/navigation";
import { theme } from "@/config/theme";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useTranslation } from "@/hooks/useTranslation";

import { styles } from "./MobileNavMenu.styles";

const ANIMATION_TIME = 250;

interface MenuItemProps {
  route: (typeof navRoutes)[number];
  onPress?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ route, onPress }) => {
  const { t } = useTranslation();
  const { navigationRef, currentRoute } = useNavigationRef();

  const ref = useRef<TouchableHighlight>(null);
  const isHovered = useHover(ref);

  return (
    <TouchableHighlight
      ref={ref}
      style={[styles.menuItem, isHovered && styles.menuItemHovered]}
      underlayColor={theme.colors.primary[8]}
      onPress={() => {
        onPress?.();
        navigationRef.navigate(route);
      }}
    >
      <Text
        style={[
          styles.menuText,
          route === currentRoute && styles.menuTextActive,
        ]}
      >
        {t(`nav.${route}`)}
      </Text>
    </TouchableHighlight>
  );
};

interface MobileNavMenuProps {
  opened: boolean;
  closeMenu: () => void;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  opened,
  closeMenu,
}) => {
  useEffect(() => {
    const onBackPress = () => {
      if (opened) {
        closeMenu();
        return true;
      } else {
        return false;
      }
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  }, [opened, closeMenu]);

  // The order of these elements is important as a replacement for z-index,
  // which is ignored when a component is unmounted and remounted.
  return opened ? (
    <>
      {/* Dim Overlay */}
      <Animated.View
        style={styles.dimOverlay}
        entering={FadeIn.duration(ANIMATION_TIME)}
        exiting={FadeOut.duration(ANIMATION_TIME)}
        pointerEvents="box-none"
      />
      {/* Nav Menu */}
      <Animated.View
        style={styles.menu}
        entering={SlideInRight.duration(ANIMATION_TIME)}
        exiting={SlideOutRight.duration(ANIMATION_TIME)}
        testID="menu-container"
      >
        <ScrollView>
          {navRoutes.map((route) => (
            <MenuItem key={route} route={route} onPress={closeMenu} />
          ))}
        </ScrollView>
      </Animated.View>
    </>
  ) : null;
};
