import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, Wallet, Smartphone, Building2, QrCode, ArrowLeft,
  Shield, CheckCircle
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { offers } from '../lib/data';

type PaymentMethod = 'card' | 'upi' | 'wallet' | 'netbanking' | 'qr';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as {
    showId: string;
    movie: { title: string; poster_url: string };
    theatre: { name: string };
    show: { screen_type: string; show_time: string };
    selectedSeats: string[];
    foodOrder: [string, number][];
    total: number;
  } | null;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof offers[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Invalid Booking</h1>
          <button onClick={() => navigate('/movies')} className="btn-primary">Browse Movies</button>
        </div>
      </div>
    );
  }

  const discount = appliedPromo
    ? appliedPromo.code === 'BUY4GET1'
      ? Math.min(data.total / data.selectedSeats.length, data.total)
      : Math.min((data.total * appliedPromo.discount) / 100, appliedPromo.maxDiscount)
    : 0;

  const finalTotal = Math.max(0, data.total - discount);

  const applyPromo = () => {
    const promo = offers.find(o => o.code.toLowerCase() === promoCode.trim().toLowerCase());
    if (promo) {
      setAppliedPromo(promo);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    navigate('/confirmation', {
      state: {
        ...data,
        finalTotal,
        paymentMethod,
        bookingId: 'BK' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      }
    });
  };

  const paymentMethods = [
    { id: 'card' as PaymentMethod, label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi' as PaymentMethod, label: 'UPI', icon: Smartphone },
    { id: 'wallet' as PaymentMethod, label: 'Wallet', icon: Wallet },
    { id: 'netbanking' as PaymentMethod, label: 'Net Banking', icon: Building2 },
    { id: 'qr' as PaymentMethod, label: 'QR Code', icon: QrCode },
  ];

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="heading-md">Payment</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Method Selection */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === method.id ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500'}`} />
                    <span className={`text-xs font-medium ${paymentMethod === method.id ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="glass-card p-6">
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Card Details</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">UPI Payment</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none"
                    />
                  </div>
                  <p className="text-sm text-neutral-500">You will receive a payment request on your UPI app.</p>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Select Wallet</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map(wallet => (
                      <button key={wallet} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 transition-all text-sm font-medium">
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Select Bank</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank'].map(bank => (
                      <button key={bank} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 transition-all text-sm font-medium">
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'qr' && (
                <div className="text-center py-8">
                  <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-neutral-400" />
                  </div>
                  <p className="text-sm text-neutral-500">Scan this QR code with any UPI app to pay</p>
                </div>
              )}
            </div>

            {/* Promo Code */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary-500/50 outline-none uppercase"
                />
                <button
                  onClick={applyPromo}
                  disabled={!promoCode.trim() || !!appliedPromo}
                  className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-success-50 dark:bg-success-900/30 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span className="text-sm text-success-700 dark:text-success-400">{appliedPromo.title} applied! You saved {formatCurrency(discount)}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <img src={data.movie.poster_url} alt={data.movie.title} className="w-12 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-sm">{data.movie.title}</p>
                  <p className="text-xs text-neutral-500">{data.theatre.name}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Seats ({data.selectedSeats.length})</span>
                  <span>{data.selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(data.total)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-success-600 dark:text-success-400">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-success-50 dark:bg-success-900/20">
                <Shield className="w-5 h-5 text-success-600 dark:text-success-400" />
                <span className="text-xs text-success-700 dark:text-success-400">Secure payment powered by Stripe</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatCurrency(finalTotal)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
