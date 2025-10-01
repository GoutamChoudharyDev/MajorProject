import { useEffect, useState } from 'react';
import Housebg from '../assets/houseBg2.jpeg'
import Section from '../components/cardSection/Section'
import Footer from '../components/footer/Footer';
import Navbar from '../components/header/Navbar'
import axios from 'axios';

const Home = ({ isLoggedIn, handleLogout }) => {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/properties/");
        setAllListings(response.data); // store all listings from backend
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(${Housebg})`,
          backgroundPosition: "43% center"
        }}>

        {/* Navbar */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {/* Hero content here */}
        <div className="absolute inset-0 flex items-center justify-center top-4 sm:top-0">
          <div className="text-white text-center px-4">
            <h1 className="text-4xl mt-16 sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Find Your Dream Rental</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-normal drop-shadow-sm">
              <span className="bg-white/75 text-gray-800 font-normal px-3 py-1 rounded-lg border border-purple-800 sm:border-2">
                Your next home is just a click away
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="space-y-8 px-6 pt-10 pb-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-t-yellow-400 border-b-red-500 border-l-gray-300 border-r-gray-300 rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Loading listings...</p>
          </div>
        ) : (
          <Section title="🏠 Popular Homes" data={allListings} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div >
  )
}

export default Home
