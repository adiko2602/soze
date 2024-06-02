"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserReportQuery } from "@/lib/hooks/user/report/useUserReportQuery";
import CardHeaderLoader from "@/components/ui/card-header-with-loader";
import CardHeaderBack from "@/components/ui/card-header-back";

function UsersReportsCard() {
  const { reports } = useUserReportQuery();
  return (
    <Card>
      <CardHeader>
        <CardHeaderLoader isLoading={reports.isPending}>
          <CardHeaderBack>Twoje raporty</CardHeaderBack>
        </CardHeaderLoader>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista twoich raportów</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Imię i nazwisko</TableHead>
              <TableHead>PESEL</TableHead>
              <TableHead>Miejscowość</TableHead>
              <TableHead>Choroba</TableHead>
              <TableHead>Utworzony przez</TableHead>
              <TableHead>Utworzony</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.data?.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {report.personals.firstName} {report.personals.lastName}
                </TableCell>
                <TableCell>{report.personals.pesel}</TableCell>
                <TableCell>{report.addresses.simc.name}</TableCell>
                <TableCell>
                  {report.diseases.codeChildren} {report.diseases.nameChildren}
                </TableCell>
                <TableCell className="font-medium">
                  {report.reporter.personals?.firstName}{" "}
                  {report.reporter.personals?.lastName}
                </TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UsersReportsCard;
