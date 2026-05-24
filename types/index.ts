export type CelebrationType = "wedding" | "birthday" | "graduation" | "social";

export type PlanningStage =
  | "just-starting"
  | "researching"
  | "booking-suppliers"
  | "final-details";

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "pending" | "in-progress" | "completed" | "overdue";
export type TimelineStatus = "future" | "active" | "completed" | "overdue";
export type SupplierStatus =
  | "researching"
  | "proposal-received"
  | "negotiating"
  | "contracted"
  | "discarded";
export type PaymentStatus = "pending" | "paid" | "overdue" | "cancelled";
export type AlertType = "task" | "financial" | "planning" | "collaboration";

export type Celebration = {
  id: string;
  name: string;
  type: CelebrationType;
  estimatedDate?: string;
  city?: string;
  estimatedBudget?: number;
  guestCount?: number;
  style: string[];
  priorities: string[];
  concerns: string[];
  planningStage: PlanningStage;
  progress: number;
};

export type Participant = {
  id: string;
  celebrationId: string;
  name: string;
  email: string;
  role: "owner" | "participant";
};

export type Task = {
  id: string;
  celebrationId: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: string;
  supplierId?: string;
};

export type TimelineStage = {
  id: string;
  celebrationId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TimelineStatus;
  dueDate?: string;
  order: number;
};

export type Supplier = {
  id: string;
  celebrationId: string;
  name: string;
  category: string;
  contact?: string;
  notes?: string;
  status: SupplierStatus;
  totalValue?: number;
  isPrimary: boolean;
};

export type Expense = {
  id: string;
  celebrationId: string;
  supplierId?: string;
  title: string;
  category: string;
  totalValue: number;
  status: "planned" | "committed" | "paid";
};

export type Payment = {
  id: string;
  expenseId: string;
  value: number;
  dueDate: string;
  status: PaymentStatus;
  paidAt?: string;
};

export type Alert = {
  id: string;
  celebrationId: string;
  type: AlertType;
  title: string;
  description: string;
  priority: TaskPriority;
};

export type Insight = {
  id: string;
  celebrationId: string;
  type: "planning" | "financial" | "supplier";
  title: string;
  description: string;
  priority: TaskPriority;
};

export type FinancialSummary = {
  estimatedBudget: number;
  committed: number;
  paid: number;
  remaining: number;
  nextPayments: Payment[];
};
