import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Tag } from 'lucide-react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="card-stitch flex flex-col h-full overflow-hidden group">
      
      {/* Image & Badges Banner */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold rounded-full shadow-sm capitalize flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-blue-600" />
            {event.category}
          </span>
        </div>

        {/* Discount Badge if available */}
        {event.originalPrice && event.originalPrice > event.price && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-sm">
              Save ₹{event.originalPrice - event.price}
            </span>
          </div>
        )}

        {/* Tickets Availability Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
          <span className="bg-slate-900/75 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-400" />
            {event.city}
          </span>
          <span className="bg-slate-900/75 backdrop-blur-md px-2.5 py-1 rounded-lg">
            {event.availableTickets} tickets left
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date} • {event.time}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            <Link to={`/events/${event.id}`}>
              {event.title}
            </Link>
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Starting from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">₹{event.price}</span>
              {event.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{event.originalPrice}</span>
              )}
            </div>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="btn-primary text-xs px-3.5 py-2 group-hover:bg-blue-700"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
};
