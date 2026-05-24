import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCelebrationSnapshot,
  selectSupplier
} from "@/services/supabase/celebrations";
import { captureProductEvent } from "@/services/analytics/posthog";
import { queryKeys } from "@/hooks/queryKeys";
import type { CelebrationSnapshot } from "@/services/supabase/celebrations";

export function useSuppliers() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.celebrationSnapshot,
    queryFn: getCelebrationSnapshot
  });

  const selectMutation = useMutation({
    mutationFn: selectSupplier,
    onMutate: async (supplierId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.celebrationSnapshot });
      const previous = queryClient.getQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot
      );

      queryClient.setQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot,
        (current) => {
          const supplier = current?.suppliers.find((item) => item.id === supplierId);

          if (!current || !supplier) {
            return current;
          }

          return {
            ...current,
            suppliers: current.suppliers.map((item) =>
              item.category === supplier.category
                ? {
                    ...item,
                    status: item.id === supplierId ? "contracted" : item.status,
                    isPrimary: item.id === supplierId
                  }
                : item
            )
          };
        }
      );

      return { previous };
    },
    onSuccess: (supplier) => {
      captureProductEvent("supplier_selected", { supplierId: supplier.id });
    },
    onError: (_error, _supplierId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.celebrationSnapshot, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.celebrationSnapshot });
    }
  });

  const suppliers = query.data?.suppliers ?? [];

  return {
    ...query,
    suppliers,
    contractedSuppliers: suppliers.filter((supplier) => supplier.status === "contracted"),
    pendingSuppliers: suppliers.filter((supplier) => supplier.status !== "contracted"),
    selectSupplier: selectMutation.mutate,
    isSelectingSupplier: selectMutation.isPending
  };
}
