import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Download, Share2, QrCode, Ticket, Home, Calendar, MapPin, Clock
} from 'lucide-react';
import { formatDate } from '../lib/utils';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as {
    showId: string;
    movie: { title: string; poster_url: string; id: string };
    theatre: { name: string };
    show: { screen_type: string; show_time: string };
    selectedSeats: string[];
    foodOrder: [string, number][];
    total: number;
    finalTotal: number;
    paymentMethod: string;
    bookingId: string;
  } | null;

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  if (!data) return null;

  const showDate = new Date(data.show.show_time);

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success-600 dark:text-success-400" />
          </div>
          <h1 className="heading-lg mb-2">Booking Confirmed!</h1>
          <p className="body-md">Your tickets have been booked successfully</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden mb-6"
        >
          {/* Ticket Header */}
          <div className="relative h-32 bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center">
            <img
              src={data.movie.poster_url}
              alt={data.movie.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-center">
              <Ticket className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white font-bold text-lg">{data.bookingId}</p>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <h2 className="font-bold text-xl mb-1">{data.movie.title}</h2>
            <p className="text-sm text-neutral-500 mb-4">{data.theatre.name}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-xs text-neutral-500">Date</p>
                  <p className="text-sm font-medium">{formatDate(data.show.show_time)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-xs text-neutral-500">Time</p>
                  <p className="text-sm font-medium">{showDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-xs text-neutral-500">Screen</p>
                  <p className="text-sm font-medium">{data.show.screen_type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-xs text-neutral-500">Seats</p>
                  <p className="text-sm font-medium">{data.selectedSeats.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-4 border-t border-dashed border-neutral-300 dark:border-neutral-700">
              <div className="w-40 h-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                <QrCode className="w-32 h-32 text-neutral-800 dark:text-neutral-200" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-neutral-500">Scan at the entrance</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all font-medium text-sm">
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all font-medium text-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <Link to="/my-tickets" className="btn-primary w-full flex items-center justify-center gap-2">
            <Ticket className="w-4 h-4" /> View My Tickets
          </Link>
          <Link to="/" className="btn-secondary w-full flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
