"use client";

import { ApiRequest } from "@/lib/api/ApiRequest";
import { TAdminUserEdit } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";

export function useAdminUserMutation() {
  const adminUserEdit = useMutation({
    mutationFn: async ({
      values,
      id,
    }: {
      values: TAdminUserEdit;
      id: string;
    }) => await ApiRequest.patch(`/api/admin/users/${id}/edit`, values),
  });

  return { adminUserEdit };
}
