import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import SetPass from './components/SetPassword/SetPass';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setpassword/:email/:ltoken" element={<SetPass />} />

      </Routes>
    </div>
  )
}

export default App;