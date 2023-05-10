import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { deleteUser } from "../controllers/user.controller.ts";

const deleteUserOpts = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

interface ReqParams {
  id: string;
}

export default function userRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.delete(
    "/:id",
    {
      schema: deleteUserOpts.schema,
      onRequest: [
        fastify.authenticate as (
          request: FastifyRequest<{ Params: ReqParams }>,
          reply: FastifyReply
        ) => FastifyReply,
      ],
    },
    deleteUser
  );
  done();
}
