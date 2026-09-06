import { StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import DiningHallSection from "../components/home/DiningHallSection";
import RestaurantSection from "../components/home/RestaurantSection";
import { useState } from "react";
import { diningHallsMock, restaurantsMock } from "../lib/mockData";

const GRID_GAP = 16;
const MIN_CARD_WIDTH = 260;
const SECTION_MAX_WIDTH = 1080;
const SECTION_PADDING_X = 20;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [activeLocation, setActiveLocation] = useState('All Locations');

  // Available width inside a centered, max-1080px, padded section.
  const containerWidth =
    Math.min(width, SECTION_MAX_WIDTH) - SECTION_PADDING_X * 2;
 
  // Column count is capped by how many cards are actually in THAT grid —
  // not just how many would fit at MIN_CARD_WIDTH. Without this cap, a
  // 2-card row still reserves a 3rd column's worth of space (since 3 would
  // fit at 260px minimum), leaving the row narrow with dead space on the
  // right instead of the 2 cards splitting the full width 50/50.
  const getCardWidth = (itemCount: number) => {
    if (!isWide || itemCount === 0) return containerWidth;
    const maxColumns = Math.max(
      1,
      Math.floor((containerWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP))
    );
    const numColumns = Math.min(maxColumns, itemCount);
    return (containerWidth - GRID_GAP * (numColumns - 1)) / numColumns;
  };
 
  const diningCardWidth = getCardWidth(diningHallsMock.length);
  const restaurantCardWidth = getCardWidth(restaurantsMock.length);

  // const visibleRestaurants

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40}}>
      <DiningHallSection cardWidth={diningCardWidth} />
      <RestaurantSection cardWidth={restaurantCardWidth} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
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