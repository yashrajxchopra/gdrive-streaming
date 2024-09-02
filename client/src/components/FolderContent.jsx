import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function FolderContent() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const filteredData = [];
    useEffect(() => {
        // Check local storage and update state if necessary
        const localData = localStorage.getItem('apiData');
        if (localData) {
          setData(JSON.parse(localData));
        }
      }, []);
      if(data !== null){
        const filteredData = data.data.filter(item => item.folderPath === 'Crayon+Shin-chan_Hungama+2006_Hindi+Uncut');
      }

  return (
    <div>
    <div>{id}</div>
    <div>
    {filteredData.length > 0 ? (
        filteredData.map(item => (
          <div key={item.id}>
            <h2>Folder Path: {item.folderPath}</h2>
            <p>{item.content}</p>
          </div>
        ))
      ) : (
        <p>No data found for folderPath "shinchan".</p>
      )}
    </div>
    </div>
  )
}
