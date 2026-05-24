import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors, spacing } from "@/constants/theme";

export default function WelcomeScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.hero}>
        <AppText variant="label" muted>
          Gioia
        </AppText>
        <AppText variant="hero">Planejar pode ser mais leve.</AppText>
        <AppText muted>
          Uma assessoria digital calma para organizar celebracoes com tarefas,
          fornecedores e financeiro em um so lugar.
        </AppText>
      </View>

      <Card style={styles.quote}>
        <AppText variant="subtitle">Comece pelo essencial.</AppText>
        <AppText muted>
          A Gioia transforma suas respostas iniciais em proximas etapas claras, sem
          planilhas frias ou excesso de decisoes na tela.
        </AppText>
      </Card>

      <View style={styles.actions}>
        <Link href="/celebration/new" asChild>
          <Button>Criar minha celebracao</Button>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Button variant="secondary">Ja tenho conta</Button>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "space-between"
  },
  hero: {
    gap: spacing.md,
    paddingTop: spacing.xl
  },
  quote: {
    backgroundColor: colors.white
  },
  actions: {
    gap: spacing.sm
  }
});
