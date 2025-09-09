import { FastifyInstance } from "fastify";
import {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
} from "./order.controller";
import { createOrderSchema, orderSchema } from "./order.schema";
import { errorSchema } from "../shop/shop.schema";

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.get("/orders", {
    schema: {
      description: "Get all orders",
      tags: ["orders"],
      response: {
        200: {
          type: "array",
          items: orderSchema,
        },
        500: errorSchema,
      },
    },
    handler: getAllOrdersHandler,
  });

  fastify.get("/orders/:id", {
    schema: {
      description: "Get an order by ID",
      tags: ["orders"],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      response: {
        200: orderSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: getOrderByIdHandler,
  });

  fastify.post("/orders", {
    schema: {
      description: "Create a new order",
      tags: ["orders"],
      body: createOrderSchema.body,
      response: createOrderSchema.response,
    },
    handler: createOrderHandler,
  });
}
