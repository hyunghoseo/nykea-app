import { ScrollView, StyleSheet } from "react-native";
import Header from "./Header/Header";

const ScreenWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ScrollView style={styles.screenContainer} stickyHeaderIndices={[0]}>
      <Header />
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;
