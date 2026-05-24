import { useLocalSearchParams } from "expo-router";

import { SupplierCard } from "@/components/fornecedores/SupplierCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSuppliers } from "@/hooks/useSuppliers";

export default function SupplierDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { suppliers, selectSupplier } = useSuppliers();
  const supplier = suppliers.find((item) => item.id === id);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Fornecedor"
        title={supplier?.name ?? "Fornecedor"}
        description="Detalhes, proposta e status para apoiar uma decisao mais tranquila."
      />
      {supplier ? <SupplierCard supplier={supplier} onSelect={selectSupplier} /> : null}
    </Screen>
  );
}
