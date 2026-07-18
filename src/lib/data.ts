export interface Movie {
  id: string;
  title: string;
  poster_url: string;
  banner_url: string;
  rating: number;
  duration: string;
  genre: string[];
  language: string[];
  release_date: string;
  age_rating: string;
  synopsis: string;
  cast: string[];
  director: string;
  trailer_url: string;
  gallery: string[];
  is_trending: boolean;
  is_upcoming: boolean;
}

export interface Event {
  id: string;
  title: string;
  poster_url: string;
  banner_url: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  rating: number;
  is_live: boolean;
}

export interface Theatre {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  screens: number;
  distance: string;
}

export interface Show {
  id: string;
  movie_id: string;
  theatre_id: string;
  screen_type: string;
  show_time: string;
  price: number;
  seats_available: number;
  total_seats: number;
}

export interface Booking {
  id: string;
  user_id: string;
  show_id: string;
  seats: string[];
  total_amount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  booking_date: string;
}

export interface Review {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  comment: string;
  likes: number;
  user_name?: string;
  created_at: string;
}

export const demoMovies: Movie[] = [
  {
    id: '1',
    title: 'The Dark Horizon',
    poster_url: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.8,
    duration: '2h 45m',
    genre: ['Sci-Fi', 'Thriller'],
    language: ['English', 'Hindi'],
    release_date: '2024-12-15',
    age_rating: 'UA',
    synopsis: 'In a future where reality itself is programmable, a rogue coder discovers a backdoor that could unravel the fabric of existence. As digital and physical worlds collide, she must race against time to prevent a catastrophic system failure.',
    cast: ['Emma Clarke', 'Ryan Mitchell', 'Sophie Chen', 'David Park'],
    director: 'Christopher Nolan-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: true,
    is_upcoming: false,
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    poster_url: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.5,
    duration: '2h 15m',
    genre: ['Drama', 'Romance'],
    language: ['Hindi', 'English'],
    release_date: '2024-11-20',
    age_rating: 'U',
    synopsis: 'Two strangers connected by mysterious recurring dreams discover they are living parallel lives across different timelines. Their journey to find each other becomes a race against fate itself.',
    cast: ['Priya Sharma', 'Arjun Kapoor', 'Neha Gupta'],
    director: 'Anurag Kashyap-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: true,
    is_upcoming: false,
  },
  {
    id: '3',
    title: 'Midnight Heist',
    poster_url: 'https://images.pexels.com/photos/7234219/pexels-photo-7234219.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/7234219/pexels-photo-7234219.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.2,
    duration: '2h 30m',
    genre: ['Action', 'Crime'],
    language: ['English', 'Tamil'],
    release_date: '2024-10-10',
    age_rating: 'A',
    synopsis: 'A master thief assembles an unlikely crew for the most ambitious heist in history: stealing a priceless artifact from the most secure vault on Earth. But betrayal lurks in every shadow.',
    cast: ['Tom Hardy', 'Charlize Theron', 'Idris Elba'],
    director: 'Guy Ritchie-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/7234219/pexels-photo-7234219.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: true,
    is_upcoming: false,
  },
  {
    id: '4',
    title: 'The Last Garden',
    poster_url: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.6,
    duration: '2h 10m',
    genre: ['Fantasy', 'Adventure'],
    language: ['English'],
    release_date: '2025-01-10',
    age_rating: 'U',
    synopsis: 'In a world where nature has retreated to hidden sanctuaries, a young botanist discovers the last magical garden and must protect it from those who would exploit its power.',
    cast: ['Florence Pugh', 'Timothee Chalamet', 'Zendaya'],
    director: 'Wes Anderson-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: false,
    is_upcoming: true,
  },
  {
    id: '5',
    title: 'Velocity',
    poster_url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.0,
    duration: '2h 5m',
    genre: ['Action', 'Sports'],
    language: ['Hindi', 'English'],
    release_date: '2025-02-14',
    age_rating: 'UA',
    synopsis: 'A former racing champion comes out of retirement to mentor a young prodigy while confronting demons from his past. The track becomes their battleground for redemption.',
    cast: ['Shah Rukh Khan', 'Ranveer Singh', 'Deepika Padukone'],
    director: 'Karan Johar-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: false,
    is_upcoming: true,
  },
  {
    id: '6',
    title: 'Neon Dreams',
    poster_url: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.3,
    duration: '2h 20m',
    genre: ['Musical', 'Drama'],
    language: ['English', 'Hindi'],
    release_date: '2024-09-15',
    age_rating: 'U',
    synopsis: 'A struggling musician in a neon-lit cyberpunk city discovers an AI that can compose the perfect song. But perfection comes at a soul-crushing price.',
    cast: ['Anya Taylor-Joy', 'Oscar Isaac', 'Tilda Swinton'],
    director: 'Denis Villeneuve-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: true,
    is_upcoming: false,
  },
  {
    id: '7',
    title: 'The Silent Witness',
    poster_url: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.4,
    duration: '2h 35m',
    genre: ['Mystery', 'Thriller'],
    language: ['English', 'Tamil', 'Telugu'],
    release_date: '2024-08-20',
    age_rating: 'UA',
    synopsis: 'A deaf forensic artist becomes the only witness to a high-profile murder. Her unique perspective on the world might be the key to cracking the case that has stumped everyone.',
    cast: ['Millie Bobby Brown', 'Andrew Scott', 'Viola Davis'],
    director: 'David Fincher-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: false,
    is_upcoming: false,
  },
  {
    id: '8',
    title: 'Kingdom of Ash',
    poster_url: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 4.7,
    duration: '3h 0m',
    genre: ['Epic', 'War'],
    language: ['Hindi', 'English'],
    release_date: '2025-03-01',
    age_rating: 'A',
    synopsis: 'In an ancient empire torn apart by civil war, a disgraced general must unite warring factions against an invading force that threatens to erase their civilization from history.',
    cast: ['Hrithik Roshan', 'Vicky Kaushal', 'Alia Bhatt'],
    director: 'SS Rajamouli-esque',
    trailer_url: '',
    gallery: [
      'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    is_trending: false,
    is_upcoming: true,
  },
];

export const demoEvents: Event[] = [
  {
    id: 'e1',
    title: 'Neon Nights Music Festival',
    poster_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Concert',
    date: '2024-12-25',
    time: '19:00',
    venue: 'Jawaharlal Nehru Stadium',
    city: 'Delhi',
    price: 2500,
    rating: 4.6,
    is_live: true,
  },
  {
    id: 'e2',
    title: 'India vs Australia - T20',
    poster_url: 'https://images.pexels.com/photos/3621100/pexels-photo-3621100.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/3621100/pexels-photo-3621100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Sports',
    date: '2024-12-20',
    time: '19:30',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    price: 1500,
    rating: 4.9,
    is_live: true,
  },
  {
    id: 'e3',
    title: 'Comedy Central Live',
    poster_url: 'https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Comedy',
    date: '2024-12-18',
    time: '20:00',
    venue: 'Sir Mutha Venkatasubba Rao Hall',
    city: 'Chennai',
    price: 800,
    rating: 4.3,
    is_live: true,
  },
  {
    id: 'e4',
    title: 'Arijit Singh Live in Concert',
    poster_url: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Concert',
    date: '2025-01-15',
    time: '19:00',
    venue: 'DY Patil Stadium',
    city: 'Mumbai',
    price: 3500,
    rating: 4.8,
    is_live: false,
  },
  {
    id: 'e5',
    title: 'IPL 2025 - Opening Match',
    poster_url: 'https://images.pexels.com/photos/10404279/pexels-photo-10404279.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/10404279/pexels-photo-10404279.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Sports',
    date: '2025-03-22',
    time: '19:30',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bangalore',
    price: 2000,
    rating: 4.7,
    is_live: false,
  },
  {
    id: 'e6',
    title: 'Sunburn Festival 2025',
    poster_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    banner_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Concert',
    date: '2025-01-01',
    time: '16:00',
    venue: 'Vagator Beach',
    city: 'Goa',
    price: 5000,
    rating: 4.5,
    is_live: false,
  },
];

export const demoTheatres: Theatre[] = [
  { id: 't1', name: 'PVR Cinemas - Phoenix Marketcity', city: 'Mumbai', address: 'Phoenix Marketcity, Kurla, Mumbai', rating: 4.5, screens: 8, distance: '2.3 km' },
  { id: 't2', name: 'INOX - R-City Mall', city: 'Mumbai', address: 'R-City Mall, Ghatkopar, Mumbai', rating: 4.3, screens: 6, distance: '3.1 km' },
  { id: 't3', name: 'Cinepolis - Andheri', city: 'Mumbai', address: 'Andheri West, Mumbai', rating: 4.2, screens: 5, distance: '5.7 km' },
  { id: 't4', name: 'PVR - Select Citywalk', city: 'Delhi', address: 'Select Citywalk Mall, Saket, Delhi', rating: 4.6, screens: 9, distance: '4.2 km' },
  { id: 't5', name: 'INOX - Nehru Place', city: 'Delhi', address: 'Nehru Place, New Delhi', rating: 4.4, screens: 7, distance: '6.8 km' },
  { id: 't6', name: 'PVR - Forum Mall', city: 'Bangalore', address: 'Forum Mall, Koramangala, Bangalore', rating: 4.5, screens: 8, distance: '3.5 km' },
  { id: 't7', name: 'Cinepolis - VR Bengaluru', city: 'Bangalore', address: 'VR Bengaluru, Whitefield', rating: 4.3, screens: 6, distance: '8.2 km' },
  { id: 't8', name: 'PVR - Express Avenue', city: 'Chennai', address: 'Express Avenue Mall, Royapettah, Chennai', rating: 4.4, screens: 7, distance: '2.8 km' },
];

export const demoShows: Show[] = [
  { id: 's1', movie_id: '1', theatre_id: 't1', screen_type: 'IMAX', show_time: '2024-12-15T10:00:00', price: 450, seats_available: 120, total_seats: 150 },
  { id: 's2', movie_id: '1', theatre_id: 't1', screen_type: '3D', show_time: '2024-12-15T13:30:00', price: 350, seats_available: 80, total_seats: 120 },
  { id: 's3', movie_id: '1', theatre_id: 't1', screen_type: '2D', show_time: '2024-12-15T19:00:00', price: 250, seats_available: 45, total_seats: 100 },
  { id: 's4', movie_id: '1', theatre_id: 't2', screen_type: 'IMAX', show_time: '2024-12-15T11:00:00', price: 500, seats_available: 100, total_seats: 140 },
  { id: 's5', movie_id: '1', theatre_id: 't2', screen_type: '2D', show_time: '2024-12-15T16:00:00', price: 280, seats_available: 60, total_seats: 110 },
  { id: 's6', movie_id: '2', theatre_id: 't1', screen_type: '2D', show_time: '2024-12-15T12:00:00', price: 300, seats_available: 90, total_seats: 130 },
  { id: 's7', movie_id: '2', theatre_id: 't3', screen_type: '3D', show_time: '2024-12-15T15:00:00', price: 380, seats_available: 70, total_seats: 100 },
  { id: 's8', movie_id: '3', theatre_id: 't4', screen_type: 'IMAX', show_time: '2024-12-15T10:30:00', price: 550, seats_available: 110, total_seats: 160 },
  { id: 's9', movie_id: '3', theatre_id: 't4', screen_type: '2D', show_time: '2024-12-15T14:00:00', price: 320, seats_available: 50, total_seats: 120 },
  { id: 's10', movie_id: '4', theatre_id: 't5', screen_type: '3D', show_time: '2025-01-10T11:00:00', price: 400, seats_available: 100, total_seats: 140 },
];

export const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];

export const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Sci-Fi', 'Horror', 'Fantasy', 'Adventure', 'Crime', 'Mystery', 'Musical', 'War', 'Sports'];

export const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Bengali'];

export const foodItems = [
  { id: 'f1', name: 'Popcorn (Large)', price: 250, category: 'Snacks', image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f2', name: 'Popcorn (Medium)', price: 180, category: 'Snacks', image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f3', name: 'Soft Drink (Large)', price: 150, category: 'Beverages', image: 'https://images.pexels.com/photos/50593/coca-cola-coke-soft-drink-cola-50593.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f4', name: 'Soft Drink (Medium)', price: 100, category: 'Beverages', image: 'https://images.pexels.com/photos/50593/coca-cola-coke-soft-drink-cola-50593.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f5', name: 'Nachos with Cheese', price: 200, category: 'Snacks', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f6', name: 'Veg Burger', price: 180, category: 'Meals', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f7', name: 'Chicken Burger', price: 220, category: 'Meals', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f8', name: 'Pizza Slice', price: 150, category: 'Meals', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f9', name: 'Combo Meal 1', price: 450, category: 'Combos', image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'f10', name: 'Combo Meal 2', price: 650, category: 'Combos', image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=200' },
];

export const testimonials = [
  { id: '1', name: 'Rahul Sharma', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'The booking experience is absolutely seamless. Love the seat selection interface!', role: 'Movie Enthusiast' },
  { id: '2', name: 'Priya Patel', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'Best ticket booking platform I have used. The UI is stunning and so easy to navigate.', role: 'Regular User' },
  { id: '3', name: 'Arjun Mehta', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 4, comment: 'Great selection of movies and events. The food pre-order feature is a game changer.', role: 'Event Goer' },
  { id: '4', name: 'Sneha Gupta', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'I love the dark mode and the smooth animations. Premium experience at every step!', role: 'Tech Professional' },
];

export const faqs = [
  { question: 'How do I book tickets on ShowTime?', answer: 'Simply browse movies or events, select your preferred show, choose seats, add food if desired, and proceed to payment. Your tickets will be emailed and available in the app.' },
  { question: 'Can I cancel my booking?', answer: 'Yes, you can cancel bookings up to 2 hours before the show time. Refunds are processed within 5-7 business days to your original payment method.' },
  { question: 'What payment methods are accepted?', answer: 'We accept Credit/Debit cards, UPI, Net Banking, Wallets, and QR code payments. All transactions are secure and encrypted.' },
  { question: 'How do I use my loyalty points?', answer: 'Loyalty points can be redeemed during checkout. 100 points = ₹1. Points are earned on every booking and can be used for discounts.' },
  { question: 'Is there a mobile app available?', answer: 'Yes, ShowTime is available on both iOS and Android. Download from the App Store or Google Play Store for the best experience.' },
];

export const offers = [
  { id: 'o1', title: 'First Booking Offer', description: 'Get 50% off on your first movie booking', code: 'FIRST50', discount: 50, maxDiscount: 200, validUntil: '2025-03-31' },
  { id: 'o2', title: 'Weekend Special', description: 'Flat ₹100 off on weekend bookings', code: 'WEEKEND100', discount: 100, maxDiscount: 100, validUntil: '2025-03-31' },
  { id: 'o3', title: 'Combo Deal', description: 'Buy 4 tickets and get 1 free', code: 'BUY4GET1', discount: 0, maxDiscount: 0, validUntil: '2025-03-31' },
  { id: 'o4', title: 'Food Festival', description: '20% off on all food pre-orders', code: 'FOOD20', discount: 20, maxDiscount: 150, validUntil: '2025-03-31' },
];
