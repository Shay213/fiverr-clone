import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import prismaPlugin from "./prisma";

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);

const { PORT } = process.env;

(async () => {
  try {
    await fastify.listen({ port: +(PORT ?? 3000) });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
