"use client";

import React from "react";
import DataTable from "./DataTable";
import { columns } from "./Columns";
import { useAdminUserQuery } from "@/lib/hooks/admin/user/useAdminUserQuery";

function AdminUsersTable() {
  const { users } = useAdminUserQuery();
  return (
    <div>{users.data && <DataTable columns={columns} data={users.data} />}</div>
  );
}

export default AdminUsersTable;
