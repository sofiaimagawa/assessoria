import { StyleSheet } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { colors } from "@/constants/theme";
import type { Insight } from "@/types";

type InsightCardProps = {
  insight?: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  if (!insight) {
    return null;
  }

  return (
    <Card style={styles.card}>
      <Pill label="Guidance" tone="sage" />
      <AppText variant="subtitle">{insight.title}</AppText>
      <AppText muted>{insight.description}</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white
  }
});
