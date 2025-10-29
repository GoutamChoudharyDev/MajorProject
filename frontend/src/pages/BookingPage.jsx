import axios from "axios";
import { useState } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaUsers, FaPhone } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const BookingPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const [bookingData, setBookingData] = useState({
        property: id,
        name: "",
        email: "",
        phone: "",
        check_in: "",
        check_out: "",
        guests: 1
    });

    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");

            // await axios.post(
            //     "http://127.0.0.1:8000/api/properties/bookings/",
            //     { ...bookingData, property: id },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //             "Content-Type": "application/json",
            //         },
            //     }
            // );

            await axios.post(
                `${API_BASE_URL}/api/properties/bookings/`,
                { ...bookingData, property: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setBookingSuccess(true);
            setBookingError("");

            // Reset with correct snake_case keys
            setBookingData({
                property: id,
                name: "",
                email: "",
                phone: "",
                check_in: "",
                check_out: "",
                guests: 1
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error("Booking failed:", error);
            setBookingError("Booking failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black p-4">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl md:p-8 p-4 border border-white/20">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    🏠 Reserve Your Stay
                </h2>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Phone number */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaPhone className="text-gray-400 mr-3" />
                        <input
                            type="tel"
                            placeholder="Your Mobile Number"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Check-in */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaCalendarAlt className="text-gray-400 mr-3" />
                        <input
                            type="date"
                            value={bookingData.check_in}
                            onChange={(e) => setBookingData({ ...bookingData, check_in: e.target.value })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Check-out */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaCalendarAlt className="text-gray-400 mr-3" />
                        <input
                            type="date"
                            value={bookingData.check_out}
                            onChange={(e) => setBookingData({ ...bookingData, check_out: e.target.value })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Guests */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <FaUsers className="text-gray-400 mr-3" />
                        <input
                            type="number"
                            min={1}
                            placeholder="Guests"
                            value={bookingData.guests}
                            onChange={(e) => setBookingData({ ...bookingData, guests: Number(e.target.value) })}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 
                        ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>

                </form>

                {/* Feedback Messages */}
                {bookingSuccess && <p className="text-green-400 mt-4 text-center font-semibold">Booking Successful!</p>}
                {bookingError && <p className="text-red-500 mt-4 text-center font-semibold">{bookingError}</p>}
            </div>
        </div>
    )
}

export default BookingPage
