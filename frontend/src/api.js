import axios from "axios";

// Use environment variable for backend URL (Vite requires VITE_ prefix)
const API = import.meta.env.VITE_API_URL;

// Create a reusable axios instance
const apiClient = axios.create({
  baseURL: API,
  withCredentials: true, // Include cookies if your Django backend uses sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch data example
export const fetchData = async () => {
  try {
    const response = await apiClient.get("/api/endpoint/");
    return response.data;
  } catch (err) {
    if (err.response) {
      // Backend responded with an error
      console.error("Backend error:", err.response.data);
    } else if (err.request) {
      // No response received
      console.error("No response from backend:", err.request);
    } else {
      // Something else happened
      console.error("Error:", err.message);
    }
    throw err;
  }
};
