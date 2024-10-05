import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import LoginComponent from './components/LoginComponent/LoginComponent';
import RegisterPage from './components/RegisterComponent/RegisterComponent';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App;