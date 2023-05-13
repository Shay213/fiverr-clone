import { FastifyInstance } from "fastify";
import {
  getConversations,
  createConversation,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.ts";

const Conversation = {
  id: { type: "string" },
  sellerId: { type: "string" },
  buyerId: { type: "string" },
  readBySeller: { type: "boolean" },
  readByBuyer: { type: "boolean" },
  lastMessage: { type: ["string", "null"], nullable: true },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

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
      properties: Conversation,
    },
  },
};

const UpdateConversationSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: Conversation,
    },
  },
};

const GetSingleConversationSchema = {
  ...UpdateConversationSchema,
};

const GetConversationsSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...Conversation,
          buyer: {
            type: "object",
            properties: {
              username: { type: "string" },
            },
          },
          seller: {
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
  fastify.put(
    "/:id",
    { onRequest: [fastify.authenticate], schema: UpdateConversationSchema },
    updateConversation
  );
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate], schema: GetConversationsSchema },
    getConversations
  );
  fastify.get(
    "/single/:id",
    { onRequest: [fastify.authenticate], schema: GetSingleConversationSchema },
    getSingleConversation
  );
  done();
}
