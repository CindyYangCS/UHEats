import { StyleSheet, ScrollView } from "react-native";
import DiningHallSection from "../components/home/DiningHallSection";
import RestaurantSection from "../components/home/RestaurantSection";
import { COLORS } from "../lib/theme";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40}}>
      <DiningHallSection />
      <RestaurantSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});