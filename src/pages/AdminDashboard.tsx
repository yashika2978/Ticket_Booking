import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Ticket, Calendar, Plus, Edit3, Trash2,
  DollarSign, Star
} from 'lucide-react';
import { demoMovies, demoEvents, demoTheatres } from '../lib/data';
import { formatCurrency } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Users', value: '12,450', change: '+12%', icon: Users, color: 'from-primary-500 to-primary-600' },
  { label: 'Total Bookings', value: '8,320', change: '+8%', icon: Ticket, color: 'from-accent-500 to-accent-600' },
  { label: 'Revenue', value: '₹24.5L', change: '+15%', icon: DollarSign, color: 'from-success-500 to-success-600' },
  { label: 'Events', value: '156', change: '+5%', icon: Calendar, color: 'from-warning-500 to-warning-600' },
];

const recentBookings = [
  { id: 'BK123456', movie: 'The Dark Horizon', user: 'Rahul Sharma', amount: 900, date: '2024-12-15', status: 'confirmed' },
  { id: 'BK123457', movie: 'Echoes of Tomorrow', user: 'Priya Patel', amount: 600, date: '2024-12-15', status: 'confirmed' },
  { id: 'BK123458', movie: 'Midnight Heist', user: 'Arjun Mehta', amount: 1500, date: '2024-12-14', status: 'confirmed' },
  { id: 'BK123459', movie: 'Neon Dreams', user: 'Sneha Gupta', amount: 500, date: '2024-12-14', status: 'cancelled' },
];

const topMovies = [
  { title: 'The Dark Horizon', bookings: 2450, revenue: 980000, rating: 4.8 },
  { title: 'Echoes of Tomorrow', bookings: 1890, revenue: 756000, rating: 4.5 },
  { title: 'Midnight Heist', bookings: 1560, revenue: 624000, rating: 4.2 },
  { title: 'Neon Dreams', bookings: 1340, revenue: 536000, rating: 4.3 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'movies' | 'events' | 'theatres' | 'bookings'>('overview');
  const [showAddMovie, setShowAddMovie] = useState(false);
  void showAddMovie;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Access Denied</h1>
          <p className="body-md mb-6">Please sign in to access the admin dashboard</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-xl mb-1">Admin Dashboard</h1>
            <p className="body-md">Manage your platform and view analytics</p>
          </div>
          <button
            onClick={() => setShowAddMovie(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Movie
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-success-600 dark:text-success-400">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-8 w-fit">
          {(['overview', 'movies', 'events', 'theatres', 'bookings'] as const).map(tab => (
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

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue Chart Placeholder */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-400"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-neutral-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Movies */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Top Performing Movies</h3>
              <div className="space-y-4">
                {topMovies.map((movie, i) => (
                  <div key={movie.title} className="flex items-center gap-4">
                    <span className="w-6 text-sm font-bold text-neutral-500">#{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{movie.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-neutral-500">{movie.bookings.toLocaleString()} bookings</span>
                        <span className="flex items-center gap-1 text-xs text-warning-500">
                          <Star className="w-3 h-3 fill-current" /> {movie.rating}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {formatCurrency(movie.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="glass-card p-6 lg:col-span-2">
              <h3 className="font-semibold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-700">
                      <th className="pb-3 font-medium">Booking ID</th>
                      <th className="pb-3 font-medium">Movie</th>
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 text-sm font-mono">{booking.id}</td>
                        <td className="py-3 text-sm">{booking.movie}</td>
                        <td className="py-3 text-sm">{booking.user}</td>
                        <td className="py-3 text-sm font-medium">{formatCurrency(booking.amount)}</td>
                        <td className="py-3 text-sm text-neutral-500">{booking.date}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                              : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <h3 className="font-semibold">All Movies</h3>
              <button onClick={() => setShowAddMovie(true)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Movie
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-700">
                    <th className="p-4 font-medium">Movie</th>
                    <th className="p-4 font-medium">Genre</th>
                    <th className="p-4 font-medium">Rating</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demoMovies.map(movie => (
                    <tr key={movie.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={movie.poster_url} alt={movie.title} className="w-10 h-14 rounded-lg object-cover" />
                          <span className="font-medium text-sm">{movie.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{movie.genre.join(', ')}</td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" /> {movie.rating}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          movie.is_trending
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                            : movie.is_upcoming
                            ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                        }`}>
                          {movie.is_trending ? 'Trending' : movie.is_upcoming ? 'Upcoming' : 'Now Showing'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-900/20 text-error-600 dark:text-error-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoEvents.map(event => (
              <div key={event.id} className="glass-card overflow-hidden">
                <img src={event.poster_url} alt={event.title} className="w-full aspect-video object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{event.venue} | {event.city}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600 dark:text-primary-400">₹{event.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-900/20 text-error-600 dark:text-error-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'theatres' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoTheatres.map(theatre => (
              <div key={theatre.id} className="glass-card p-6">
                <h3 className="font-semibold mb-2">{theatre.name}</h3>
                <p className="text-sm text-neutral-500 mb-3">{theatre.address}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" /> {theatre.rating}
                  </span>
                  <span>{theatre.screens} screens</span>
                  <span>{theatre.distance}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium">
                    Edit
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 hover:bg-error-100 dark:hover:bg-error-900/40 transition-colors text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold">All Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-700">
                    <th className="p-4 font-medium">Booking ID</th>
                    <th className="p-4 font-medium">Movie</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(booking => (
                    <tr key={booking.id} className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="p-4 text-sm font-mono">{booking.id}</td>
                      <td className="p-4 text-sm">{booking.movie}</td>
                      <td className="p-4 text-sm">{booking.user}</td>
                      <td className="p-4 text-sm font-medium">{formatCurrency(booking.amount)}</td>
                      <td className="p-4 text-sm text-neutral-500">{booking.date}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                            : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
