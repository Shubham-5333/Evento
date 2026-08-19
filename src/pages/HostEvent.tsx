import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  User,
  Ticket,
  FileText,
  Eye,
  Edit3,
  ShieldCheck,
  Building2,
  Layers,
  AlertCircle,
  Check
} from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  availableQuantity: number;
}

const CATEGORIES = [
  { id: 'music', name: 'Music & Concerts' },
  { id: 'tech', name: 'Tech & AI' },
  { id: 'business', name: 'Business & Startup' },
  { id: 'arts', name: 'Arts & Theater' },
  { id: 'food', name: 'Food & Drinks' },
  { id: 'sports', name: 'Sports & Fitness' },
  { id: 'workshop', name: 'Workshops & Education' }
];

const PRESET_BANNERS = [
  { name: 'Music Festival', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tech Conference', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Food & Drinks', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Business Workshop', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80' }
];

const HIGHLIGHT_TAGS = [
  'Headliner Live Performance',
  'Networking & Coffee Break',
  'Certificate of Participation',
  'Exclusive Swag & Gift Bag',
  'Gourmet Food & Cocktail Lounges',
  'Q&A Session with Speakers'
];

export const HostEvent: React.FC = () => {
  // Mode: Form Editor vs Live Preview
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Basic Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('music');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');

  // 1. About This Event
  const [description, setDescription] = useState('');

  // 2. Event Highlights
  const [highlights, setHighlights] = useState<string[]>([
    'Live performance by top headline artists',
    'High-end sound & laser production',
    'Exclusive VIP food & beverage lounge'
  ]);

  // 3. Event Schedule / Agenda
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { time: '05:00 PM', title: 'Gates Open & Opening DJ Warmup', speaker: 'Opening DJ' },
    { time: '07:30 PM', title: 'Mainstage Headliner Set', speaker: 'Featured Artist' },
    { time: '11:00 PM', title: 'Laser Show & Event Closing', speaker: 'All Performers' }
  ]);

  // 4. Organized By
  const [organizer, setOrganizer] = useState('');
  const [organizerAvatar, setOrganizerAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  const [organizerBio, setOrganizerBio] = useState('Verified Event Host on Evento');

  // 5. Ticket Pricing
  const [isFreeEvent, setIsFreeEvent] = useState(false);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { id: 't-1', name: 'General Entry Pass', price: 999, description: 'Standard admission to main event arena', availableQuantity: 300 },
    { id: 't-2', name: 'VIP Lounge Pass', price: 2499, description: 'Elevated view platform, complimentary drink & express entry', availableQuantity: 80 }
  ]);

  // UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handlers for Highlights
  const addHighlight = (text: string = '') => {
    if (text.trim() && highlights.includes(text.trim())) return;
    setHighlights([...highlights, text]);
  };

  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Handlers for Agenda
  const addAgendaItem = () => {
    setAgenda([...agenda, { time: '06:00 PM', title: 'New Agenda Session', speaker: 'Presenter Name' }]);
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    const updated = [...agenda];
    updated[index] = { ...updated[index], [field]: value };
    setAgenda(updated);
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  // Handlers for Ticket Pricing Tiers
  const addTicketTier = () => {
    const newId = `t-${Date.now()}`;
    setTicketTypes([...ticketTypes, { id: newId, name: 'New Ticket Pass', price: 499, description: 'Pass details & inclusions', availableQuantity: 100 }]);
  };

  const updateTicketTier = (index: number, field: keyof TicketType, value: any) => {
    const updated = [...ticketTypes];
    updated[index] = { ...updated[index], [field]: value };
    setTicketTypes(updated);
  };

  const removeTicketTier = (index: number) => {
    if (ticketTypes.length <= 1) {
      setErrorMsg('At least one ticket tier is required.');
      return;
    }
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  // Handle Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !time || !location || !description.trim() || !organizer.trim()) {
      setErrorMsg('Please fill in all required fields marked with *');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  const minPrice = isFreeEvent ? 0 : Math.min(...ticketTypes.map((t) => Number(t.price) || 0));
  const maxPrice = isFreeEvent ? 0 : Math.max(...ticketTypes.map((t) => Number(t.price) || 0));
  const totalCapacity = ticketTypes.reduce((sum, t) => sum + (Number(t.availableQuantity) || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />

      <main className="flex-1 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Page Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30 uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Host Event Page
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Host an Event
              </h1>
              <p className="text-sm text-slate-300 font-medium">
                Fill in the details below to publish your event with description, schedule, highlights, organizer info, and ticket pricing.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white/10 p-1.5 rounded-2xl border border-white/15 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'edit'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-4 h-4" /> Form Editor
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'preview'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" /> Live Page Preview
              </button>
            </div>
          </div>
        </div>

        {/* Validation Error Banner */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-800 text-sm font-semibold animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* MODE 1: FORM EDITOR */}
        {viewMode === 'edit' && (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* BASIC DETAILS CARD */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">General Event Overview</h2>
                  <p className="text-xs text-slate-500">Event title, category, date, venue, and cover banner</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Event Title */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunburn Beach Electronic Music Fest 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Start Time & Timezone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 05:00 PM IST"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Venue Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bolgatty Palace Grounds"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Cover Image */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" /> Event Cover / Banner Image URL
                  </label>
                  <input
                    type="file"
                    placeholder="https://..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  />

                  {/* Preset Banner Buttons */}
                  {/* <div className="flex flex-wrap gap-2 pt-1">
                    {PRESET_BANNERS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          image === preset.url
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div> */}
                </div>

              </div>
            </div>

            {/* FIELD 1: ABOUT THIS EVENT */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">About This Event</h2>
                  <p className="text-xs text-slate-500">Provide an engaging, detailed description of your event</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Detailed Event Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Describe your event in detail... What can attendees expect? Mention performers, key sessions, guidelines, age limits, dress codes, or entry requirements."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-purple-500 focus:outline-none transition-all leading-relaxed"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Line breaks and paragraphs will be preserved on the event page.</span>
                  <span>{description.length} characters</span>
                </div>
              </div>
            </div>

            {/* FIELD 2: EVENT HIGHLIGHTS */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Event Highlights</h2>
                    <p className="text-xs text-slate-500">Key features and attractions attendees will experience</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addHighlight('')}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
              </div>

              {/* Dynamic Highlights List */}
              <div className="space-y-3">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Headliner DJ set with laser production"
                      value={item}
                      onChange={(e) => updateHighlight(idx, e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Highlight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Tag Recommendations */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Suggestion Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {HIGHLIGHT_TAGS.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addHighlight(tag)}
                      className="px-3 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-slate-400" /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FIELD 3: EVENT SCHEDULE / AGENDA */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Event Schedule / Agenda</h2>
                    <p className="text-xs text-slate-500">Timeline of sessions, talks, and speakers</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Agenda Session
                </button>
              </div>

              {/* Dynamic Agenda List */}
              <div className="space-y-4">
                {agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
                        Session #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(idx)}
                        className="text-xs text-slate-400 hover:text-red-500 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Time Slot</label>
                        <input
                          type="text"
                          placeholder="e.g. 05:00 PM"
                          value={item.time}
                          onChange={(e) => updateAgendaItem(idx, 'time', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Session Title / Topic</label>
                        <input
                          type="text"
                          placeholder="e.g. Mainstage EDM Performance"
                          value={item.title}
                          onChange={(e) => updateAgendaItem(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-3">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Speaker / Presenter / Host</label>
                        <input
                          type="text"
                          placeholder="e.g. Alex Vance & DJ Electro"
                          value={item.speaker}
                          onChange={(e) => updateAgendaItem(idx, 'speaker', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FIELD 4: ORGANIZED BY */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Organized By</h2>
                  <p className="text-xs text-slate-500">Organizer profile, brand details, and host avatar</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Organizer Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Organizer / Host Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunburn India / Kerala Tech Forum"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Organizer Avatar URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Organizer Avatar / Logo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={organizerAvatar}
                    onChange={(e) => setOrganizerAvatar(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Organizer Bio */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Organizer Bio & Verification Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Verified Event Host • 4.9 ★ Rating • Hosted 12+ festivals"
                    value={organizerBio}
                    onChange={(e) => setOrganizerBio(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

              </div>

              {/* Live Card Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                <img
                  src={organizerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt="Organizer Avatar"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Organized By Preview
                  </span>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    {organizer || 'Organizer Name'}
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{organizerBio || 'Verified Event Host'}</p>
                </div>
              </div>
            </div>

            {/* FIELD 5: TICKET PRICING */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Ticket Pricing</h2>
                    <p className="text-xs text-slate-500">Manage ticket tiers, pricing strategy, and seat quantities</p>
                  </div>
                </div>

                {/* Free vs Paid Event Toggle */}
                <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsFreeEvent(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      !isFreeEvent ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Paid Event (₹)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFreeEvent(true);
                      setTicketTypes(ticketTypes.map(t => ({ ...t, price: 0 })));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isFreeEvent ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Free Entry (₹0)
                  </button>
                </div>
              </div>

              {/* Dynamic Ticket Tiers List */}
              <div className="space-y-4">
                {ticketTypes.map((tier, idx) => (
                  <div
                    key={tier.id || idx}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-lg">
                        Ticket Tier #{idx + 1}
                      </span>

                      {ticketTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicketTier(idx)}
                          className="text-xs text-slate-400 hover:text-red-500 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove Tier
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Tier Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 uppercase">Tier Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. General Admission / VIP Pass"
                          value={tier.name}
                          onChange={(e) => updateTicketTier(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      {/* Ticket Price */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 uppercase">Price per Ticket (₹)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-extrabold text-slate-400">₹</span>
                          <input
                            type="number"
                            disabled={isFreeEvent}
                            min="0"
                            value={isFreeEvent ? 0 : tier.price}
                            onChange={(e) => updateTicketTier(idx, 'price', Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 focus:border-indigo-500 focus:outline-none disabled:bg-slate-100"
                          />
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 uppercase">Available Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={tier.availableQuantity}
                          onChange={(e) => updateTicketTier(idx, 'availableQuantity', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-1 sm:col-span-3">
                        <label className="text-[11px] font-bold text-slate-600 uppercase">Tier Inclusions / Pass Access Details</label>
                        <input
                          type="text"
                          placeholder="e.g. Standard access to standing arena and main stage"
                          value={tier.description}
                          onChange={(e) => updateTicketTier(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Ticket Controls Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={addTicketTier}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Another Ticket Tier
                </button>

                <div className="text-xs font-semibold text-slate-600 flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl">
                  <span>Capacity: <strong className="text-slate-900 font-extrabold">{totalCapacity} seats</strong></span>
                  <span>•</span>
                  <span>Price Range: <strong className="text-blue-600 font-extrabold">{isFreeEvent ? 'FREE' : `₹${minPrice} - ₹${maxPrice}`}</strong></span>
                </div>
              </div>

            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
              <div className="text-xs text-slate-500 font-medium">
                Double-check all sections before publishing. You can preview anytime using the Live Page Preview switch.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Live Preview
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none btn-primary px-8 py-3 text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Publish Event
                </button>
              </div>
            </div>

          </form>
        )}

        {/* MODE 2: LIVE PAGE PREVIEW */}
        {viewMode === 'preview' && (
          <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            
            <div className="bg-amber-500 text-slate-900 p-3 rounded-2xl flex items-center justify-between text-xs font-bold">
              <span>👁️ Live Preview Mode — Showing how attendees will see your event page.</span>
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className="underline font-extrabold"
              >
                Back to Form Editor
              </button>
            </div>

            {/* Banner Header */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/9] bg-slate-900">
              <img
                src={image || PRESET_BANNERS[0].url}
                alt={title || 'Event Title'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full capitalize">
                      {category}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full">
                      {city || 'Kochi'}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                    {title || 'Untitled Host Event'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-4 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> {date || 'Date'}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {time || 'Time'}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" /> {location || 'Location'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                {/* 1. About This Event */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h2 className="text-xl font-bold text-slate-900">About This Event</h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {description || 'No description added yet.'}
                  </p>
                </div>

                {/* 2. Event Highlights */}
                {highlights.filter(h => h.trim().length > 0).length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                    <h2 className="text-xl font-bold text-slate-900">Event Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {highlights.filter(h => h.trim().length > 0).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Event Schedule / Agenda */}
                {agenda.filter(a => a.title.trim().length > 0).length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                    <h2 className="text-xl font-bold text-slate-900">Event Schedule / Agenda</h2>
                    <div className="space-y-3">
                      {agenda.filter(a => a.title.trim().length > 0).map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border">
                          <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md shrink-0">
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

                {/* 4. Organized By */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center gap-4">
                  <img
                    src={organizerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={organizer}
                    className="w-14 h-14 rounded-2xl object-cover border"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase">Organized By</span>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1">
                      {organizer || 'Organizer Name'} <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{organizerBio || 'Verified Host'}</p>
                  </div>
                </div>

              </div>

              {/* 5. Ticket Pricing Right Box */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ticket Pricing</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        {isFreeEvent ? 'FREE' : `₹${ticketTypes[0]?.price || 0}`}
                      </span>
                      {!isFreeEvent && <span className="text-xs text-slate-500 font-medium">/ per pass</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Select Ticket Tier
                    </label>
                    {ticketTypes.map((tier) => (
                      <div key={tier.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium space-y-1">
                        <div className="flex justify-between font-bold text-sm">
                          <span>{tier.name}</span>
                          <span className="text-blue-600">{isFreeEvent ? 'FREE' : `₹${tier.price}`}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{tier.description}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode('edit')}
                    className="w-full btn-primary py-3 text-xs font-bold"
                  >
                    Return to Editor
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBMITTED SUCCESS DIALOG */}
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 border border-slate-100 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Event Published!
                </h3>
                <p className="text-xs text-slate-500">
                  Your event <strong>"{title}"</strong> has been created with all details, schedule, highlights, organizer info, and ticket pricing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full btn-primary py-3 text-xs font-bold"
              >
                Close & Continue
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
