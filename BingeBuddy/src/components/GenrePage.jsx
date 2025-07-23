import React, { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

// Map of genre IDs to names for display
const GENRE_NAMES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
};

export function GenrePage({ genreId, onBack }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch multiple pages for a richer catalog
  useEffect(() => {
    let isMounted = true;
    async function fetchAllPages() {
      setIsLoading(true);
      setError(null);
      let allResults = [];
      try {
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                accept: "application/json",
              },
            }
          );
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          allResults = allResults.concat(data.results || []);
        }
        if (isMounted) setMovies(allResults);
      } catch (err) {
        if (isMounted) setError("Failed to load movies. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchAllPages();
    return () => { isMounted = false; };
  }, [genreId]);

  const genreName = GENRE_NAMES[genreId] || "Genre";

  return (
    <div className="w-full px-4 md:px-8 py-8">
      {/* Themed heading for the genre */}
      <div className="flex items-center gap-4 mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="text-blue-600 font-bold text-lg hover:underline"
          >
            &lt; Back
          </button>
        )}
        <h2 className="text-3xl font-bold text-blue-600">
          {genreName} Movies
        </h2>
      </div>
      {/* Loading and error states */}
      {isLoading ? (
        <div className="flex items-center justify-center h-32 text-white">Loading...</div>
      ) : error ? (
        <div className="flex items-center justify-center h-32 text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center">
              {movie.poster_path ? (
                <img
                  src={TMDB_IMAGE_BASE + movie.poster_path}
                  alt={movie.title}
                  className="rounded-lg w-full h-40 md:h-60 object-cover object-center mb-2"
                />
              ) : (
                <div className="w-full h-40 md:h-60 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-white mb-2">
                  No Image
                </div>
              )}
              <div className="text-xs md:text-sm text-white text-center truncate w-full">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 