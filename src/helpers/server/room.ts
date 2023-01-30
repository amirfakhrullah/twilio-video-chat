import { getTwilioClient } from "@/lib/twilio";

export const createRoom = async (roomId: string) => {
  const twilioClient = getTwilioClient();
  try {
    await twilioClient.video.rooms.create({
      uniqueName: roomId,
      type: "go",
    });
  } catch (ex) {
    if (ex instanceof Error) {
      throw new Error(ex.message);
    }
    throw new Error(`An error occured when trying to create room ${roomId}`);
  }
};

export const findRoom = async (roomId: string) => {
  const twilioClient = getTwilioClient();
  try {
    await twilioClient.video.rooms(roomId).fetch();
  } catch (ex) {
    if (ex instanceof Error) {
      throw new Error(ex.message);
    }
    throw new Error(`An error occured when trying to find room ${roomId}`);
  }
};
