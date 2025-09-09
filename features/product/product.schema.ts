export const productSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    type: { type: "string" },
    price: { type: "number" },
    shopId: { type: "number" },
    imageUrl: { type: "string" },
    isActive: { type: "boolean" },
    createdAt: { type: "string" },
  },
  required: ["id", "name", "type", "price", "shopId", "isActive", "createdAt"],
};

export const errorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export const createProductSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      type: { type: "string" },
      price: { type: "number" },
      shopId: { type: "number" },
      imageUrl: { type: "string" },
    },
    required: ["name", "type", "price", "shopId"],
  },
  response: {
    201: productSchema,
    500: errorSchema,
  },
};

export const updateProductSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      type: { type: "string" },
      price: { type: "number" },
      isActive: { type: "boolean" },
      imageUrl: { type: "string" },
    },
  },
  response: {
    200: productSchema,
    500: errorSchema,
  },
};

export const uploadProductImageSchema = {
  //   body: {
  //     type: "object",
  //   },
  response: {
    201: {
      type: "object",
      properties: {
        filePath: { type: "string" },
      },
      required: ["filePath"],
    },
    400: errorSchema,
    500: errorSchema,
  },
};

export const productsByShopSchema = {
  query: {
    type: "object",
    properties: {
      shopId: { type: "string" },
      page: { type: "string" },
      limit: { type: "string" },
      sortBy: { type: "string", enum: ["price", "createdAt"] },
      order: { type: "string", enum: ["asc", "desc"] },
    },
    required: ["shopId"],
  },
};
