import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Info, Minus, Plus } from 'lucide-react';
import { demoShows, demoTheatres, demoMovies, foodItems } from '../lib/data';
import { formatCurrency } from '../lib/utils';

type SeatType = 'available' | 'selected' | 'booked' | 'vip' | 'premium' | 'recliner';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 16;

function generateSeats(): Seat[] {
  const seats: Seat[] = [];
  const bookedSeats = new Set<string>();

  for (let i = 0; i < 45; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const num = Math.floor(Math.random() * SEATS_PER_ROW) + 1;
    bookedSeats.add(`${row}${num}`);
  }

  ROWS.forEach((row, rowIndex) => {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      let type: SeatType = 'available';
      let price = 250;

      if (bookedSeats.has(`${row}${num}`)) {
        type = 'booked';
      } else if (rowIndex < 2) {
        type = 'recliner';
        price = 550;
      } else if (rowIndex < 4) {
        type = 'premium';
        price = 400;
      } else if (rowIndex < 6) {
        type = 'vip';
        price = 350;
      }

      seats.push({ id: `${row}${num}`, row, number: num, type, price });
    }
  });

  return seats;
}

export default function SeatSelection() {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [seats] = useState(generateSeats);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [foodOrder, setFoodOrder] = useState<Map<string, number>>(new Map());
  const [step, setStep] = useState<'seats' | 'food' | 'summary'>('seats');

  const show = demoShows.find(s => s.id === showId);
  const movie = show ? demoMovies.find(m => m.id === show.movie_id) : null;
  const theatre = show ? demoTheatres.find(t => t.id === show.theatre_id) : null;

  if (!show || !movie || !theatre) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Show Not Found</h1>
          <button onClick={() => navigate('/movies')} className="btn-primary">Browse Movies</button>
        </div>
      </div>
    );
  }

  const toggleSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.type === 'booked') return;

    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
  };

  const selectedSeatData = seats.filter(s => selectedSeats.has(s.id));
  const ticketTotal = selectedSeatData.reduce((sum, s) => sum + s.price, 0);
  const foodTotal = Array.from(foodOrder.entries()).reduce((sum, [id, qty]) => {
    const item = foodItems.find(f => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const convenienceFee = selectedSeats.size > 0 ? 30 : 0;
  const gst = Math.round((ticketTotal + foodTotal + convenienceFee) * 0.18);
  const grandTotal = ticketTotal + foodTotal + convenienceFee + gst;

  const addFood = (itemId: string) => {
    setFoodOrder(prev => {
      const next = new Map(prev);
      next.set(itemId, (next.get(itemId) || 0) + 1);
      return next;
    });
  };

  const removeFood = (itemId: string) => {
    setFoodOrder(prev => {
      const next = new Map(prev);
      const qty = next.get(itemId) || 0;
      if (qty <= 1) next.delete(itemId);
      else next.set(itemId, qty - 1);
      return next;
    });
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.has(seat.id)) return 'bg-primary-500 text-white border-primary-500';
    switch (seat.type) {
      case 'booked': return 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed';
      case 'vip': return 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border-accent-300 dark:border-accent-700';
      case 'premium': return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700';
      case 'recliner': return 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 border-warning-300 dark:border-warning-700';
      default: return 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="heading-md">{movie.title}</h1>
            <p className="text-sm text-neutral-500">{theatre.name} | {show.screen_type} | {new Date(show.show_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {(['seats', 'food', 'summary'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s ? 'bg-primary-500 text-white' :
                ['seats', 'food', 'summary'].indexOf(step) > i ? 'bg-success-500 text-white' :
                'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
              }`}>
                {['seats', 'food', 'summary'].indexOf(step) > i ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium capitalize hidden sm:block ${step === s ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500'}`}>
                {s}
              </span>
              {i < 2 && <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-700" />}
            </div>
          ))}
        </div>

        {step === 'seats' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Seat Map */}
            <div className="lg:col-span-2">
              <div className="glass-card p-4 sm:p-6">
                {/* Screen */}
                <div className="mb-8">
                  <div className="w-full h-2 bg-gradient-to-r from-transparent via-neutral-400 to-transparent rounded-full mb-2" />
                  <p className="text-center text-xs text-neutral-500 uppercase tracking-widest">Screen</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setZoom(1); setSelectedSeats(new Set()); }} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-500">{selectedSeats.size} seats selected</p>
                </div>

                {/* Seats */}
                <div className="overflow-auto" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                  <div className="min-w-max mx-auto">
                    {ROWS.map(row => (
                      <div key={row} className="flex items-center gap-1 mb-1.5 justify-center">
                        <span className="w-6 text-xs text-neutral-500 text-right mr-2">{row}</span>
                        {seats.filter(s => s.row === row).map(seat => (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(seat.id)}
                            disabled={seat.type === 'booked'}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[10px] sm:text-xs font-medium border transition-all ${getSeatColor(seat)}`}
                            title={`${seat.row}${seat.number} - ${seat.type} - ${formatCurrency(seat.price)}`}
                          >
                            {seat.number}
                          </button>
                        ))}
                        <span className="w-6 text-xs text-neutral-500 ml-2">{row}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  {[
                    { label: 'Available', color: 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600' },
                    { label: 'Selected', color: 'bg-primary-500' },
                    { label: 'Booked', color: 'bg-neutral-300 dark:bg-neutral-700' },
                    { label: 'VIP', color: 'bg-accent-100 dark:bg-accent-900/30 border-accent-300' },
                    { label: 'Premium', color: 'bg-primary-100 dark:bg-primary-900/30 border-primary-300' },
                    { label: 'Recliner', color: 'bg-warning-100 dark:bg-warning-900/30 border-warning-300' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border ${item.color}`} />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                {selectedSeats.size === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <Info className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Select seats to continue</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-4">
                      {selectedSeatData.map(seat => (
                        <div key={seat.id} className="flex justify-between text-sm">
                          <span>{seat.id} ({seat.type})</span>
                          <span>{formatCurrency(seat.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tickets ({selectedSeats.size})</span>
                        <span>{formatCurrency(ticketTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Convenience Fee</span>
                        <span>{formatCurrency(convenienceFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GST (18%)</span>
                        <span>{formatCurrency(gst)}</span>
                      </div>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('food')}
                      className="btn-primary w-full mt-4"
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 'food' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Pre-order Food & Beverages</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {foodItems.map(item => {
                    const qty = foodOrder.get(item.id) || 0;
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-neutral-500">{item.category}</p>
                          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {qty > 0 && (
                            <>
                              <button onClick={() => removeFood(item.id)} className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{qty}</span>
                            </>
                          )}
                          <button onClick={() => addFood(item.id)} className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {selectedSeatData.map(seat => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span>{seat.id}</span>
                      <span>{formatCurrency(seat.price)}</span>
                    </div>
                  ))}
                </div>
                {foodTotal > 0 && (
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mb-2">
                    <p className="text-xs text-neutral-500 mb-1">Food & Beverages</p>
                    {Array.from(foodOrder.entries()).map(([id, qty]) => {
                      const item = foodItems.find(f => f.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span>{item.name} x{qty}</span>
                          <span>{formatCurrency(item.price * qty)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Convenience Fee</span>
                    <span>{formatCurrency(convenienceFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>GST (18%)</span>
                    <span>{formatCurrency(gst)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setStep('seats')} className="btn-secondary flex-1">Back</button>
                  <button onClick={() => setStep('summary')} className="btn-primary flex-1">Continue</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'summary' && (
          <div className="max-w-lg mx-auto">
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 text-center">Booking Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <img src={movie.poster_url} alt={movie.title} className="w-16 h-24 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-semibold">{movie.title}</h4>
                    <p className="text-sm text-neutral-500">{theatre.name}</p>
                    <p className="text-sm text-neutral-500">{show.screen_type} | {new Date(show.show_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Seats ({selectedSeats.size})</span>
                    <span>{Array.from(selectedSeats).join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ticket Price</span>
                    <span>{formatCurrency(ticketTotal)}</span>
                  </div>
                  {foodTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Food & Beverages</span>
                      <span>{formatCurrency(foodTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Convenience Fee</span>
                    <span>{formatCurrency(convenienceFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>{formatCurrency(gst)}</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setStep('food')} className="btn-secondary flex-1">Back</button>
                  <button
                    onClick={() => navigate('/payment', { state: { showId, movie, theatre, show, selectedSeats: Array.from(selectedSeats), foodOrder: Array.from(foodOrder.entries()), total: grandTotal } })}
                    className="btn-primary flex-1"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
