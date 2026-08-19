import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Search, CircleUserRound } from 'lucide-react';
import { BottomNav } from './BottomNav';
import axios from 'axios';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);


  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/auth",
          {
            withCredentials: true,
          }
        );

        setUserRole(response.data.user.role);
      } catch (error) {
        setUserRole(null);
      }
    };

    getUser();
  }, []);

  const handleProfileClick = async () => {
    try {
      await axios.get("http://localhost:2000/api/auth", {
        withCredentials: true,
      });

      navigate("/profile");
    } catch (error) {
      navigate("/login");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                  Evento<span className="text-blue-600">.</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                  Events & Tickets
                </span>
              </div>
            </Link>

            {/* Quick Search Bar - Desktop & Tablet */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6 lg:mx-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                placeholder="Search concerts, workshops, tech events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none transition-all placeholder:text-slate-400 text-slate-900"
              />
            </form>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center gap-1 font-semibold text-sm">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/events') ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
              >
                Explore Events
              </Link>
              <Link
                to="/my-bookings"
                className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/my-bookings') ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
              >
                My Bookings
              </Link>
              {userRole === "organizer" && (
                <Link
                  to="/host-event"
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Host an Event
                </Link>
              )}
            </nav>

            {/* User Profile Avatar / Sign In */}
            <div className="flex items-center gap-2.5">
              <div className="relative">

                {/* <button
                  // onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                > */}
                <button
                  onClick={handleProfileClick}
                  className="flex items-center p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                  title="Profile"
                >
                  <CircleUserRound className="w-6 h-6 text-slate-700" />
                </button>

                {/* <img`
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  /> */}
                {/* <span className="text-xs font-bold text-slate-700 max-w-[90px] truncate hidden md:inline">
                    {mockUser.name}
                  </span> */}
                {/* </button> */}

                {/* {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{mockUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{mockUser.email}</p>
                    </div>
                    <div className="py-1 text-sm font-medium">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>User Profile</span>
                      </Link>
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      >
                        <Ticket className="w-4 h-4 text-slate-400" />
                        <span>My Bookings</span>
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 pt-1 text-sm font-medium">
                      <Link
                        to="/login"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out / Switch</span>
                      </Link>
                    </div>
                  </div>
                )} */}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Bottom Capsule Navigation for Mobile Screens */}
      <BottomNav />
    </>
  );
};
