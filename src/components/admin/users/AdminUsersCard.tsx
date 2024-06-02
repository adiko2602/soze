"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { useAdminUserQuery } from "@/lib/hooks/admin/user/useAdminUserQuery";
import DataTable from "./DataTable";
import { columns } from "./Columns";
import CardHeaderLoader from "@/components/ui/card-header-with-loader";
import CardHeaderBack from "@/components/ui/card-header-back";

function AdminUsersCard() {
  const { users } = useAdminUserQuery();

  return (
    <Card>
      <CardHeader>
        <CardHeaderLoader isLoading={users.isPending}>
          <CardHeaderBack>Użytkownicy</CardHeaderBack>
        </CardHeaderLoader>
      </CardHeader>
      <CardContent>
        {users.data && <DataTable columns={columns} data={users.data} />}
      </CardContent>
    </Card>
  );
}

export default AdminUsersCard;
