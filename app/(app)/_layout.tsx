import { router, Stack } from "expo-router";
import { useEffect } from "react";

const isAuth = false;

useEffect(() => {
  if (isAuth) {
    router.replace("/(auth)/sign_in");
  }
}, []);

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add_record" />
    </Stack>
  );
}
