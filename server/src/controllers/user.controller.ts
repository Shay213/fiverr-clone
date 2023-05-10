import { FastifyRequest, FastifyReply } from "fastify";

interface ReqParams {
  id: string;
}

export const deleteUser = async (
  req: FastifyRequest<{ Params: ReqParams }>,
  reply: FastifyReply
) => {
  const user = await req.server.prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return reply.code(400).send("User doesn't exist!");
  if (req.payload.id !== user.id) {
    return reply.code(403).send("You can delete only your account!");
  }

  await req.server.prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  return reply.code(200).send({ message: "Account deleted!" });
};
