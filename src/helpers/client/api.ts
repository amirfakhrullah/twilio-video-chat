import { Room, connect } from "twilio-video";
import { validateJsonResponse } from "../validation";

export const createAndJoinRoom = async (roomId: string): Promise<Room | undefined> => {
  try {
    const response = await fetch(`/api/create-and-join-room`);
    const data = validateJsonResponse.parse(await response.json());
    return await connect(data.token, {
      name: roomId,
      audio: true,
      video: true,
    });
  } catch (ex) {
    console.error(ex);
  }
};
