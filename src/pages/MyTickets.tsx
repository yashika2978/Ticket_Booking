import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Ticket, Calendar, MapPin, Clock, QrCode, Download, X, Star
} from 'lucide-react';
import { demoMovies, demoTheatres, demoShows } from '../lib/data';
import { formatDate, formatCurrency } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function MyTickets() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Demo bookings
  const upcomingBookings = [
    {
      id: 'BK123456',
      movie: demoMovies[0],
      theatre: demoTheatres[0],
      show: demoShows[0],
      seats: ['F5', 'F6'],
      total: 500,
      status: 'confirmed' as const,
    },
    {
      id: 'BK123457',
      movie: demoMovies[2],
      theatre: demoTheatres[1],
      show: demoShows[3],
      seats: ['G10', 'G11', 'G12'],
      total: 1500,
      status: 'confirmed' as const,
    },
  ];

  const pastBookings = [
    {
      id: 'BK123400',
      movie: demoMovies[1],
      theatre: demoTheatres[2],
      show: demoShows[5],
      seats: ['C3', 'C4'],
      total: 600,
      status: 'completed' as const,
    },
  ];

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="heading-lg mb-4">Sign In Required</h1>
          <p className="body-md mb-6">Please sign in to view your tickets</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-xl mb-2">My Tickets</h1>
        <p className="body-lg mb-8">Manage your bookings and view your history</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-8 w-fit">
          {(['upcoming', 'past'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-neutral-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg text-neutral-500">No {activeTab} bookings</p>
            <Link to="/movies" className="btn-primary mt-4 inline-block">Book Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={booking.movie.poster_url}
                    alt={booking.movie.title}
                    className="w-full sm:w-32 h-48 sm:h-44 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.movie.title}</h3>
                        <p className="text-sm text-neutral-500">{booking.theatre.name}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {booking.status === 'confirmed' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm">{formatDate(booking.show.show_time)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm">{new Date(booking.show.show_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm">{booking.show.screen_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm">{booking.seats.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary-600 dark:text-primary-400">{formatCurrency(booking.total)}</p>
                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => setSelectedTicket(booking.id)}
                              className="px-3 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                            >
                              View Ticket
                            </button>
                            <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {booking.status === 'completed' && (
                          <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm">
                            <Star className="w-4 h-4" /> Rate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-sm w-full p-6 relative"
          >
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <Ticket className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="font-mono text-sm text-neutral-500">{selectedTicket}</p>
            </div>

            <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-40 h-40 text-neutral-800 dark:text-neutral-200" />
            </div>

            <p className="text-center text-xs text-neutral-500 mb-4">Scan at the entrance</p>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download Ticket
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
