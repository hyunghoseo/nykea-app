import { Text } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

export const AnnouncementDetailsScreen = ({ route }) => {
  const { id } = route.params;
  return (
    <ScreenWrapper>
      <Text>AnnouncementDetails Screen {id}</Text>
    </ScreenWrapper>
  );
};
