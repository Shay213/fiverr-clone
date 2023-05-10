import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginBody {
  username: string;
  password: string;
}

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as User;
  const hash = bcrypt.hashSync(body.password, 6);
  try {
    const newUser = await req.server.prisma.user.create({
      data: { ...body, password: hash },
    });
    reply.code(201).send({ message: "User has been created." });
  } catch (error) {
    reply.code(500).send("Something went wrong!");
  }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as LoginBody;
  try {
    const user = await req.server.prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (!user) return reply.code(404).send("User not found!");

    const isCorrect = bcrypt.compareSync(body.password, user.password);
    if (!isCorrect) return reply.code(400).send("Wrong password or username!");

    const JWT_KEY = process.env.JWT_KEY as string;

    const token = jwt.sign(
      {
        id: user.id,
        isSeller: user.isSeller,
      },
      JWT_KEY
    );

    const { password, ...rest } = user;
    reply
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .code(200)
      .send(rest);
  } catch (error) {
    reply.code(500).send("Something went wrong!");
  }
};

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send("from controller");
};
