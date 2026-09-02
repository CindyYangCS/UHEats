import { Stack } from "expo-router";

export default function Layout() {
  return (<Stack >
    <Stack.Screen name="index" options={{title: 'Main'}} />
    <Stack.Screen name="calculate" options={{title: 'Calculate'}} />

    </Stack>
    );
}