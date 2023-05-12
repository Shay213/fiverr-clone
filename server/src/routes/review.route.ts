import { FastifyInstance } from "fastify";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.ts";

const review = {
  id: { type: "string" },
  gigId: { type: "string" },
  userId: { type: "string" },
  star: { type: "string", enum: ["ONE", "TWO", "THREE", "FOUR", "FIVE"] },
  description: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const createReviewSchema = {
  body: {
    type: "object",
    properties: {
      gigId: { type: "string" },
      description: { type: "string" },
      star: { type: "integer", enum: [1, 2, 3, 4, 5] },
    },
    required: ["gigId", "description", "star"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        ...review,
      },
    },
  },
};

const getReviewsSchema = {
  params: {
    type: "object",
    properties: {
      gigId: { type: "string" },
    },
    required: ["gigId"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...review,
          user: {
            type: "object",
            properties: {
              username: { type: "string" },
              img: { type: "string" },
              country: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const deleteReviewSchema = {};

export default function reviewRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post(
    "/",
    { onRequest: [fastify.authenticate], schema: createReviewSchema },
    createReview
  );
  fastify.get("/:gigId", { schema: getReviewsSchema }, getReviews);
  fastify.delete(
    "/:id",
    { onRequest: [fastify.authenticate], schema: deleteReviewSchema },
    deleteReview
  );
  done();
}
