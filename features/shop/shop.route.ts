import { FastifyInstance } from "fastify";
import {
  createShopHandler,
  getAllShopsHandler,
  updateShopHandler,
} from "./shop.controller";
import {
  createShopSchema,
  errorSchema,
  shopSchema,
  updateShopSchema,
} from "./shop.schema";

export default async function shopRoutes(fastify: FastifyInstance) {
  fastify.get("/shops", {
    schema: {
      description: "Get all shops",
      tags: ["shops"],
      response: {
        200: {
          type: "array",
          items: shopSchema,
        },
        500: errorSchema,
      },
    },
    handler: getAllShopsHandler,
  });

  fastify.post("/shops", {
    schema: {
      description: "Create a new shop",
      tags: ["shops"],
      body: createShopSchema.body,
      response: createShopSchema.response,
    },
    handler: createShopHandler,
  });

  fastify.put("/shops/:id", {
    schema: {
      description: "Update an existing shop by ID",
      tags: ["shops"],
      body: updateShopSchema.body,
      response: updateShopSchema.response,
    },
    handler: updateShopHandler,
  });
}
