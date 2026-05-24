import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors, radii, spacing } from "@/constants/theme";

type PillProps = {
  label: string;
  tone?: "neutral" | "sage" | "clay";
};

export function Pill({ label, tone = "neutral" }: PillProps) {
  return (
    <View style={[styles.base, styles[tone]]}>
      <AppText variant="caption" style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  neutral: {
    backgroundColor: colors.mist
  },
  sage: {
    backgroundColor: "#E7EDE1"
  },
  clay: {
    backgroundColor: "#F2E1D8"
  },
  label: {
    fontWeight: "700"
  }
});
