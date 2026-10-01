import { useEffect, useState } from 'react';
import type { MovieDetail, MovieCredits } from '../../types/movie';
import { tmdbApi, getImageUrl } from '../../api/tmdb';
import { Loader } from '../../components/Loader';
import axios from 'axios';
import { Star, Calendar, Clock, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FormatDateIndo } from '../../utils/formatter';

const DetailPage = () => {
  const location = useLocation();
  const movieId = location.state?.id;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDetailData = async () => {
      setLoading(true);
      try {
        const [movieRes, creditsRes] = await Promise.all([
          tmdbApi.get(`/movie/${movieId}`, { signal: controller.signal }),
          tmdbApi.get(`/movie/${movieId}/credits`, {
            signal: controller.signal,
          }),
        ]);

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching movie details:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const director =
    credits?.crew.find(person => person.job === 'Director')?.name || 'Unknown';

  const mainCast = credits?.cast.slice(0, 6) || [];

  return (
    <main className="relative z-10 flex flex-col pb-10">
      <div className="pt-6">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start pt-6">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-64 h-96 object-cover rounded-2xl shadow-2xl border border-slate-700/50 shrink-0 mx-auto md:mx-0"
        />

        <div className="space-y-6 flex-1">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres &&
                movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
                    {genre.name}
                  </span>
                ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {movie.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-xs text-amber-400/70">
                ({movie.vote_count})
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Calendar className="w-4 h-4 text-rose-500" />
              <span>{FormatDateIndo(movie.release_date)}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>{movie.runtime} mins</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-rose-500 font-bold mb-2">
              Synopsis
            </h3>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl">
              {movie.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                Director
              </span>
              <span className="text-white font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-rose-500" />
                {director}
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                Main Cast
              </span>
              <div className="flex flex-wrap gap-2">
                {mainCast &&
                  mainCast.map(cast => (
                    <span className="text-slate-400 text-sm" key={cast.id}>
                      {cast.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
