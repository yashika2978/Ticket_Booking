import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Clock, User, Heart, Share2,
  MapPin, Monitor, Ticket
} from 'lucide-react';
import { demoMovies, demoTheatres, demoShows } from '../lib/data';
import { formatDate, formatCurrency } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'shows' | 'reviews' | 'cast'>('shows');
  const [selectedDate, setSelectedDate] = useState('Today');

  const movie = demoMovies.find(m => m.id === id);
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Movie Not Found</h1>
          <Link to="/movies" className="btn-primary">Browse Movies</Link>
        </div>
      </div>
    );
  }

  const movieShows = demoShows.filter(s => s.movie_id === movie.id);
  const theatres = demoTheatres;

  const dates = ['Today', 'Tomorrow', 'Sat, Dec 21', 'Sun, Dec 22'];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-[50vh] sm:h-[60vh]">
        <img
          src={movie.banner_url}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-24 sm:w-36 rounded-xl shadow-2xl hidden sm:block"
                />
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{movie.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                      {movie.rating}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.duration}
                    </span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-md">{movie.age_rating}</span>
                    <span>{movie.language.join(', ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genre.map(g => (
                      <span key={g} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-lg">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => document.getElementById('shows')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Ticket className="w-4 h-4" /> Book Tickets
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <Heart className={isWishlisted ? 'w-5 h-5 fill-error-500 text-error-500' : 'w-5 h-5 text-white'} />
                    </button>
                    <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-8 w-fit">
          {(['shows', 'reviews', 'cast'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-neutral-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'shows' && (
          <div id="shows">
            {/* Synopsis */}
            <div className="glass-card p-6 mb-8">
              <h2 className="heading-md mb-3">Synopsis</h2>
              <p className="body-md leading-relaxed">{movie.synopsis}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Director</p>
                  <p className="font-medium">{movie.director}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Release Date</p>
                  <p className="font-medium">{formatDate(movie.release_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Duration</p>
                  <p className="font-medium">{movie.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Languages</p>
                  <p className="font-medium">{movie.language.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Date Selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {dates.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedDate === date
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            {/* Theatres & Shows */}
            <div className="space-y-4">
              {theatres.map(theatre => {
                const theatreShows = movieShows.filter(s => s.theatre_id === theatre.id);
                if (theatreShows.length === 0) return null;

                return (
                  <div key={theatre.id} className="glass-card p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div>
                        <h3 className="font-semibold">{theatre.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {theatre.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" /> {theatre.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Monitor className="w-3.5 h-3.5" /> {theatre.screens} screens
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {theatreShows.map(show => (
                        <button
                          key={show.id}
                          onClick={() => {
                            if (!user) {
                              navigate('/login');
                              return;
                            }
                            navigate(`/seat-selection/${show.id}`);
                          }}
                          className="px-4 py-2 rounded-xl border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all text-sm font-medium"
                        >
                          <div className="text-xs opacity-70">{show.screen_type}</div>
                          <div>{formatDate(show.show_time)} {new Date(show.show_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                          <div className="text-xs mt-0.5">{formatCurrency(show.price)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map((actor, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-sm">{actor}</p>
                <p className="text-xs text-neutral-500 mt-1">Cast</p>
              </div>
            ))}
            <div className="glass-card p-4 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <p className="font-medium text-sm">{movie.director}</p>
              <p className="text-xs text-neutral-500 mt-1">Director</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-2xl">
            <div className="glass-card p-6 mb-6">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} className="p-1">
                    <Star className="w-6 h-6 text-neutral-300 hover:text-warning-400 transition-colors" />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Share your thoughts about this movie..."
                className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none resize-none h-24"
              />
              <button className="btn-primary mt-3">Submit Review</button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                      U{i}
                    </div>
                    <div>
                      <p className="font-medium text-sm">User {i}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < 4 ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Amazing movie! The visuals were stunning and the storyline kept me engaged throughout. Highly recommended!
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
