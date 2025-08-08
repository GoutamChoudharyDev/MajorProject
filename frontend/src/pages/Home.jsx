import Housebg from '../assets/houseBg2.jpeg'
import Navbar from '../components/header/Navbar'

const Home = ({ isLoggedIn, handleLogout }) => {
  return (
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
  )
}

export default Home
