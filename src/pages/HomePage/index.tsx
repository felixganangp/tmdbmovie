import {
  TrendingUp,
  Calendar,
  Play,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

const HomePage = () => {
  return (
    <>
      <main className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'popular', label: 'Popular', icon: TrendingUp },
              { id: 'now_playing', label: 'Now Playing', icon: Play },
              { id: 'top_rated', label: 'Top Rated', icon: Award },
              { id: 'upcoming', label: 'Upcoming', icon: Calendar },
            ].map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/25`}>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-6">
          <Link to={`/movies/movie`} state={{ id: 1 }}>
            <MovieCard />
          </Link>
          <Link to={`/movies/movie2`} state={{ id: 2 }}>
            <MovieCard />
          </Link>
          <Link to={`/movies/movie3`} state={{ id: 3 }}>
            <MovieCard />
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
