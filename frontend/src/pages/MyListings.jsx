import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // -------------------- Fetch My Listings --------------------
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("Please login first!");
          navigate("/login");
          return;
        }

        // Local.......
        // const response = await axios.get(
        //   "http://127.0.0.1:8000/api/properties/mylistings/",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );

        // Deployed.....
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/properties/mylistings/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMyListings(response.data);
      } catch (error) {
        console.error("Error fetching user listings:", error.response?.data || error);

        if (error.response?.status === 401) {
          alert("Session expired! Please login again.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [navigate]);

  // -------------------- Delete Property --------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Unauthorized! Please login again.");
        navigate("/login");
        return;
      }

      // Local.........
      // await axios.delete(
      //   `http://127.0.0.1:8000/api/properties/mylistings/${id}/`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // deployed........
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/properties/mylistings/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMyListings((prev) => prev.filter((listing) => listing.id !== id));
      alert("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error.response?.data || error);
      alert("Failed to delete listing");
    }
  };

  // -------------------- Cancel Booking --------------------
  const handleCancelBooking = async (propertyId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Unauthorized! Please login again.");
        navigate("/login");
        return;
      }

      // Correct backend URL for booking list
      // Local.....
      // const bookingsRes = await axios.get(
      //   `http://127.0.0.1:8000/api/properties/bookings/list/?property=${propertyId}`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // Deployed....
      const bookingsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties/bookings/list/?property=${propertyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (bookingsRes.data.length === 0) {
        alert("No booking found for this property!");
        return;
      }

      const bookingId = bookingsRes.data[0].id;

      // Correct backend URL for booking delete
      // await axios.delete(
      //   `http://127.0.0.1:8000/api/properties/bookings/${bookingId}/`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // Deployed.....
      await axios.delete(`${API_URL}/api/properties/bookings/${bookingId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI
      setMyListings((prev) =>
        prev.map((listing) =>
          listing.id === propertyId ? { ...listing, booked: false } : listing
        )
      );

      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error.response?.data || error);
      alert("Failed to cancel booking.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black">
        <div className="w-16 h-16 border-4 border-t-yellow-400 border-b-red-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg">Loading listings...</p>
      </div>
    );

  if (myListings.length === 0)
    return <p className="text-red-500 text-center mt-10">You haven't uploaded any listings yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-600 mb-6">📌 My Listings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myListings.map((listing) => (
          <div
            key={listing.id}
            className="relative bg-white/10 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition"
          >
            {/* Booked Label */}
            {listing.booked && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                BOOKED
              </span>
            )}

            {/* Cancel Booking Button */}
            {listing.booked && (
              <button
                onClick={() => handleCancelBooking(listing.id)}
                className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10 hover:bg-yellow-600"
              >
                Cancel Booking
              </button>
            )}

            {listing.images && listing.images[0] ? (
              <img
                src={`http://127.0.0.1:8000/${listing.images[0].image}`}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-white">
                No Image
              </div>
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{listing.title}</h2>
              <p className="text-gray-600 flex items-center text-sm">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                {listing.location}
              </p>
              <p className="text-blue-600 font-bold flex items-center mt-2">
                <FaRupeeSign className="mr-1" /> {listing.price}
              </p>

              {/* Edit & Delete buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-listing/${listing.id}`)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={listing.booked}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  disabled={listing.booked}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
