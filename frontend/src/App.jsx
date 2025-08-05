import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  const navigate = useNavigate(); // to navitage other page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on load 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [])

  // handle logout
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
