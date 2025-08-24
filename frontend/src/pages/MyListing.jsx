import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card/Card";

const MyListing = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/properties/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`, // JWT token
                },
            })
            .then((res) => setListings(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-white">Your Listings</h1>
            {listings.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {listings.map((listing, idx) => (
                        <Card
                            key={listing.id || idx}
                            id={listing.id}
                            title={listing.title}
                            location={listing.location}
                            price={listing.price}
                            description={listing.description}
                            images={listing.images || []}
                            listing={listing}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-300">You haven’t added any listings yet.</p>
            )}
        </div>
    )
}

export default MyListing
