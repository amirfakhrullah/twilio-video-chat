const getEnvSafely = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const env = {
  TWILIO_ACCOUNT_SID: getEnvSafely("TWILIO_ACCOUNT_SID"),
  TWILIO_API_KEY_SID: getEnvSafely("TWILIO_API_KEY_SID"),
  TWILIO_API_KEY_SECRET: getEnvSafely("TWILIO_API_KEY_SECRET"),
};
