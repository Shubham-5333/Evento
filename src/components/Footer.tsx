import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Evento<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premium event booking platform for live concerts, tech summits, workshops, and food festivals. Discover unforgettable experiences near you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore Events</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/events?category=music" className="hover:text-blue-400 transition-colors">Music Festivals</Link></li>
              <li><Link to="/events?category=tech" className="hover:text-blue-400 transition-colors">Tech & AI Summits</Link></li>
              <li><Link to="/events?category=food" className="hover:text-blue-400 transition-colors">Food & Drink Fairs</Link></li>
              <li><Link to="/events?category=business" className="hover:text-blue-400 transition-colors">Business Conferences</Link></li>
              <li><Link to="/events?category=arts" className="hover:text-blue-400 transition-colors">Arts & Workshops</Link></li>
            </ul>
          </div>

          {/* User Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">My Account</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/my-bookings" className="hover:text-blue-400 transition-colors">My Bookings</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400 transition-colors">Account Settings</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition-colors">Sign In / Register</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get notified about upcoming concerts and early bird ticket drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="w-full btn-primary text-xs py-2 bg-blue-600 hover:bg-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Evento Booking Platform. Built with React & TypeScript.</p>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
