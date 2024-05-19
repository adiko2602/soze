import { TBrowseStatisticsInclude } from "@/lib/prisma";

export function useBrowseStatisticTable() {
  const count = (statistics: TBrowseStatisticsInclude[]) => {
    const diseaseCount: { [key: string]: number } = {};
    statistics.forEach((s) => {
      const {
        diseases: { nameChildren },
      } = s;
      if (!diseaseCount[nameChildren]) {
        diseaseCount[nameChildren] = 0;
      }
      diseaseCount[nameChildren]++;
    });

    const statisticsCount = Object.keys(diseaseCount).map((key) => [
      key,
      diseaseCount[key],
    ]);

    return statisticsCount;
  };

  return { count };
}
