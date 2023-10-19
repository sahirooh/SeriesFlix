import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "./App";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`${API_URL}&i=${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <div className="details">
      <h1>{movie.Title}</h1>
    </div>
  );
};

export default MoviePage;
