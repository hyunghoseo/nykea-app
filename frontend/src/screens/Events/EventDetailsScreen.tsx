import { useGetEventsId } from "@/api/apiComponents";
import { DetailPage } from "@/components/Layout/DetailPage";

export const EventDetailsScreen = ({ route }: any) => {
  const { id } = route.params;

  const {
    data: { data: event } = {},
    isLoading,
    isError,
  } = useGetEventsId({ pathParams: { id } });
  console.log(event);
  return (
    <DetailPage
      type="event"
      isLoading={isLoading}
      isError={isError}
      data={event?.attributes}
    />
  );
};
