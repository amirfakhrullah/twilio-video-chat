import { env } from "@/env/env";
import twilio from "twilio";
import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
import { v4 as uuidv4 } from "uuid";

let twilioClient: twilio.Twilio | undefined;

export const getTwilioClient = () => {
  if (!twilioClient) {
    twilioClient = twilio(env.TWILIO_API_KEY_SID, env.TWILIO_API_KEY_SECRET, {
      accountSid: env.TWILIO_ACCOUNT_SID,
    });
  }
  return twilioClient;
};

export const getAccessToken = (roomId: string) => {
  const identity = uuidv4();
  try {
    const token = new AccessToken(
      env.TWILIO_ACCOUNT_SID,
      env.TWILIO_API_KEY_SID,
      env.TWILIO_API_KEY_SECRET,
      { identity }
    );

    const videoGrant = new VideoGrant({
      room: roomId,
    });
    token.addGrant(videoGrant);
    return {
      token: token.toJwt(),
      identity,
    };
  } catch (ex) {
    if (ex instanceof Error) {
      throw new Error(ex.message);
    }
    throw new Error(`There's an error creating an access token`);
  }
};
