import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../api/tmdb';
import { GetYear } from '../../utils/formatter';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const { title, poster_path, vote_average, release_date } = movie;
  const animationDelay = `${(index % 10) * 0.05}s`;

  return (
    <div
      style={{ animationDelay }}
      className={`group relative bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-rose-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col opacity-0 animate-fade-in-up opacity-100'
      `}>
      <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-950">
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1.5 text-xs font-bold text-amber-400 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{vote_average.toFixed(1)}</span>
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-300 border border-slate-800">
          {GetYear(release_date)}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <h4 className="font-bold text-slate-100 text-sm group-hover:text-rose-400 transition-colors ">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default MovieCard;
