import { ScrollView, StyleSheet, View } from "react-native";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const ScreenWrapper: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const useStyles = () => {
  const { isMobile } = useResponsiveLayout();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingBottom: 32,
      paddingHorizontal: isMobile ? 0 : 56,
      alignItems: "center",
    },
  });
};

export default ScreenWrapper;
