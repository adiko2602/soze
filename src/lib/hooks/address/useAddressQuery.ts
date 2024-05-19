import { useQuery } from "@tanstack/react-query";
import { terc } from "@prisma/client";
import { ApiRequest } from "@/lib/api/ApiRequest";

export function useAddressQuery() {
  const woj = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.get("/api/addresses/woj")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/addresses/woj"],
  });
  return { woj };
}
