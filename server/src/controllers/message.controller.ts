import { FastifyRequest, FastifyReply } from "fastify";

interface Params {
  id: string;
}

interface Payload {
  userId: string;
  isSeller: boolean;
}
interface CreateMessageBody {
  conversationId: string;
  desc: string;
}

export const createMessage = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { sendError } = req.server.replyHelpers;
  const { userId, isSeller } = req.payload as Payload;
  const { conversationId, desc } = req.body as CreateMessageBody;

  try {
    const newMessage = await req.server.prisma.message.create({
      data: {
        conversation: { connect: { id: conversationId } },
        user: { connect: { id: userId } },
        description: desc,
      },
    });

    await req.server.prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        readBySeller: isSeller,
        readByBuyer: !isSeller,
        lastMessage: desc,
        updatedAt: new Date().toISOString(),
      },
    });

    return reply.code(201).send(newMessage);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const getMessages = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const { id } = req.params as Params;
  try {
    const messages = await req.server.prisma.message.findMany({
      where: {
        conversation: { id: id },
      },
      include: {
        user: { select: { img: true } },
      },
    });
    return reply.code(200).send(messages);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};
