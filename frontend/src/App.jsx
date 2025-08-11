import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import axios from 'axios'
import Listings from './pages/Listings'

const App = () => {
  // To Navigate on the other page
  const navigate = useNavigate();

  // UseState to Check login or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useState for listing
  const [listings, setListings] = useState([]);

  // Check token on load 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [])

  // Logout handler
  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      const access_token = localStorage.getItem('access_token');

      // Make sure token exists before sending
      if (!access_token) {
        console.warn("No access token found, skipping logout request.");
      } else {
        await axios.post(
          'http://localhost:8000/api/accounts/logout/',
          { refresh_token }, // body data
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            }
          }
        );
      }

    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    } finally {
      // Clear local storage and update state
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} listings={listings} />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/listings' element={<Listings setListings={setListings} />} />
      </Routes>
    </>
  )
}

export default App
