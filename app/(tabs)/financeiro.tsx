import { Pressable, StyleSheet, View } from "react-native";

import { FinancialSummaryCard } from "@/components/financeiro/FinancialSummaryCard";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, spacing } from "@/constants/theme";
import { useFinancial } from "@/hooks/useFinancial";
import { formatCurrency } from "@/utils/currency";
import { formatShortDate } from "@/utils/dates";

export default function FinancialScreen() {
  const { expenses, payments, summary, markPaymentPaid } = useFinancial();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Financeiro"
        title="Clareza para decidir com calma"
        description="Resumo de orcamento, compromissos e proximos vencimentos sem transformar a Gioia em ERP."
      />

      <FinancialSummaryCard summary={summary} />

      <View style={styles.section}>
        <AppText variant="subtitle">Proximos pagamentos</AppText>
        {summary.nextPayments.map((payment) => (
          <Pressable
            key={payment.id}
            onPress={() => markPaymentPaid(payment.id)}
            style={({ pressed }) => [styles.payment, pressed && styles.pressed]}
          >
            <View>
              <AppText variant="subtitle">{formatCurrency(payment.value)}</AppText>
              <AppText muted>{formatShortDate(payment.dueDate)}</AppText>
            </View>
            <AppText variant="caption">Marcar pago</AppText>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Despesas organizadas</AppText>
        {expenses.map((expense) => (
          <Card key={expense.id} elevated={false}>
            <AppText variant="subtitle">{expense.title}</AppText>
            <AppText muted>
              {expense.category} - {formatCurrency(expense.totalValue)}
            </AppText>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Historico de pagamentos</AppText>
        {payments
          .filter((payment) => payment.status === "paid")
          .map((payment) => (
            <Card key={payment.id} elevated={false}>
              <AppText variant="subtitle">{formatCurrency(payment.value)}</AppText>
              <AppText muted>Pago em {formatShortDate(payment.paidAt)}</AppText>
            </Card>
          ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md
  },
  payment: {
    alignItems: "center",
    backgroundColor: colors.pearl,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md
  },
  pressed: {
    opacity: 0.76
  }
});
