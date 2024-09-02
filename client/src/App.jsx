import FolderContent from './components/FolderContent';
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/folder/:id/" element={<FolderContent/>} />
      <Route path="/:fileId/" element={<VideoPlayer />} />
    </Routes>
  </Router>
  )
}

export default App
