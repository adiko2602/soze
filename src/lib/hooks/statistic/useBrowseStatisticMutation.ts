import { ApiRequest } from "@/lib/api/ApiRequest";
import { TBrowseStatisticsInclude } from "@/lib/prisma";
import { TBrowseStatistics } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";

export function useBrowseStatisticMutation() {
  const browseStatisticMutation = useMutation({
    mutationFn: async (values: TBrowseStatistics) => {
      const data = ApiRequest.getData<TBrowseStatisticsInclude[]>(
        await ApiRequest.post("/api/statistics", values)
      );
      console.log(data.body);
      return data.body;
    },
  });

  return { browseStatisticMutation };
}
