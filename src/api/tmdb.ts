import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
  params: {
    language: 'en-US',
  },
});

export const getImageUrl = (
  path: string | null,
  size: 'w500' | 'original' = 'w500',
) => {
  if (!path)
    return 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
