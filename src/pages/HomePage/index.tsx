import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Calendar,
  Play,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import type { Movie, Category, Categories } from '../../types/movie';
import { tmdbApi } from '../../api/tmdb';
import { useDebounce } from '../../hooks/useDebounce';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import MovieCard from '../../components/MovieCard';
import { Loader } from '../../components/Loader';
import { useSearch } from '../../context/searchContext';

const categories: Categories[] = [
  { key: 'popular', label: 'Popular', icon: TrendingUp },
  { key: 'now_playing', label: 'Now Playing', icon: Play },
  { key: 'top_rated', label: 'Top Rated', icon: Award },
  { key: 'upcoming', label: 'Upcoming', icon: Calendar },
];

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<Category>('popular');
  // const [searchQuery, setSearchQuery] = useState('');
  const { searchQuery } = useSearch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchMovies = useCallback(
    async (
      pageNum: number,
      currentCategory: string,
      query: string,
      isNewSearchOrCategory: boolean,
      signal: AbortSignal,
    ) => {
      setLoading(true);
      try {
        let endpoint = `/movie/${currentCategory}`;
        const params: any = { page: pageNum };

        if (query.trim() !== '') {
          endpoint = '/search/movie';
          params.query = query;
        }

        const response = await tmdbApi.get(endpoint, {
          params,
          signal,
        });

        const results = response.data.results as Movie[];

        setMovies(prev =>
          isNewSearchOrCategory ? results : [...prev, ...results],
        );
        setHasMore(pageNum < response.data.total_pages);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching movies:', error);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    setPage(1);

    fetchMovies(1, category, debouncedSearch, true, controller.signal);

    return () => {
      controller.abort();
    };
  }, [category, debouncedSearch, fetchMovies]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);

    const controller = new AbortController();
    fetchMovies(nextPage, category, debouncedSearch, false, controller.signal);
  }, [page, category, debouncedSearch, fetchMovies]);

  useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: handleLoadMore,
  });

  return (
    <>
      <main className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    category === cat.key && !searchQuery
                      ? 'bg-linear-to-r from-rose-600 to-pink-600 shadow-lg shadow-rose-600/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}>
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
          </div>
        </div>
        {movies.length === 0 && !loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            No movies found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${Math.random()}`}
                movie={movie}
                index={index}
              />
            ))}
          </div>
        )}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-6">
          <Link to={`/movies/movie`} state={{ id: 1 }}>
            <MovieCard />
          </Link>
          <Link to={`/movies/movie2`} state={{ id: 2 }}>
            <MovieCard />
          </Link>
          <Link to={`/movies/movie3`} state={{ id: 3 }}>
            <MovieCard />
          </Link>
        </div> */}
        <div
          ref={loaderRef}
          style={{ textAlign: 'center', padding: '20px' }}></div>
        {loading && <Loader />}
      </main>
    </>
  );
};

export default HomePage;
