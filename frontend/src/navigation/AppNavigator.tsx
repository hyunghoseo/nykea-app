import { LinkingOptions, ParamListBase } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AboutScreen from "@/screens/AboutScreen";
import ContactUsScreen from "@/screens/ContactUsScreen";
import EventsScreen from "@/screens/EventsScreen";
import GroupsScreen from "@/screens/GroupsScreen";
import HomeScreen from "@/screens/HomeScreen";
import ServicesScreen from "@/screens/ServicesScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export const linking: LinkingOptions<ParamListBase> = {
  prefixes: ["nykea.org", "nykea://"],
  config: {
    screens: {
      Home: "",
      About: "about",
      Groups: "groups",
      Services: "services",
      Events: "events",
      ContactUs: "contact-us",
    },
  },
};

// Routes that appear in the navigation menus
export const navRoutes = [
  "About",
  "Groups",
  "Services",
  "Events",
  "ContactUs",
] as const;
