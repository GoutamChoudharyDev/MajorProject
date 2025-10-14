import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
// import Contact from './pages/Contact'
import axios from 'axios'
import Listings from './pages/Listings'
import ListingDetails from './pages/ListingDetails'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import MyListings from './pages/MyListings'
import BookingPage from './pages/BookingPage'
import EditListing from './pages/EditListing'

// ........Animated..........
import { AnimatePresence, motion } from 'framer-motion';

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }
};

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

  // ------------------Animated----------------
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} listings={listings} />
            </motion.div>
          }
        />

        <Route
          path='/login'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </motion.div>
          }
        />

        <Route
          path='/register'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <Signup />
            </motion.div>
          }
        />

        <Route
          path='/about'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <About />
            </motion.div>
          }
        />

        {/* <Route
          path='/contact'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <Contact />
            </motion.div>
          }
        /> */}

        <Route
          path='/listing/:id'
          element={
            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <ListingDetails />
            </motion.div>
          }
        />

        <Route
          path='/listings'
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Listings setListings={setListings} />
              </motion.div>
            </PrivateRoute>
          }
        />

        <Route
          path='/booking/:id'
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <BookingPage />
              </motion.div>
            </PrivateRoute>
          }
        />

        <Route
          path='/mylistings'
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <MyListings />
              </motion.div>
            </PrivateRoute>
          }
        />

        <Route
          path='/edit-listing/:id'
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <EditListing />
              </motion.div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App
