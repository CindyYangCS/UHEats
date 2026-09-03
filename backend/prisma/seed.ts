import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const standardHours = [
    { dayOfWeek: 1, openTime: "0:00", closeTime: "00:00" }, // Sunday
    { dayOfWeek: 2, openTime: "7:00", closeTime: "19:00" }, // Monday
    { dayOfWeek: 3, openTime: "7:00", closeTime: "19:00" }, // Tuesday
    { dayOfWeek: 4, openTime: "7:00", closeTime: "19:00" }, // Wednesday
    { dayOfWeek: 5, openTime: "7:00", closeTime: "19:00" }, // Thursday
    { dayOfWeek: 6, openTime: "7:00", closeTime: "17:00" }, // Friday
    { dayOfWeek: 7, openTime: "10:30", closeTime: "20:00" }, // Saturday
]

const restaurants = [
    {
        name: "Chick-fil-A",
        hours: standardHours,
        foodItems: [
            {
                name: "Grilled Chicken Sandwich",
                servingUnit: "1 each",
                calories: 380,
                protein: 28,
                carbs: 43,
                fat: 12
            },
            {
                name: "Spicy Chicken Sandwich",
                servingUnit: "1 each",
                calories: 460,
                protein: 28,
                carbs: 45,
                fat: 19
            }
        ]
    },
    {
        name: "McAlister's Deli",
        hours: standardHours,
        foodItems: [
            {
                name: "McAlister's Club Wrap",
                servingUnit: "1 wrap",
                calories: 780,
                protein: 39,
                carbs: 65,
                fat: 40
            },
            {
                name: "Grilled Chicken Club",
                servingUnit: "1 sandwich",
                calories: 830,
                protein: 48,
                carbs: 78,
                fat: 35
            }
        ]
    }
]

async function main() {
    // if already seeded db, this will error because the data already exists
    // follow these steps to update db:
    // reset your local db with `npx prisma migrate reset`
    // seed db with `npx prisma db seed`
    for (const restaurant of restaurants) {
        const created = await prisma.restaurant.create({
            data: {
                name: restaurant.name,
                foodItems: { create: restaurant.foodItems },
                hours: { create: restaurant.hours } 
            }
        });
        console.log(`"Seeded:", ${created.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());