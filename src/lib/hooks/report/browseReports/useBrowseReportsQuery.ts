import { ApiRequest } from "@/lib/api/ApiRequest";
import { TBrowseReportsInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useBrowseReports() {
  const { data: session } = useSession();

  const reports = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TBrowseReportsInclude[]>(
        await ApiRequest.get(`/api/users/${session?.user.id}/reports/browse`)
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: [`/api/users/${session?.user.id}/reports/browse`],
  });

  return { reports };
}
