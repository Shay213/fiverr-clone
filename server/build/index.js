import Fastify from "fastify";
import * as dotenv from "dotenv";
dotenv.config();
const fastify = Fastify({ logger: true });
const PORT = process.env;
(async () => {
    try {
        await fastify.listen({ port: 3000 });
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})();
