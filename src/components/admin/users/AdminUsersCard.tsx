import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AdminUsersTable from "./AdminUsersTable";

function AdminUsersCard() {
  return (
    <Card>
      <CardHeader>Użytkownicy</CardHeader>
      <CardContent>
        <AdminUsersTable />
      </CardContent>
    </Card>
  );
}

export default AdminUsersCard;
