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

interface DeleteParams {
  id: string;
}

export const deleteGig = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError, sendSuccess } = req.server.replyHelpers;
  const params = req.params as DeleteParams;
  try {
    const gig = await req.server.prisma.gig.findUnique({
      where: {
        id: params.id,
      },
    });
    if (gig?.userId !== req.payload.userId)
      return sendError(reply, "You can delete only your gig!", 403);

    await req.server.prisma.gig.delete({
      where: {
        id: params.id,
      },
    });
    return sendSuccess(reply, "Gig has been deleted!", 200);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const getGig = async (req: FastifyRequest, reply: FastifyReply) => {};

export const getGigs = async (req: FastifyRequest, reply: FastifyReply) => {};
