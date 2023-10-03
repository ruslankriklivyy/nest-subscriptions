/*
  Warnings:

  - Added the required column `available_posts_count` to the `SubscriptionUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionUser" ADD COLUMN     "available_posts_count" INTEGER NOT NULL;
