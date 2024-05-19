import { useQuery } from "@tanstack/react-query";
import { diseases } from "@prisma/client";
import { ApiRequest } from "@/lib/api/ApiRequest";

export function useDiseseQuery() {
  const diseases = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<diseases[]>(
        await ApiRequest.get("/api/diseases/")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/diseases/"],
  });

  return { diseases };
}
