import { FastifyRequest, FastifyReply } from "fastify";
import { Body } from "../routes/gig.route";

export const createGig = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const { isSeller, userId } = req.payload;
  if (!isSeller) return sendError(reply, "Only sellers can create a gig!", 403);
  const body = req.body as Body;

  try {
    const gig = await req.server.prisma.gig.create({
      data: {
        ...body,
        user: { connect: { id: userId } },
      },
    });
    return reply.code(201).send(gig);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const deleteGig = async (req: FastifyRequest, reply: FastifyReply) => {};

export const getGig = async (req: FastifyRequest, reply: FastifyReply) => {};

export const getGigs = async (req: FastifyRequest, reply: FastifyReply) => {};
