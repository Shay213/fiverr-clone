import { FastifyInstance } from "fastify";
import { register, login, logout } from "../controllers/auth.controller";

const User = {
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    img: { type: ["string", "null"] },
    country: { type: "string" },
    phone: { type: ["string", "null"] },
    desc: { type: ["string", "null"] },
    isSeller: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["username", "email", "password", "country"],
};

const registerOpts = {
  schema: {
    body: User,
    response: {
      201: {
        type: "object",
        message: { type: "string" },
      },
    },
  },
};

const { properties } = User;
const { password, ...rest } = properties;

const loginOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
    response: {
      201: {
        type: "object",
        rest,
        id: { type: "string" },
      },
    },
  },
};

export default function authRoute(
  fastify: FastifyInstance,
  options: object,
  done: () => void
) {
  fastify.post("/register", registerOpts, register);
  fastify.post("/login", loginOpts, login);
  //fastify.post("/logout", logoutOpts);
  done();
}
