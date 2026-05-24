import type {
  Alert,
  Celebration,
  Expense,
  Insight,
  Participant,
  Payment,
  Supplier,
  Task,
  TimelineStage
} from "@/types";
import {
  alerts,
  celebration,
  expenses,
  insights,
  participants,
  payments,
  suppliers,
  tasks,
  timelineStages
} from "@/services/supabase/mvpSeed";
import { calculateCelebrationProgress } from "@/utils/progress";

export type CelebrationSnapshot = {
  celebration: Celebration;
  participants: Participant[];
  tasks: Task[];
  timeline: TimelineStage[];
  suppliers: Supplier[];
  expenses: Expense[];
  payments: Payment[];
  alerts: Alert[];
  insights: Insight[];
};

let snapshot: CelebrationSnapshot = buildSnapshot();

export async function getCelebrationSnapshot(): Promise<CelebrationSnapshot> {
  return snapshot;
}

export async function updateTaskStatus(taskId: string, status: Task["status"]): Promise<Task> {
  const completedAtStatus = status === "completed" ? "completed" : status;
  const updatedTask = snapshot.tasks.find((task) => task.id === taskId);

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  snapshot = rebuild({
    tasks: snapshot.tasks.map((task) =>
      task.id === taskId ? { ...task, status: completedAtStatus } : task
    )
  });

  return snapshot.tasks.find((task) => task.id === taskId)!;
}

export async function selectSupplier(supplierId: string): Promise<Supplier> {
  const supplier = snapshot.suppliers.find((item) => item.id === supplierId);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  snapshot = rebuild({
    suppliers: snapshot.suppliers.map((item) =>
      item.category === supplier.category
        ? {
            ...item,
            status: item.id === supplierId ? "contracted" : item.status,
            isPrimary: item.id === supplierId
          }
        : item
    )
  });

  return snapshot.suppliers.find((item) => item.id === supplierId)!;
}

export async function markPaymentPaid(paymentId: string): Promise<Payment> {
  const payment = snapshot.payments.find((item) => item.id === paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  snapshot = rebuild({
    payments: snapshot.payments.map((item) =>
      item.id === paymentId
        ? { ...item, status: "paid", paidAt: new Date().toISOString() }
        : item
    )
  });

  return snapshot.payments.find((item) => item.id === paymentId)!;
}

function buildSnapshot(): CelebrationSnapshot {
  const base = {
    celebration,
    participants,
    tasks,
    timeline: timelineStages,
    suppliers,
    expenses,
    payments,
    alerts,
    insights
  };

  return {
    ...base,
    celebration: {
      ...base.celebration,
      progress: calculateCelebrationProgress({
        celebration: base.celebration,
        tasks: base.tasks,
        suppliers: base.suppliers,
        expenses: base.expenses,
        timeline: base.timeline
      })
    }
  };
}

function rebuild(overrides: Partial<CelebrationSnapshot>): CelebrationSnapshot {
  const next = {
    celebration: snapshot?.celebration ?? celebration,
    participants: snapshot?.participants ?? participants,
    tasks: snapshot?.tasks ?? tasks,
    timeline: snapshot?.timeline ?? timelineStages,
    suppliers: snapshot?.suppliers ?? suppliers,
    expenses: snapshot?.expenses ?? expenses,
    payments: snapshot?.payments ?? payments,
    alerts: snapshot?.alerts ?? alerts,
    insights: snapshot?.insights ?? insights,
    ...overrides
  };

  const progress = calculateCelebrationProgress({
    celebration: next.celebration,
    tasks: next.tasks,
    suppliers: next.suppliers,
    expenses: next.expenses,
    timeline: next.timeline
  });

  return {
    ...next,
    celebration: {
      ...next.celebration,
      progress
    }
  };
}
