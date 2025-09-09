import { FastifyInstance } from "fastify";
import { errorSchema } from "../shop/shop.schema";
import {
  createProductHandler,
  getProductByIdHandler,
  getProductsByShopHandler,
  updateProductHandler,
  uploadProductImageHandler,
} from "./product.controller";
import {
  createProductSchema,
  productsByShopSchema,
  productSchema,
  updateProductSchema,
  uploadProductImageSchema,
} from "./product.schema";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/products/:id", {
    schema: {
      description: "Get a product by ID",
      tags: ["products"],
      response: {
        200: productSchema,
        400: errorSchema,
        500: errorSchema,
      },
    },
    handler: getProductByIdHandler,
  });

  fastify.get("/products", {
    schema: {
      description: "Get all products or filter by shop",
      tags: ["products"],
      querystring: productsByShopSchema.query,
      response: {
        200: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: productSchema,
            },
            pagination: {
              type: "object",
              properties: {
                page: { type: "number" },
                limit: { type: "number" },
                total: { type: "number" },
                totalPages: { type: "number" },
              },
            },
          },
        },
        500: errorSchema,
      },
    },
    handler: getProductsByShopHandler,
  });

  fastify.post("/products", {
    schema: {
      description: "Create a new product",
      tags: ["products"],
      body: createProductSchema.body,
      response: createProductSchema.response,
    },
    handler: createProductHandler,
  });

  fastify.put("/products/:id", {
    schema: {
      description: "Update an existing product by ID",
      tags: ["products"],
      body: updateProductSchema.body,
      response: updateProductSchema.response,
    },
    handler: updateProductHandler,
  });

  fastify.post("/images/products", {
    schema: {
      description: "Upload an image for a product",
      tags: ["products"],
      //   body: uploadProductImageSchema.body,
      response: uploadProductImageSchema.response,
    },
    handler: uploadProductImageHandler,
  });
}
