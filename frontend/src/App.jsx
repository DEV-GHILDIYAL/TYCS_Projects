import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import SetPass from './components/SetPassword/SetPass';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="https://tycs-projects-frontend-0ds0.onrender.com/" element={<Home />} />
        <Route path="https://tycs-projects-frontend-0ds0.onrender.com/setpassword/:email/:ltoken" element={<SetPass />} />

      </Routes>
    </div>
  )
}

export default App;
