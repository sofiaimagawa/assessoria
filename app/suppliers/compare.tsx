import { StyleSheet, View } from "react-native";

import { SupplierCard } from "@/components/fornecedores/SupplierCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSuppliers } from "@/hooks/useSuppliers";
import { spacing } from "@/constants/theme";

export default function SupplierCompareScreen() {
  const { suppliers, selectSupplier } = useSuppliers();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Comparacao"
        title="Opcoes lado a lado"
        description="Comparacao simples por categoria, valor e observacoes antes de sofisticar filtros premium."
      />
      <View style={styles.list}>
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} onSelect={selectSupplier} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  }
});
