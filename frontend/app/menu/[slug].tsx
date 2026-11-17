import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FoodCard from "../../components/menu/FoodCard";
import { COLORS } from "../../lib/theme";
import { fetchMenu } from "../../lib/api";
import { FoodItem } from "../../types/dining";

const CATEGORY_ORDER = ["MAIN", "SIDE", "DRINK", "DESSERT", "OTHER"];

function capitalizeFirstOnly(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function MenuScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  if (!slug) return;

  const menuQuery = useQuery({
    queryKey: ["menu", slug],
    queryFn: () => fetchMenu(slug),
    enabled: Boolean(slug),
  });

  if (menuQuery.isLoading) {
    return <Text style={styles.notFound}>Loading menu...</Text>;
  }

  if (menuQuery.isError) {
    return (
      <Text style={styles.notFound}>
        {menuQuery.error instanceof Error
          ? menuQuery.error.message
          : "Failed to load menu"}
      </Text>
    );
  }

  const menu = menuQuery.data;

  if (!menu) {
    return <Text style={styles.notFound}>Menu not found.</Text>;
  }

  const groupedItems = menu.foodItems.reduce<Record<string, FoodItem[]>>(
    (groups, item) => {
      const category = item.category ?? "OTHER";
      groups[category] = [...(groups[category] ?? []), item];
      return groups;
    },
    {}
  );

  const categories = CATEGORY_ORDER.filter(
    (category) => groupedItems[category]
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <Text style={styles.title}>{menu.name}</Text>
      <Text style={styles.subtitle}>
        Tap an item to add it to your meal
      </Text>

      {categories.map((category) => (
        <View key={category} style={styles.section}>
          <Text style={styles.sectionTitle}>{capitalizeFirstOnly(category)}</Text>

          {groupedItems[category].map((foodItem) => (
            <FoodCard
              key={foodItem.id}
              foodItem={foodItem}
              locationSlug={slug}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 110 },
  back: { alignSelf: "flex-start", paddingVertical: 6, paddingRight: 12, marginTop: 50 },
  backText: { color: COLORS.red, fontSize: 16, fontWeight: "700" },
  title: { color: COLORS.ink, fontSize: 30, fontWeight: "800", marginTop: 12 },
  subtitle: { color: COLORS.inkSoft, fontSize: 14, marginTop: 5 },
  section: { marginTop: 28 },
  sectionTitle: { color: COLORS.ink, fontSize: 20, fontWeight: "800", marginBottom: 12 },
  notFound: { flex: 1, padding: 24, color: COLORS.inkSoft },
});
