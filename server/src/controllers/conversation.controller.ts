import { FastifyRequest, FastifyReply } from "fastify";

interface Payload {
  userId: string;
  isSeller: boolean;
}

interface GetConversationsBody {
  to: string;
}

export const createConversation = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { sendError } = req.server.replyHelpers;
  const { isSeller, userId } = req.payload as Payload;
  const { to } = req.body as GetConversationsBody;

  const conversationId = isSeller ? userId + to : to + userId;
  const sellerId = isSeller ? userId : to;
  const buyerId = isSeller ? to : userId;

  try {
    const newConversation = await req.server.prisma.conversation.create({
      data: {
        id: conversationId,
        seller: { connect: { id: sellerId } },
        buyer: { connect: { id: buyerId } },
        readBySeller: isSeller,
        readByBuyer: !isSeller,
      },
    });
    return reply.code(201).send(newConversation);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const getConversations = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {};

export const getSingleConversation = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {};

interface UpdateConversationParams {
  id: string;
}

export const updateConversation = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { sendError } = req.server.replyHelpers;
  const { id } = req.params as UpdateConversationParams;
  const { isSeller } = req.payload as Payload;
  try {
    const updatedConversation = await req.server.prisma.conversation.update({
      where: {
        id: id,
      },
      data: {
        readBySeller: isSeller,
        readByBuyer: !isSeller,
      },
    });
    return reply.code(200).send(updatedConversation);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};
