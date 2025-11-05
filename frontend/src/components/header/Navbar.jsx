import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// react icons........
import { FiSearch } from "react-icons/fi";

const Navbar = ({ isLoggedIn, handleLogout, onSearch }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Hamburger functionality (togle)
    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            if (onSearch) {
                onSearch(searchTerm);
            } else {
                navigate(`/listings?search=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 p-4 shadow-xl rounded-2xl  mt-3 fixed top-0 left-1/2 transform -translate-x-1/2 w-[92%] z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

                {/* Logo & Title */}
                <div className="flex justify-between w-full md:w-auto items-center mb-4 md:mb-0">
                    <Link to="/" className="flex items-center text-white lg:text-2xl md:text-xl font-extrabold tracking-wide">
                        <span>🏡</span>
                        <span>
                            <span className="text-yellow-500">E</span>asy
                            <span className="text-red-500">R</span>ent
                        </span>
                    </Link>

                    {/* Hamburger Menu */}
                    <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                // "X" icon (close)
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                // Three horizontal lines (menu)
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="w-full md:w-1/3 relative mb-4 md:mb-0 md:mr-4"
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for properties..."
                        className="w-full pl-12 pr-4 py-2 cursor-pointer rounded-full bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner transition"
                    />
                    {/* Search icon */}
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                </form>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center text-white font-medium">
                    <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                    <Link to="/listings" className="hover:text-yellow-400 transition">Listing</Link>
                    <Link to="/mylistings" className="hover:text-yellow-400 transition">My Listing</Link>
                    <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
                    {/* <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link> */}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`text-white border border-white px-4 py-1 rounded-full transition ${isLoggingOut
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-white hover:text-slate-900"
                                }`}
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white px-4 py-1 rounded-full border border-white hover:bg-white hover:text-slate-900 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition duration-200 shadow-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-3 mt-4 text-white font-medium">
                    <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                    <Link to="/listings" className="hover:text-yellow-400 transition">Listing</Link>
                    <Link to="/mylistings" className="hover:text-yellow-400 transition">My Listing</Link>
                    <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
                    {/* <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link> */}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`text-white border border-white px-4 py-1 rounded-full transition ${isLoggingOut
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-white hover:text-slate-900"
                                }`}
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>

                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:text-slate-900 transition text-center"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition shadow text-center"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
