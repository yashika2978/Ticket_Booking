import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, Film, Ticket } from 'lucide-react';
import { demoMovies } from '../lib/data';
import { useAuth } from '../contexts/AuthContext';

export default function Wishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(demoMovies.slice(0, 4));

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(m => m.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="heading-lg mb-4">Sign In Required</h1>
          <p className="body-md mb-6">Please sign in to view your wishlist</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-xl mb-2">My Wishlist</h1>
        <p className="body-lg mb-8">Movies and events you have saved for later</p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg text-neutral-500 mb-4">Your wishlist is empty</p>
            <Link to="/movies" className="btn-primary inline-flex items-center gap-2">
              <Film className="w-4 h-4" /> Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-3">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => removeFromWishlist(movie.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-error-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      <Ticket className="w-4 h-4" /> Book Now
                    </Link>
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base truncate">{movie.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{movie.genre.join(', ')}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
