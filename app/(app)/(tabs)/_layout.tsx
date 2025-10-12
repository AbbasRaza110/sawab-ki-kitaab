import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Tabyout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#15803d",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kitaab",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
