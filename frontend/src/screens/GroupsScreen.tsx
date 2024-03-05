import { Text } from "react-native";

import { useGetGroups } from "../api/apiComponents";
import ScreenWrapper from "../components/ScreenWrapper";

const GroupsScreen = () => {
  const { data } = useGetGroups({});
  console.log(data);
  return (
    <ScreenWrapper>
      <Text>Groups Screen</Text>
    </ScreenWrapper>
  );
};

export default GroupsScreen;
