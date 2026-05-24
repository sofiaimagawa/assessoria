import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { colors, spacing } from "@/constants/theme";
import { formatCurrency } from "@/utils/currency";
import type { Supplier } from "@/types";

type SupplierCardProps = {
  supplier: Supplier;
  onSelect?: (supplierId: string) => void;
};

export function SupplierCard({ supplier, onSelect }: SupplierCardProps) {
  const contracted = supplier.status === "contracted";

  return (
    <Card style={contracted ? styles.selected : undefined}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Pill label={supplier.category} tone={contracted ? "sage" : "neutral"} />
          <AppText variant="subtitle">{supplier.name}</AppText>
          {supplier.notes ? <AppText muted>{supplier.notes}</AppText> : null}
        </View>
        {supplier.totalValue ? (
          <AppText variant="subtitle">{formatCurrency(supplier.totalValue)}</AppText>
        ) : null}
      </View>
      <Button
        variant={contracted ? "secondary" : "primary"}
        disabled={contracted}
        onPress={() => onSelect?.(supplier.id)}
      >
        {contracted ? "Fornecedor escolhido" : "Marcar como escolhido"}
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#F7FBF3",
    borderColor: colors.sage
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  }
});
