import React, { useState, useEffect } from "react";

const API_KEY = "live_CTz17aU04L5jrX2WZsKlgee6WMGfi4GkRhgE5UIh0Jz1D9piSqHV9WBjWiL7sJP5";
const API_URL = "https://api.thecatapi.com/v1/images/search";

const App = () => {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    fetchBreeds();
    fetchCats();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const fetchCats = async () => {
    try {
      let url = `${API_URL}?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10`;
      if (selectedBreed) {
        url += `&breed_ids=${selectedBreed}`;
      }
      const response = await fetch(url, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error("Error while fetching cat images:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Cat Gallery</h1>
      <label>Filter by Breed: </label>
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
      <button onClick={fetchCats} style={{ marginLeft: "10px" }}>Refresh</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {cats.map((cat) => (
          <div key={cat.id}>
          <img src={cat.url} alt="cat" style={{ width: "100%",height:"auto" , borderRadius: "10px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;