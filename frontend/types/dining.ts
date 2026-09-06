export type DiningCategory =
  | 'DINING_HALL'
  | 'RESTAURANT'
  | 'CAFE'
  | 'MARKET'
  | 'VENDING_MACHINE';

export const CATEGORY_LABELS: Record<DiningCategory, string> = {
  DINING_HALL: 'Dining Hall',
  RESTAURANT: 'Restaurant',
  CAFE: 'Cafe',
  MARKET: 'Market',
  VENDING_MACHINE: 'Vending Machine',
};

export interface DiningHours {
    id: string;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface FoodItem {
    id: string;
    name: string;
    servingUnit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface DiningLocation {
    id: string;
    name: string;
    slug: string;
    buildingName: string;
    hours: DiningHours[];
    foodItems: FoodItem[];
    category: DiningCategory;
    updatedAt: string;
}