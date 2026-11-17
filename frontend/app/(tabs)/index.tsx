import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import DiningHallSection from "../../components/home/DiningHallSection";
import RestaurantSection from "../../components/home/RestaurantSection";
import { COLORS } from "../../lib/theme";
import { fetchDiningLocations } from "../../lib/api";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();

  const locationsQuery = useQuery({
    queryKey: ["diningLocations"],
    queryFn: fetchDiningLocations,
  });

  const locations = locationsQuery.data ?? [];

  const diningHalls = useMemo(
    () =>
      locations.filter(
        (location) =>
          location.category === "DINING_HALL" &&
          location.name.toLowerCase().includes(normalizedSearch)
      ),
    [locations, normalizedSearch]
  );

  const restaurants = useMemo(
    () =>
      locations.filter(
        (location) =>
          location.category !== "DINING_HALL" &&
          location.name.toLowerCase().includes(normalizedSearch)
      ),
    [locations, normalizedSearch]
  );

  if (locationsQuery.isLoading) {
    return <Text style={styles.status}>Loading dining locations...</Text>;
  }

  if (locationsQuery.isError) {
    return (
      <Text style={styles.status}>
        {locationsQuery.error instanceof Error
          ? locationsQuery.error.message
          : "Failed to load dining locations"}
      </Text>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 110}}>
      <View style={styles.header}>
        <TextInput
          accessibilityLabel="Search dining halls and restaurants"
          value={search}
          onChangeText={setSearch}
          placeholder="Search dining halls or restaurants"
          placeholderTextColor={COLORS.inkSoft}
          style={styles.search}
        />
      </View>
      <DiningHallSection locations={diningHalls} />
      <RestaurantSection locations={restaurants} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  search: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.chipBg,
    color: COLORS.inkSoft,
    fontSize: 14,
  },
  status: {
    flex: 1,
    padding: 24,
    color: COLORS.inkSoft,
  },
});