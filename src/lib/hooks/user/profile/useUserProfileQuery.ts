import { ApiRequest } from "@/lib/api/ApiRequest";
import { TUsersProfileInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useUserProfileQuery() {
  const { data: session } = useSession();
  const profile = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TUsersProfileInclude>(
        await ApiRequest.get(`/api/users/${session?.user.id}/profile`)
      );
      console.log(data);
      return data;
    },
    queryKey: [`/api/users/${session?.user.id}/profile`],
    enabled: !!session?.user.id,
  });

  return { profile };
}
