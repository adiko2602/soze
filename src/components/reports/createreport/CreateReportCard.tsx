import CardHeaderBack from "@/components/ui/card-header-back";
import { Card, CardContent, CardHeader } from "../../ui/card";
import CreateReportForm from "./CreateReportForm";

function CreateReportCard() {
  return (
    <Card>
      <CardHeader>
        <CardHeaderBack>Utwórz raport</CardHeaderBack>
      </CardHeader>
      <CardContent>
        <CreateReportForm />
      </CardContent>
    </Card>
  );
}

export default CreateReportCard;
