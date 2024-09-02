import FolderContent from './components/FolderContent';
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/folder/:id" element={<FolderContent name={':id'}/>} />
    </Routes>
  </Router>
  )
}

export default App
