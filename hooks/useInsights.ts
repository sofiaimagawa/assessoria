import { useQuery } from "@tanstack/react-query";

import { getCelebrationSnapshot } from "@/services/supabase/celebrations";
import { queryKeys } from "@/hooks/queryKeys";

export function useInsights() {
  const query = useQuery({
    queryKey: queryKeys.celebrationSnapshot,
    queryFn: getCelebrationSnapshot
  });

  return {
    ...query,
    insights: query.data?.insights ?? [],
    primaryInsight: query.data?.insights[0]
  };
}
