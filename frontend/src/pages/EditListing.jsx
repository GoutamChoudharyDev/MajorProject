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
    images: [], // New images
  });
  const [existingImages, setExistingImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Unauthorized");

        // const response = await axios.get(
        //   "http://127.0.0.1:8000/api/properties/mylistings/",
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );

        const response = await axios.get(
          `${API_BASE_URL}/api/properties/mylistings/`,
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
        // setPreviews(listing.images.map((img) => `http://127.0.0.1:8000/${img.image}`));
        setPreviews(listing.images.map((img) => `${API_BASE_URL}/${img.image}`));
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
    const { name, files, value } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
      setPreviews(Array.from(files).map((file) => URL.createObjectURL(file)));
      setCurrentIndex(0);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? previews.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === previews.length - 1 ? 0 : prev + 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true); // start submitting
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

      // Local............
      // await axios.put(
      //   `http://127.0.0.1:8000/api/properties/mylistings/${id}/`,
      //   data,
      //   { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
      // );

      await axios.put(
        `${API_BASE_URL}/api/properties/mylistings/${id}/`,
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

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-yellow-400 border-b-red-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg">Loading listing...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 via-gray-900 to-black md:p-6 p-3">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl md:p-8 p-3 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">✏️ Edit Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs */}
          {["title", "location", "price"].map((field) => (
            <div key={field}>
              <label className="block text-white font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field === "price" ? "15000" : field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-transparent text-white placeholder-gray-300 outline-none focus-within:ring-2 focus-within:ring-blue-500 transition"
                required
              />
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-transparent text-white placeholder-gray-300 outline-none focus-within:ring-2 focus-within:ring-blue-500 transition"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white font-medium mb-1">Upload Images (min 3)</label>
            <input
              type="file"
              multiple
              name="images"
              onChange={handleChange}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer text-sm sm:text-base"
            />
          </div>

          {/* Slideshow */}
          {previews.length > 0 && (
            <div className="relative mt-3 w-full aspect-[4/3] bg-black/20 rounded-xl overflow-hidden shadow-lg">
              <img src={previews[currentIndex]} alt={`Preview ${currentIndex + 1}`} className="w-full h-full object-cover transition-all duration-500 ease-in-out" />
              {previews.length > 1 && (
                <>
                  <button type="button" onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"><FaChevronLeft /></button>
                  <button type="button" onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"><FaChevronRight /></button>
                </>
              )}
              {previews.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full">
                  {previews.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-10 h-10 object-cover rounded-lg cursor-pointer border-2 transition ${currentIndex === idx ? "border-white" : "border-transparent opacity-70 hover:opacity-100"}`}
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
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-200
            ${submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {submitting ? "Updating..." : "Update Listing"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditListing;
