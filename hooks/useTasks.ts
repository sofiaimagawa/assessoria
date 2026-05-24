import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCelebrationSnapshot,
  updateTaskStatus
} from "@/services/supabase/celebrations";
import { captureProductEvent } from "@/services/analytics/posthog";
import { queryKeys } from "@/hooks/queryKeys";
import type { CelebrationSnapshot } from "@/services/supabase/celebrations";
import type { Task } from "@/types";

export function useTasks() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.celebrationSnapshot,
    queryFn: getCelebrationSnapshot
  });

  const toggleTask = useMutation({
    mutationFn: async (task: Task) =>
      updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed"),
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.celebrationSnapshot });
      const previous = queryClient.getQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot
      );

      queryClient.setQueryData<CelebrationSnapshot>(
        queryKeys.celebrationSnapshot,
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            tasks: current.tasks.map((item) =>
              item.id === task.id
                ? {
                    ...item,
                    status: item.status === "completed" ? "pending" : "completed"
                  }
                : item
            )
          };
        }
      );

      return { previous };
    },
    onSuccess: (task) => {
      if (task.status === "completed") {
        captureProductEvent("task_completed", { taskId: task.id });
      }
    },
    onError: (_error, _task, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.celebrationSnapshot, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.celebrationSnapshot });
    }
  });

  return {
    ...query,
    tasks: query.data?.tasks ?? [],
    nextTasks: [...(query.data?.tasks ?? [])]
      .filter((task) => task.status !== "completed")
      .sort((a, b) => priorityWeight(a.priority) - priorityWeight(b.priority))
      .slice(0, 3),
    toggleTask: toggleTask.mutate,
    isTogglingTask: toggleTask.isPending
  };
}

function priorityWeight(priority: Task["priority"]) {
  return {
    high: 0,
    medium: 1,
    low: 2
  }[priority];
}
