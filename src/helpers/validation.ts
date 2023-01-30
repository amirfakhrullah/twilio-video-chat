import { z } from "zod";

export const createOrFindRoomPayloadSchema = z.object({
  roomId: z.string().min(4).max(20),
});

export type CreateOrFindRoomPayloadType = z.infer<
  typeof createOrFindRoomPayloadSchema
>;
