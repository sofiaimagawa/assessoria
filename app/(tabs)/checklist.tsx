import { StyleSheet, View } from "react-native";

import { TaskRow } from "@/components/checklist/TaskRow";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTasks } from "@/hooks/useTasks";
import { spacing } from "@/constants/theme";

export default function ChecklistScreen() {
  const { tasks, toggleTask } = useTasks();
  const completed = tasks.filter((task) => task.status === "completed").length;

  return (
    <Screen>
      <SectionHeader
        eyebrow="Checklist inteligente"
        title="Uma sequencia clara, sem pressa"
        description="Prioridades e prazos ficam visiveis, mas a experiencia evita o peso de uma lista infinita."
      />

      <Card elevated={false}>
        <AppText variant="subtitle">
          {completed} de {tasks.length} tarefas concluidas
        </AppText>
        <AppText muted>
          O MVP ja suporta conclusao otimista. Ao conectar Supabase, todos os
          participantes receberao a mesma atualizacao.
        </AppText>
      </Card>

      <View style={styles.list}>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  }
});
