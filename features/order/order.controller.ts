import { RouteHandler } from "fastify/types/route";
import { CreateOrderRequest, GetOrderByIdRequest } from "./order.dto";
import { createOrder, getAllOrders, getOrderById } from "./order.service";

export const getOrderByIdHandler: RouteHandler<GetOrderByIdRequest> = async (
  request,
  reply
) => {
  try {
    const { id } = request.params;
    const orderId = Number(id);
    if (isNaN(orderId)) {
      return reply.code(400).send({ error: "Invalid order ID" });
    }

    const order = await getOrderById(orderId);
    return reply.code(200).send(order);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const getAllOrdersHandler: RouteHandler = async (request, reply) => {
  try {
    const orders = await getAllOrders();
    return reply.code(200).send(orders);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const createOrderHandler: RouteHandler<CreateOrderRequest> = async (
  request,
  reply
) => {
  try {
    const {
      shopId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
    } = request.body;
    const newOrder = await createOrder({
      shopId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
    });
    return reply.code(201).send(newOrder);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};
