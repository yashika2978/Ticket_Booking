import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Film, Calendar, MapPin, Star, X } from 'lucide-react';
import { demoMovies, demoEvents, demoTheatres } from '../lib/data';
import { formatDate } from '../lib/utils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'movies' | 'events' | 'theatres'>('all');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = useMemo(() => {
    if (!query.trim()) return { movies: [], events: [], theatres: [] };
    const q = query.toLowerCase();

    const movies = demoMovies.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.some(g => g.toLowerCase().includes(q)) ||
      m.language.some(l => l.toLowerCase().includes(q)) ||
      m.director.toLowerCase().includes(q) ||
      m.cast.some(c => c.toLowerCase().includes(q))
    );

    const events = demoEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );

    const theatres = demoTheatres.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q) ||
      t.address.toLowerCase().includes(q)
    );

    return { movies, events, theatres };
  }, [query]);

  const totalResults = results.movies.length + results.events.length + results.theatres.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const getFilteredResults = () => {
    switch (activeFilter) {
      case 'movies': return { movies: results.movies, events: [], theatres: [] };
      case 'events': return { movies: [], events: results.events, theatres: [] };
      case 'theatres': return { movies: [], events: [], theatres: results.theatres };
      default: return results;
    }
  };

  const filtered = getFilteredResults();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-xl mb-2">Search Results</h1>
        <p className="body-lg mb-6">
          {query ? `${totalResults} results for "${query}"` : 'Start typing to search'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, events, theatres..."
              className="w-full pl-11 pr-12 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setSearchParams({}); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Filters */}
        {query && (
          <div className="flex gap-2 mb-8">
            {([
              { id: 'all' as const, label: 'All', count: totalResults },
              { id: 'movies' as const, label: 'Movies', count: results.movies.length },
              { id: 'events' as const, label: 'Events', count: results.events.length },
              { id: 'theatres' as const, label: 'Theatres', count: results.theatres.length },
            ]).map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {query && totalResults === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg text-neutral-500">No results found for "{query}"</p>
            <p className="text-sm text-neutral-400 mt-2">Try different keywords or check your spelling</p>
          </div>
        )}

        <div className="space-y-8">
          {filtered.movies.length > 0 && (
            <section>
              <h2 className="heading-md mb-4 flex items-center gap-2">
                <Film className="w-5 h-5" /> Movies
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filtered.movies.map(movie => (
                  <Link key={movie.id} to={`/movie/${movie.id}`} className="group block">
                    <div className="relative rounded-2xl overflow-hidden mb-3">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base truncate">{movie.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
                      <span className="text-xs font-medium">{movie.rating}</span>
                      <span className="text-xs text-neutral-500">{movie.duration}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {filtered.events.length > 0 && (
            <section>
              <h2 className="heading-md mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.events.map(event => (
                  <Link key={event.id} to={`/event/${event.id}`} className="group block">
                    <div className="glass-card overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.poster_url}
                          alt={event.title}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{event.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.city}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-primary-600 dark:text-primary-400">
                            ₹{event.price.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
                            {event.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {filtered.theatres.length > 0 && (
            <section>
              <h2 className="heading-md mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Theatres
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.theatres.map(theatre => (
                  <div key={theatre.id} className="glass-card p-5">
                    <h3 className="font-semibold mb-1">{theatre.name}</h3>
                    <p className="text-sm text-neutral-500 mb-3">{theatre.address}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" /> {theatre.rating}
                      </span>
                      <span>{theatre.screens} screens</span>
                      <span>{theatre.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
