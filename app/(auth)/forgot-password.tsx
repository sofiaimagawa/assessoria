import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { spacing } from "@/constants/theme";

const schema = z.object({
  email: z.string().email("Informe um email valido.")
});

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: ""
    }
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Recuperacao"
        title="Vamos te ajudar a voltar"
        description="Informe seu email para receber as instrucoes de redefinicao quando a Supabase Auth estiver conectada."
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
      </View>

      <Button onPress={handleSubmit(() => router.back())}>Enviar instrucoes</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md
  }
});
