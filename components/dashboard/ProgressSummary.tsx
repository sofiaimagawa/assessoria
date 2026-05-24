import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { spacing } from "@/constants/theme";
import type { Celebration } from "@/types";

type ProgressSummaryProps = {
  celebration?: Celebration;
};

export function ProgressSummary({ celebration }: ProgressSummaryProps) {
  if (!celebration) {
    return null;
  }

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="label" muted>
            Progresso
          </AppText>
          <AppText variant="title">{celebration.progress}% organizado</AppText>
        </View>
        <AppText variant="subtitle">{celebration.guestCount ?? "--"}</AppText>
      </View>
      <ProgressBar value={celebration.progress} />
      <AppText muted>
        A celebracao esta tomando forma. Foque nas proximas decisoes essenciais sem
        tentar resolver tudo de uma vez.
      </AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  }
});
