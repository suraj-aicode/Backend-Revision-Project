import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed/>} />
      </Routes>
    </Router>
  );
}

export default App
