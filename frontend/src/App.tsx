import { useCallback } from "react";
import {
  KumbhSans_500Medium,
  KumbhSans_600SemiBold,
  KumbhSans_700Bold,
} from "@expo-google-fonts/kumbh-sans";
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
} from "@expo-google-fonts/noto-sans-kr";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "@/config/navigation";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import { NavigationProvider } from "@/contexts/NavigationProvider";
import { Layout } from "@/components/Layout";
import AboutScreen from "@/screens/AboutScreen";
import {
  AnnouncementDetailsScreen,
  AnnouncementsScreen,
} from "@/screens/Announcements";
import ContactUsScreen from "@/screens/ContactUsScreen";
import {
  EventDetailsScreen,
  EventsScreen,
} from "@/screens/Events";
import { GroupsScreen } from "@/screens/GroupsScreen";
import HomeScreen from "@/screens/HomeScreen";
import { PolicyScreen } from "@/screens/PolicyScreen";
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
      <RootStack.Screen name="Policy" component={PolicyScreen} />
      <RootStack.Screen name="Groups" component={GroupsScreen} />
      <RootStack.Screen name="Services" component={ServicesScreen} />
      <RootStack.Screen name="Events" component={EventsScreen} />
      <RootStack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
      />
      <RootStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <RootStack.Screen
        name="AnnouncementDetails"
        component={AnnouncementDetailsScreen}
      />
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
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
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
              <StatusBar style="dark" backgroundColor="white" />
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
