import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
  params: {
    // api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export const getImageUrl = (
  path: string | null,
  size: 'w500' | 'original' = 'w500',
) => {
  if (!path) return 'https://dummyimage.com/500x750/1d293d/1d293d.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
