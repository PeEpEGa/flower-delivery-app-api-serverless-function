import { RouteHandler } from "fastify";
import {
  CreateProductRequest,
  GetProductByIdRequest,
  GetProductsByShopRequest,
  UpdateProductRequest,
  UploadProductImageRequest,
} from "./product.dto";
import {
  createProduct,
  getProductById,
  getProductsByShop,
  updateProduct,
  uploadProductImage,
} from "./product.service";
import { streamToBuffer } from "../../shared/utils/streamToBuffer";

export const uploadProductImageHandler: RouteHandler<
  UploadProductImageRequest
> = async (request, reply) => {
  try {
    const data = await request.file();

    if (!data) {
      return reply.code(400).send({ error: "No file provided" });
    }

    const { filename, file } = data;

    const buffer = await streamToBuffer(file);

    const filePath = await uploadProductImage(buffer, filename);

    return reply.code(201).send({ filePath });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const getProductByIdHandler: RouteHandler<
  GetProductByIdRequest
> = async (request, reply) => {
  try {
    const { id } = request.params;
    const productId = Number(id);
    if (isNaN(productId)) {
      return reply.code(400).send({ error: "Invalid product ID" });
    }

    const product = await getProductById(productId);
    return reply.code(200).send(product);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const createProductHandler: RouteHandler<CreateProductRequest> = async (
  request,
  reply
) => {
  try {
    const { name, type, price, shopId, imageUrl } = request.body;
    const newProduct = await createProduct({
      name,
      type,
      price,
      shopId,
      imageUrl,
    });
    return reply.code(201).send(newProduct);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const updateProductHandler: RouteHandler<UpdateProductRequest> = async (
  request,
  reply
) => {
  try {
    const { id } = request.params;
    const productId = Number(id);
    if (isNaN(productId)) {
      return reply.code(400).send({ error: "Invalid product ID" });
    }

    const { name, type, price, isActive, imageUrl } = request.body;
    const updatedProduct = await updateProduct(productId, {
      name,
      type,
      price,
      isActive,
      imageUrl,
    });
    return reply.code(200).send(updatedProduct);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const getProductsByShopHandler: RouteHandler<
  GetProductsByShopRequest
> = async (request, reply) => {
  try {
    const shopId = request.query.shopId
      ? Number(request.query.shopId)
      : undefined;
    if (shopId !== undefined && isNaN(shopId)) {
      return reply.code(400).send({ error: "Invalid shopId" });
    }

    const { page, limit, sortBy, order } = request.query;

    const result = await getProductsByShop({
      shopId: shopId!,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy,
      order,
    });

    return reply.code(200).send(result);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Failed to fetch products" });
  }
};
