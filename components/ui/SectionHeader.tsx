import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { spacing } from "@/constants/theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? (
        <AppText variant="label" muted>
          {eyebrow}
        </AppText>
      ) : null}
      <AppText variant="title">{title}</AppText>
      {description ? (
        <AppText muted style={styles.description}>
          {description}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  description: {
    maxWidth: 320
  }
});
