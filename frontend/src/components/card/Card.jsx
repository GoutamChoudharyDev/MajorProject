import { useState } from "react";
import './Card.css'
import { useNavigate } from "react-router-dom";
// React Icons
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const Card = ({ id, title, location, price, images, booked }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Ensure images is always an array
  const safeImages = Array.isArray(images) ? images : [];

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // handleClick
  const handleClick = () => {
    if (id) {
      navigate(`/listing/${id}`);
    } else {
      console.error("Card clicked but no ID provided!");
    }
  }

  // function to Show Previous Image
  const prevImage = () => {
    // If index is 0 then show the last image Else preveious Image
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    // If index is last then show the first image Else show next image
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="card-container">
      {/* .........Upper part of Card......... */}
      {/* Image Carousel */}
      <div className={`relative w-full card-image-container ${booked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
        onClick={!booked ? handleClick : undefined}   // ✅ disable click if booked
      >

        {/* Booked Label */}
        {booked && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
            BOOKED
          </span>
        )}

        <img
          // Local...........
          // src={
          //   safeImages[currentIndex]
          //     ? `http://127.0.0.1:8000/${safeImages[currentIndex].image}`
          //     : '/default-placeholder.jpg'
          // }

          // src={
          //   safeImages[currentIndex]
          //     ? `${API_BASE_URL}/${safeImages[currentIndex].image}`
          //     : '/default-placeholder.jpg'
          // }

          // changes....
          src={
            safeImages[currentIndex]?.image
              ? (
                safeImages[currentIndex].image.startsWith("http")
                  ? safeImages[currentIndex].image
                  : `${API_BASE_URL}/${safeImages[currentIndex].image}`
              )
              : "/default-placeholder.jpg"
          }

          alt={title}
          className="w-full h-full cursor-pointer object-cover transition-transform duration-500"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1 rounded-full shadow-md"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                nextImage();
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1 rounded-full shadow-md"
            >
              <FaChevronRight size={14} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((img, index) => (
              <span
                key={img.id || index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400/70"}`}
              ></span>
            ))}

          </div>
        )}
      </div>

      {/* .........Lower part of Card......... */}
      {/* Card Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <FaMapMarkerAlt className="mr-1 text-red-500" />
          <span className="truncate">{location}</span>
        </div>
        <p className="text-blue-600 font-bold mt-1 flex items-center">
          <FaRupeeSign className="mr-0.5" /> {price}
        </p>
        {/* <p className="text-gray-500 text-sm mt-2 line-clamp-3">{description}</p> */}
      </div>
    </div>
  );
};

export default Card;
