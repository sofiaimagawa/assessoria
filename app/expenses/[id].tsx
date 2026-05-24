import { useLocalSearchParams } from "expo-router";

import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppText } from "@/components/ui/AppText";
import { useFinancial } from "@/hooks/useFinancial";
import { formatCurrency } from "@/utils/currency";

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { expenses } = useFinancial();
  const expense = expenses.find((item) => item.id === id);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Despesa"
        title={expense?.title ?? "Despesa"}
        description="Resumo financeiro vinculado a fornecedores e pagamentos."
      />
      {expense ? (
        <Card>
          <AppText variant="subtitle">{formatCurrency(expense.totalValue)}</AppText>
          <AppText muted>{expense.category}</AppText>
        </Card>
      ) : null}
    </Screen>
  );
}
