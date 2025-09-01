import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log(token)

        if (!token) {
          alert("Please login first!");
          navigate("/login"); // redirect to login if no token
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/properties/mylistings/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Unauthorized! Please login again.");
        navigate("/login");
        return;
      }

      await axios.delete(
        `http://127.0.0.1:8000/api/properties/mylistings/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyListings((prev) => prev.filter((listing) => listing.id !== id));
      alert("Listing deleted successfully ✅");
    } catch (error) {
      console.error("Error deleting listing:", error.response?.data || error);
      alert("Failed to delete listing ❌");
    }
  };

  if (loading) return <p className="text-blue-500">Loading your listings...</p>;
  if (myListings.length === 0) return <p className="text-red-500">You haven't uploaded any listings yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">📌 My Listings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition"
          >
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
              <h2 className="text-xl font-semibold text-white">
                {listing.title}
              </h2>
              <p className="text-gray-300 flex items-center text-sm">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                {listing.location}
              </p>
              <p className="text-green-400 font-bold flex items-center mt-2">
                <FaRupeeSign className="mr-1" /> {listing.price}
              </p>

              {/* Edit & Delete buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-listing/${listing.id}`)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
