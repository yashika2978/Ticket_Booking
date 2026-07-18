import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
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
          created_at: string;
        };
      };
      events: {
        Row: {
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
          created_at: string;
        };
      };
      theatres: {
        Row: {
          id: string;
          name: string;
          city: string;
          address: string;
          rating: number;
          screens: number;
          distance: string;
          created_at: string;
        };
      };
      shows: {
        Row: {
          id: string;
          movie_id: string;
          theatre_id: string;
          screen_type: string;
          show_time: string;
          price: number;
          seats_available: number;
          total_seats: number;
          created_at: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          show_id: string;
          seats: string[];
          total_amount: number;
          status: string;
          booking_date: string;
          created_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          rating: number;
          comment: string;
          likes: number;
          created_at: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          created_at: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read: boolean;
          created_at: string;
        };
      };
    };
  };
};
