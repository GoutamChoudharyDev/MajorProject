import { useState, useEffect } from "react";
import "./Reviews.css"; // Import custom CSS for scrollbar

const Reviews = ({ listingId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");

    // Load reviews for this listing from localStorage
    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews_${listingId}`);
        if (storedReviews) setReviews(JSON.parse(storedReviews));
    }, [listingId]);

    // Save reviews for this listing
    useEffect(() => {
        localStorage.setItem(`reviews_${listingId}`, JSON.stringify(reviews));
    }, [reviews, listingId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !comment || !name) return alert("Please fill all fields");

        const newReview = {
            id: Date.now(),
            user: name,
            rating,
            comment,
            helpful: 0,
            date: new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        };

        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment("");
        setName("");
        setHover(0);
    };

    const markHelpful = (id) => {
        const updated = reviews.map((r) =>
            r.id === id ? { ...r, helpful: r.helpful + 1 } : r
        );
        setReviews(updated);
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3 text-gray-800">
                Reviews & Ratings
            </h2>

            {/* Average Rating */}
            <div className="mb-8 text-gray-700">
                <p className="text-lg font-medium flex items-center">
                    <span className="mr-1">⭐</span>
                    Average Rating:{" "}
                    {reviews.length > 0
                        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                        : "No reviews yet"}
                </p>
                <p className="text-sm text-gray-500">
                    {reviews.length} review{reviews.length !== 1 && "s"} submitted
                </p>
            </div>

            {/* Review Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-8 bg-white shadow-lg rounded-lg p-4 sm:p-6 border border-gray-300"
            >
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg w-full p-2 mb-3 sm:mb-4 focus:ring-2 focus:ring-red-600 outline-none text-gray-600"
                />

                <div className="flex gap-2 mb-3 sm:mb-4 text-xl sm:text-2xl">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            className={`cursor-pointer transition ${(hover || rating) >= num
                                    ? "text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-300"
                                }`}
                            onClick={() => setRating(num)}
                            onMouseEnter={() => setHover(num)}
                            onMouseLeave={() => setHover(0)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <textarea
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded-lg w-full p-3 mb-3 sm:mb-4 focus:ring-2 focus:ring-red-600 outline-none resize-none text-gray-600"
                    rows={3}
                />

                <button
                    type="submit"
                    className="w-full sm:w-40 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
                >
                    Submit Review
                </button>
            </form>

            {/* Review List with scroll */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-custom pr-2">
                {reviews.map((r) => (
                    <div
                        key={r.id}
                        className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 sm:p-5 hover:shadow-md transition"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-semibold text-gray-900 mb-1 sm:mb-0">
                                {r.user}{" "}
                                <span className="text-yellow-400 ml-2">
                                    {"★".repeat(r.rating)}
                                    <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
                                </span>
                            </p>
                            <small className="text-gray-500">{r.date}</small>
                        </div>
                        <p className="mt-2 text-gray-700">{r.comment}</p>
                        <button
                            onClick={() => markHelpful(r.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
                        >
                            👍 Helpful ({r.helpful})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
