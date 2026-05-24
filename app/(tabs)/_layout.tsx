import { Tabs } from "expo-router";

import { colors } from "@/constants/theme";

const tabBarStyle = {
  backgroundColor: colors.pearl,
  borderTopColor: colors.border,
  height: 86,
  paddingBottom: 24,
  paddingTop: 10
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        },
        tabBarStyle
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Hoje" }} />
      <Tabs.Screen name="checklist" options={{ title: "Checklist" }} />
      <Tabs.Screen name="financeiro" options={{ title: "Financeiro" }} />
      <Tabs.Screen name="fornecedores" options={{ title: "Fornecedores" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
