import { useRef } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMeal } from "../context/MealContext";
import { COLORS } from "../lib/theme";

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatContribution(value: number, total: number, unit: string) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  return {
    amount: `${formatNumber(value)}${unit} / ${formatNumber(total)}${unit}`,
    percentage: `${percentage}%`,
  };
}

export default function MealSummaryBar() {
  const { selectedItems, totals, addItem, removeItem, clearMeal } = useMeal();
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[86, "92%"]}
        enableDynamicSizing={false}
        handleComponent={() => (
          <View style={styles.handle}>
            <View style={styles.sheetHandle} />
            <View style={styles.bar}>
              <View style={styles.calories}>
                <View style={styles.metricLine}>
                  <View style={[styles.dot, { backgroundColor: COLORS.teal }]} />
                  <Text style={styles.caloriesValue}>{formatNumber(totals.calories)}</Text>
                </View>
                <Text style={styles.caloriesLabel}>calories</Text>
              </View>
              <Macro label="Protein" value={totals.protein} color={COLORS.nord13} />
              <Macro label="Carbs" value={totals.carbs} color={COLORS.nord14} />
              <Macro label="Fat" value={totals.fat} color={COLORS.nord15} />
            </View>
          </View>
        )}
        backgroundStyle={styles.sheet}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
            pressBehavior="collapse"
          />
        )}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Your meal</Text>
              <Text style={styles.sheetSubtitle}>
                {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}
              </Text>
            </View>
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalCalories}>{formatNumber(totals.calories)} calories</Text>
            <View style={styles.macroSplit}>
              <MacroSplit
                label="Protein"
                grams={totals.protein}
                calories={totals.protein * 4}
                totalCalories={totals.protein * 4 + totals.carbs * 4 + totals.fat * 9}
                color={COLORS.nord13}
              />
              <MacroSplit
                label="Carbs"
                grams={totals.carbs}
                calories={totals.carbs * 4}
                totalCalories={totals.protein * 4 + totals.carbs * 4 + totals.fat * 9}
                color={COLORS.nord14}
              />
              <MacroSplit
                label="Fat"
                grams={totals.fat}
                calories={totals.fat * 9}
                totalCalories={totals.protein * 4 + totals.carbs * 4 + totals.fat * 9}
                color={COLORS.nord15}
              />
            </View>
          </View>

          <BottomSheetScrollView contentContainerStyle={styles.items}>
            {selectedItems.length === 0 ? (
              <Text style={styles.empty}>Tap a food item to start building your meal.</Text>
            ) : (
              selectedItems.map(({ foodItem, quantity }) => (
                <View key={foodItem.id} style={styles.item}>
                  <View style={styles.itemText}>
                    <Text style={styles.itemName}>{foodItem.name}</Text>
                    <Text style={styles.itemServing}>
                      {quantity} × {foodItem.servingUnit}
                    </Text>
                    <View style={styles.itemNutrition}>
                      <NutritionMetric
                        label="Cals"
                        value={foodItem.calories * quantity}
                        total={totals.calories}
                        unit=""
                      />
                      <NutritionMetric
                        label="Protein"
                        value={foodItem.protein * quantity}
                        total={totals.protein}
                        unit="g"
                      />
                      <NutritionMetric
                        label="Carbs"
                        value={foodItem.carbs * quantity}
                        total={totals.carbs}
                        unit="g"
                      />
                      <NutritionMetric
                        label="Fat"
                        value={foodItem.fat * quantity}
                        total={totals.fat}
                        unit="g"
                      />
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <View style={styles.quantityControls}>
                      <Pressable onPress={() => removeItem(foodItem.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>−</Text>
                      </Pressable>
                      <Text style={styles.quantity}>{quantity}</Text>
                      <Pressable onPress={() => addItem(foodItem)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            )}
          </BottomSheetScrollView>

          {selectedItems.length > 0 ? (
            <Pressable onPress={clearMeal} style={styles.clearButton}>
              <Text style={styles.clearText}>Clear meal</Text>
            </Pressable>
          ) : null}
        </View>
      </BottomSheet>
  );
}

function NutritionMetric({
  label,
  value,
  total,
  unit,
}: {
  label: string;
  value: number;
  total: number;
  unit: string;
}) {
  const contribution = formatContribution(value, total, unit);

  return (
    <View style={styles.nutritionMetric}>
      <Text style={styles.nutritionLabel}>{label}</Text>
      <Text style={styles.nutritionAmount}>{contribution.amount}</Text>
      <Text style={styles.nutritionPercentage}>{contribution.percentage}</Text>
    </View>
  );
}

function MacroSplit({
  label,
  grams,
  calories,
  totalCalories,
  color,
}: {
  label: string;
  grams: number;
  calories: number;
  totalCalories: number;
  color: string;
}) {
  const percentage = totalCalories > 0 ? Math.round((calories / totalCalories) * 100) : 0;

  return (
    <View style={styles.macroSplitItem}>
      <View style={styles.macroSplitLabel}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.macroSplitName}>{label}</Text>
      </View>
      <Text style={[styles.macroSplitValue, { color }]}>
        {formatNumber(grams)}g · {formatNumber(calories)} cal
      </Text>
      <Text style={styles.macroSplitPercentage}>{percentage}% of macro calories</Text>
    </View>
  );
}

function Macro({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.macro}>
      <View style={styles.metricLine}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.macroValue, { color }]}>{formatNumber(value)}g</Text>
      </View>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  handle: {
    height: 86,
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 6,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    minHeight: 68,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    backgroundColor: COLORS.bg,
  },
  calories: { flex: 1 },
  metricLine: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  caloriesValue: { color: COLORS.ink, fontSize: 20, fontWeight: "800" },
  caloriesLabel: { color: COLORS.inkSoft, fontSize: 11 },
  macro: { alignItems: "center" },
  macroValue: { fontSize: 14, fontWeight: "800" },
  macroLabel: { color: COLORS.inkSoft, fontSize: 11, marginTop: 2 },
  chevron: { color: COLORS.inkSoft, fontSize: 20 },
  sheet: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  sheetHandle: { width: 42, height: 4, borderRadius: 4, backgroundColor: COLORS.line },
  sheetContent: { flex: 1, paddingHorizontal: 20, paddingBottom: 28 },
  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  sheetTitle: { color: COLORS.ink, fontSize: 24, fontWeight: "800" },
  sheetSubtitle: { color: COLORS.inkSoft, fontSize: 13, marginTop: 3 },
  close: { color: COLORS.red, fontWeight: "700" },
  totalCard: { marginTop: 20, padding: 18, borderRadius: 16, backgroundColor: COLORS.chipBg },
  totalCalories: { color: COLORS.ink, fontSize: 22, fontWeight: "800" },
  macroSplit: { gap: 10, marginTop: 16 },
  macroSplitItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  macroSplitLabel: { width: 72, flexDirection: "row", alignItems: "center", gap: 5 },
  macroSplitName: { color: COLORS.inkSoft, fontSize: 12, fontWeight: "700" },
  macroSplitValue: { flex: 1, fontSize: 12, fontWeight: "800" },
  macroSplitPercentage: { color: COLORS.inkSoft, fontSize: 11, width: 104, textAlign: "right" },
  items: { gap: 14, paddingVertical: 20 },
  empty: { color: COLORS.inkSoft, fontSize: 14, lineHeight: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", gap: 12, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  itemText: { flex: 1, minWidth: 0 },
  itemName: { color: COLORS.ink, fontSize: 15, fontWeight: "700" },
  itemServing: { color: COLORS.inkSoft, fontSize: 12, marginTop: 4 },
  itemNutrition: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  nutritionMetric: { minWidth: 78 },
  nutritionLabel: { color: COLORS.inkSoft, fontSize: 10, fontWeight: "700" },
  nutritionAmount: { color: COLORS.ink, fontSize: 11, fontWeight: "700", marginTop: 2 },
  nutritionPercentage: { color: COLORS.inkSoft, fontSize: 10, marginTop: 1 },
  itemActions: { alignItems: "flex-end", justifyContent: "flex-end" },
  quantityControls: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  quantityButton: { width: 28, height: 28, alignItems: "center", justifyContent: "center", borderRadius: 14, backgroundColor: COLORS.chipBg },
  quantityButtonText: { color: COLORS.ink, fontSize: 18, lineHeight: 20 },
  quantity: { minWidth: 14, textAlign: "center", color: COLORS.ink, fontSize: 13, fontWeight: "700" },
  clearButton: { alignItems: "center", paddingVertical: 12 },
  clearText: { color: COLORS.red, fontWeight: "700" },
});
