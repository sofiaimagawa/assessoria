import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { colors, spacing } from "@/constants/theme";
import { formatCurrency } from "@/utils/currency";
import type { FinancialSummary } from "@/types";

type FinancialSummaryCardProps = {
  summary: FinancialSummary;
};

export function FinancialSummaryCard({ summary }: FinancialSummaryCardProps) {
  return (
    <Card style={styles.card}>
      <AppText variant="label" muted>
        Financeiro
      </AppText>
      <AppText variant="title">{formatCurrency(summary.remaining)} livres</AppText>
      <View style={styles.grid}>
        <Metric label="Orcamento" value={summary.estimatedBudget} />
        <Metric label="Comprometido" value={summary.committed} />
        <Metric label="Pago" value={summary.paid} />
      </View>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <AppText variant="caption" muted>
        {label}
      </AppText>
      <AppText variant="subtitle">{formatCurrency(value)}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white
  },
  grid: {
    gap: spacing.sm
  },
  metric: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
    paddingTop: spacing.sm
  }
});
