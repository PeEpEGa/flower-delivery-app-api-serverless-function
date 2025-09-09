export const shopSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    location: { type: "string" },
    isActive: { type: "boolean" },
  },
  required: ["id", "name", "location", "isActive"],
};

export const errorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export const createShopSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      location: { type: "string" },
    },
    required: ["name", "location"],
  },
  response: {
    201: shopSchema,
    500: errorSchema,
  },
};

export const updateShopSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      location: { type: "string" },
      isActive: { type: "boolean" },
    },
  },
  response: {
    200: shopSchema,
    //   404: errorSchema,
    500: errorSchema,
  },
};
