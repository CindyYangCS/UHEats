import { Animated, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useMeal } from "../../context/MealContext";
import { getFoodImage } from "../../lib/diningImages";
import { COLORS } from "../../lib/theme";
import { FoodItem } from "../../types/dining";

interface FoodCardProps {
  foodItem: FoodItem;
  locationSlug: string;
}

export default function FoodCard({ foodItem, locationSlug }: FoodCardProps) {
  const { addItem, selectedItems } = useMeal();
  const selection = selectedItems.find(({ foodItem: selected }) => selected.id === foodItem.id);
  const [justAdded, setJustAdded] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const useNativeDriver = Platform.OS !== "web";

  function handleAdd() {
    addItem(foodItem);
    setJustAdded(true);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.01, useNativeDriver }),
      Animated.spring(scale, { toValue: 1, useNativeDriver }),
    ]).start();
  }

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 900);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Add ${foodItem.name} to meal`}
        onPress={handleAdd}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Image source={getFoodImage(locationSlug, foodItem.name)} resizeMode="cover" style={styles.image} />
        <View style={styles.content}>
          <View style={styles.copy}>
            <Text style={styles.title}>{foodItem.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {foodItem.description ?? foodItem.servingUnit}
            </Text>
            <Text style={styles.calories}>{foodItem.calories} cal</Text>
          </View>
          <View style={styles.macros}>
            <Macro label="P" value={foodItem.protein} color={COLORS.nord13} />
            <Macro label="C" value={foodItem.carbs} color={COLORS.nord14} />
            <Macro label="F" value={foodItem.fat} color={COLORS.nord15} />
          </View>
        </View>
        {selection ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selection.quantity}</Text>
          </View>
        ) : null}
        {justAdded ? (
          <View style={styles.addedBadge}>
            <Text style={styles.addedText}>Added</Text>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

function Macro({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.macroRow}>
      <View style={styles.macroLabelContainer}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.macroLabel}>{label}</Text>
      </View>

      <Text style={styles.macroValue}>{value}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 126,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  image: { width: 104, height: 126, backgroundColor: COLORS.chipBg },
  content: { flex: 1, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  copy: { flex: 1 },
  title: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  description: { color: COLORS.inkSoft, fontSize: 12, lineHeight: 17, marginTop: 4 },
  calories: { color: COLORS.ink, fontSize: 12, fontWeight: "700", marginTop: 8 },
  badge: {
    position: "absolute",
    top: 10,
    left: 82,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: COLORS.red,
  },
  badgeText: { color: COLORS.bg, fontSize: 12, fontWeight: "800" },
  addedBadge: {
    position: "absolute",
    right: 12,
    top: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#E8F7EE",
  },
  addedText: { color: "#23834A", fontSize: 11, fontWeight: "800" },
  macros: { 
    alignItems: "flex-end", 
    justifyContent: "center", 
    gap: 4 
  },
  macroRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    width: 50,
  },
  macroLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3 
  },
  macroValue: { 
    fontSize: 11, 
    fontWeight: "700", 
    color: COLORS.ink,
    textAlign: "right",
  },
  macroLabel: { 
    color: COLORS.inkSoft, 
    fontSize: 10, 
    fontWeight: "600" 
  },
});