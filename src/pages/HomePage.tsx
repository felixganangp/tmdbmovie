import {
  TrendingUp,
  Calendar,
  Play,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import DetailPage from './DetailPage';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white pb-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
        <DetailPage />
      </main>
    </div>
  );
};

export default HomePage;
