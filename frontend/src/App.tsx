import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header/Header";
import AppNavigator from "./navigation/AppNavigator";
import { registerRootComponent } from "expo";

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <View style={styles.screenContainer}>
          <AppNavigator />
        </View>
      </View>
    </NavigationContainer>
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

registerRootComponent(App);

export default App;
