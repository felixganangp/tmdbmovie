import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { tmdbApi } from '../../api/tmdb';
import type { Movie } from '../../types/movie';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useCategory } from '../../context/categoryContext';
import { useSearch } from '../../context/searchContext';
import MovieList from '../../components/MovieList/MovieList';
import Filter from '../../components/Filter/Filter';
import { Loader } from '../../components/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();
  const { selectedCategory } = useCategory();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
    fetchMovies(1, selectedCategory, searchQuery, true, controller.signal);

    return () => {
      controller.abort();
    };
  }, [selectedCategory, searchQuery, fetchMovies]);

  const handleLoadMore = useCallback(() => {
    const controller = new AbortController();
    const nextPage = page + 1;
    setPage(nextPage);

    fetchMovies(
      nextPage,
      selectedCategory,
      searchQuery,
      false,
      controller.signal,
    );
  }, [page, selectedCategory, searchQuery, fetchMovies]);

  useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: handleLoadMore,
  });

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <main className="pt-6">
        <Filter />
        {movies.length === 0 && !loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            No movies found.
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </main>
    </>
  );
};

export default HomePage;
