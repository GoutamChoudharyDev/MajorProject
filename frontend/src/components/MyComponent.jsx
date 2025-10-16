import { useEffect, useState } from "react";
import { fetchData } from "../api";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
