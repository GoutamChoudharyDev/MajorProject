import { useState, useEffect } from "react";

// React Icons......
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Listings = ({ setListings }) => {
  // UseState to handle form input
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    images: [null], // start with one file input
  });

  const navigate = useNavigate();

  const [previews, setPreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate previews whenever images change
  useEffect(() => {
    const urls = formData.images.map((file) =>
      file ? URL.createObjectURL(file) : null
    );
    setPreviews(urls);
    setCurrentIndex(0);

    return () => {
      urls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const updatedImages = [...formData.images];
      // updatedImages[index] = files[0] || null;
      if (files && files[0]) {
        updatedImages[index] = files[0];
      }
      setFormData({ ...formData, images: updatedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, null] });
  };

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic to Upload atleast 3 Images
    const validImages = formData.images.filter((img) => img);
    if (validImages.length < 3) {
      alert("Please upload at least 3 images.");
      return;
    }

    // Convert each File to an Object URL before saving
    const imageUrls = validImages.map((file) => URL.createObjectURL(file));

    // Create listing with unique ID
    const newListing = {
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      price: formData.price,
      description: formData.description,
      images: imageUrls
    };

    // Update state & localStorage
  setListings((prev) => {
    const updated = [...prev, newListing];
    localStorage.setItem("listings", JSON.stringify(updated));
    return updated;
  });

    alert("Listing Submitted Successfully!");

    // Reset form Means set empty all field after submition
    setFormData({
      title: "",
      location: "",
      price: "",
      description: "",
      images: [null],
    });
    setPreviews([]);
    setCurrentIndex(0);
    navigate(`/listing/${newListing.id}`);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? previews.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === previews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black md:p-6 p-3">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl md:p-8 p-3 border border-white/20">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🏠 List Your Home
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Cozy 2BHK in Indore"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Indore, MP"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="15000"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Spacious, well-lit, near market..."
              required
            ></textarea>
          </div>

          {/* Image Upload Fields */}
          <div>
            <label className="block text-white font-medium mb-1">
              Upload at least 3 Images
            </label>

            {formData.images.map((_, index) => (
              <div
                key={index}
                className="flex flex-wrap sm:flex-nowrap sm:gap-2 mb-3"
              >
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleChange(e, index)}
                  className="flex-1 text-gray-300 file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-500 file:text-white hover:file:bg-blue-600
                  cursor-pointer text-sm sm:text-base"
                />
                {/* logic to remove image */}
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                    w-10 sm:w-auto text-sm sm:text-base"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}


            {/* Logic to Add Image */}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              + Add More Images
            </button>
          </div>

          {/* Slideshow Preview */}
          {previews.length > 0 && (
            <div className="relative mt-3 w-full aspect-[4/3] bg-black/20 rounded-xl overflow-hidden shadow-lg">
              {/* Main image */}
              <img
                src={previews[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />

              {/* Navigation buttons */}
              {previews.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              {previews.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full">
                  {previews.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-10 h-10 object-cover rounded-lg cursor-pointer border-2 transition 
                      ${currentIndex === idx ? "border-white" : "border-transparent opacity-70 hover:opacity-100"}`}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-200"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Listings;
