import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateReport } from "@/lib/validators";
import { CreateReportsValidation } from "@/lib/validators/reports/createReports.validation";

export function useCreateReportForm() {
  const createReportForm = useForm<TCreateReport>({
    resolver: zodResolver(CreateReportsValidation),
    mode: "onBlur",
  });

  return { createReportForm };
}
