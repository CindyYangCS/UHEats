import { View, Text, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>UHEats</Text>

      <Link href="/calculate" style={styles.button}>
        Go to Calculate Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#333",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: "#fff",
    textDecorationLine: "underline",
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
  },
});