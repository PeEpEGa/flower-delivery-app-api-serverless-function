import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import shopRoutes from "../features/shop/shop.route";
import productRoutes from "../features/product/product.route";
import orderRoutes from "../features/order/order.route";

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fastify + Vercel</title>
  </head>
  <body>
    <h1>Fastify + Vercel</h1>
    <p>Serverless API is running!</p>
  </body>
</html>
`;

async function buildApp() {
  const fastify = Fastify({ logger: true });

  fastify.get("/", async (req, res) => {
    return res.status(200).type("text/html").send(html);
  });

  await fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await fastify.register(multipart, { limits: { fileSize: 5 * 1024 * 1024 } });

  await fastify.register(shopRoutes, { prefix: "/api" });
  await fastify.register(productRoutes, { prefix: "/api" });
  await fastify.register(orderRoutes, { prefix: "/api" });

  await fastify.ready();
  return fastify;
}

const appPromise = buildApp();

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  app.server.emit("request", req, res);
}
