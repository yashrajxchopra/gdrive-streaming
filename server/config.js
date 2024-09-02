import dotenv from 'dotenv';

dotenv.config();

export const config = {
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URI,
  }
};

Object.entries(config).forEach(([key, value]) => {
  Object.entries(value).forEach(([subKey, subValue]) => {
    if (typeof subValue !== 'string') {
      throw new Error(`Configuration error: ${key}.${subKey} is not defined`);
    }
  });
});
