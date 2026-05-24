import { useLocalSearchParams } from "expo-router";

import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppText } from "@/components/ui/AppText";

export default function DocumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Documento"
        title="Central de documentos"
        description="Uploads e parsing de propostas entram como proximo incremento premium, mantendo revisao manual."
      />
      <Card>
        <AppText muted>Documento selecionado: {id}</AppText>
      </Card>
    </Screen>
  );
}
