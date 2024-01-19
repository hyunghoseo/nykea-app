import {
  LinkingOptions,
  NavigationContainer,
  ParamListBase,
} from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header/Header";
import AppNavigator from "./navigation/AppNavigator";
import { registerRootComponent } from "expo";

const linking: LinkingOptions<ParamListBase> = {
  prefixes: ["nykea.org", "nykea://"],
  config: {
    screens: {
      Home: "home",
      About: "about",
      // More screens...
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
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
