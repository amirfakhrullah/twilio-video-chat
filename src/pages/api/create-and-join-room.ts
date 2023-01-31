import { parseAndValidateReqBody } from "@/helpers/server/middlewares/parseAndValidateReqBody";
import { createRoom } from "@/helpers/server/room";
import {
  CreateOrFindRoomPayloadType,
  createOrFindRoomPayloadSchema,
} from "@/helpers/validation";
import { getAccessToken } from "@/lib/twilio";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  const { roomId } = req.body as CreateOrFindRoomPayloadType;

  try {
    await createRoom(roomId);
    const { token, identity } = getAccessToken(roomId);
    return res.status(200).send({
      token,
      identity,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return res.status(400).send({
        message: ex.message,
      });
    }
    return res.status(400).send({
      message: "An error occured",
    });
  }
}

export default parseAndValidateReqBody(createOrFindRoomPayloadSchema, handler);
