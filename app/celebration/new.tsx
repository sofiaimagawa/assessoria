import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

import { TextField } from "@/components/forms/TextField";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, radii, spacing } from "@/constants/theme";
import {
  celebrationStyles,
  planningConcerns,
  planningPriorities
} from "@/constants/options";
import { captureProductEvent } from "@/services/analytics/posthog";

const schema = z.object({
  name: z.string().min(2, "De um nome para a celebracao."),
  city: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  style: z.array(z.string()).min(1, "Escolha pelo menos um estilo."),
  priorities: z.array(z.string()).min(1, "Escolha uma prioridade."),
  concerns: z.array(z.string()).min(1, "Escolha uma preocupacao.")
});

type CelebrationForm = z.infer<typeof schema>;

export default function NewCelebrationScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CelebrationForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Casamento de Lina e Theo",
      city: "Sao Paulo",
      guestCount: "120",
      budget: "82000",
      style: ["Editorial e intimista"],
      priorities: ["Controlar o orcamento"],
      concerns: ["Comparar muitas propostas"]
    }
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Onboarding"
        title="Vamos montar um plano inicial"
        description="Poucas perguntas, so o suficiente para gerar checklist, timeline e prioridades com mais contexto."
      />

      <Card>
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Nome da celebracao"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Cidade"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <View style={styles.row}>
            <Controller
              control={control}
              name="guestCount"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  keyboardType="number-pad"
                  label="Convidados"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.compactInput}
                />
              )}
            />
            <Controller
              control={control}
              name="budget"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  keyboardType="number-pad"
                  label="Orcamento"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.compactInput}
                />
              )}
            />
          </View>
        </View>
      </Card>

      <Controller
        control={control}
        name="style"
        render={({ field: { onChange, value } }) => (
          <ChoiceGroup
            title="Qual estilo combina mais?"
            values={value}
            options={celebrationStyles}
            error={errors.style?.message}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="priorities"
        render={({ field: { onChange, value } }) => (
          <ChoiceGroup
            title="O que merece foco primeiro?"
            values={value}
            options={planningPriorities}
            error={errors.priorities?.message}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="concerns"
        render={({ field: { onChange, value } }) => (
          <ChoiceGroup
            title="O que mais pesa hoje?"
            values={value}
            options={planningConcerns}
            error={errors.concerns?.message}
            onChange={onChange}
          />
        )}
      />

      <Button
        onPress={handleSubmit(() => {
          captureProductEvent("onboarding_started");
          router.replace("/(tabs)");
        })}
      >
        Gerar plano inicial
      </Button>
    </Screen>
  );
}

function ChoiceGroup({
  title,
  options,
  values,
  error,
  onChange
}: {
  title: string;
  options: string[];
  values: string[];
  error?: string;
  onChange: (values: string[]) => void;
}) {
  return (
    <Card elevated={false}>
      <AppText variant="subtitle">{title}</AppText>
      <View style={styles.choices}>
        {options.map((option) => {
          const selected = values.includes(option);

          return (
            <Pressable
              key={option}
              onPress={() =>
                onChange(
                  selected
                    ? values.filter((value) => value !== option)
                    : [...values, option]
                )
              }
              style={[styles.choice, selected && styles.choiceSelected]}
            >
              <AppText
                variant="caption"
                style={selected ? styles.choiceSelectedText : undefined}
              >
                {option}
              </AppText>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <AppText variant="caption" style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  compactInput: {
    minWidth: 0
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  choice: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceSelected: {
    backgroundColor: colors.ink,
    borderColor: colors.ink
  },
  choiceSelectedText: {
    color: colors.pearl
  },
  error: {
    color: colors.clay
  }
});
