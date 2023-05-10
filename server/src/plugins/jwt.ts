import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import {
  FastifyRequest as Request,
  FastifyReply,
  FastifyPluginAsync,
} from "fastify";

const { JWT_KEY } = process.env;

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: Request, reply: FastifyReply) => FastifyReply;
  }
  interface FastifyRequest {
    payload: any;
  }
}

const jwtPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  if (!JWT_KEY) throw new Error("JWT secret not specified!");
  fastify.register(jwt, {
    secret: JWT_KEY,
  });

  fastify.decorate(
    "authenticate",
    async function (request: Request, reply: FastifyReply) {
      const token = request.cookies.accessToken;
      if (!token) return reply.code(401).send("Unauthorized!");

      request.server.jwt.verify(token, (err, payload) => {
        if (err) return reply.code(403).send("Token is not valid!");
        request.payload = payload;
      });
    }
  );
});

export default jwtPlugin;
