import { useQuery } from "@tanstack/react-query";

import { getCelebrationSnapshot } from "@/services/supabase/celebrations";
import { queryKeys } from "@/hooks/queryKeys";

export function useCelebration() {
  const query = useQuery({
    queryKey: queryKeys.celebrationSnapshot,
    queryFn: getCelebrationSnapshot
  });

  return {
    ...query,
    celebration: query.data?.celebration,
    participants: query.data?.participants ?? [],
    timeline: query.data?.timeline ?? [],
    alerts: query.data?.alerts ?? []
  };
}
