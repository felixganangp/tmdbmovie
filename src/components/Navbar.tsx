import { Search, Film, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 shadow-2xl">
        <div className="h-20 flex items-center justify-between gap-4">
          <Link to={`/movies`}>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform duration-300">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-wider bg-linear-to-r from-white via-slate-200 to-rose-400 bg-clip-text text-transparent">
                  NUSAFLIX
                </h1>
                <p className="text-[10px] tracking-widest text-rose-500 font-semibold uppercase">
                  TMDB Movies
                </p>
              </div>
            </div>
          </Link>

          {currentPath === '/movies' && (
            <div className="flex-1 max-w-md hidden md:block">
              <SearchBar />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all bg-rose-600 text-white shadow-lg shadow-rose-600/30`}>
              Browse
            </button>

            <button
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 bg-rose-600 text-white shadow-lg shadow-rose-600/30`}>
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Watchlist</span>
              <span className="bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full text-xs ">
                10
              </span>
            </button>
          </div>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-11 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
