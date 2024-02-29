import { ScrollView, Text, TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

import { useTranslation } from "@/hooks/useTranslation";
import { navRoutes } from "@/navigation/AppNavigator";

import { styles } from "./MobileNavMenu.styles";

const ANIMATION_TIME = 250;

interface MobileNavMenuProps {
  opened: boolean;
  navigateTo: (route: string) => void;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  opened,
  navigateTo,
}) => {
  const { t } = useTranslation();

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
  ) : null;
};
