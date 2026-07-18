import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, Calendar, MapPin, X } from 'lucide-react';
import { demoEvents, cities } from '../lib/data';
import { formatDate, cn } from '../lib/utils';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Concert', 'Sports', 'Comedy', 'Theatre', 'Exhibition'];

  const filteredEvents = useMemo(() => {
    let result = [...demoEvents];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }

    if (selectedCity !== 'All') {
      result = result.filter(e => e.city === selectedCity);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedCity]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCity('All');
  };

  const hasFilters = searchQuery || selectedCategory !== 'All' || selectedCity !== 'All';

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Events</h1>
          <p className="body-lg">Discover concerts, sports, comedy shows, and more</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
            />
          </div>
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
          </button>
        </div>

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
              <h4 className="text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm transition-all',
                      selectedCategory === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">City</h4>
              <div className="flex flex-wrap gap-2">
                {['All', ...cities].map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm transition-all',
                      selectedCity === city
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-500">No events found</p>
            <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: typeof demoEvents[0] }) {
  return (
    <Link to={`/event/${event.id}`} className="group block">
      <div className="glass-card overflow-hidden">
        <div className="relative">
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {event.is_live && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-error-500 text-white text-xs font-semibold rounded-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
          )}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
            {event.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {event.title}
          </h3>
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
  );
}
