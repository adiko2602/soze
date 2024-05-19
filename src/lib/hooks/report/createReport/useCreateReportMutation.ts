import { ApiRequest } from "@/lib/api/ApiRequest";
import { TCreateReport } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";

export function useCreateReportMutation() {
  const createReportMutation = useMutation({
    mutationFn: async (values: TCreateReport) =>
      await ApiRequest.post("/api/auth", values),
  });

  return { createReportMutation };
}
