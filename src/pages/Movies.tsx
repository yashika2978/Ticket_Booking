import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { demoMovies, genres, languages } from '../lib/data';
import { cn } from '../lib/utils';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'name'>('rating');

  const filteredMovies = useMemo(() => {
    let result = [...demoMovies];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some(g => g.toLowerCase().includes(q)) ||
        m.language.some(l => l.toLowerCase().includes(q))
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter(m => m.genre.some(g => selectedGenres.includes(g)));
    }

    if (selectedLanguages.length > 0) {
      result = result.filter(m => m.language.some(l => selectedLanguages.includes(l)));
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, selectedGenres, selectedLanguages, sortBy]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSearchQuery('');
  };

  const hasFilters = selectedGenres.length > 0 || selectedLanguages.length > 0 || searchQuery;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Movies</h1>
          <p className="body-lg">Discover the latest blockbusters and timeless classics</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies by name, genre, language..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none text-sm"
            >
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="name">Name A-Z</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl transition-all',
                showFilters || hasFilters
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800'
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {hasFilters && <span className="w-2 h-2 bg-white rounded-full" />}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                  <X className="w-4 h-4" /> Clear All
                </button>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm transition-all',
                      selectedGenres.includes(genre)
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm transition-all',
                      selectedLanguages.includes(lang)
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {hasFilters && !showFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm flex items-center gap-1">
                "{searchQuery}" <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedGenres.map(g => (
              <span key={g} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm flex items-center gap-1">
                {g} <button onClick={() => toggleGenre(g)}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedLanguages.map(l => (
              <span key={l} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm flex items-center gap-1">
                {l} <button onClick={() => toggleLanguage(l)}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        {/* Results */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-500">No movies found matching your criteria</p>
            <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie }: { movie: typeof demoMovies[0] }) {
  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden mb-3">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-lg">
            Book Now
          </span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
          {movie.age_rating}
        </div>
      </div>
      <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 mt-1 flex-wrap">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
          <span className="text-xs font-medium">{movie.rating}</span>
        </div>
        <span className="text-xs text-neutral-500">{movie.duration}</span>
        <span className="text-xs text-neutral-500">{movie.language[0]}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {movie.genre.slice(0, 2).map(g => (
          <span key={g} className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-md">{g}</span>
        ))}
      </div>
    </Link>
  );
}
