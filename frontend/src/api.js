import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ uses your .env (https://majorproject-easyr.onrender.com)
});

// Basic GET request example
export const fetchData = async () => {
  try {
    const response = await apiClient.get("/api/properties/"); // adjust endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default apiClient;
