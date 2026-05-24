import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

import { TextField } from "@/components/forms/TextField";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { spacing } from "@/constants/theme";

const schema = z.object({
  email: z.string().email("Informe um email valido."),
  password: z.string().min(6, "Use pelo menos 6 caracteres.")
});

type LoginForm = z.infer<typeof schema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Boas-vindas"
        title="Entre para continuar o planejamento"
        description="No MVP, este formulario valida os dados e leva ao painel demo enquanto a Supabase Auth e conectada."
      />

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              autoCapitalize="none"
              keyboardType="email-address"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />
      </View>

      <Button onPress={handleSubmit(() => router.replace("/(tabs)"))}>Entrar</Button>

      <View style={styles.links}>
        <Link href="/(auth)/forgot-password">
          <AppText variant="caption">Esqueci minha senha</AppText>
        </Link>
        <Link href="/(auth)/signup">
          <AppText variant="caption">Criar conta</AppText>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md
  },
  links: {
    alignItems: "center",
    gap: spacing.sm
  }
});
