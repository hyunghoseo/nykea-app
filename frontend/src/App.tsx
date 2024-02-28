import { useCallback } from "react";
import {
  KumbhSans_500Medium,
  KumbhSans_600SemiBold,
} from "@expo-google-fonts/kumbh-sans";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { TranslationEntryKey } from "@/config/translations";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { Layout } from "@/components/Layout";
import { AppNavigator, linking } from "@/navigation/AppNavigator";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const NavigationLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "white" },
      }}
      documentTitle={{
        formatter: (options, route) => {
          const pageTitle = t(`nav.${route?.name}` as TranslationEntryKey);
          return pageTitle ? `${pageTitle} - ${t("home")}` : t("home");
        },
      }}
    >
      <SafeAreaView style={styles.container}>
        {/* TODO: we could add more complex behavior to StatusBar in the future */}
        <StatusBar style="light" backgroundColor="#225DA7" />
        <Layout>
          <AppNavigator />
        </Layout>
      </SafeAreaView>
    </NavigationContainer>
  );
};

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
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView
            style={styles.container}
            onLayout={onLayoutRootView}
          >
            <NavigationLayout />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </SafeAreaProvider>
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
