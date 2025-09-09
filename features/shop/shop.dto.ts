import { RequestGenericInterface } from "fastify/types/request";

export interface CreateShopRequest extends RequestGenericInterface {
  Body: CreateShopDto;
}

export interface UpdateShopRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
  Body: UpdateShopDto;
}

export interface CreateShopDto {
  name: string;
  location: string;
}

export interface UpdateShopDto {
  name?: string;
  location?: string;
  isActive?: boolean;
}
