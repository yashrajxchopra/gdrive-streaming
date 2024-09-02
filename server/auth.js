import { google } from 'googleapis';
import { config } from './config.js';

console.log('Client ID:', config.gmail.clientId);
console.log('Client Secret:', config.gmail.clientSecret ? '[REDACTED]' : 'Missing');
console.log('Redirect URI:', config.gmail.redirectUri);

const oauth2Client = new google.auth.OAuth2(
  config.gmail.clientId,
  config.gmail.clientSecret,
  config.gmail.redirectUri
);

export const getAuthUrl = () => {
  const url =  oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  console.log('Generated Auth URL:', url);
  return url;
};

export const getToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export const setCredentials = (tokens) => {
  oauth2Client.setCredentials(tokens);
};


export { oauth2Client };