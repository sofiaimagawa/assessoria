import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { InsightCard } from "@/components/cards/InsightCard";
import { TaskRow } from "@/components/checklist/TaskRow";
import { ProgressSummary } from "@/components/dashboard/ProgressSummary";
import { FinancialSummaryCard } from "@/components/financeiro/FinancialSummaryCard";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCelebration } from "@/hooks/useCelebration";
import { useFinancial } from "@/hooks/useFinancial";
import { useInsights } from "@/hooks/useInsights";
import { useTasks } from "@/hooks/useTasks";
import { spacing } from "@/constants/theme";
import { formatShortDate } from "@/utils/dates";

export default function DashboardScreen() {
  const { celebration, alerts } = useCelebration();
  const { nextTasks, toggleTask } = useTasks();
  const { primaryInsight } = useInsights();
  const { summary } = useFinancial();

  return (
    <Screen>
      <SectionHeader
        eyebrow={celebration?.city ?? "Gioia"}
        title={celebration?.name ?? "Sua celebracao"}
        description={`Data estimada: ${formatShortDate(celebration?.estimatedDate)}`}
      />

      <ProgressSummary celebration={celebration} />
      <InsightCard insight={primaryInsight} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText variant="subtitle">Proximas tarefas</AppText>
          <Link href="/(tabs)/checklist" asChild>
            <Button variant="ghost" style={styles.smallButton}>
              Ver todas
            </Button>
          </Link>
        </View>
        {nextTasks.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </View>

      <FinancialSummaryCard summary={summary} />

      <View style={styles.section}>
        <AppText variant="subtitle">Alertas leves</AppText>
        {alerts.map((alert) => (
          <Card key={alert.id} elevated={false}>
            <AppText variant="subtitle">{alert.title}</AppText>
            <AppText muted>{alert.description}</AppText>
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
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  smallButton: {
    minHeight: 36,
    paddingHorizontal: spacing.sm
  }
});
