import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import {
  FastifyRequest as Request,
  FastifyReply,
  FastifyPluginCallback,
  FastifyInstance,
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

const jwtPlugin: FastifyPluginCallback = fp(
  (fastify: FastifyInstance, options: object, done: () => void) => {
    if (!JWT_KEY) throw new Error("JWT secret not specified!");
    fastify.register(jwt, {
      secret: JWT_KEY,
    });

    fastify.decorate(
      "authenticate",
      async function (request: Request, reply: FastifyReply) {
        const token = request.cookies.accessToken;
        const { sendError } = request.server.replyHelpers;
        if (!token) return sendError(reply, "Unauthorized!", 401);

        request.server.jwt.verify(token, (err, payload) => {
          if (err) return sendError(reply, "Token is not valid!", 403);
          request.payload = payload;
        });
      }
    );
    done();
  }
);

export default jwtPlugin;
