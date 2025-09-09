import { ProductType } from "../product/product.dto";

export interface GetOrderByIdRequest {
  Params: {
    id: string;
  };
}

export interface CreateOrderRequest {
  Body: CreateOrderDTO;
}

export interface CreateOrderDTO {
  shopId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CreateOrderItemDTO[];
}

export interface UpdateOrderDTO {
  status?: OrderStatus;
}

export interface CreateOrderItemDTO {
  productId: number;
  productName: string;
  productType: ProductType;
  productPrice: number;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
