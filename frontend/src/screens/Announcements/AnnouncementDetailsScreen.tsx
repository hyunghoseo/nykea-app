import { Text } from "react-native";

import { useGetAnnouncementsId } from "@/api/apiComponents";
import { DetailPage } from "@/components/Layout/DetailPage";

import ScreenWrapper from "../../components/ScreenWrapper";

export const AnnouncementDetailsScreen = ({ route }: any) => {
  const { id } = route.params;
  console.log(id);

  const {
    data: { data: announcement } = {},
    isLoading,
    isError,
  } = useGetAnnouncementsId({ pathParams: { id } });
  console.log(announcement);
  return (
    <DetailPage
      type="announcement"
      isLoading={isLoading}
      isError={isError}
      data={announcement}
      title="title"
      tags={announcement?.HostingGroup?.data.attributes.name}
      postedDate="00.000"
      description="yes right."
    />
  );
};
