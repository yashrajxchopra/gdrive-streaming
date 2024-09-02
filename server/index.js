import { getAuthUrl, getToken, oauth2Client } from './auth.js';
import { listVideoFiles, setDriveClient } from './getVideos.js';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());

app.get('/auth/gmail', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/gmail/callback', async (req, res) => {
  const code = req.query.code ;
  try {
    const tokens = await getToken(code);
    setDriveClient(oauth2Client);
    res.send('Gmail authentication successful!');
  } catch (error) {
    console.error('Gmail authentication failed:', error);
    res.status(500).send('Gmail authentication failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
});

app.get('/api/getVideos', async (req, res) => {
    try {
        const videos = await listVideoFiles();
        res.json(videos);
      } catch (error) {
        console.error('Error listing video files:', error);
        res.status(500).send('Error listing video files: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});