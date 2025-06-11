import React, { useEffect, useState } from "react";
import axios from "axios";
import "./photo.css";

export default function Photo({ searchTerm }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const fetchPhotos = async () => {
      const API_KEY = "4EIgrmcxBRe70PS8P5yAyOg4w1QzKZbcArd7NYScCoPL0sFkwQxWAFac"; 
      const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=6`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: API_KEY,
          },
        });
        setPhotos(response.data.photos);
        setError("");
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Could not load photos.");
        setPhotos([]);
      }
    };

    fetchPhotos();
  }, [searchTerm]);

  if (error) return <p className="photo-error">{error}</p>;
  if (!photos.length) return null;

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={photo.src.medium}
            alt={photo.alt}
            className="photo-item"
          />
        </a>
      ))}
    </div>
  );
}
