import { FastifyInstance } from "fastify";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.ts";
import { FromSchema } from "json-schema-to-ts";

const createGigBody = {
  type: "object",
  properties: {
    title: { type: "string" },
    desc: { type: "string" },
    totalStars: { type: "number" },
    starNumber: { type: "number" },
    category: { type: "string" },
    price: { type: "number" },
    cover: { type: "string" },
    images: { type: "array", items: { type: "string" } },
    shortTitle: { type: "string" },
    shortDescription: { type: "string" },
    deliveryTime: { type: "number" },
    revision: { type: "number" },
    features: { type: "array", items: { type: "string" } },
    sales: { type: ["number", "null"], nullable: true },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: [
    "title",
    "desc",
    "category",
    "price",
    "cover",
    "images",
    "shortTitle",
    "shortDescription",
    "deliveryTime",
    "revision",
    "features",
  ],
} as const;

export type Body = FromSchema<typeof createGigBody>;

const { properties } = createGigBody;
const createGigSchema = {
  body: {
    ...createGigBody,
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        userId: { type: "string" },
        ...properties,
      },
    },
  },
};

export default function gigRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post(
    "/",
    { onRequest: [fastify.authenticate], schema: createGigSchema },
    createGig
  );
  fastify.delete("/:id", { onRequest: [fastify.authenticate] }, deleteGig);
  fastify.get("/single/:id", { onRequest: [fastify.authenticate] }, getGig);
  fastify.get("/", { onRequest: [fastify.authenticate] }, getGigs);
  done();
}
