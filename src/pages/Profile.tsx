import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Phone, MapPin, Ticket, Heart, Star, Settings, LogOut,
  Edit3, Camera, Shield, Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Profile() {
  const { user, signOut } = useAuth();
  useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || 'User',
    email: user?.email || '',
    phone: '+91 98765 43210',
    city: 'Mumbai',
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <User className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="heading-lg mb-4">Sign In Required</h1>
          <p className="body-md mb-6">Please sign in to view your profile</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Bookings', value: '12', icon: Ticket },
    { label: 'Wishlist', value: '8', icon: Heart },
    { label: 'Reviews', value: '5', icon: Star },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
                {profile.name[0].toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <h1 className="heading-md">{profile.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-neutral-500 mt-1">{profile.email}</p>
              <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <MapPin className="w-4 h-4" /> {profile.city}
                </span>
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <Phone className="w-4 h-4" /> {profile.phone}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-1">
                    <stat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="font-bold">{stat.value}</p>
                  <p className="text-xs text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-6 mb-8"
          >
            <h3 className="font-semibold mb-4">Edit Profile</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
              <button onClick={() => setIsEditing(false)} className="btn-primary">Save Changes</button>
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'My Tickets', icon: Ticket, href: '/my-tickets', color: 'from-primary-500 to-primary-600' },
            { label: 'Wishlist', icon: Heart, href: '/wishlist', color: 'from-accent-500 to-accent-600' },
            { label: 'My Reviews', icon: Star, href: '#', color: 'from-warning-500 to-warning-600' },
            { label: 'Notifications', icon: Bell, href: '/notifications', color: 'from-success-500 to-success-600' },
            { label: 'Security', icon: Shield, href: '#', color: 'from-error-500 to-error-600' },
            { label: 'Settings', icon: Settings, href: '#', color: 'from-neutral-500 to-neutral-600' },
          ].map(item => (
            <Link
              key={item.label}
              to={item.href}
              className="glass-card p-4 flex items-center gap-4 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Sign Out */}
        <div className="mt-8 text-center">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
