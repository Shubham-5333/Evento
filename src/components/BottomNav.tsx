import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Ticket, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'HOME', path: '/', icon: Home },
    { label: 'EVENTS', path: '/events', icon: Calendar },
    { label: 'BOOKINGS', path: '/my-bookings', icon: Ticket, hasDot: true },
    { label: 'USER', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-[#0b1319]/95 backdrop-blur-xl border border-slate-800/80 rounded-full shadow-2xl px-6 py-2.5 flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                active ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.hasDot && !active && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#0b1319]" />
                )}
                {active && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                )}
              </div>
              <span className={`text-[10px] font-extrabold tracking-wider ${active ? 'text-cyan-400' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
