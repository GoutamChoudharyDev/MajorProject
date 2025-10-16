import { useEffect, useRef, useState } from 'react';
import Housebg from '../assets/houseBg2.jpeg'
import Section from '../components/cardSection/Section'
import Footer from '../components/footer/Footer';
import Navbar from '../components/header/Navbar'
import axios from 'axios';

// ........Animated..........
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Home = ({ isLoggedIn, handleLogout }) => {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Local.......
        // const response = await axios.get("http://127.0.0.1:8000/api/properties/");

        // Deployed.....
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/`);

        setAllListings(response.data); // store all listings from backend
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Animate hero text once
  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, []); // run only once

  // Animate fade-section elements after data loads
  useEffect(() => {
    if (!loading && pageRef.current) {
      const sections = pageRef.current.querySelectorAll('.fade-section:not(.hero-text)');

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [loading]); // only after listings load


  // -----------------Animated-------------------------
  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <div
        className="min-h-screen bg-center bg-cover relative fade-section hero-text"
        style={{ backgroundImage: `url(${Housebg})`, backgroundPosition: "43% center" }}
      >
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <div className="absolute inset-0 flex items-center justify-center top-4 sm:top-0">
          <div className="text-center px-4">
            <h1
              ref={titleRef}
              className="text-4xl mt-16 sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
            >
              Find Your Dream Rental
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-sm"
            >
              <span className="bg-white/75 text-gray-800 font-normal px-3 py-1 rounded-lg border border-purple-800 sm:border-2">
                Your next home is just a click away
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="space-y-8 px-6 pt-10 pb-0 fade-section">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-t-yellow-400 border-b-red-500 border-l-gray-300 border-r-gray-300 rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Loading listings...</p>
          </div>
        ) : (
          <Section title="🏠 Popular Homes" data={allListings} />
        )}
      </div>

      {/* Footer */}
      <div className="fade-section">
        <Footer />
      </div>
    </div>
  );
}

export default Home
