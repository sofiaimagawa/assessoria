import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors, radii, spacing } from "@/constants/theme";

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({ label, error, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <AppText variant="caption" muted>
        {label}
      </AppText>
      <TextInput
        {...props}
        placeholderTextColor={colors.oat}
        style={[styles.input, error && styles.inputError, style]}
      />
      {error ? (
        <AppText variant="caption" style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: spacing.md
  },
  inputError: {
    borderColor: colors.clay
  },
  error: {
    color: colors.clay
  }
});
