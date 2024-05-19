"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import AdminUsersEditForm from "./AdminUsersEditForm";
import { useAdminUserQuery } from "@/lib/hooks/admin/user/useAdminUserQuery";

function AdminUsersEditCard(props: { id: string }) {
  const { user } = useAdminUserQuery();

  useEffect(() => {
    user.mutate(props.id);
  }, []);

  return (
    <Card>
      <CardHeader>Edytuj dane użytkownika</CardHeader>
      <CardContent>
        {user?.data && (
          <AdminUsersEditForm defaultUser={user.data} id={props.id} />
        )}
      </CardContent>
    </Card>
  );
}

export default AdminUsersEditCard;
