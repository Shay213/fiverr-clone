/*
  Warnings:

  - A unique constraint covering the columns `[payment_intent]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_payment_intent_key" ON "order"("payment_intent");
