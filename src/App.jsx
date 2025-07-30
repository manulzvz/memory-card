import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener los IDs de obras con imágenes
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting")
      .then(res => res.json())
      .then(async data => {
        // 2. Seleccionar 10 IDs aleatorios
        function getRandomIds(ids, count) {
          const shuffled = [...ids].sort(() => Math.random() - 0.5);
          return shuffled.slice(0, count);
        }
        const randomIds = getRandomIds(data.objectIDs, 10);

        // 3. Obtener los detalles de cada ID
        const promises = randomIds.map(id =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then(res => res.json())
        );
        const results = await Promise.all(promises);

        // 4. Filtrar y transformar los datos
        const filtered = results
          .filter(obj => obj.primaryImageSmall && obj.title)
          .map(obj => ({
            primaryImageSmall: obj.primaryImageSmall,
            title: obj.title,
            objectURL: obj.objectURL
          }));

        setArtworks(filtered);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Memory Card - Met Museum</h1>
      {loading ? (
        <p>Cargando obras de arte...</p>
      ) : (
        <Board artworks={artworks} />
      )}
    </div>
  );
}

export default App;

