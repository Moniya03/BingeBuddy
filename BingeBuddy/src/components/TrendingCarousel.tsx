// LEARN: TrendingCarousel is robust, beautiful, and now fixes horizontal overflow and image distortion bugs.
// LEARN: See comments for layout and object-cover fixes.

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "start",
  skipSnaps: false,
  dragFree: false,
};
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export function TrendingCarousel() {
  // LEARN: State for movies, loading, and error
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // LEARN: Fetch movies from TMDB with robust error handling
  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setMovies(data.results || []);
        setError(null);
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  // LEARN: Update selected index on slide change
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // LEARN: Conditional rendering for loading, error, and main view
  if (isLoading) {
    // LEARN: Show loading state with reserved space
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-black">
        <span className="text-white text-lg md:text-2xl font-medium">Loading...</span>
      </div>
    );
  } else if (error) {
    // LEARN: Show error state with reserved space
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-black">
        <span className="text-red-400 text-lg md:text-2xl font-medium">{error}</span>
      </div>
    );
  } else {
    // LEARN: Main carousel view with no horizontal overflow and no image distortion
    return (
      <div className="w-full">
        {/* LEARN: Large, visible heading above the carousel */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white my-6 text-center tracking-tight">
          Trending Movies
        </h2>
        {/*
          LEARN: The carousel container uses w-full (not w-screen or vw units) to prevent horizontal overflow.
          To ensure true full-width, place this component at the top level of your page, not inside a padded container.
        */}
        <section
          className="relative w-full bg-black h-[70vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl"
        >
          <div className="relative w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
              {movies.map((movie, idx) => (
                // LEARN: Each slide is relative and overflow-hidden to contain the absolutely positioned image
                <div
                  className="min-w-full relative overflow-hidden transition-transform duration-700 h-full"
                  key={movie.id}
                  aria-hidden={selectedIndex !== idx}
                  style={{ height: "70vh" }}
                >
                  {/*
                    LEARN: The image is absolutely positioned, fills the container, and uses object-cover to preserve aspect ratio.
                    This prevents distortion and cropping issues.
                  */}
                  {movie.backdrop_path ? (
                    <img
                      src={TMDB_IMAGE_BASE + movie.backdrop_path}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                      No image available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  {/* LEARN: Slide content */}
                  <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-end justify-between px-6 py-8 md:py-12 h-full">
                    <div className="max-w-lg z-10">
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {movie.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-lg mb-4 line-clamp-3">
                        {movie.overview}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        {/* LEARN: Format rating to one decimal place for clarity */}
                        <span className="text-yellow-400 font-bold text-lg md:text-xl">
                          ⭐ {Number(movie.vote_average).toFixed(1)} / 10
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg shadow" size="lg">
                          <Info className="w-5 h-5 mr-2" />
                          More Info
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* LEARN: Navigation arrows */}
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-opacity opacity-70 hover:opacity-100"
                    onClick={() => emblaApi && emblaApi.scrollPrev()}
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-opacity opacity-70 hover:opacity-100"
                    onClick={() => emblaApi && emblaApi.scrollNext()}
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
            {/* LEARN: Slide indicators (dots) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {movies.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white/60 ${
                    selectedIndex === idx ? "bg-blue-500 scale-125" : "bg-white/40"
                  }`}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
} 