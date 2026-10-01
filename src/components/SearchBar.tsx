import { useSearch } from '../context/searchContext';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search movies by title or synopsis..."
        className="w-full bg-slate-900/90 border border-slate-800 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-inner"
      />
    </div>
  );
};

export default SearchBar;
