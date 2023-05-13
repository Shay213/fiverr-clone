import { FastifyRequest, FastifyReply } from "fastify";
import Stripe from "stripe";

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

interface IntentBody {
  id: string;
}

export const intent = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const STRIPE = process.env.STRIPE;
  if (!STRIPE) return sendError(reply, "Missing stripe secret!", 404);
  const stripe = new Stripe(STRIPE, { apiVersion: "2022-11-15" });
  const { id } = req.body as IntentBody;
  const { userId } = req.payload as Payload;
  try {
    const gig = await req.server.prisma.gig.findUnique({
      where: {
        id: id,
      },
    });
    if (!gig) return sendError(reply, "Gig doesn't exist!", 404);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const order = await req.server.prisma.order.create({
      data: {
        gig: { connect: { id: gig.id } },
        img: gig.cover,
        title: gig.title,
        buyer: { connect: { id: userId } },
        seller: { connect: { id: gig.userId } },
        price: gig.price,
        paymentIntent: paymentIntent.id,
      },
    });
    return reply.code(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};
