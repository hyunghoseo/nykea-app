import { useWindowDimensions } from "react-native";

const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return { isMobile };
};
export default useResponsiveLayout;
