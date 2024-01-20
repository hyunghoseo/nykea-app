import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header/Header";
import AppNavigator from "./navigation/AppNavigator";
import { registerRootComponent } from "expo";
import { linking } from "./navigation/navigationLinks";

const App = () => {
  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "white" },
      }}
    >
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
    backgroundColor: "white",
  },
});

registerRootComponent(App);

export default App;
