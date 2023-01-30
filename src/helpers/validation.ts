import { z } from "zod";

export const createOrFindRoomPayloadSchema = z.object({
  roomId: z.string().min(4).max(20),
});

export type CreateOrFindRoomPayloadType = z.infer<
  typeof createOrFindRoomPayloadSchema
>;

export const validateJsonResponse = z.object({
  token: z.string(),
  identity: z.string(),
});

export type JsonResponseType = z.infer<typeof validateJsonResponse>;
