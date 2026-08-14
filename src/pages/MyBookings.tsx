import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import { mockBookings } from '../data/mockData';
import type { Booking } from '../types';
import { Ticket, Calendar, MapPin, QrCode, Download, ExternalLink, CheckCircle2 } from 'lucide-react';

export const MyBookings: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Bookings & Digital Passes
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              View and download QR tickets for your upcoming live events.
            </p>
          </div>
          <Link to="/events" className="btn-primary text-xs px-4 py-2.5 self-start sm:self-auto">
            <Ticket className="w-4 h-4" />
            <span>Book New Event</span>
          </Link>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-stretch gap-6"
            >
              {/* Event Poster Image */}
              <div className="w-full md:w-56 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={booking.eventImage}
                  alt={booking.eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Information */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {booking.bookingReference}
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    <Link to={`/events/${booking.eventId}`} className="hover:text-blue-600 transition-colors">
                      {booking.eventTitle}
                    </Link>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                    <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500" /> {booking.eventDate} • {booking.eventTime}</p>
                    <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {booking.eventLocation}</p>
                    <p className="flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5 text-blue-500" /> Tier: {booking.ticketType} (x{booking.quantity})</p>
                    <p className="text-slate-900 font-bold">Total Paid: ₹{booking.totalPrice}</p>
                  </div>
                </div>

                {/* Ticket Action Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View QR Pass</span>
                  </button>

                  <Link
                    to={`/events/${booking.eventId}`}
                    className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    <span>Event Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* QR Pass Modal */}
        <Modal
          isOpen={selectedBooking !== null}
          onClose={() => setSelectedBooking(null)}
          title="Digital Entry Pass"
        >
          {selectedBooking && (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                  {selectedBooking.bookingReference}
                </span>
                <h4 className="font-bold text-slate-900 text-base">{selectedBooking.eventTitle}</h4>
                <p className="text-xs text-slate-500">{selectedBooking.eventDate} • {selectedBooking.eventTime}</p>
                <div className="py-2 flex justify-center">
                  <img
                    src={selectedBooking.qrCodeUrl}
                    alt="Ticket QR Code"
                    className="w-48 h-48 object-contain border-2 border-slate-900 p-2 rounded-xl bg-white shadow-md"
                  />
                </div>
                <p className="text-[11px] font-bold text-slate-600">Present this QR code at venue entrance</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="w-full btn-primary text-xs py-2.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print</span>
                </button>
              </div>
            </div>
          )}
        </Modal>

      </main>

      <Footer />
    </div>
  );
};
