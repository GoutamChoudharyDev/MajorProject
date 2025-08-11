import Housebg from '../assets/houseBg2.jpeg'
import Section from '../components/cardSection/Section'
import Footer from '../components/footer/Footer';
import Navbar from '../components/header/Navbar'

const Home = ({ isLoggedIn, handleLogout, listings }) => {

  return (
    <div>
      <div className="min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${Housebg})` }}>

        {/* Navbar */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {/* Hero content here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Find Your Dream Rental</h1>
            <p className="text-xl md:text-2xl font-light drop-shadow-sm">Your next home is just a click away</p>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="space-y-8 px-6 py-10">
        <Section title="🏠 Popular Homes in Indore" data={listings} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
