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

app.get('/api/:id', async (req, res) => {
  const videoSrc = `https://drive.google.com/file/d/${req.params.id}/preview`;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Video Player</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        .video-player-container {
          width: 80%;
          max-width: 800px;
        }
        iframe {
          width: 100%;
          height: 480px;
          border: none;
        }
      </style>
    </head>
    <body>
      <div class="video-player-container">
        <iframe src="${videoSrc}" allow="autoplay"></iframe>
      </div>
    </body>
    </html>
  `);

})





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});