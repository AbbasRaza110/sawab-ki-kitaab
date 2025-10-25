import { APP_COLORS } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabScreens = [
    {
      name: "index",
      title: "Kitaab",
      icon: "book-open-variant",
    },
    {
      name: "leaderboard",
      title: "Leaderboard",
      icon: "trophy-outline",
    },
    {
      name: "profile",
      title: "Profile",
      icon: "account",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom || 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: APP_COLORS.primary,
        tabBarInactiveTintColor: APP_COLORS.lightText,
      }}
    >
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={icon as any}
                size={size}
                color={color}
              />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontSize: 12 }}>{title}</Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
