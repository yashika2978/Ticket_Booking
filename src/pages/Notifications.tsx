import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Ticket, Tag, Info, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'offer' | 'reminder' | 'info';
  isRead: boolean;
  time: string;
}

const demoNotifications: Notification[] = [
  { id: '1', title: 'Booking Confirmed', message: 'Your tickets for The Dark Horizon have been confirmed. Booking ID: BK123456', type: 'booking', isRead: false, time: '2 min ago' },
  { id: '2', title: 'Special Offer', message: 'Get 30% off on all bookings this weekend. Use code WEEKEND30', type: 'offer', isRead: false, time: '1 hour ago' },
  { id: '3', title: 'Show Reminder', message: 'Your movie starts in 2 hours. Don\'t forget to reach the theatre on time!', type: 'reminder', isRead: true, time: '3 hours ago' },
  { id: '4', title: 'Payment Successful', message: 'Your payment of ₹900 has been processed successfully.', type: 'booking', isRead: true, time: 'Yesterday' },
  { id: '5', title: 'New Event', message: 'Arijit Singh Live in Concert is now available for booking in your city!', type: 'info', isRead: true, time: '2 days ago' },
];

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(demoNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return Ticket;
      case 'offer': return Tag;
      case 'reminder': return Bell;
      case 'info': return Info;
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400';
      case 'offer': return 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400';
      case 'reminder': return 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400';
      case 'info': return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Bell className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="heading-lg mb-4">Sign In Required</h1>
          <p className="body-md mb-6">Please sign in to view your notifications</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-xl mb-1">Notifications</h1>
            <p className="body-md">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg text-neutral-500">No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markAsRead(notification.id)}
                  className={`glass-card p-4 cursor-pointer hover:shadow-md transition-all relative ${
                    !notification.isRead ? 'border-l-4 border-l-primary-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getColor(notification.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium text-sm ${!notification.isRead ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-neutral-500 shrink-0 ml-2">{notification.time}</span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{notification.message}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                      className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-900/20 text-error-600 dark:text-error-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {!notification.isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full" />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
