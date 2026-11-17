import { View, StyleSheet, Text } from "react-native";
import DiningCard from "./DiningCard";
import { COLORS } from "../../lib/theme";
import { useGridCardWidth } from "../../hooks/useGridCardWidth";
import { router } from "expo-router";
import { DiningLocation } from "../../types/dining";

export default function DiningHallSection({ locations }: { locations: DiningLocation[] }) {
  const cardWidth = useGridCardWidth(locations.length)
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Dining Halls
        </Text>
        <View style={styles.cardGrid}>
          {locations.map((place) => (
            <DiningCard
              key={place.id}
              diningLocation={place}
              cardWidth={cardWidth}
              onPress={() => router.push(`/menu/${place.slug}`)}
            />
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
    paddingTop: 22,
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
    gap: 12,
  },
});