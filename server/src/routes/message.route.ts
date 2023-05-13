import { FastifyInstance } from "fastify";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.ts";

const Message = {
  id: { type: "string" },
  description: { type: "string" },
  userId: { type: "string" },
  conversationId: { type: "string" },
};

const CreateMessageSchema = {
  body: {
    type: "object",
    properties: {
      conversationId: { type: "string" },
      desc: { type: "string" },
    },
    required: ["conversationId", "desc"],
  },
  response: {
    201: {
      type: "object",
      properties: Message,
    },
  },
};

const GetMessagesSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...Message,
          user: {
            type: "object",
            properties: {
              img: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export default function messageRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post(
    "/",
    { onRequest: [fastify.authenticate], schema: CreateMessageSchema },
    createMessage
  );
  fastify.get(
    "/:id",
    { onRequest: [fastify.authenticate], schema: GetMessagesSchema },
    getMessages
  );
  done();
}
