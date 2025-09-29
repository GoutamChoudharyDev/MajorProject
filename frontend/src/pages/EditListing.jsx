import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    images: [], // New images to upload
  });
  const [existingImages, setExistingImages] = useState([]); // For existing images
  const [previews, setPreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get(
          `http://127.0.0.1:8000/api/properties/mylistings/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const listing = response.data.find((item) => item.id === parseInt(id));
        if (!listing) throw new Error("Listing not found");

        setFormData({
          title: listing.title,
          location: listing.location,
          price: listing.price,
          description: listing.description,
          images: [],
        });

        setExistingImages(listing.images.map((img) => img.image));
        setPreviews(listing.images.map((img) => `http://127.0.0.1:8000/${img.image}`));
      } catch (err) {
        console.error(err);
        alert("Failed to load listing");
        navigate("/mylistings");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
      setPreviews(Array.from(files).map((file) => URL.createObjectURL(file)));
      setCurrentIndex(0);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? previews.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === previews.length - 1 ? 0 : prev + 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validImages = formData.images.length > 0 ? formData.images : [];
    if (validImages.length + existingImages.length < 3) {
      return alert("Please have at least 3 images (existing + new).");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("description", formData.description);
    validImages.forEach((file) => data.append("images", file));

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://127.0.0.1:8000/api/properties/mylistings/${id}/`,
        data,
        { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
      );
      alert("Listing updated successfully");
      navigate("/mylistings");
    } catch (err) {
      console.error(err);
      alert("Failed to update listing");
    }
  };

  if (loading) return <p className="text-white">Loading listing...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black md:p-6 p-3">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl md:p-8 p-3 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">✏️ Edit Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 rounded bg-transparent text-white border border-gray-300 placeholder-gray-300"
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
              placeholder="Location"
              className="w-full p-2 rounded bg-transparent text-white border border-gray-300 placeholder-gray-300"
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
              placeholder="Price"
              className="w-full p-2 rounded bg-transparent text-white border border-gray-300 placeholder-gray-300"
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
              placeholder="Description"
              className="w-full p-2 rounded bg-transparent text-white border border-gray-300 placeholder-gray-300"
              rows={3}
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-white font-medium mb-1">Upload Images (min 3)</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="w-full text-white"
            />
          </div>

          {/* Image slideshow */}
          {previews.length > 0 && (
            <div className="relative mt-3 w-full aspect-[4/3] bg-black/20 rounded-xl overflow-hidden shadow-lg">
              <img src={previews[currentIndex]} alt={`Preview ${currentIndex + 1}`} className="w-full h-full object-cover" />
              {previews.length > 1 && (
                <>
                  <button type="button" onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"><FaChevronLeft /></button>
                  <button type="button" onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"><FaChevronRight /></button>
                </>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-200"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
