import { Card, CardContent, CardHeader } from "../../ui/card";
import CreateReportForm from "./CreateReportForm";

function CreateReportCard() {
  return (
    <Card>
      <CardHeader>Utwórz raport</CardHeader>
      <CardContent>
        <CreateReportForm />
      </CardContent>
    </Card>
  );
}

export default CreateReportCard;
