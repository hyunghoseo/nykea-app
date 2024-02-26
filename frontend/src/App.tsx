import {
  KumbhSans_500Medium,
  KumbhSans_600SemiBold,
} from "@expo-google-fonts/kumbh-sans";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import Header from "@/components/Header/Header";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import AppNavigator from "@/navigation/AppNavigator";
import { linking } from "@/navigation/navigationLinks";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
    <LocaleProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          linking={linking}
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: "white" },
          }}
        >
          <View style={styles.container} onLayout={onLayoutRootView}>
            <Header />
            <View style={styles.screenContainer}>
              <AppNavigator />
            </View>
          </View>
        </NavigationContainer>
      </QueryClientProvider>
    </LocaleProvider>
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
