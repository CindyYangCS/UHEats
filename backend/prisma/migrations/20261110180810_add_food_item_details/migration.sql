-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('MAIN', 'SIDE', 'DRINK', 'DESSERT', 'OTHER');

-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "category" "FoodCategory",
ADD COLUMN     "description" TEXT;
