import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </SafeAreaProvider>
  );
}
