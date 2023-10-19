import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import MoviePage from "./MoviePage";

export const API_URL = "http://www.omdbapi.com?apikey=2f399ec0";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <h1>SeriesFlix</h1>
                <div className="search">
                  <input
                    placeholder="Search for movies or web-series"
                    value={searchText}
                    onChange={(event) => {
                      setSearchText(event.target.value);
                    }}
                  />
                  <img
                    src={searchIcon}
                    alt="search icon"
                    onClick={() => searchMovies(searchText)}
                  />
                </div>
                {movies?.length > 0 ? (
                  <div className="container">
                    {movies.map((movie) => (
                      <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                        <MovieCard movie={movie} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="empty">
                    <h2>No movies found</h2>
                  </div>
                )}
              </>
            }
          />

          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
