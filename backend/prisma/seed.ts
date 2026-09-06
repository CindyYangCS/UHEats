import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, DiningCategory } from "../src/generated/client.js";
import { slugify } from "../src/utils/slugify.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Helper to convert "HH:mm" strings into Date objects for Prisma @db.Time fields
function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date(1970, 0, 1, hours, minutes, 0); // Base reference date for time-only fields
  return date;
}

const standardHours = [
  { dayOfWeek: 0, openTime: parseTimeString("00:00"), closeTime: parseTimeString("00:00") }, // Sunday (Closed)
  { dayOfWeek: 1, openTime: parseTimeString("07:00"), closeTime: parseTimeString("19:00") }, // Monday
  { dayOfWeek: 2, openTime: parseTimeString("07:00"), closeTime: parseTimeString("19:00") }, // Tuesday
  { dayOfWeek: 3, openTime: parseTimeString("07:00"), closeTime: parseTimeString("19:00") }, // Wednesday
  { dayOfWeek: 4, openTime: parseTimeString("07:00"), closeTime: parseTimeString("19:00") }, // Thursday
  { dayOfWeek: 5, openTime: parseTimeString("07:00"), closeTime: parseTimeString("17:00") }, // Friday
  { dayOfWeek: 6, openTime: parseTimeString("10:30"), closeTime: parseTimeString("20:00") }, // Saturday
];

const diningLocations = [
  {
    name: "Chick-fil-A",
    buildingName: "SC South",
    category: DiningCategory.RESTAURANT,
    hours: standardHours,
    foodItems: [
      {
        name: "Grilled Chicken Sandwich",
        servingUnit: "1 each",
        calories: 380,
        protein: 28,
        carbs: 43,
        fat: 12,
      },
      {
        name: "Spicy Chicken Sandwich",
        servingUnit: "1 each",
        calories: 460,
        protein: 28,
        carbs: 45,
        fat: 19,
      },
    ],
  },
  {
    name: "McAlister's Deli",
    buildingName: "Welcome Center",
    category: DiningCategory.RESTAURANT,
    hours: standardHours,
    foodItems: [
      {
        name: "McAlister's Club Wrap",
        servingUnit: "1 wrap",
        calories: 780,
        protein: 39,
        carbs: 65,
        fat: 40,
      },
      {
        name: "Grilled Chicken Club",
        servingUnit: "1 sandwich",
        calories: 830,
        protein: 48,
        carbs: 78,
        fat: 35,
      },
    ],
  },
  {
    name: "Moody Towers",
    buildingName: "Moody Towers",
    category: DiningCategory.DINING_HALL,
    hours: standardHours,
    foodItems: [
      {
        name: "Potato",
        servingUnit: "1 cup",
        calories: 100,
        protein: 2,
        carbs: 12,
        fat: 3,
      },
    ],
  },
  {
    name: "Cougar Woods",
    buildingName: "Cougar Woods",
    category: DiningCategory.DINING_HALL,
    hours: standardHours,
    foodItems: [
      {
        name: "Watermelon",
        servingUnit: "4 cups",
        calories: 250,
        protein: 1,
        carbs: 23,
        fat: 4,
      },
    ],
  }
];

// if already seeded db, this will error because the data already exists
// follow these steps to update db:
// reset your local db with `npx prisma migrate reset`
// seed db with `npx prisma db seed`
async function main() {
  console.log("Seeding database...");

  for (const location of diningLocations) {
    const created = await prisma.diningLocation.create({
      data: {
        name: location.name,
        slug: slugify(location.name),
        buildingName: location.buildingName,
        category: location.category,
        hours: {
          create: location.hours,
        },
        foodItems: {
          create: location.foodItems,
        },
      },
    });

    console.log(`Seeded: ${created.name} (${created.slug})`);
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());