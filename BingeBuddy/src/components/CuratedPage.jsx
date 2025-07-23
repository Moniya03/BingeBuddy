import React, { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

// Map curated types to TMDB endpoints and titles
const CURATED_CONFIG = {
  new_releases: {
    title: "Newly Released",
    url: "/movie/now_playing",
  },
  top_rated: {
    title: "Highest Rated",
    url: "/movie/top_rated",
  },
  award_winning: {
    title: "Award-Winning",
    url: "/discover/movie?with_keywords=818|1516|9951",
  },
  classics: {
    title: "All-Time Classics",
    url: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=3000",
  },
};

export function CuratedPage({ type, onBack }) {
  const config = CURATED_CONFIG[type];
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3${config.url}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (isMounted) setMovies(data.results || []);
      } catch (err) {
        if (isMounted) setError("Failed to load movies. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchMovies();
    return () => { isMounted = false; };
  }, [type, config]);

  return (
    <div className="w-full px-4 md:px-8 py-8">
      {/* Themed heading for the curated section */}
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
          {config.title}
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