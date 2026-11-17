import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { FoodItem } from "../types/dining";

export interface SelectedFoodItem {
  foodItem: FoodItem;
  quantity: number;
}

interface MealTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealContextValue {
  selectedItems: SelectedFoodItem[];
  totals: MealTotals;
  addItem: (foodItem: FoodItem) => void;
  removeItem: (foodItemId: string) => void;
  clearMeal: () => void;
}

const MealContext = createContext<MealContextValue | null>(null);

export function MealProvider({ children }: PropsWithChildren) {
  const [selectedItems, setSelectedItems] = useState<SelectedFoodItem[]>([]);

  const value = useMemo<MealContextValue>(() => {
    const totals = selectedItems.reduce(
      (total, selection) => ({
        calories: total.calories + selection.foodItem.calories * selection.quantity,
        protein: total.protein + selection.foodItem.protein * selection.quantity,
        carbs: total.carbs + selection.foodItem.carbs * selection.quantity,
        fat: total.fat + selection.foodItem.fat * selection.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    return {
      selectedItems,
      totals,
      addItem: (foodItem) => {
        setSelectedItems((current) => {
          const existing = current.find((selection) => selection.foodItem.id === foodItem.id);
          if (existing) {
            return current.map((selection) =>
              selection.foodItem.id === foodItem.id
                ? { ...selection, quantity: selection.quantity + 1 }
                : selection,
            );
          }
          return [...current, { foodItem, quantity: 1 }];
        });
      },
      removeItem: (foodItemId) => {
        setSelectedItems((current) =>
          current.flatMap((selection) => {
            if (selection.foodItem.id !== foodItemId) return [selection];
            if (selection.quantity > 1) {
              return [{ ...selection, quantity: selection.quantity - 1 }];
            }
            return [];
          }),
        );
      },
      clearMeal: () => setSelectedItems([]),
    };
  }, [selectedItems]);

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

export function useMeal() {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeal must be used inside MealProvider");
  }
  return context;
}
