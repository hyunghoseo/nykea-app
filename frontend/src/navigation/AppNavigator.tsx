import { createStackNavigator } from "@react-navigation/stack";

import AboutScreen from "../screens/AboutScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import EventsScreen from "../screens/EventsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
