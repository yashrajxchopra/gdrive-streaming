import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import folderImg from '../assets/folder.png'
import './css/Folder.css'
import { useNavigate } from 'react-router-dom';

const Folder = ({ folders }) => {
  const navigate = useNavigate();
  const handleClick = (FolderName) => {
    navigate(`/folder/${FolderName}`);
  }
  return (
    <div className="container">
        {folders.map(folder => (
            <div key={folder.id} className='folder'>
                <div className="image-container" onClick={() => handleClick(folder.name)}>
                    <img src={folderImg} alt='folder' />
                </div>
                <div>
                    <p className={folder.name.length > 33 ? ("folder-lname"):("folder-sname")}>
                    <span>{folder.name}</span>
                    </p>
                </div>
          </div>
    
    ))}
    </div>
  );
};

export default Folder;
