import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import Reviews from '../components/review&rating/Reviews';

// ........Animated..........
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ListingDetails = () => {
    const { id } = useParams(); // To generate id
    const navigate = useNavigate(); //To redirect another page

    // .......usestates.......
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    const pageRef = useRef(null);

    // useEffect(() => {
    //     const fetchListing = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://127.0.0.1:8000/api/properties/` // fetch all properties
    //             );
    //             const allListings = response.data;
    //             const foundListing = allListings.find((l) => String(l.id) === String(id));
    //             setListing(foundListing || null);
    //         } catch (error) {
    //             console.error("Error fetching listing:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchListing();
    // }, [id]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(
                    `https://majorproject-esyrent.onrender.com/api/properties/${id}/`
                );
                setListing(response.data);
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);


    // Animate content after loading
    useEffect(() => {
        if (!loading && pageRef.current) {
            const elements = pageRef.current.querySelectorAll('.fade-item');

            elements.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.2, // stagger effect
                        ease: "power2.out",
                    }
                );
            });
        }
    }, [loading]);

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

    // -----------------Animated-------------------------
    return (
        <div ref={pageRef} className="max-w-6xl mx-auto p-4 text-white space-y-6">

            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 mb-4 fade-item"
            >
                <FaArrowLeft />
            </button>

            {/* Title & Location */}
            <h1 className="text-4xl text-gray-600 font-bold fade-item">{listing.title}</h1>
            <div className="flex items-center text-gray-600 text-sm fade-item">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                <p>{listing.location}</p>
            </div>

            {/* Images */}
            {listing.images && listing.images.length > 0 ? (
                <div className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 fade-item">
                    <img
                        // src={listing.images[0]?.image ? `http://127.0.0.1:8000/${listing.images[0].image}` : "default-placeholder.jpg"}
                        src={listing.images[0]?.image ? `https://majorproject-esyrent.onrender.com/${listing.images[0].image}` : "default-placeholder.jpg"}
                        alt="Main"
                        className="w-full h-50 object-cover rounded-lg md:col-span-2 md:row-span-2 md:h-full"
                    />
                    {listing.images[1] && (
                        <img
                            // src={`http://127.0.0.1:8000/${listing.images[1].image}`}
                            src={listing.images[0]?.image ? `https://majorproject-esyrent.onrender.com/${listing.images[0].image}` : "default-placeholder.jpg"}
                            alt="Second"
                            className="w-full h-50 object-cover rounded-lg"
                        />
                    )}
                    {listing.images[2] && (
                        <img
                            // src={`http://127.0.0.1:8000/${listing.images[2].image}`}
                            src={listing.images[0]?.image ? `https://majorproject-esyrent.onrender.com/${listing.images[0].image}` : "default-placeholder.jpg"}
                            className="w-full h-50 object-cover rounded-lg"
                        />
                    )}
                </div>
            ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-white mb-6 rounded-lg fade-item">
                    No Images Available
                </div>
            )}

            {/* Description */}
            <p className="text-lg text-gray-600 fade-item">{listing.description || "No description provided."}</p>

            {/* Price */}
            <p className="text-blue-600 font-bold mt-1 flex items-center fade-item">
                <FaRupeeSign className="mr-0.5" /> {listing.price}
            </p>

            {/* Book Now Button */}
            <button
                onClick={() => navigate(`/booking/${listing.id}`)}
                className="w-40 py-3 mt-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-200 fade-item"
            >
                Book Now
            </button>

            {/* Reviews */}
            <div className="mt-10 bg-gray-50 p-6 md:p-10 rounded-lg shadow-lg fade-item">
                <Reviews listingId={listing.id} />
            </div>
        </div>
    );
}

export default ListingDetails
