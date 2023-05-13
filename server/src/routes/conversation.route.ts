import { FastifyInstance } from "fastify";
import {
  getConversations,
  createConversation,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.ts";

const CreateConversationSchema = {
  body: {
    type: "object",
    properties: {
      to: { type: "string" },
    },
    required: ["to"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        sellerId: { type: "string" },
        buyerId: { type: "string" },
        readBySeller: { type: "boolean" },
        readByBuyer: { type: "boolean" },
        lastMessage: { type: ["string", "null"], nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};

export default function conversationRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post(
    "/",
    { onRequest: [fastify.authenticate], schema: CreateConversationSchema },
    createConversation
  );
  fastify.get("/", { onRequest: [fastify.authenticate] }, getConversations);

  fastify.get(
    "/single/:id",
    { onRequest: [fastify.authenticate] },
    getSingleConversation
  );
  fastify.post(
    "/:id",
    { onRequest: [fastify.authenticate] },
    updateConversation
  );
  done();
}
