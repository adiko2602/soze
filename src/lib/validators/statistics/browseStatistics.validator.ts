import * as z from "zod";

export const BrowseStatisticsValidation = z.object({
  woj: z.number({ required_error: "Województwo jest wymagane" }),
  pow: z.number().optional(),
  gmi: z.number().optional(),
  sym: z.number().optional(),
  disease: z.number().optional(),
});
