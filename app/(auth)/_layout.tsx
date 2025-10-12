import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const isAuth = false;
  useEffect(() => {
    if (isAuth) {
      router.replace("/(app)/(tabs)");
    }
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign_in" />
      <Stack.Screen name="sign_up" />
      <Stack.Screen name="forgot_password" />
      <Stack.Screen name="reset_password" />
    </Stack>
  );
}
