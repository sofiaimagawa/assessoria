import { StyleSheet, View } from "react-native";

import { SupplierCard } from "@/components/fornecedores/SupplierCard";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { spacing } from "@/constants/theme";
import { useSuppliers } from "@/hooks/useSuppliers";

export default function SuppliersScreen() {
  const { contractedSuppliers, pendingSuppliers, suppliers, selectSupplier } =
    useSuppliers();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Fornecedores"
        title="Compare opcoes sem virar marketplace"
        description="A Gioia centraliza propostas e destaca escolhas para reduzir a carga mental da decisao."
      />

      <Card elevated={false}>
        <AppText variant="subtitle">
          {contractedSuppliers.length} de {suppliers.length} fornecedores escolhidos
        </AppText>
        <AppText muted>
          Ao escolher um fornecedor, o status muda e a base esta pronta para gerar
          parcelas e atualizar o progresso.
        </AppText>
      </Card>

      <View style={styles.section}>
        <AppText variant="subtitle">Em comparacao</AppText>
        {pendingSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} onSelect={selectSupplier} />
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Escolhidos</AppText>
        {contractedSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} onSelect={selectSupplier} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md
  }
});
