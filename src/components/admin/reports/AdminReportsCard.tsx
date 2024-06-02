"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { useAdminReportQuery } from "@/lib/hooks/admin/report/useAdminReportQuery";
import CardHeaderLoader from "@/components/ui/card-header-with-loader";
import DataTable from "./DataTable";
import { columns } from "./Columns";
import CardHeaderBack from "@/components/ui/card-header-back";

function AdminReportsCard() {
  const { reports } = useAdminReportQuery();

  return (
    <Card>
      <CardHeader>
        <CardHeaderLoader isLoading={reports.isPending}>
          <CardHeaderBack>Raporty</CardHeaderBack>
        </CardHeaderLoader>
      </CardHeader>
      <CardContent>
        {reports.data && <DataTable columns={columns} data={reports.data} />}
      </CardContent>
    </Card>
  );
}

export default AdminReportsCard;
