import React from "react";
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"
import MoodSelector from "./components/MoodSelector";
import Profile from "./components/Profile";
import './App.css'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><MoodSelector/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App