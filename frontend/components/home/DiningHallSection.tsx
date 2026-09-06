import { useState } from "react";
import { View, StyleSheet, Platform, Text, useWindowDimensions } from "react-native";
import PlaceCard from "./PlaceCard";

const MOCK_DINING_HALLS = [
  {
    id: 1,
    name: 'Cougar Woods',
    hours: '6:00 AM - 6:00 PM'
  },
    {
    id: 2,
    name: 'Moody Dining',
    hours: '7:00 AM - 7:00 PM'
  }
]

export default function DiningHallSection({ cardWidth }: {cardWidth: number}) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Dining Halls
            </Text>
            <View style={styles.cardGrid}>
                {MOCK_DINING_HALLS.map((place) => (
                    <PlaceCard key={place.id} name={place.name} cardWidth={cardWidth} showLocation />
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
});