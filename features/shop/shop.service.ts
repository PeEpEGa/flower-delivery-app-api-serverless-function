import { Prisma, Shop } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export const getShops = async (): Promise<Shop[]> =>
  prisma.shop.findMany({ where: { isActive: true } });

export const createShop = async (
  shop: Prisma.ShopCreateInput
): Promise<Shop> => {
  try {
    const newShop = await prisma.shop.create({
      data: shop,
    });

    return newShop;
  } catch (error) {
    console.error("Failed to create shop:", error);
    throw new Error("Could not create new shop");
  }
};

export const updateShop = async (
  id: number,
  updates: Prisma.ShopUpdateInput
): Promise<Shop> => {
  try {
    const shop = await prisma.shop.update({
      where: { id },
      data: updates,
    });

    return shop;
  } catch (error) {
    console.error("Failed to update shop:", error);
    throw new Error("Failed to update shop");
  }
};
