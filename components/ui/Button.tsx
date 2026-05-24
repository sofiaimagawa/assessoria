import type { PropsWithChildren } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type ViewStyle
} from "react-native";

import { colors, radii, spacing } from "@/constants/theme";
import { AppText } from "@/components/ui/AppText";

type ButtonProps = PropsWithChildren<
  PressableProps & {
    variant?: "primary" | "secondary" | "ghost";
    style?: ViewStyle;
  }
>;

export function Button({
  children,
  variant = "primary",
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
    >
      <AppText
        variant="caption"
        style={[styles.label, variant === "primary" && styles.primaryLabel]}
      >
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radii.pill,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.lg
  },
  primary: {
    backgroundColor: colors.ink
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1
  },
  ghost: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  },
  disabled: {
    opacity: 0.48
  },
  label: {
    fontWeight: "700"
  },
  primaryLabel: {
    color: colors.pearl
  }
});
