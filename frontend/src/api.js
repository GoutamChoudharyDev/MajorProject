import axios from "axios";

// Axios instance for general requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses your .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Generic GET request example
export const fetchData = async () => {
  try {
    const response = await apiClient.get("/api/properties/"); // adjust endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response || error.message || error);
    throw error;
  }
};

// Authenticated GET request (requires JWT token)
export const fetchDataAuth = async (endpoint) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await apiClient.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated data:", error.response || error.message || error);
    throw error;
  }
};

export default apiClient;
