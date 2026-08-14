import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { CategoryPills } from '../components/CategoryPills';
import { EventGrid } from '../components/EventGrid';
import { mockEvents } from '../data/mockData';
import { Sparkles, ShieldCheck, Ticket, Users, TrendingUp, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (query: string, city: string, category: string) => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (city) params.set('city', city);
    if (category && category !== 'all') params.set('category', category);
    navigate(`/events?${params.toString()}`);
  };

  const filteredEvents = selectedCategory === 'all'
    ? mockEvents
    : mockEvents.filter((e) => e.category === selectedCategory);

  const featuredEvents = mockEvents.filter((e) => e.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1">
        
        {/* Hero Section with Vibrant Stitch Styling */}
        <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
          {/* Background Ambient Glowing Shapes */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              
              {/* Top Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>The Premier Event Booking Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
                Discover & Book <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Extraordinary</span> Live Events.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                Explore music festivals, AI summits, culinary fairs, and tech conferences. Instant digital tickets, guaranteed entry, and smooth checkouts.
              </p>

              {/* Search Bar Container */}
              <div className="pt-4">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Tickets
                </span>
                <span className="flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-blue-400" /> Instant QR Pass Download
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" /> 20,000+ Happy Attendees
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending Now</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Featured Live Events
                </h2>
              </div>
              <Link
                to="/events"
                className="btn-outline text-xs px-4 py-2 self-start sm:self-auto"
              >
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <EventGrid events={featuredEvents} />
          </div>
        </section>

        {/* Category Exploration Section */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Explore by Category
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Find exactly what you love, from electronic concerts to coding bootcamps.
              </p>
            </div>

            <div className="flex justify-center">
              <CategoryPills
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => setSelectedCategory(catId)}
              />
            </div>

            <div className="pt-4">
              <EventGrid
                events={filteredEvents}
                title={selectedCategory === 'all' ? 'All Events' : `Events in ${selectedCategory}`}
                subtitle="Browse available tickets and book your seats today."
              />
            </div>
          </div>
        </section>

        {/* Attendee Call-to-Action Banner */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl relative z-10">
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Never Miss An Event
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Ready to Experience Unforgettable Live Events?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Join Evento today to discover local concerts, claim early-bird tickets, and access your instant digital QR pass anywhere.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <Link
                to="/events"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-sm transition-colors text-center shadow-lg"
              >
                Explore Events Now
              </Link>
              <Link
                to="/my-bookings"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-sm transition-colors text-center"
              >
                View My Tickets
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
