import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Star, Calendar, ChevronRight, Ticket,
  Users, Zap, Shield, Headphones, ChevronDown, Mail, ArrowRight
} from 'lucide-react';
import { demoMovies, demoEvents, cities, testimonials, faqs, offers } from '../lib/data';
import { formatDate, cn } from '../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  const trendingMovies = demoMovies.filter(m => m.is_trending);
  const upcomingMovies = demoMovies.filter(m => m.is_upcoming);
  const liveEvents = demoEvents.filter(e => e.is_live);
  const concerts = demoEvents.filter(e => e.category === 'Concert');
  const sportsEvents = demoEvents.filter(e => e.category === 'Sports');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6">
              Your Gateway to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Unforgettable Experiences
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Book tickets for movies, concerts, sports, and live events. The best entertainment, right at your fingertips.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, events, cities..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* City Selector */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <MapPin className="w-5 h-5 text-neutral-400" />
              {cities.slice(0, 5).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    selectedCity === city
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-neutral-400" />
        </motion.div>
      </section>

      {/* Trending Movies */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-1">Trending Now</h2>
              <p className="body-md">Most popular movies this week</p>
            </div>
            <Link to="/movies" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {trendingMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Events */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-1">Live Events</h2>
              <p className="body-md">Happening right now</p>
            </div>
            <Link to="/events" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {liveEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-1">Coming Soon</h2>
              <p className="body-md">Movies you can't miss</p>
            </div>
            <Link to="/movies" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {upcomingMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MovieCard movie={movie} isUpcoming />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Concerts */}
      <section className="section-padding bg-gradient-to-b from-neutral-100/50 to-transparent dark:from-neutral-900/50 dark:to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-1">Concerts</h2>
              <p className="body-md">Live music experiences</p>
            </div>
            <Link to="/concerts" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg mb-1">Sports Events</h2>
              <p className="body-md">Catch the action live</p>
            </div>
            <Link to="/sports" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Exclusive Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{offer.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{offer.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-mono rounded-lg">
                  {offer.code}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{testimonial.comment}</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Popular Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <motion.div
                key={city}
                whileHover={{ scale: 1.02 }}
                className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={[
                    'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/1006190/pexels-photo-1006190.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'https://images.pexels.com/photos/26926255/pexels-photo-26926255.jpeg?auto=compress&cs=tinysrgb&w=400',
                  ][index]}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <span className="text-white font-semibold">{city}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Why Choose ShowTime</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Instant Booking', desc: 'Book tickets in seconds with our streamlined process' },
              { icon: Shield, title: 'Secure Payments', desc: 'Your transactions are protected with bank-level security' },
              { icon: Users, title: 'Group Booking', desc: 'Book for your entire group with special discounts' },
              { icon: Headphones, title: '24/7 Support', desc: 'Our team is always here to help you' },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown className={cn(
                    'w-5 h-5 shrink-0 transition-transform',
                    activeFaq === index && 'rotate-180'
                  )} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === index ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-neutral-600 dark:text-neutral-400 text-sm">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-8 sm:p-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10">
            <Mail className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <h2 className="heading-md mb-2">Stay in the Loop</h2>
            <p className="body-md mb-6">Get exclusive offers, new releases, and event updates delivered to your inbox.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500/50 outline-none"
              />
              <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">ShowTime</h3>
              <p className="text-sm">Your premier destination for movie and event bookings.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/movies" className="hover:text-white transition-colors">Movies</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/offers" className="hover:text-white transition-colors">Offers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Instagram</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p> ShowTime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MovieCard({ movie, isUpcoming = false }: { movie: typeof demoMovies[0]; isUpcoming?: boolean }) {
  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden mb-3">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isUpcoming && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded-lg">
            Coming Soon
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-lg">
            Book Now
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
          <span className="text-xs font-medium">{movie.rating}</span>
        </div>
        <span className="text-xs text-neutral-500">{movie.duration}</span>
        <span className="text-xs text-neutral-500">{movie.genre[0]}</span>
      </div>
    </Link>
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
