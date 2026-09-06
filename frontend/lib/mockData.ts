import { DiningHours, DiningLocation, FoodItem } from "../types/dining";

const foodItemsMock: FoodItem[] = [
  {
      id: 'food-1',
      name: 'Potato',
      servingUnit: '1 cup',
      calories: 100,
      protein: 2,
      carbs: 12,
      fat: 3,
  },
  {
      id: 'food-2',
      name: 'Watermelon',
      servingUnit: '4 cups',
      calories: 250,
      protein: 1,
      carbs: 23,
      fat: 4,
  },
]

const diningHoursMock: DiningHours[] = [
  {
      id: 'dining-hr-1',
      dayOfWeek: 1,
      openTime: '2:30:00 PM',
      closeTime: '7:00:00 PM', //.toLocaleTimeString()
  },
  {
      id: 'dining-hr-2',
      dayOfWeek: 3,
      openTime: '2:30:00 PM',
      closeTime: '7:30:00 PM',
  },
]

export const diningHallsMock: DiningLocation[] = [
  {
    id: 'loc-4',
    name: 'Moody Towers',
    slug: 'moody-towers',
    buildingName: 'Moody Towers',
    hours: diningHoursMock,
    foodItems: foodItemsMock,
    category: 'DINING_HALL',
    updatedAt: '2026-09-05T23:25:00.000Z' //.toISOString()
  },
  {
  id: 'loc-5',
  name: 'Cougar Woods',
  slug: 'cougar-woods',
  buildingName: 'Cougar Woods',
  hours: diningHoursMock,
  foodItems: foodItemsMock,
  category: 'DINING_HALL',
  updatedAt: '2026-09-05T23:25:00.000Z'
  },
]

export const restaurantsMock: DiningLocation[] = [
  {
    id: 'loc-1',
    name: "McAlister's Deli",
    slug: 'mcalisters-deli',
    buildingName: 'Welcome Center',
    hours: diningHoursMock,
    foodItems: foodItemsMock,
    category: 'RESTAURANT',
    updatedAt: '2026-09-05T23:25:00.000Z'
  },
  {
  id: 'loc-2',
  name: 'Panda Express',
  slug: 'panda-express',
  buildingName: 'Student Center South',
  hours: diningHoursMock,
  foodItems: foodItemsMock,
  category: 'RESTAURANT',
  updatedAt: '2026-09-05T23:25:00.000Z'
  },
  {
  id: 'loc-3',
  name: 'Burger Joint',
  slug: 'burger-joint',
  buildingName: 'RAD Center',
  hours: diningHoursMock,
  foodItems: foodItemsMock,
  category: 'RESTAURANT',
  updatedAt: '2026-09-05T23:25:00.000Z'
  },
]