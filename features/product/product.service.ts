import { supabase } from "../../shared/db/supabase";
import { prisma } from "../../shared/db/prisma";
import {
  CreateProductDTO,
  GetProductsByShopOptions,
  UpdateProductDTO,
} from "./product.dto";

export const uploadProductImage = async (file: Buffer, filename: string) => {
  const { data: fileData, error } = await supabase.storage
    .from("flower-catalog-images")
    .upload(`products/${Date.now()}-${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Failed to upload image:", error);
    throw new Error("Could not upload new image");
  }

  if (!fileData?.path) throw new Error("Invalid file path returned");

  const { data: urlData } = supabase.storage
    .from("flower-catalog-images")
    .getPublicUrl(fileData.path);

  return urlData.publicUrl;
};

export const createProduct = async (product: CreateProductDTO) => {
  try {
    const shop = await prisma.shop.findUnique({
      where: { id: product.shopId },
    });
    if (!shop) {
      throw new Error("Shop not found");
    }

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        type: product.type,
        price: product.price,
        imageUrl: product.imageUrl,
        shop: { connect: { id: product.shopId } },
      },
    });
    return newProduct;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("Could not create new product");
  }
};

export const updateProduct = async (id: number, updates: UpdateProductDTO) => {
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const { name, type, price, isActive, imageUrl } = updates;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(type !== undefined && { type }),
        ...(price !== undefined && { price }),
        ...(isActive !== undefined && { isActive }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw new Error(
      error instanceof Error ? error.message : "Could not update product"
    );
  }
};

export const getProductById = async (id: number) => {
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    return existingProduct;
  } catch (error) {
    console.error("Failed to get product by id:", error);
    throw new Error(
      error instanceof Error ? error.message : "Could not get product by id"
    );
  }
};

export const getProductsByShop = async ({
  shopId,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "asc",
}: GetProductsByShopOptions) => {
  try {
    const products = await prisma.product.findMany({
      where: { shopId },
      orderBy: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.product.count({ where: { shopId } });

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Failed to get products by shop:", error);
    throw new Error(
      error instanceof Error ? error.message : "Could not get products"
    );
  }
};
