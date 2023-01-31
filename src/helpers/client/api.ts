import { type Room, connect } from "twilio-video";
import { validateJsonResponse } from "../validation";

export const joinRoom = async (
  type: "create" | "find",
  roomId: string
): Promise<Room | undefined> => {
  const requestMeta: RequestInit = {
    method: "POST",
    body: JSON.stringify({ roomId }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response: Response;
  try {
    if (type === "create") {
      response = await fetch(`/api/create-and-join-room`, requestMeta);
    } else {
      response = await fetch(`/api/find-and-join-room`, requestMeta);
    }
    const data = validateJsonResponse.parse(await response.json());

    return await connect(data.token, {
      name: roomId,
      audio: true,
      video: { width: 640 }
    });
  } catch (ex) {
    console.error(ex);
  }
};
