import { useState } from "react";
import { View, StyleSheet, Platform, Text, ScrollView, TouchableOpacity } from "react-native";
import PlaceCard from "./PlaceCard";
import LocationChip from "./LocationChip";

const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: 'Chick-fil-A',
    hours: '6:00 AM - 6:00 PM'
  },
    {
    id: 2,
    name: 'Panda Express',
    hours: '7:00 AM - 7:00 PM'
  },
      {
    id: 3,
    name: 'Burger Joint',
    hours: '7:00 AM - 7:00 PM'
  }
]

const LOCATIONS = [
  'All Locations',
  'RAD Center',
  'SC South',
  'PGH',
  'Rec',
  'Welcome Center',
  'TDECU Stadium',
];

export default function Restaurant({ cardWidth }: {cardWidth: number}) {
    const [activeLocation, setActiveLocation] = useState('All Locations');

    return (
      <View style={styles.section}>
            <Text style={styles.sectionTitle}>Restaurants</Text>
    
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipRow}
            contentContainerStyle={{ gap: 10 }}
            >
            {LOCATIONS.map((loc) => (
                <LocationChip
                key={loc}
                label={loc}
                active={loc === activeLocation}
                onPress={() => setActiveLocation(loc)}
                />
            ))}
            </ScrollView>

            <View style={styles.cardGrid}>
            {MOCK_RESTAURANTS.map((place) => (
                <PlaceCard key={place.id} name={place.name} cardWidth={cardWidth} showLocation={true} />
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
    color: 'black',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});