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

const deleteGigSchema = {
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
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getGigSchema = {
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
      properties: {
        id: { type: "string" },
        userId: { type: "string" },
        ...properties,
        user: {
          type: "object",
          properties: {
            username: { type: "string" },
            img: { type: "string" },
            country: { type: "string" },
            desc: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
};

const getGigsSchema = {
  query: {
    type: "object",
    properties: {
      userId: { type: "string" },
      cat: { type: "string" },
      min: { type: "number" },
      max: { type: "number" },
      search: { type: "string" },
      sort: { type: "string" },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          ...properties,
          user: {
            type: "object",
            properties: {
              username: { type: "string" },
              img: { type: "string" },
            },
          },
        },
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
  fastify.delete(
    "/:id",
    { onRequest: [fastify.authenticate], schema: deleteGigSchema },
    deleteGig
  );
  fastify.get("/single/:id", { schema: getGigSchema }, getGig);
  fastify.get("/", { schema: getGigsSchema }, getGigs);
  done();
}
