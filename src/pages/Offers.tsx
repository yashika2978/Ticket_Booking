import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, CheckCircle, Gift, Percent, Clock } from 'lucide-react';
import { offers } from '../lib/data';

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-2">Exclusive Offers</h1>
          <p className="body-lg">Save big on your next booking with these amazing deals</p>
        </div>

        {/* Hero Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-500/20 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium mb-4">
                <Gift className="w-4 h-4" /> Limited Time Offer
              </div>
              <h2 className="heading-lg mb-3">Get 50% Off Your First Booking</h2>
              <p className="body-md mb-6">New to ShowTime? Enjoy a massive 50% discount on your first movie or event booking. Don't miss out!</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => copyCode('FIRST50')}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  {copiedCode === 'FIRST50' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === 'FIRST50' ? 'Copied!' : 'Copy FIRST50'}
                </button>
                <span className="text-sm text-neutral-500">Valid until Dec 31, 2025</span>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
              <Percent className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* All Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <Clock className="w-3 h-3" /> Until {offer.validUntil}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{offer.description}</p>

              <div className="flex items-center justify-between">
                <div className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg font-mono text-sm">
                  {offer.code}
                </div>
                <button
                  onClick={() => copyCode(offer.code)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  {copiedCode === offer.code ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === offer.code ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terms */}
        <div className="mt-12 glass-card p-6">
          <h3 className="font-semibold mb-4">Terms & Conditions</h3>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Offers are valid for a limited time only and subject to change without notice.</li>
            <li>Each promo code can be used once per user unless stated otherwise.</li>
            <li>Discounts apply to ticket prices only and do not include convenience fees or taxes.</li>
            <li>ShowTime reserves the right to modify or cancel any offer at any time.</li>
            <li>Offers cannot be combined with other promotions unless explicitly mentioned.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
