import { useGetAnnouncementsId } from "@/api/apiComponents";
import { DetailPage } from "@/components/Layout/DetailPage";

export const AnnouncementDetailsScreen = ({ route }: any) => {
  const { id } = route.params;

  const {
    data: { data: announcement } = {},
    isLoading,
    isError,
  } = useGetAnnouncementsId({ pathParams: { id } });
  return (
    <DetailPage
      type="announcement"
      isLoading={isLoading}
      isError={isError}
      data={announcement}
      tags={announcement?.attributes?.HostingGroup?.data?.attributes?.Name}
      description="yes right."
    />
  );
};
