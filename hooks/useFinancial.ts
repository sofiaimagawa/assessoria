import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCelebrationSnapshot,
  markPaymentPaid
} from "@/services/supabase/celebrations";
import { captureProductEvent } from "@/services/analytics/posthog";
import { queryKeys } from "@/hooks/queryKeys";
import type { CelebrationSnapshot } from "@/services/supabase/celebrations";
import type { FinancialSummary } from "@/types";

export function useFinancial() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.celebrationSnapshot,
    queryFn: getCelebrationSnapshot
  });

  const payMutation = useMutation({
    mutationFn: markPaymentPaid,
    onMutate: async (paymentId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.celebrationSnapshot });
      const previous = queryClient.getQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot
      );

      queryClient.setQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot,
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            payments: current.payments.map((payment) =>
              payment.id === paymentId ? { ...payment, status: "paid" } : payment
            )
          };
        }
      );

      return { previous };
    },
    onSuccess: (payment) => {
      captureProductEvent("payment_paid", { paymentId: payment.id });
    },
    onError: (_error, _paymentId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.celebrationSnapshot, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.celebrationSnapshot });
    }
  });

  const summary: FinancialSummary = {
    estimatedBudget: query.data?.celebration.estimatedBudget ?? 0,
    committed:
      query.data?.expenses.reduce((total, expense) => total + expense.totalValue, 0) ?? 0,
    paid:
      query.data?.payments
        .filter((payment) => payment.status === "paid")
        .reduce((total, payment) => total + payment.value, 0) ?? 0,
    remaining: 0,
    nextPayments: [...(query.data?.payments ?? [])]
      .filter((payment) => payment.status === "pending")
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3)
  };

  summary.remaining = summary.estimatedBudget - summary.committed;

  return {
    ...query,
    expenses: query.data?.expenses ?? [],
    payments: query.data?.payments ?? [],
    summary,
    markPaymentPaid: payMutation.mutate,
    isMarkingPayment: payMutation.isPending
  };
}
