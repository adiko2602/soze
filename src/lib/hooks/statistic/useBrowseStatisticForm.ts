import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBrowseStatistics } from "@/lib/validators";
import { BrowseStatisticsValidation } from "@/lib/validators/statistics/browseStatistics.validator";

export function useBrowseStatisticForm() {
  const browseStatisticForm = useForm<TBrowseStatistics>({
    resolver: zodResolver(BrowseStatisticsValidation),
    mode: "onBlur",
  });

  return { browseStatisticForm };
}
