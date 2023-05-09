import { FastifyRequest, FastifyReply } from "fastify";

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send("from controller");
};
