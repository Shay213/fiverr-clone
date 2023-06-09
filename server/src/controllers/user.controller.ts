import { FastifyRequest, FastifyReply } from "fastify";

interface ReqParams {
  id: string;
}

export const deleteUser = async (
  req: FastifyRequest<{ Params: ReqParams }>,
  reply: FastifyReply
) => {
  const { sendError, sendSuccess } = req.server.replyHelpers;
  try {
    const user = await req.server.prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!user) return sendError(reply, "User doesn't exist!", 400);
    if (req.payload.id !== user.id) {
      return sendError(reply, "You can delete only your account!", 403);
    }

    await req.server.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return sendSuccess(reply, "Account deleted!", 200);
  } catch (error) {
    return sendError(reply, "Something went wrong!", 500);
  }
};
