"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import AdminUsersEditForm from "./AdminUsersEditForm";
import { useAdminUserQuery } from "@/lib/hooks/admin/user/useAdminUserQuery";
import CardHeaderLoader from "@/components/ui/card-header-with-loader";
import CardHeaderBack from "@/components/ui/card-header-back";

function AdminUsersEditCard(props: { id: string }) {
  const { user } = useAdminUserQuery();

  useEffect(() => {
    user.mutate(props.id);
  }, [props.id]);

  return (
    <Card>
      <CardHeader>
        <CardHeaderLoader isLoading={user.isPending}>
          <CardHeaderBack>Edytuj dane użytkownika</CardHeaderBack>
        </CardHeaderLoader>
      </CardHeader>
      <CardContent>
        {user?.data && (
          <AdminUsersEditForm defaultUser={user.data} id={props.id} />
        )}
      </CardContent>
    </Card>
  );
}

export default AdminUsersEditCard;
