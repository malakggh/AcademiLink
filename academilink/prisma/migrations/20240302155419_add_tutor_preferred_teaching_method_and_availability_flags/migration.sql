-- CreateEnum
CREATE TYPE "PreferredTeachingMethod" AS ENUM ('ZOOM', 'FRONTAL', 'BOTH');

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "availabilityFlags" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "preferredTeachingMethod" "PreferredTeachingMethod" NOT NULL DEFAULT 'BOTH';
