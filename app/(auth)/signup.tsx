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
  name: z.string().min(2, "Como devemos chamar voce?"),
  email: z.string().email("Informe um email valido."),
  password: z.string().min(6, "Use pelo menos 6 caracteres.")
});

type SignupForm = z.infer<typeof schema>;

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Conta"
        title="Crie um espaco calmo para a celebracao"
        description="Depois disso, a Gioia ajuda a montar o plano inicial."
      />

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="Nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />
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

      <Button onPress={handleSubmit(() => router.push("/celebration/new"))}>
        Continuar
      </Button>

      <Link href="/(auth)/login">
        <AppText variant="caption">Ja tenho conta</AppText>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md
  }
});
