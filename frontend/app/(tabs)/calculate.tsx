import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useMeal } from "../../context/MealContext";
import { COLORS } from "../../lib/theme";

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function CalculateScreen() {
  const { selectedItems, totals } = useMeal();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your meal</Text>
      <Text style={styles.subtitle}>Review the items you have selected.</Text>
      <View style={styles.totalCard}>
        <Text style={styles.calories}>{formatNumber(totals.calories)} calories</Text>
        <View style={styles.macroRow}>
          <Macro label="Protein" value={totals.protein} color="#3B82F6" />
          <Macro label="Carbs" value={totals.carbs} color="#F59E0B" />
          <Macro label="Fat" value={totals.fat} color="#EF4444" />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Selected items</Text>
      {selectedItems.length === 0 ? (
        <Text style={styles.empty}>Your selected food items will appear here.</Text>
      ) : (
        selectedItems.map(({ foodItem, quantity }) => (
          <View key={foodItem.id} style={styles.item}>
            <Text style={styles.itemName}>{foodItem.name}</Text>
            <Text style={styles.itemServing}>
              {quantity} × {foodItem.servingUnit} · {foodItem.calories * quantity} cal
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function Macro({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View>
      <Text style={[styles.macroValue, { color }]}>{formatNumber(value)}g</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 110 },
  title: { color: COLORS.ink, fontSize: 30, fontWeight: "800", marginTop: 16 },
  subtitle: { color: COLORS.inkSoft, fontSize: 14, marginTop: 5 },
  totalCard: { marginTop: 22, padding: 20, borderRadius: 16, backgroundColor: COLORS.chipBg },
  calories: { color: COLORS.ink, fontSize: 24, fontWeight: "800" },
  macroRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18, paddingRight: 30 },
  macroValue: { fontSize: 15, fontWeight: "800" },
  macroLabel: { color: COLORS.inkSoft, fontSize: 12, marginTop: 3 },
  sectionTitle: { color: COLORS.ink, fontSize: 20, fontWeight: "800", marginTop: 32, marginBottom: 12 },
  empty: { color: COLORS.inkSoft, fontSize: 14 },
  item: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  itemName: { color: COLORS.ink, fontSize: 15, fontWeight: "700" },
  itemServing: { color: COLORS.inkSoft, fontSize: 12, marginTop: 4 },
});
