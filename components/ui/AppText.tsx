import type { PropsWithChildren } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

import { colors } from "@/constants/theme";

type AppTextProps = PropsWithChildren<
  TextProps & {
    variant?: "hero" | "title" | "subtitle" | "body" | "caption" | "label";
    muted?: boolean;
  }
>;

export function AppText({
  children,
  style,
  variant = "body",
  muted = false,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[styles.base, styles[variant], muted && styles.muted, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.ink,
    letterSpacing: -0.2
  },
  hero: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700"
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600"
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400"
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400"
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase"
  },
  muted: {
    color: colors.muted
  }
});
