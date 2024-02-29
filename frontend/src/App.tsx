import { useCallback } from "react";
import {
  KumbhSans_500Medium,
  KumbhSans_600SemiBold,
  KumbhSans_700Bold,
} from "@expo-google-fonts/kumbh-sans";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "@/config/navigation";
import { theme } from "@/config/theme";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import { NavigationProvider } from "@/contexts/NavigationProvider";
import { Layout } from "@/components/Layout";
import AboutScreen from "@/screens/AboutScreen";
import ContactUsScreen from "@/screens/ContactUsScreen";
import EventsScreen from "@/screens/EventsScreen";
import GroupsScreen from "@/screens/GroupsScreen";
import HomeScreen from "@/screens/HomeScreen";
import ServicesScreen from "@/screens/ServicesScreen";

// These should eventually look like:
// import { EventsScreen, EventsDetailScreen } from @/screens/Events;

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="About" component={AboutScreen} />
      <RootStack.Screen name="Groups" component={GroupsScreen} />
      <RootStack.Screen name="Services" component={ServicesScreen} />
      <RootStack.Screen name="Events" component={EventsScreen} />
      <RootStack.Screen name="ContactUs" component={ContactUsScreen} />
    </RootStack.Navigator>
  );
};

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    KumbhSans_500Medium,
    KumbhSans_600SemiBold,
    KumbhSans_700Bold,
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
        <GestureHandlerRootView
          style={styles.container}
          onLayout={onLayoutRootView}
        >
          <SafeAreaProvider>
            <NavigationProvider>
              {/* TODO: we could add more complex behavior to StatusBar in the future */}
              <StatusBar
                style="light"
                backgroundColor={theme.colors.primary[0]}
              />
              <SafeAreaView style={styles.container}>
                <Layout>
                  <AppNavigator />
                </Layout>
              </SafeAreaView>
            </NavigationProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </LocaleProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
