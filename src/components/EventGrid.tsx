import React from 'react';
import { EventCard } from './EventCard';
import type { Event } from '../types';
import { CalendarX } from 'lucide-react';

interface EventGridProps {
  events: Event[];
  title?: string;
  subtitle?: string;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, title, subtitle }) => {
  return (
    <section className="space-y-6">
      {(title || subtitle) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            {title && <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>}
            {subtitle && <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
            Showing {events.length} event{events.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <CalendarX className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No events found</h3>
            <p className="text-xs text-slate-500 mt-1">
              We couldn't find any events matching your selected search or filter criteria.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};
