import { OrderStatus } from "./order.dto";

export const orderItemSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    orderId: { type: "number" },
    productId: { type: "number" },
    productName: { type: "string" },
    productType: { type: "string" },
    productPrice: { type: "number" },
    quantity: { type: "number" },
  },
  required: [
    "id",
    "orderId",
    "productId",
    "productName",
    "productType",
    "productPrice",
    "quantity",
  ],
};

export const orderSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    shopId: { type: "number" },
    customerName: { type: "string" },
    customerEmail: { type: "string" },
    customerPhone: { type: "string" },
    customerAddress: { type: "string" },
    totalPrice: { type: "number" },
    status: { type: "string", enum: Object.values(OrderStatus) },
    createdAt: { type: "string", format: "date-time" },
    items: {
      type: "array",
      items: orderItemSchema,
    },
  },
  required: [
    "id",
    "shopId",
    "customerName",
    "customerEmail",
    "customerPhone",
    "customerAddress",
    "totalPrice",
    "status",
    "createdAt",
    "items",
  ],
};

export const createOrderSchema = {
  body: {
    type: "object",
    properties: {
      shopId: { type: "number" },
      customerName: { type: "string" },
      customerEmail: { type: "string" },
      customerPhone: { type: "string" },
      customerAddress: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            productId: { type: "number" },
            productName: { type: "string" },
            productType: { type: "string" },
            productPrice: { type: "number" },
            quantity: { type: "number" },
          },
          required: [
            "productId",
            "productName",
            "productType",
            "productPrice",
            "quantity",
          ],
        },
      },
    },
    required: [
      "shopId",
      "customerName",
      "customerEmail",
      "customerPhone",
      "customerAddress",
      "items",
    ],
  },
  response: {
    201: orderSchema,
    500: {
      type: "object",
      properties: { error: { type: "string" } },
    },
  },
};
