import { TBrowseStatisticsInclude } from "@/lib/prisma";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useBrowseStatisticTable } from "@/lib/hooks/statistic/useBrowseStatisticTable";

function BrowseStatisticsTable(props: {
  statistics: TBrowseStatisticsInclude[];
}) {
  const { statistics } = props;
  const { count } = useBrowseStatisticTable();

  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Lista statystyk zachorowań</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Choroba</TableHead>
              <TableHead>Wystąpienia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {count(statistics).map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell className="font-medium">{entry[0]}</TableCell>
                <TableCell>{entry[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default BrowseStatisticsTable;
