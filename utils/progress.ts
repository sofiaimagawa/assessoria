import type { Celebration, Expense, Supplier, Task, TimelineStage } from "@/types";

export function calculateCelebrationProgress(input: {
  celebration: Celebration;
  tasks: Task[];
  suppliers: Supplier[];
  expenses: Expense[];
  timeline: TimelineStage[];
}): number {
  const completedTasks = ratio(
    input.tasks.filter((task) => task.status === "completed").length,
    input.tasks.length
  );
  const contractedSuppliers = ratio(
    input.suppliers.filter((supplier) => supplier.status === "contracted").length,
    Math.max(3, input.suppliers.length)
  );
  const completedTimeline = ratio(
    input.timeline.filter((stage) => stage.status === "completed").length,
    input.timeline.length
  );
  const hasBudget = input.celebration.estimatedBudget ? 1 : 0;
  const hasExpenses = input.expenses.length > 0 ? 1 : 0;
  const filledCoreInfo =
    [
      input.celebration.name,
      input.celebration.type,
      input.celebration.estimatedDate,
      input.celebration.city,
      input.celebration.guestCount
    ].filter(Boolean).length / 5;

  const progress =
    completedTasks * 0.38 +
    contractedSuppliers * 0.18 +
    completedTimeline * 0.16 +
    filledCoreInfo * 0.16 +
    ((hasBudget + hasExpenses) / 2) * 0.12;

  return Math.min(96, Math.round(progress * 100));
}

function ratio(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return value / total;
}
