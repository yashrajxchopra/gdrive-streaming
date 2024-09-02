import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/FolderContent.css'
export default function FolderContent() {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const navigate = useNavigate();

  const filterData = async (data) => {
      // Ensure `data` has a `data` property
      const filter = data.data.filter(item => item.folderPath === id);
      filter.sort((a, b) => a.name.localeCompare(b.name))
      return filter;
  };
  const handleClick = (fileId) => {
    navigate(`/${fileId}`);
  };

  useEffect(() => {
      const fetchData = async () => {
          // Check local storage and update state if necessary
          const localData = localStorage.getItem('apiData');
          if (localData) {
              const parsedData = JSON.parse(localData);
              setData(parsedData);
              console.log(parsedData);
              console.log(id);
              
              try {
                  const result = await filterData(parsedData);
                  setFilteredData(result);
                  console.log(result); // Log the filtered data to the console
              } catch (error) {
                  console.error('Error filtering data:', error); // Handle any errors that occur during filtering
              }
          }
      };

      fetchData();
  }, [id]);

  return (
    <div>
    <div>{id}</div>
    <div>
    {filteredData && filteredData.length > 0 ? (
        filteredData.map(item => (
          <div key={item.id} className='file-name' onClick={() => handleClick(item.id)}>
            <h2>Folder Path: {item.name}</h2>
            <p>{item.content}</p>
          </div>
        ))
      ) : (
        <p>No files.</p>
      )}
    </div>
    </div>
  )
}
