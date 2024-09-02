import React from 'react';
import './css/VideoPlayer.css'; // Make sure to create this CSS file
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
    const { fileId } = useParams(); 
    const videoSrc = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="video-player-container">
      <iframe src={videoSrc} width="100%" height="100%" allow="autoplay" allowFullScreen="fullscreen" ></iframe>
    </div>
  );
};

export default VideoPlayer;
