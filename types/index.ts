import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";

export type RouteHandler<
  T extends RequestGenericInterface = RequestGenericInterface
> = (
  request: FastifyRequest<T>,
  reply: FastifyReply
) => Promise<FastifyReply | void>;
