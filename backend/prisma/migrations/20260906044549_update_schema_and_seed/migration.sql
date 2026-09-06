/*
  Warnings:

  - The primary key for the `DiningHours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `restaurantId` on the `DiningHours` table. All the data in the column will be lost.
  - The primary key for the `FoodItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `restaurantId` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `diningLocationId` to the `DiningHours` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `openTime` on the `DiningHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `closeTime` on the `DiningHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `diningLocationId` to the `FoodItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiningCategory" AS ENUM ('DINING_HALL', 'RESTAURANT', 'CAFE', 'MARKET', 'VENDING_MACHINE');

-- DropForeignKey
ALTER TABLE "DiningHours" DROP CONSTRAINT "DiningHours_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "FoodItem" DROP CONSTRAINT "FoodItem_restaurantId_fkey";

-- AlterTable
ALTER TABLE "DiningHours" DROP CONSTRAINT "DiningHours_pkey",
DROP COLUMN "restaurantId",
ADD COLUMN     "diningLocationId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "openTime",
ADD COLUMN     "openTime" TIME NOT NULL,
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" TIME NOT NULL,
ADD CONSTRAINT "DiningHours_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DiningHours_id_seq";

-- AlterTable
ALTER TABLE "FoodItem" DROP CONSTRAINT "FoodItem_pkey",
DROP COLUMN "restaurantId",
ADD COLUMN     "diningLocationId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FoodItem_id_seq";

-- DropTable
DROP TABLE "Restaurant";

-- CreateTable
CREATE TABLE "DiningLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "buildingName" TEXT NOT NULL,
    "category" "DiningCategory" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiningLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiningLocation_name_key" ON "DiningLocation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DiningLocation_slug_key" ON "DiningLocation"("slug");

-- AddForeignKey
ALTER TABLE "DiningHours" ADD CONSTRAINT "DiningHours_diningLocationId_fkey" FOREIGN KEY ("diningLocationId") REFERENCES "DiningLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_diningLocationId_fkey" FOREIGN KEY ("diningLocationId") REFERENCES "DiningLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
