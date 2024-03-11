import { ScrollView, StyleSheet, View } from "react-native";

const ScreenWrapper: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
});

export default ScreenWrapper;
