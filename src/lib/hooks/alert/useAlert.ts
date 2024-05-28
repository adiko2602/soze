import { ApiRequest } from "@/lib/api/ApiRequest";
import { TAlertInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";

function useAlert() {
  const alerts = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TAlertInclude[]>(
        await ApiRequest.get("/api/alerts")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/alerts"],
  });

  return { alerts };
}

export default useAlert;
