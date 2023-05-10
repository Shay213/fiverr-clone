import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

interface ReplyHelpers {
  sendError: (
    reply: FastifyReply,
    message: string,
    status: number
  ) => FastifyReply;
  sendSuccess: (
    reply: FastifyReply,
    message: string,
    status: number
  ) => FastifyReply;
}

declare module "fastify" {
  interface FastifyInstance {
    replyHelpers: ReplyHelpers;
  }
}

const replyMessagePlugin = fp(
  (fastify: FastifyInstance, options: object, done: () => void) => {
    const replyHelpers: ReplyHelpers = {
      sendError: (reply: FastifyReply, message: string, status: number) => {
        return reply.code(status).send({ message });
      },
      sendSuccess: (reply: FastifyReply, message: string, status: number) => {
        return reply.code(status).send({ message });
      },
    };

    fastify.decorate("replyHelpers", replyHelpers);

    done();
  }
);

export default replyMessagePlugin;
