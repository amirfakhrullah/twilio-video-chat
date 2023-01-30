import { parseAndValidateReqBody } from "@/helpers/server/middlewares/parseAndValidateReqBody";
import { findRoom } from "@/helpers/server/room";
import {
  CreateOrFindRoomPayloadType,
  createOrFindRoomPayloadSchema,
} from "@/helpers/validation";
import { getAccessToken } from "@/lib/twilio";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).end();
  }

  const { roomId } = req.body as CreateOrFindRoomPayloadType;

  let token: string;
  try {
    await findRoom(roomId);
    token = getAccessToken(roomId);
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
  res.status(200).send({
    token,
  });
}

export default parseAndValidateReqBody(createOrFindRoomPayloadSchema, handler);
