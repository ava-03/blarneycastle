import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/status")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError("Could not load data"));
  }, []);

  return (
    <div className="phone">
      <header className="banner">
        <h1>Blarney Castle</h1>
        <h2>Home</h2>
      </header>
    </div>
  );
}
