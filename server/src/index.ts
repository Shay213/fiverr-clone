import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import prismaPlugin from "./prisma";

// routes
import userRoute from "./routes/user.route";
import reviewRoute from "./routes/review.route";
import orderRoute from "./routes/order.route";
import messageRoute from "./routes/message.route";
import gigRoute from "./routes/gig.route";
import conversationRoute from "./routes/conversation.route";

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);
fastify.register(userRoute);
fastify.register(reviewRoute);
fastify.register(orderRoute);
fastify.register(messageRoute);
fastify.register(gigRoute);
fastify.register(conversationRoute);

const { PORT } = process.env;

(async () => {
  try {
    await fastify.listen({ port: +(PORT ?? 3000) });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
