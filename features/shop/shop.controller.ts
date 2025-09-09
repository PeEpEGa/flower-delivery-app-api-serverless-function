import { RouteHandler } from "../../types";
import { createShop, getShops, updateShop } from "./shop.service";
import { CreateShopRequest, UpdateShopRequest } from "./shop.dto";

export const getAllShopsHandler: RouteHandler = async (request, reply) => {
  try {
    const shops = await getShops();
    return reply.code(200).send(shops);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const createShopHandler: RouteHandler<CreateShopRequest> = async (
  request,
  reply
) => {
  try {
    const { name, location } = request.body;
    const newShop = await createShop({ name, location });
    return reply.code(201).send(newShop);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const updateShopHandler: RouteHandler<UpdateShopRequest> = async (
  request,
  reply
) => {
  try {
    const { id } = request.params;
    const { name, location, isActive } = request.body;

    const updatedShop = await updateShop(Number(id), {
      name,
      location,
      isActive,
    });
    return reply.code(200).send(updatedShop);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};
