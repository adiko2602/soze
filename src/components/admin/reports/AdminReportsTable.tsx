"use client";

import React from "react";
import DataTable from "./DataTable";
import { columns } from "./Columns";
import { useAdminReportQuery } from "@/lib/hooks/admin/report/useAdminReportQuery";

function AdminReportsTable() {
  const { reports } = useAdminReportQuery();
  return (
    <div>
      {reports.data && <DataTable columns={columns} data={reports.data} />}
    </div>
  );
}

export default AdminReportsTable;
