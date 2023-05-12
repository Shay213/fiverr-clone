import { FastifyInstance } from "fastify";
import { createOrder, getOrders } from "../controllers/order.controller.ts";
const createOrderSchema = {
  params: {
    type: "object",
    properties: {
      gigId: { type: "string" },
    },
    required: ["gigId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getOrdersSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          gigId: { type: "string" },
          img: { type: ["string", "null"], nullable: true },
          title: { type: "string" },
          price: { type: "number" },
          sellerId: { type: "string" },
          buyerId: { type: "string" },
          isCompleted: { type: ["boolean", "null"], nullable: true },
          paymentIntent: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          seller: {
            type: "object",
            properties: {
              username: { type: "string" },
            },
            optional: true,
          },
          buyer: {
            type: "object",
            properties: {
              username: { type: "string" },
            },
            optional: true,
          },
        },
      },
    },
  },
};

export default function orderRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post(
    "/:gigId",
    { onRequest: [fastify.authenticate], schema: createOrderSchema },
    createOrder
  );
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate], schema: getOrdersSchema },
    getOrders
  );
  done();
}
