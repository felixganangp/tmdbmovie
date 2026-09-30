import { Star, Bookmark, ChevronRight } from 'lucide-react';
const MovieCard = () => {
  return (
    <div className="group relative bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-rose-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col">
      <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800"
          alt="title"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1.5 text-xs font-bold text-amber-400 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>N/A</span>
        </div>

        <button
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all shadow-lg bg-rose-600 border-rose-500 text-white`}
          title="Toggle Watchlist">
          <Bookmark className={`w-3.5 h-3.5 `} />
        </button>

        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-slate-300 border border-slate-800">
          2028
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <h4 className="font-bold text-slate-100 text-sm group-hover:text-rose-400 transition-colors line-clamp-1">
          title
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
