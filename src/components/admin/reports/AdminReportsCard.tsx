import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AdminReportsTable from "./AdminReportsTable";

function AdminReportsCard() {
  return (
    <Card>
      <CardHeader>Raporty</CardHeader>
      <CardContent>
        <AdminReportsTable />
      </CardContent>
    </Card>
  );
}

export default AdminReportsCard;
