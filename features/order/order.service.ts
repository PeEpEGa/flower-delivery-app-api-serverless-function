import { prisma } from "../../shared/db/prisma";
import { CreateOrderDTO } from "./order.dto";

export const getOrderById = async (id: number) => {
  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
    if (!existingOrder) {
      throw new Error("Order not found");
    }

    return existingOrder;
  } catch (error) {
    console.error("Failed to get order by id:", error);
    throw new Error(
      error instanceof Error ? error.message : "Could not get order by id"
    );
  }
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: true,
    },
  });
};

export const createOrder = async (order: CreateOrderDTO) => {
  try {
    const totalPrice = order.items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );

    const newOrder = await prisma.order.create({
      data: {
        shopId: order.shopId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        totalPrice,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productType: item.productType,
            productPrice: item.productPrice,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return newOrder;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw new Error("Could not create new order");
  }
};
