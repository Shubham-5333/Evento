import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { mockEvents, mockReviews } from '../data/mockData';
import type { TicketType } from '../types';
import { Calendar, MapPin, Clock, ShieldCheck, Ticket, Minus, Plus, Star, Share2, Heart, CheckCircle2 } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const eventId = parseInt(id || '1', 10);
  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  const [selectedTicket, setSelectedTicket] = useState<TicketType>(
    event.ticketTypes[0] || {
      id: 'gen',
      name: 'General Entry Pass',
      price: event.price,
      description: 'Standard access to event arena',
      availableQuantity: 100
    }
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty);
    }
  };

  const handleCheckoutRedirect = () => {
    navigate('/checkout', {
      state: {
        eventId: event.id,
        ticketTypeId: selectedTicket.id,
        ticketTypeName: selectedTicket.name,
        ticketPrice: selectedTicket.price,
        quantity: quantity,
        totalPrice: selectedTicket.price * quantity,
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-xs">{event.title}</span>
        </nav>

        {/* Hero Section Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/9] bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          {/* Banner Overlaid Content */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full capitalize">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full">
                  {event.city}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {event.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-4 font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> {event.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {event.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" /> {event.location}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-2xl backdrop-blur-md border transition-colors ${
                  isLiked ? 'bg-red-500 text-white border-red-500' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
                title="Save to Favorites"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-colors"
                title="Share Event"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Details Left, Ticket Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols): Description, Agenda, Organizer, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Event Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">About This Event</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {event.description}
              </p>

              {/* Event Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Event Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Event Agenda Schedule */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Event Schedule / Agenda</h2>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Presenter: {item.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Profile */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
              <img
                src={event.organizerAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={event.organizer}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organized By</span>
                <h3 className="text-base font-bold text-slate-900">{event.organizer}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Verified Event Creator • 4.9 ★ Rating</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Attendee Reviews</h2>
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> 4.8 / 5.0
                </span>
              </div>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={review.userAvatar} alt={review.userName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{review.userName}</p>
                          <p className="text-[10px] text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Ticket Purchase Box */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl shadow-blue-500/5 sticky top-24 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ticket Pricing</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">₹{selectedTicket.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/ ticket</span>
                </div>
              </div>

              {/* Ticket Tier Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Ticket Tier
                </label>
                <div className="space-y-2">
                  {event.ticketTypes.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTicket(tier)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedTicket.id === tier.id
                          ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-900'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{tier.name}</span>
                        <span className="text-blue-600">₹{tier.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{tier.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Quantity
                </label>
                <div className="flex items-center justify-between bg-slate-50 p-2 border border-slate-200 rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-extrabold text-base text-slate-900 px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Total Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{selectedTicket.name} (x{quantity})</span>
                  <span>₹{selectedTicket.price * quantity}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Booking Fee & GST</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-100">
                  <span>Total Payable</span>
                  <span className="text-blue-600">₹{selectedTicket.price * quantity}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckoutRedirect}
                className="w-full btn-primary py-3.5 text-sm font-bold shadow-lg shadow-blue-600/20"
              >
                <Ticket className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Instant QR Code Ticket Delivery
                </span>
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
