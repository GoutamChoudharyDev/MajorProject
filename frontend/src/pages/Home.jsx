import { useEffect, useState } from 'react';
import Housebg from '../assets/houseBg2.jpeg'
import Section from '../components/cardSection/Section'
import Footer from '../components/footer/Footer';
import Navbar from '../components/header/Navbar'

const Home = ({ isLoggedIn, handleLogout, listings }) => {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    // Load listings from localStorage if not provided
    const storedListings = JSON.parse(localStorage.getItem("listings")) || [];
    setAllListings(storedListings);
  }, [listings]); // runs when new listing is added

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

      {/* Card Section */}
      <div className="space-y-8 px-6 py-10">
        <Section title="🏠 Popular Homes in Indore" data={allListings} />
      </div>

      {/* Footer */}
      <Footer />
    </div >
  )
}

export default Home
