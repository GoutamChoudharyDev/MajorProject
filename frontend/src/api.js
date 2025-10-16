export const fetchDataAuth = async (endpoint) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await apiClient.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching authenticated data:", err);
    throw err;
  }
};
