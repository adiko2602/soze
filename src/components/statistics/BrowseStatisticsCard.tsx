import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import BrowseStatisticsForm from "./BrowseStatisticsForm";

function BrowseStatisticsCard() {
  return (
    <Card>
      <CardHeader>Statystyki</CardHeader>
      <CardContent>
        <BrowseStatisticsForm />
      </CardContent>
    </Card>
  );
}

export default BrowseStatisticsCard;
