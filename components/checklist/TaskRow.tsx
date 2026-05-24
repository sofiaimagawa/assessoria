import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Pill } from "@/components/ui/Pill";
import { colors, radii, spacing } from "@/constants/theme";
import { formatShortDate } from "@/utils/dates";
import type { Task } from "@/types";

type TaskRowProps = {
  task: Task;
  onToggle?: (task: Task) => void;
};

export function TaskRow({ task, onToggle }: TaskRowProps) {
  const completed = task.status === "completed";

  return (
    <Pressable
      onPress={() => onToggle?.(task)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.checkbox, completed && styles.checkboxDone]}>
        {completed ? <AppText style={styles.check}>OK</AppText> : null}
      </View>
      <View style={styles.content}>
        <View style={styles.meta}>
          <Pill label={task.priority} tone={task.priority === "high" ? "clay" : "neutral"} />
          <AppText variant="caption" muted>
            {formatShortDate(task.deadline)}
          </AppText>
        </View>
        <AppText variant="subtitle" style={completed && styles.doneText}>
          {task.title}
        </AppText>
        <AppText muted>{task.description}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    backgroundColor: colors.pearl,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md
  },
  pressed: {
    opacity: 0.8
  },
  checkbox: {
    alignItems: "center",
    borderColor: colors.oat,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 28,
    justifyContent: "center",
    marginTop: 2,
    width: 28
  },
  checkboxDone: {
    backgroundColor: colors.sage,
    borderColor: colors.sage
  },
  check: {
    color: colors.white,
    fontWeight: "700"
  },
  content: {
    flex: 1,
    gap: spacing.xs
  },
  meta: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  doneText: {
    textDecorationLine: "line-through"
  }
});
