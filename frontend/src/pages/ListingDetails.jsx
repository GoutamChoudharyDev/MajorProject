import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const ListingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        return <p className="text-green-600">Loading listing...</p>;
    }

    if (!listing) {
        return <p className="text-red-600">Listing not found.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 text-white">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {listing.images.map((imgObj, index) => (
                        <img
                            key={index}
                            src={imgObj.image ? `http://127.0.0.1:8000/${imgObj.image}` : "default-placeholder.jpg"}
                            alt={`Listing ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    ))}
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
        </div>
    );
}

export default ListingDetails
