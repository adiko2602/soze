import { useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { TAdminReportsSelect } from "@/lib/prisma";

export function useAdminReportQuery() {
  const reports = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TAdminReportsSelect[]>(
        await ApiRequest.get("/api/admin/reports")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/admin/reports"],
  });
  return { reports };
}
