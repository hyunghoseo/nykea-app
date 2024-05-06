import { Text } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

export const AnnouncementDetailsScreen = ({ route }: any) => {
  const { id } = route.params;
  return (
    <ScreenWrapper>
      <Text>AnnouncementDetails Screen {id}</Text>
    </ScreenWrapper>
  );
};
