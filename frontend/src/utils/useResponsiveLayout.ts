import { useWindowDimensions } from "react-native";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1280;

  return { isMobile };
};
