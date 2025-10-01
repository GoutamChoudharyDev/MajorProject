import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import Reviews from '../components/review&rating/Reviews';

const ListingDetails = () => {
    const { id } = useParams(); // To generate id
    const navigate = useNavigate(); //To redirect another page

    // .......usestates.......
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/properties/` // fetch all properties
                );
                const allListings = response.data;
                const foundListing = allListings.find((l) => String(l.id) === String(id));
                setListing(foundListing || null);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    if (loading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-yellow-400 border-b-red-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg">Loading listing...</p>
    </div>
  );
}


    if (!listing) {
        return <p className="text-red-600">Listing not found.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 text-white">
            {/* Back Button at Top Left */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 mb-4"
            >
                <FaArrowLeft />
            </button>

            <h1 className="text-4xl text-gray-600 font-bold mb-4">{listing.title}</h1>
            <div className="flex items-center text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                <p className=" text-gray-600">{listing.location}</p>
            </div>
            {/* Images */}
            {listing.images && listing.images.length > 0 ? (
                <div
                    className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2"
                >
                    {/* First Image */}
                    <img
                        src={listing.images[0]?.image ? `http://127.0.0.1:8000/${listing.images[0].image}` : "default-placeholder.jpg"}
                        alt="Main"
                        className="w-full h-50 object-cover rounded-lg md:col-span-2 md:row-span-2 md:h-full"
                    />

                    {/* Second Image */}
                    {listing.images[1] && (
                        <img
                            src={listing.images[1]?.image ? `http://127.0.0.1:8000/${listing.images[1].image}` : "default-placeholder.jpg"}
                            alt="Second"
                            className="w-full h-50 object-cover rounded-lg"
                        />
                    )}

                    {/* Third Image */}
                    {listing.images[2] && (
                        <img
                            src={listing.images[2]?.image ? `http://127.0.0.1:8000/${listing.images[2].image}` : "default-placeholder.jpg"}
                            alt="Third"
                            className="w-full h-50 object-cover rounded-lg"
                        />
                    )}
                </div>
            ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-white mb-6 rounded-lg">
                    No Images Available
                </div>
            )}

            {/* Description */}
            <p className="text-lg text-gray-600">{listing.description || "No description provided."}</p>

            {/* price */}
            <p className="text-blue-600 font-bold mt-1 flex items-center">
                <FaRupeeSign className="mr-0.5" /> {listing.price}
            </p>

            {/* Book Now Button */}
            <button
                onClick={() => navigate(`/booking/${listing.id}`)}
                className="w-40 py-3 mt-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-200"
            >
                Book Now
            </button>

            {/* Reviews and Ratings */}
            <div className="mt-10 bg-gray-50 p-6 md:p-10 rounded-lg shadow-lg">
                <Reviews listingId={listing.id} />
            </div>

        </div>
    );
}

export default ListingDetails
