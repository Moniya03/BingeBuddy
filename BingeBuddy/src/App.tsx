import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TrendingCarousel } from '@/components/TrendingCarousel'
import { MovieRow } from '@/components/MovieRow'
import { GenrePage } from '@/components/GenrePage'
import { CuratedPage } from '@/components/CuratedPage'

// Expanded genre list for navbar and rows
const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
]

function App() {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)
  // Routing state: home, genre, or curated page
  const [currentView, setCurrentView] = useState({ page: 'home', genreId: null, type: null })

  // Navigation handler for genre rows
  const handleGenreClick = (genreId) => {
    setCurrentView({ page: 'genre', genreId, type: null })
  }

  // Navigation handler for curated rows
  const handleCuratedClick = (type) => {
    setCurrentView({ page: 'curated', genreId: null, type })
  }

  // Handler to go back to home
  const handleBackToHome = () => {
    setCurrentView({ page: 'home', genreId: null, type: null })
  }

  // Routing logic for genre and curated pages
  if (currentView.page === 'genre' && currentView.genreId) {
    return <GenrePage genreId={currentView.genreId} onBack={handleBackToHome} />
  }
  if (currentView.page === 'curated' && currentView.type) {
    return <CuratedPage type={currentView.type} onBack={handleBackToHome} />
  }

  // Homepage layout
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full flex flex-col border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Search className="text-blue-500 w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-blue-400 select-none">BingeBuddy</span>
          </div>
          <form
            className="flex-1 flex justify-center"
            onSubmit={e => e.preventDefault()}
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                className="w-full rounded-lg bg-background border border-border px-4 py-2 pr-12 text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Search for movies or series..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search movies or series"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </Button>
            </div>
          </form>
        </div>
        <nav className="w-full overflow-x-auto border-t border-border bg-background/90">
          <ul className="flex gap-2 px-6 py-2 whitespace-nowrap">
            {GENRES.map(genre => (
              <li key={genre.id}>
                <Button
                  variant={selectedGenre === genre.name ? 'secondary' : 'ghost'}
                  className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${selectedGenre === genre.name ? 'text-blue-400 bg-blue-950' : 'hover:bg-blue-900/40 hover:text-blue-300'}`}
                  onClick={() => handleGenreClick(genre.id)}
                  aria-pressed={selectedGenre === genre.name}
                >
                  {genre.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {/* Hero carousel */}
      <TrendingCarousel />
      {/* Welcome section just below carousel */}
      <div className="w-full flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to BingeBuddy</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          Search and discover trending movies and series! Explore curated picks and your favorite genres.
        </p>
      </div>
      {/* All rows below carousel and welcome, with consistent spacing */}
      <div className="space-y-12">
        <MovieRow
          title="Newly Released"
          fetchUrl="/movie/now_playing"
          onTitleClick={() => handleCuratedClick('new_releases')}
        />
        <MovieRow
          title="Highest Rated"
          fetchUrl="/movie/top_rated"
          onTitleClick={() => handleCuratedClick('top_rated')}
        />
        <MovieRow
          title="Award-Winning"
          fetchUrl="/discover/movie?with_keywords=818|1516|9951"
          onTitleClick={() => handleCuratedClick('award_winning')}
        />
        <MovieRow
          title="All-Time Classics"
          fetchUrl="/discover/movie?sort_by=vote_average.desc&vote_count.gte=3000"
          onTitleClick={() => handleCuratedClick('classics')}
        />
        {/* Genre-specific rows with navigation */}
        {GENRES.map(genre => (
          <MovieRow
            key={genre.id}
            title={genre.name}
            fetchUrl={`/discover/movie?with_genres=${genre.id}`}
            onTitleClick={() => handleGenreClick(genre.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
