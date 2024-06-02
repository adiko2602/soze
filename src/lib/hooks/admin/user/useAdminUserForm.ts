"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminUserEditValidation } from "@/lib/validators/admin/adminUserEdit.validator";
import { TAdminUserSelect } from "@/lib/prisma";
import { TAdminUserEdit } from "@/lib/validators";

export function useAdminUserForm(defaultUser: TAdminUserSelect) {
  const adminUserEditForm = useForm<TAdminUserEdit>({
    resolver: zodResolver(AdminUserEditValidation),
    mode: "onBlur",
    defaultValues: {
      email: defaultUser.email,
      userType: defaultUser.userTypes,
      firstName: defaultUser.personals?.firstName,
      lastName: defaultUser.personals?.lastName,
      pesel: defaultUser.personals?.pesel,
      userStatus: defaultUser.userStatuses,
    },
  });

  return { adminUserEditForm };
}
