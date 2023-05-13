/*
  Warnings:

  - Added the required column `converastion_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "converastion_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_converastion_id_fkey" FOREIGN KEY ("converastion_id") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
