

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Folder from './Folder';
import './css/Home.css'


const Home = () => {
  const [videos, setVideos] = useState([]);
  
  const folders = [
    { name: 'Crayon+Shin-chan_Hungama+2006_Hindi+Uncut' },
    { name: 'Pictures' },
    { name: 'Music' },
    { name: 'Videos' },
    { name: 'Documents' },
    { name: 'Pictures' },
    { name: 'Music' },
    { name: 'Videos' },{ name: 'Documents' },
    { name: 'Pictures' },
    { name: 'Music' },
    { name: 'Videos' },
  ];

  useEffect(() => {
    // Fetch folders and videos from your backend API
    const fetchData = async () => {
      try {
        const videosResponse = await axios.get('http://localhost:3000/api/getVideos');
        setVideos(videosResponse.data);
        localStorage.setItem('apiData', JSON.stringify(videosResponse));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className='folder-list'>
      <Folder folders={folders}/>
    </div>
    </>
  );
};

export default Home;
