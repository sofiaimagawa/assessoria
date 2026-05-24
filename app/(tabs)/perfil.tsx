import { Link, router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { spacing } from "@/constants/theme";
import { useCelebration } from "@/hooks/useCelebration";

export default function ProfileScreen() {
  const { participants, celebration } = useCelebration();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Perfil"
        title="Conta, participantes e privacidade"
        description="Permissoes avancadas ficam fora do MVP; participantes colaboram com acesso equivalente."
      />

      <Card>
        <AppText variant="subtitle">{celebration?.name}</AppText>
        <AppText muted>
          {celebration?.style.join(", ") || "Estilo a definir"} -{" "}
          {celebration?.planningStage}
        </AppText>
        <Link href="/celebration/new" asChild>
          <Button variant="secondary">Editar onboarding</Button>
        </Link>
      </Card>

      <View style={styles.section}>
        <AppText variant="subtitle">Participantes</AppText>
        {participants.map((participant) => (
          <Card key={participant.id} elevated={false}>
            <AppText variant="subtitle">{participant.name}</AppText>
            <AppText muted>
              {participant.email} - {participant.role}
            </AppText>
          </Card>
        ))}
      </View>

      <Card elevated={false}>
        <AppText variant="subtitle">Plano gratuito</AppText>
        <AppText muted>
          Premium futuro: parsing de propostas, insights avancados e colaboracao
          expandida com RevenueCat.
        </AppText>
      </Card>

      <Button variant="secondary" onPress={() => router.replace("/(auth)/welcome")}>
        Sair
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md
  }
});
