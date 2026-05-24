import { StyleSheet, View } from "react-native";

import { colors, radii } from "@/constants/theme";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(4, Math.min(value, 100))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.mist,
    borderRadius: radii.pill,
    height: 10,
    overflow: "hidden"
  },
  fill: {
    backgroundColor: colors.sage,
    borderRadius: radii.pill,
    height: "100%"
  }
});
