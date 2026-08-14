import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { mockCategories } from '../data/mockData';

interface SearchBarProps {
  onSearch: (query: string, city: string, category: string) => void;
  initialQuery?: string;
  initialCity?: string;
  initialCategory?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
  initialCity = '',
  initialCategory = 'all'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, city, category);
  };

  const handleReset = () => {
    setQuery('');
    setCity('');
    setCategory('all');
    onSearch('', '', 'all');
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xl shadow-blue-500/5 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-3">
        
        {/* Keyword Search */}
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 border border-slate-200 rounded-xl transition-all">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Search by event title, artist, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Picker */}
        <div className="md:w-48 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 border border-slate-200 rounded-xl transition-all">
          <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-900 cursor-pointer"
          >
            <option value="">All Cities</option>
            <option value="Kochi">Kochi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Category Picker */}
        <div className="md:w-52 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 border border-slate-200 rounded-xl transition-all">
          <Filter className="w-5 h-5 text-emerald-600 shrink-0" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-slate-900 cursor-pointer capitalize"
          >
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn-primary flex-1 md:flex-initial py-3 px-6 text-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          
          {(query || city || category !== 'all') && (
            <button
              type="button"
              onClick={handleReset}
              className="p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              title="Reset Filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
