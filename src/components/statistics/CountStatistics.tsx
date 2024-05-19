import { TBrowseStatisticsInclude } from "@/lib/prisma";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function CountStatistics(props: { statistics: TBrowseStatisticsInclude[] }) {
  const diseaseCount: { [key: string]: number } = {};

  props.statistics.forEach((item) => {
    const {
      diseases: { nameChildren },
    } = item;
    if (!diseaseCount[nameChildren]) {
      diseaseCount[nameChildren] = 0;
    }
    diseaseCount[nameChildren]++;
  });

  console.log("NameChildren Counts:", diseaseCount);
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
            {Object.entries(diseaseCount)?.map((entry) => (
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

export default CountStatistics;
