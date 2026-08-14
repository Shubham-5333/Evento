import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle2, Calendar, MapPin, Ticket, Download, ArrowRight } from 'lucide-react';

export const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const bookingRef = state.bookingReference || 'EVT-2026-8821';
  const eventTitle = state.eventTitle || 'Sunburn Beach Electronic Music Fest 2026';
  const eventDate = state.eventDate || 'August 20, 2026';
  const eventTime = state.eventTime || '05:00 PM IST';
  const eventLocation = state.eventLocation || 'Bolgatty Palace Grounds, Kochi';
  const ticketType = state.ticketType || 'VIP Lounge Pass';
  const quantity = state.quantity || 2;
  const totalPrice = state.totalPrice || 4998;
  const userName = state.userName || 'Rahul Nair';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${bookingRef}-${userName}`;

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-emerald-500/5 text-center space-y-8">
          
          {/* Green Success Badge */}
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto">
              Your tickets have been issued and sent to your registered email. Present the QR pass below at the venue entrance.
            </p>
          </div>

          {/* Ticket Card Component */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white text-left shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Top Bar: Booking ID */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Booking Reference</span>
                <span className="font-mono text-base font-extrabold text-white">{bookingRef}</span>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                Confirmed Ticket
              </span>
            </div>

            {/* Middle Content */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Event Details */}
              <div className="sm:col-span-2 space-y-3">
                <h3 className="text-lg font-bold text-white leading-snug">{eventTitle}</h3>
                <div className="space-y-1 text-xs text-slate-300 font-medium">
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {eventDate} • {eventTime}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {eventLocation}</p>
                  <p className="flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5 text-blue-400" /> {ticketType} (x{quantity})</p>
                </div>
                <div className="pt-2 text-xs">
                  <span className="text-slate-400">Primary Attendee:</span>{' '}
                  <span className="font-bold text-white">{userName}</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl text-slate-900 shrink-0">
                <img src={qrCodeUrl} alt="Ticket QR Code" className="w-28 h-28 object-contain" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Scan at Entrance</span>
              </div>

            </div>

            {/* Ticket Footer */}
            <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span>Total Paid: <strong className="text-white font-bold">₹{totalPrice}</strong></span>
              <span>Evento Digital Pass</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/my-bookings"
              className="w-full sm:w-auto btn-primary py-3 px-6 text-xs font-bold"
            >
              <span>View All My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto btn-outline py-3 px-6 text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Download Printable Pass</span>
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
