import { RequestGenericInterface } from "fastify/types/request";

export interface UploadProductImageRequest extends RequestGenericInterface {
  Body: unknown;
}

export interface CreateProductRequest extends RequestGenericInterface {
  Body: CreateProductDTO;
}

export interface UpdateProductRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
  Body: UpdateProductDTO;
}

export interface GetProductByIdRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

export interface GetProductsByShopRequest extends RequestGenericInterface {
  Querystring: GetProductsByShopQuery;
}

interface GetProductsByShopQuery {
  shopId: string;
  page?: string;
  limit?: string;
  sortBy?: "price" | "createdAt";
  order?: "asc" | "desc";
}

export interface CreateProductDTO {
  name: string;
  type: ProductType;
  price: number;
  shopId: number;
  imageUrl?: string;
}

export interface UpdateProductDTO {
  name?: string;
  type?: ProductType;
  price?: number;
  isActive?: boolean;
  imageUrl?: string;
}

export interface GetProductsByShopOptions {
  shopId: number;
  page?: number;
  limit?: number;
  sortBy?: "price" | "createdAt";
  order?: "asc" | "desc";
}

export enum ProductType {
  FLOWER = "FLOWER",
  BOUQUET = "BOUQUET",
}
