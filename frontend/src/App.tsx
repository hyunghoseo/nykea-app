import { useCallback } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
  KumbhSans_500Medium,
  KumbhSans_600SemiBold,
} from "@expo-google-fonts/kumbh-sans";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import * as SplashScreen from "expo-splash-screen";

import Header from "./components/Header/Header";
import AppNavigator from "./navigation/AppNavigator";
import { linking } from "./navigation/navigationLinks";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    KumbhSans_500Medium,
    KumbhSans_600SemiBold,
    NotoSans_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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

export default App;
