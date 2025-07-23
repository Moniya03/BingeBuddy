// LEARN: MovieRow is a reusable, horizontally scrollable row of movies for BingeBuddy.
// LEARN: It fetches data from TMDB, shows a themed title and 'See All' link, and handles loading/error states.
// LEARN: Both the title and 'See All' link trigger the onTitleClick navigation function if provided.

import React, { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export function MovieRow({ title, fetchUrl, onTitleClick }) {
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
          `https://api.themoviedb.org/3${fetchUrl}`,
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
  }, [fetchUrl]);

  // LEARN: Click handler for title and See All link
  const handleTitleClick = (e) => {
    e.preventDefault();
    if (onTitleClick) onTitleClick();
  };

  return (
    <div className="mb-8 px-4 md:px-8">
      {/* LEARN: Title row with themed title and See All link */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:underline"
          onClick={handleTitleClick}
        >
          {title}
        </h2>
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline text-sm md:text-base"
          onClick={handleTitleClick}
        >
          See All &gt;
        </a>
      </div>
      {/* LEARN: Loading and error states */}
      {isLoading ? (
        <div className="flex items-center justify-center h-32 text-white">Loading...</div>
      ) : error ? (
        <div className="flex items-center justify-center h-32 text-red-400">{error}</div>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 pb-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-28 md:w-40 cursor-pointer group"
              title={movie.title}
            >
              {movie.poster_path ? (
                <img
                  src={TMDB_IMAGE_BASE + movie.poster_path}
                  alt={movie.title}
                  className="rounded-lg w-full h-40 md:h-60 object-cover object-center group-hover:opacity-80 transition"
                />
              ) : (
                <div className="w-full h-40 md:h-60 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-white">
                  No Image
                </div>
              )}
              <div className="mt-2 text-xs md:text-sm text-white text-center truncate">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 