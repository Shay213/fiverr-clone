import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

interface LoginBody {
  username: string;
  password: string;
}

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as User;
  const { sendError, sendSuccess } = req.server.replyHelpers;
  const hash = bcrypt.hashSync(body.password, 6);
  try {
    await req.server.prisma.user.create({
      data: { ...body, password: hash },
    });
    return sendSuccess(reply, "User has been created.", 201);
  } catch (error) {
    return sendError(reply, "Something went wrong!", 500);
  }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as LoginBody;
  const { sendError } = req.server.replyHelpers;
  try {
    const user = await req.server.prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (!user) return sendError(reply, "User not found!", 404);

    const isCorrect = bcrypt.compareSync(body.password, user.password);
    if (!isCorrect) return sendError(reply, "Wrong password or username!", 400);

    const payload = {
      userId: user.id,
      isSeller: user.isSeller,
    };

    const token = req.server.jwt.sign(payload);
    const { password, ...rest } = user;

    return reply
      .setCookie("accessToken", token, {
        path: "/",
        httpOnly: true,
      })
      .code(200)
      .send(rest);
  } catch (error) {
    return sendError(reply, "Something went wrong!", 500);
  }
};

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply
    .clearCookie("accessToken", { sameSite: "none", secure: true })
    .code(200)
    .send({ message: "User has been logged out." });
};
