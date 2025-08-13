import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ListingDetails = () => {
    const { id } = useParams();
        const navigate = useNavigate();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const storedListings = JSON.parse(localStorage.getItem("listings")) || [];
        const foundListings = storedListings.find((l) => String(l.id) === String(id));
        setListing(foundListings);
    }, [id]);

    if (!listing) {
        return <p className="text-green-600">Loading listing...</p>;
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

            <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
            <p className="mb-4">{listing.location}</p>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {listing.images?.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Listing ${index}`}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                ))}
            </div>

            {/* Description */}
            <p className="text-lg">{listing.description}</p>
        </div>
    );
}

export default ListingDetails
