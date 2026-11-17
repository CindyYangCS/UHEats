import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import LocationChip from "./LocationChip";
import DiningCard from "./DiningCard";
import { COLORS } from "../../lib/theme";
import { DiningLocation } from "../../types/dining";
import { useGridCardWidth } from "../../hooks/useGridCardWidth";
import { router } from "expo-router";

const LOCATIONS = [
  'All Locations',
  'RAD Center',
  'SC South',
  'PGH',
  'Rec',
  'Welcome Center',
  'TDECU Stadium',
  'Bauer College',
];

export default function RestaurantSection({ locations }: { locations: DiningLocation[] }) {
  const [activeLocation, setActiveLocation] = useState<string>('All Locations');
  const [visibleRestaurants, setVisibleRestaurants] = useState<DiningLocation[]>(locations);
  const cardWidth = useGridCardWidth(locations.length)

  useEffect(() => {
    if (activeLocation === 'All Locations') {
      setVisibleRestaurants(locations);
      return;
    }

    const visRestaurants = locations.filter((r) => r.buildingName === activeLocation);
    setVisibleRestaurants(visRestaurants);
  }, [activeLocation, locations]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Restaurants</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.chipRow}
        contentContainerStyle={{ gap: 10 }}
      >
        {LOCATIONS.map((loc) => (
            <LocationChip
            key={loc}
            buildingName={loc}
            active={loc === activeLocation}
            onPress={() => setActiveLocation(loc)}
            />
        ))}
      </ScrollView>

      <View style={styles.cardGrid}>
        {visibleRestaurants.map((place) => (
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
  chipRow: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});