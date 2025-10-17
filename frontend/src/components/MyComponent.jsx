import { useEffect, useState } from "react";
import { fetchData } from "../api";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((res) => setData(res))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
