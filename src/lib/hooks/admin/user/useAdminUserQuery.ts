"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { TAdminUserSelect, TAdminUsersSelect } from "@/lib/prisma";

export function useAdminUserQuery() {
  const users = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TAdminUsersSelect[]>(
        await ApiRequest.get("/api/admin/users")
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: ["/api/admin/users"],
  });

  const user = useMutation({
    mutationFn: async (id: string) => {
      const data = ApiRequest.getData<TAdminUserSelect>(
        await ApiRequest.get(`/api/admin/users/${id}`)
      );
      console.log(data.body);
      return data.body;
    },
  });

  return { users, user };
}
