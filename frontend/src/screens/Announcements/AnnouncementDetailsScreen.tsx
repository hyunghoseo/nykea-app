import { useGetAnnouncementsId } from "@/api/apiComponents";
import { DetailPage } from "@/components/Layout/DetailPage";

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
      tags={announcement?.HostingGroup?.data.attributes.name}
      description="yes right."
    />
  );
};
