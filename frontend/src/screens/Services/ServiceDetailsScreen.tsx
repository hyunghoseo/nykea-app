import { useGetServicesId } from "@/api/apiComponents";
import { DetailPage } from "@/components/Layout/DetailPage";

export const ServiceDetailsScreen = ({ route }: any) => {
  const { id } = route.params;

  const {
    data: { data: service } = {},
    isLoading,
    isError,
  } = useGetServicesId({ pathParams: { id } });
  console.log(service);
  return (
    <DetailPage
      type="service"
      isLoading={isLoading}
      isError={isError}
      data={service}
      tags={service?.attributes?.ServiceType}
      description="yes right."
    />
  );
};
