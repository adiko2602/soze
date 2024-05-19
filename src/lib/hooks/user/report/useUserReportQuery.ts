import { ApiRequest } from "@/lib/api/ApiRequest";
import { TUsersReportsInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useUserReportQuery() {
  const { data: session } = useSession();
  const reports = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TUsersReportsInclude[]>(
        await ApiRequest.get(`/api/users/${session?.user.id}/reports`)
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: [`/api/users/${session?.user.id}/reports`],
    enabled: !!session?.user.id,
  });

  return { reports };
}
