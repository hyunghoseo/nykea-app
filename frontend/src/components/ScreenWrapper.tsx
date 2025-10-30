import { Platform, ScrollView, StyleSheet, View } from "react-native";

type ScreenWrapperProps = {
  children: React.ReactNode;
  noVerticalPadding?: boolean;
  align?: "center" | "stretch";
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  noVerticalPadding = false,
  align = "center",
  children,
}) => {
  const styles = useStyles();

  return (
    <ScrollView
      style={styles.container}
      bounces
      alwaysBounceVertical
      overScrollMode="always"
      contentContainerStyle={
        Platform.OS === "web" ? { minHeight: "100%" } : undefined
      }
    >
      <View
        style={[
          styles.content,
          noVerticalPadding && styles.contentNoVerticalPadding,
          { alignItems: align },
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingVertical: 32,
      paddingHorizontal: 0,
    },
    contentNoVerticalPadding: {
      paddingVertical: 0,
    },
  });
};

export default ScreenWrapper;
