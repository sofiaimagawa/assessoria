import { useLocalSearchParams } from "expo-router";

import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppText } from "@/components/ui/AppText";
import { useTasks } from "@/hooks/useTasks";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks } = useTasks();
  const task = tasks.find((item) => item.id === id);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Tarefa"
        title={task?.title ?? "Tarefa"}
        description={task?.description ?? "Detalhes da tarefa selecionada."}
      />
      <Card>
        <AppText muted>Categoria: {task?.category ?? "A definir"}</AppText>
        <AppText muted>Prioridade: {task?.priority ?? "medium"}</AppText>
      </Card>
    </Screen>
  );
}
