import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import BrowseStatisticsForm from "./BrowseStatisticsForm";
import CardHeaderBack from "../ui/card-header-back";

function BrowseStatisticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardHeaderBack>Statystyki</CardHeaderBack>
      </CardHeader>
      <CardContent>
        <BrowseStatisticsForm />
      </CardContent>
    </Card>
  );
}

export default BrowseStatisticsCard;
