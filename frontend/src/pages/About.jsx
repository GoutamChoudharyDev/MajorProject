import { FaHome, FaRocket, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="bg-slate-900 min-h-screen text-gray-100">
      {/* Page Header */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 rounded-b-3xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          <span className="text-yellow-400">E</span>asy
          <span className="text-red-500">R</span>ent
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Your trusted platform for finding dream rentals with ease and comfort.
        </p>
      </div>

      {/* About Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission Card */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaHome className="text-yellow-400 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3 text-white">Our Mission</h2>
          <p className="text-gray-300">
            At EasyRent, our mission is to make renting properties simple, transparent, and enjoyable.
            We connect tenants and property owners efficiently.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaRocket className="text-red-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3 text-white">Our Vision</h2>
          <p className="text-gray-300">
            We envision a world where finding your next home is stress-free. Using intuitive design
            and technology, we provide the best rental experience.
          </p>
        </div>

        {/* Why Choose Us Card */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaShieldAlt className="text-yellow-400 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3 text-white">Why Choose EasyRent?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Verified listings with accurate details and images.</li>
            <li>Easy search and filter options for the perfect property.</li>
            <li>Secure communication between tenants and owners.</li>
            <li>24/7 support for a smooth rental experience.</li>
            <li>User-friendly interface optimized for all devices.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 shadow-xl rounded-t-3xl mx-6 md:mx-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400 pt-12">
          Ready to find your next home?
        </h2>
        <p className="text-gray-300 mb-6 px-6">
          Join EasyRent today and explore thousands of verified properties.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-red-500 text-white font-semibold py-3 px-8 mb-12 rounded-full shadow-lg hover:bg-red-600 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
