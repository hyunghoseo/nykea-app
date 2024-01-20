import { useWindowDimensions } from "react-native";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return { isMobile };
};
