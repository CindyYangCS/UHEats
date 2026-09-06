import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import LocationChip from "./LocationChip";
import DiningCard from "./DiningCard";
import { COLORS } from "../../lib/theme";
import { restaurantsMock } from "../../lib/mockData";
import { DiningLocation } from "../../types/dining";
import { useGridCardWidth } from "../../hooks/useGridCardWidth";

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

export default function RestaurantSection() {
    const [activeLocation, setActiveLocation] = useState<string>('All Locations');
    const [visibleRestaurants, setVisibleRestaurants] = useState<DiningLocation[]>(restaurantsMock);
    const cardWidth = useGridCardWidth(restaurantsMock.length)

    useEffect(() => {
      if (activeLocation === 'All Locations') {
        setVisibleRestaurants(restaurantsMock);
        return;
      }

      const visRestaurants = restaurantsMock.filter((r) => r.buildingName === activeLocation);
      setVisibleRestaurants(visRestaurants);
    }, [activeLocation]);

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
  // Card grid — row + wrap + center means a short row (e.g. 2 dining halls)
  // stays centered under the section title instead of hugging the left edge,
  // and each card's width comes from the cardWidth calculated in HomeScreen
  // so cards grow/shrink together as the window resizes (auto-fit behavior).
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
 chipRow: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});