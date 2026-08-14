import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { mockEvents } from '../data/mockData';
import { Ticket, CreditCard, Smartphone, Check, Lock, ArrowLeft } from 'lucide-react';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkoutState = location.state || {};
  const eventId = checkoutState.eventId || 1;
  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  const ticketTypeName = checkoutState.ticketTypeName || event.ticketTypes[0]?.name || 'General Pass';
  const ticketPrice = checkoutState.ticketPrice || event.price;
  const quantity = checkoutState.quantity || 1;

  const [attendeeName, setAttendeeName] = useState('Rahul Nair');
  const [attendeeEmail, setAttendeeEmail] = useState('rahul.nair@example.com');
  const [attendeePhone, setAttendeePhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'paypal'>('upi');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);

  const rawSubtotal = ticketPrice * quantity;
  const grandTotal = Math.max(0, rawSubtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EVENTO2026') {
      setDiscount(200);
      setPromoSuccess(true);
    } else if (promoCode.trim()) {
      setDiscount(100);
      setPromoSuccess(true);
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingRef = `EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    navigate('/booking-success', {
      state: {
        bookingReference: bookingRef,
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        ticketType: ticketTypeName,
        quantity: quantity,
        unitPrice: ticketPrice,
        totalPrice: grandTotal,
        userName: attendeeName,
        userEmail: attendeeEmail,
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link to={`/events/${event.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Details</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout & Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Attendee Details & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Attendee Contact Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="text-lg font-bold text-slate-900">Attendee Contact Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address (For Ticket Delivery)</label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={attendeePhone}
                    onChange={(e) => setAttendeePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h2 className="text-lg font-bold text-slate-900">Select Payment Method</h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">UPI / GPay / PhonePe</span>
                    <span className="text-[10px] text-slate-500">Instant Verification</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Credit / Debit Card</span>
                    <span className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Ticket className="w-5 h-5 text-indigo-600" />
                    {paymentMethod === 'paypal' && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Net Banking</span>
                    <span className="text-[10px] text-slate-500">All Major Banks</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Mock Fields */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="username@upi or 9876543210@ybl"
                      defaultValue="rahul@okicici"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8912"
                        defaultValue="4532 9988 1234 8912"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="08/29"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="789"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <p className="text-xs text-slate-600 font-medium">
                    You will be securely redirected to select your preferred net banking portal upon clicking Pay.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Right 1 Col: Summary & Promo */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl shadow-blue-500/5 sticky top-24 space-y-6">
              
              <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Event Mini Thumbnail */}
              <div className="flex items-center gap-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{event.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{event.date}</p>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Have a Promo Code?</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. EVENTO2026"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none uppercase"
                  />
                  <button type="submit" className="btn-secondary text-xs px-3 py-2">
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Discount of ₹{discount} applied!
                  </span>
                )}
              </form>

              {/* Line items */}
              <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600">
                  <span>{ticketTypeName} (x{quantity})</span>
                  <span>₹{rawSubtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promo Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>GST & Service Tax</span>
                  <span className="text-emerald-600 font-bold">Included</span>
                </div>

                <div className="flex justify-between text-slate-900 font-extrabold text-lg pt-3 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCompletePayment}
                className="w-full btn-primary py-3.5 text-sm font-bold shadow-lg shadow-blue-600/20"
              >
                <span>Pay ₹{grandTotal} & Confirm Ticket</span>
              </button>

              <div className="text-center text-[10px] text-slate-400 font-medium">
                By completing payment, you agree to Evento's Ticketing Policy.
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
