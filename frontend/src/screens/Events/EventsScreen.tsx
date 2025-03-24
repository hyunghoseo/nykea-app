import { Link } from "@react-navigation/native";
import { Text } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

export const EventsScreen = () => {
  return (
    <ScreenWrapper>
      <Text>Events Screen</Text>
      <Link to={{ screen: "Events/1" }}>go to detail page</Link>
    </ScreenWrapper>
  );
};
