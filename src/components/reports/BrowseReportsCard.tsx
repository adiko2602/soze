"use client";

import { ApiRequest } from "@/lib/api/ApiRequest";
import { TBrowseReportsInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function BrowseReportsCard() {
  const { data: session } = useSession();
  const { data: reports } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TBrowseReportsInclude[]>(
        await ApiRequest.get(`/api/users/${session?.user.id}/reports/browse`)
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: [`/api/users/${session?.user.id}/reports/browse`],
  });
  return (
    <Card>
      <CardHeader>Raporty utworzone przez Ciebie</CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista utowrzonych raportów</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Imię i nazwisko</TableHead>
              <TableHead>PESEL</TableHead>
              <TableHead>Miejscowość</TableHead>
              <TableHead>Choroba</TableHead>
              <TableHead>Utworzony</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports?.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {report.personals.firstName} {report.personals.lastName}
                </TableCell>
                <TableCell>{report.personals.pesel}</TableCell>
                <TableCell>{report.addresses.simc.name}</TableCell>
                <TableCell>
                  {report.diseases.codeChildren} {report.diseases.nameChildren}
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

export default BrowseReportsCard;
