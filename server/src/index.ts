import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import cookie from "@fastify/cookie";
import jwtPlugin from "./plugins/jwt";

// routes
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import reviewRoute from "./routes/review.route";
import orderRoute from "./routes/order.route";
import messageRoute from "./routes/message.route";
import gigRoute from "./routes/gig.route";
import conversationRoute from "./routes/conversation.route";

const fastify = Fastify({ logger: true });

const { PORT } = process.env;

fastify.register(prismaPlugin);
fastify.register(jwtPlugin);
fastify.register(cookie);

// routes
fastify.register(userRoute, { prefix: "/api/users" });
fastify.register(authRoute, { prefix: "/api/auth" });
fastify.register(reviewRoute, { prefix: "/api/reviews" });
fastify.register(orderRoute, { prefix: "/api/orders" });
fastify.register(messageRoute, { prefix: "/api/messages" });
fastify.register(gigRoute, { prefix: "/api/gigs" });
fastify.register(conversationRoute, { prefix: "/api/conversations" });

(async () => {
  try {
    await fastify.listen({ port: +(PORT ?? 3000) });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
