import { FastifyInstance } from "fastify";
import { getOrders, intent, confirm } from "../controllers/order.controller.ts";
const IntentSchema = {
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
        clientSecret: { type: ["string", "null"], nullable: true },
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
          },
          buyer: {
            type: "object",
            properties: {
              username: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const ConfirmSchema = {
  body: {
    type: "object",
    properties: {
      paymentIntent: { type: ["string"] },
    },
    required: ["paymentIntent"],
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

export default function orderRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate], schema: getOrdersSchema },
    getOrders
  );
  fastify.post(
    "/create-payment-intent/:gigId",
    { onRequest: [fastify.authenticate], schema: IntentSchema },
    intent
  );
  fastify.put(
    "/",
    { onRequest: [fastify.authenticate], schema: ConfirmSchema },
    confirm
  );
  done();
}
