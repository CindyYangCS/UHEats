import { View, StyleSheet, Text } from "react-native";
import DiningCard from "./DiningCard";
import { COLORS } from "../../lib/theme";
import { diningHallsMock } from "../../lib/mockData";
import { useGridCardWidth } from "../../hooks/useGridCardWidth";

export default function DiningHallSection() {
  const cardWidth = useGridCardWidth(diningHallsMock.length)
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Dining Halls
            </Text>
            <View style={styles.cardGrid}>
                {diningHallsMock.map((place) => (
                    <DiningCard key={place.id} diningLocation={place} cardWidth={cardWidth} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  section: {
    maxWidth: 1080,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 44,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 22,
    color: COLORS.ink,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
});