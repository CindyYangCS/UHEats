import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MealProvider } from "../context/MealContext";
import MealSummaryBar from "../components/MealSummaryBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
});

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <MealProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="menu/[slug]" options={{ headerShown: false }} />
          </Stack>
          <MealSummaryBar />
        </MealProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}