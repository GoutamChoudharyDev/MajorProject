import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import axios from 'axios'

const App = () => {
  const navigate = useNavigate(); // to navitage other page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on load 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [])

  const handleLogout = async () => {
    try {
      // get refresh and access token from localStorage
      const refresh_token = localStorage.getItem('refresh_token');
      const access_token = localStorage.getItem('access_token');

      await axios.post('http://127.0.0.1:8000/api/accounts/logout/',
        { refresh_token }, // send token in body
        {
          headers: {
            Authorization: `Bearer ${access_token}`, //send access token in header
          },
        }
      )

      // Clear token from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      navigate('/login');

    } catch (error) {
      console.log("logout Error");
      // Still clear local storage even if API falis
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      navigate('/login');
    }
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
