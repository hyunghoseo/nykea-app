import { ScrollView, StyleSheet, View } from "react-native";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

type ScreenWrapperProps = {
  children: React.ReactNode;
  noVerticalPadding?: boolean;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  noVerticalPadding = false,
  children,
}) => {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.content,
          noVerticalPadding && styles.contentNoVerticalPadding,
        ]}
      >
        {children}
      </View>
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
      paddingVertical: 32,
      paddingHorizontal: isMobile ? 0 : 56,
      alignItems: "center",
    },
    contentNoVerticalPadding: {
      paddingVertical: 0,
    },
  });
};

export default ScreenWrapper;
