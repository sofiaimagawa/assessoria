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

export const celebration: Celebration = {
  id: "celebration-gioia-demo",
  name: "Casamento de Lina e Theo",
  type: "wedding",
  estimatedDate: "2026-11-14",
  city: "Sao Paulo",
  estimatedBudget: 82000,
  guestCount: 120,
  style: ["Editorial e intimista", "Natural e acolhedor"],
  priorities: ["Controlar o orcamento", "Encontrar fornecedores"],
  concerns: ["Comparar muitas propostas", "Perder prazos importantes"],
  planningStage: "booking-suppliers",
  progress: 42
};

export const participants: Participant[] = [
  {
    id: "participant-lina",
    celebrationId: celebration.id,
    name: "Lina",
    email: "lina@gioia.app",
    role: "owner"
  },
  {
    id: "participant-theo",
    celebrationId: celebration.id,
    name: "Theo",
    email: "theo@gioia.app",
    role: "participant"
  }
];

export const tasks: Task[] = [
  {
    id: "task-space",
    celebrationId: celebration.id,
    title: "Escolher o espaco da celebracao",
    description: "Compare as propostas favoritas e confirme disponibilidade da data.",
    category: "Espaco",
    priority: "high",
    status: "in-progress",
    deadline: "2026-06-15"
  },
  {
    id: "task-budget",
    celebrationId: celebration.id,
    title: "Revisar orcamento por categoria",
    description: "Defina limites tranquilos para buffet, decoracao e fotografia.",
    category: "Financeiro",
    priority: "high",
    status: "pending",
    deadline: "2026-06-08"
  },
  {
    id: "task-photo",
    celebrationId: celebration.id,
    title: "Conversar com fotografos finalistas",
    description: "Anote estilo, prazo de entrega e condicoes de pagamento.",
    category: "Fotografia",
    priority: "medium",
    status: "pending",
    deadline: "2026-06-24",
    supplierId: "supplier-photo"
  },
  {
    id: "task-style",
    celebrationId: celebration.id,
    title: "Salvar referencias visuais",
    description: "Separe 8 a 12 imagens para orientar fornecedores sem excesso.",
    category: "Estilo",
    priority: "low",
    status: "completed",
    deadline: "2026-05-28"
  }
];

export const timelineStages: TimelineStage[] = [
  {
    id: "stage-foundation",
    celebrationId: celebration.id,
    title: "Definicao inicial",
    description: "Tipo, cidade, tamanho e estilo ja estao claros.",
    priority: "medium",
    status: "completed",
    dueDate: "2026-05-30",
    order: 1
  },
  {
    id: "stage-suppliers",
    celebrationId: celebration.id,
    title: "Fornecedores essenciais",
    description: "Espaco, buffet e fotografia precisam de decisao primeiro.",
    priority: "high",
    status: "active",
    dueDate: "2026-07-01",
    order: 2
  },
  {
    id: "stage-details",
    celebrationId: celebration.id,
    title: "Detalhes de experiencia",
    description: "Decoracao, papelaria, musica e cronograma do dia.",
    priority: "medium",
    status: "future",
    dueDate: "2026-09-10",
    order: 3
  }
];

export const suppliers: Supplier[] = [
  {
    id: "supplier-space",
    celebrationId: celebration.id,
    name: "Casa Arvore",
    category: "Espaco",
    contact: "contato@casaarvore.com",
    notes: "Luz natural bonita, limite de som as 23h.",
    status: "negotiating",
    totalValue: 28000,
    isPrimary: false
  },
  {
    id: "supplier-photo",
    celebrationId: celebration.id,
    name: "Mar Studio",
    category: "Fotografia",
    contact: "hello@marstudio.co",
    notes: "Editorial, entrega em 45 dias, album incluso.",
    status: "proposal-received",
    totalValue: 9800,
    isPrimary: false
  },
  {
    id: "supplier-decor",
    celebrationId: celebration.id,
    name: "Atelie Flora",
    category: "Decoracao",
    notes: "Proposta alinhada ao estilo natural.",
    status: "contracted",
    totalValue: 14500,
    isPrimary: true
  }
];

export const expenses: Expense[] = [
  {
    id: "expense-decor",
    celebrationId: celebration.id,
    supplierId: "supplier-decor",
    title: "Decoracao floral e ambientacao",
    category: "Decoracao",
    totalValue: 14500,
    status: "committed"
  },
  {
    id: "expense-photo-reserve",
    celebrationId: celebration.id,
    supplierId: "supplier-photo",
    title: "Reserva fotografia",
    category: "Fotografia",
    totalValue: 3000,
    status: "planned"
  }
];

export const payments: Payment[] = [
  {
    id: "payment-decor-1",
    expenseId: "expense-decor",
    value: 5000,
    dueDate: "2026-06-05",
    status: "pending"
  },
  {
    id: "payment-decor-2",
    expenseId: "expense-decor",
    value: 9500,
    dueDate: "2026-09-15",
    status: "pending"
  },
  {
    id: "payment-photo-reserve",
    expenseId: "expense-photo-reserve",
    value: 3000,
    dueDate: "2026-06-20",
    status: "pending"
  }
];

export const alerts: Alert[] = [
  {
    id: "alert-budget",
    celebrationId: celebration.id,
    type: "financial",
    title: "Orcamento em bom caminho",
    description: "Voces ja mapearam despesas importantes. Vale definir um teto para buffet agora.",
    priority: "medium"
  },
  {
    id: "alert-space",
    celebrationId: celebration.id,
    type: "task",
    title: "Decisao importante chegando",
    description: "A escolha do espaco ajuda a destravar decoracao, buffet e cronograma.",
    priority: "high"
  }
];

export const insights: Insight[] = [
  {
    id: "insight-next",
    celebrationId: celebration.id,
    type: "planning",
    title: "Foco gentil da semana",
    description: "Resolver espaco e orcamento por categoria vai diminuir bastante a incerteza.",
    priority: "high"
  }
];
