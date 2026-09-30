import { Star, Calendar, Clock, User, Bookmark } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const movieId = location.state?.id;
  console.log('movieId', movieId);

  return (
    <main className="relative z-10 flex flex-col md:flex-row gap-8 items-start pt-6">
      <img
        src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800"
        alt="Image"
        className="w-64 h-96 object-cover rounded-2xl shadow-2xl border border-slate-700/50 flex-shrink-0 mx-auto md:mx-0"
      />

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
              Horror
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
              Homey
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Odyssey
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-xl border border-amber-500/20">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold">20</span>
            <span className="text-xs text-amber-400/70">(1 votes)</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>2 Sept</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-rose-500" />
            <span>120 mins</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-rose-500 font-bold mb-2">
            Synopsis
          </h3>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl">
            Overview
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              Director
            </span>
            <span className="text-white font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-rose-500" />
              Christopher Nolan
            </span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              Main Cast
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-400 text-sm">
                Matthew McConaughey, Anne Hathaway
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex gap-4">
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg bg-emerald-600 text-white shadow-emerald-600/30`}>
            <Bookmark className="w-5 h-5" />
            In Watchlist
          </button>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
