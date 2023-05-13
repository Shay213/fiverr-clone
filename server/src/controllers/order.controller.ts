import { FastifyRequest, FastifyReply } from "fastify";

interface CreateOrderParams {
  gigId: string;
}

interface Payload {
  isSeller: boolean;
  userId: string;
}

export const createOrder = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError, sendSuccess } = req.server.replyHelpers;
  const { gigId } = req.params as CreateOrderParams;
  const { userId } = req.payload as Payload;
  try {
    const gig = await req.server.prisma.gig.findUnique({
      where: {
        id: gigId,
      },
    });
    if (!gig) return sendError(reply, "Gig doesn't exist!", 404);
    const order = await req.server.prisma.order.create({
      data: {
        gig: { connect: { id: gigId } },
        img: gig.cover,
        title: gig.title,
        buyer: { connect: { id: userId } },
        seller: { connect: { id: gig.userId } },
        price: gig.price,
        paymentIntent: "temporary",
      },
    });
    return sendSuccess(reply, "Successful", 200);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const getOrders = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const { userId, isSeller } = req.payload as Payload;

  try {
    const orders = await req.server.prisma.order.findMany({
      where: {
        AND: {
          ...(isSeller
            ? { seller: { id: userId } }
            : { buyer: { id: userId } }),
          isCompleted: true,
        },
      },
      include: {
        seller: { select: { username: true } },
        buyer: { select: { username: true } },
      },
    });
    return reply.code(200).send(orders);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};
