import { useState, useEffect } from 'react'
import { Search } from 'lucide-react' // LEARN: Lucide icons are imported like this
import { Button } from '@/components/ui/button' // LEARN: Example of importing a shadcn/ui component
// LEARN: You can replace this with your own logo asset if you have one

// LEARN: Placeholder genres, replace with TMDB API fetch later
const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
]

function App() {
  // LEARN: State for search input
  const [search, setSearch] = useState('')
  // LEARN: State for selected genre
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  // LEARN: This effect could be used to fetch genres from TMDB in the future
  useEffect(() => {
    // TODO: Fetch genres from TMDB API and set them in state
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* LEARN: Header with logo and search bar */}
      <header className="w-full flex flex-col border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* LEARN: Logo section */}
          <div className="flex items-center gap-2">
            {/* LEARN: Lucide icon as logo */}
            <Search className="text-blue-500 w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-blue-400 select-none">BingeBuddy</span>
          </div>
          {/* LEARN: Search bar section */}
          <form
            className="flex-1 flex justify-center"
            onSubmit={e => {
              e.preventDefault()
              // TODO: Implement search logic
            }}
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
        {/* LEARN: Genre navbar */}
        <nav className="w-full overflow-x-auto border-t border-border bg-background/90">
          <ul className="flex gap-2 px-6 py-2 whitespace-nowrap">
            {GENRES.map(genre => (
              <li key={genre}>
                <Button
                  variant={selectedGenre === genre ? 'secondary' : 'ghost'}
                  className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${selectedGenre === genre ? 'text-blue-400 bg-blue-950' : 'hover:bg-blue-900/40 hover:text-blue-300'}`}
                  onClick={() => setSelectedGenre(genre)}
                  aria-pressed={selectedGenre === genre}
                >
                  {genre}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {/* LEARN: Main content area placeholder */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to BingeBuddy</h1>
        <p className="text-lg text-muted-foreground">Search and discover trending movies and series!</p>
      </main>
    </div>
  )
}

export default App
