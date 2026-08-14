import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { CategoryPills } from '../components/CategoryPills';
import { EventGrid } from '../components/EventGrid';
import { mockEvents } from '../data/mockData';
import { ArrowUpDown } from 'lucide-react';

export const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('search') || '';
  const cityParam = searchParams.get('city') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<'date' | 'price-low' | 'price-high'>('date');

  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedCity(cityParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, cityParam, categoryParam]);

  const handleSearch = (query: string, city: string, category: string) => {
    setSearchQuery(query);
    setSelectedCity(city);
    setSelectedCategory(category);

    const newParams = new URLSearchParams();
    if (query) newParams.set('search', query);
    if (city) newParams.set('city', city);
    if (category && category !== 'all') newParams.set('category', category);
    setSearchParams(newParams);
  };

  // Filter events based on criteria
  let filtered = mockEvents.filter((event) => {
    const matchesQuery = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === '' || event.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

    return matchesQuery && matchesCity && matchesCategory;
  });

  // Sort events
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Events
          </h1>
          <p className="text-sm font-medium text-slate-500 max-w-2xl">
            Browse through our complete catalog of concerts, workshops, AI summits, and cultural festivals. Filter by category, location, or search keywords.
          </p>
        </div>

        {/* Interactive Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          initialQuery={searchQuery}
          initialCity={selectedCity}
          initialCategory={selectedCategory}
        />

        {/* Category Pills & Sorting Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-200">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => handleSearch(searchQuery, selectedCity, cat)}
          />

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="date">Upcoming Date</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <EventGrid
          events={filtered}
          title={filtered.length > 0 ? `Available Events (${filtered.length})` : undefined}
        />

      </main>

      <Footer />
    </div>
  );
};
