import type { Event, Category, Booking, User, Review } from '../types';

export const mockCategories: Category[] = [
  { id: 'all', name: 'All Events', icon: 'Sparkles', count: 24 },
  { id: 'music', name: 'Music Festivals', icon: 'Music', count: 8 },
  { id: 'tech', name: 'Tech & AI', icon: 'Laptop', count: 6 },
  { id: 'business', name: 'Business & Startup', icon: 'Briefcase', count: 4 },
  { id: 'arts', name: 'Arts & Theater', icon: 'Palette', count: 3 },
  { id: 'food', name: 'Food & Drinks', icon: 'Utensils', count: 5 },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Trophy', count: 3 },
];

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Sunburn Beach Electronic Music Fest 2026",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    date: "August 20, 2026",
    time: "05:00 PM IST",
    location: "Bolgatty Palace Grounds",
    city: "Kochi",
    category: "music",
    price: 999,
    originalPrice: 1499,
    organizer: "Sunburn India",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    description: "Get ready for the biggest beachside electronic dance festival in Kochi! Featuring international DJs, stunning light shows, pyrotechnics, food stalls, and an unbeatable ocean backdrop.",
    highlights: [
      "Headliner DJ sets by global electronic artists",
      "Stunning oceanfront sunset stage",
      "Gourmet food & cocktail lounges",
      "Interactive laser and light production"
    ],
    agenda: [
      { time: "05:00 PM", title: "Gates Open & Opening DJ Warmup", speaker: "DJ Electro" },
      { time: "07:30 PM", title: "Sunset Deep House Set", speaker: "Marina Blue" },
      { time: "09:30 PM", title: "Headlining Mainstage EDM Set", speaker: "Alex Vance & Friends" },
      { time: "11:30 PM", title: "Midnight Laser Show & Closing", speaker: "All Artists" }
    ],
    totalTickets: 1500,
    availableTickets: 320,
    isFeatured: true,
    ticketTypes: [
      { id: "gen-1", name: "General Admission", price: 999, description: "Access to main arena & standing zones", availableQuantity: 200 },
      { id: "vip-1", name: "VIP Lounge Pass", price: 2499, description: "Elevated view platform, complimentary drink & express entry", availableQuantity: 80 },
      { id: "fan-1", name: "Early Bird Special", price: 799, description: "Limited discounted general entry ticket", availableQuantity: 40 }
    ]
  },
  {
    id: 2,
    title: "Global AI & NextGen Web Summit 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    date: "September 12, 2026",
    time: "09:30 AM IST",
    location: "Lulu International Convention Center",
    city: "Kochi",
    category: "tech",
    price: 1499,
    originalPrice: 1999,
    organizer: "Kerala Tech Forum",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    description: "Join over 2,000 developers, tech founders, and AI researchers for a full day of keynotes, live code demos, startup pitches, and high-impact networking.",
    highlights: [
      "15+ Keynotes on Generative AI, Agents & Cloud Scaling",
      "Hands-on workshop labs with lead engineers",
      "Startup Expo featuring 50+ promising tech startups",
      "Networking lunch & VIP speaker dinner"
    ],
    agenda: [
      { time: "09:30 AM", title: "Keynote: The Future of Agentic AI Systems", speaker: "Dr. Ananya Roy (DeepMind)" },
      { time: "11:30 AM", title: "Building Scale-Ready React 19 Applications", speaker: "Karthik V." },
      { time: "02:00 PM", title: "Startup Pitch Finale & Investor Panel", speaker: "Venture Council" },
      { time: "04:30 PM", title: "Networking & Expo Showcase", speaker: "All Attendees" }
    ],
    totalTickets: 2000,
    availableTickets: 540,
    isFeatured: true,
    ticketTypes: [
      { id: "gen-2", name: "Attendee Pass", price: 1499, description: "Full access to talks, expo floor & lunch", availableQuantity: 400 },
      { id: "vip-2", name: "VIP Developer & Founder Pass", price: 3999, description: "Front-row seats, speaker lounge & dinner access", availableQuantity: 140 }
    ]
  },
  {
    id: 3,
    title: "Kochi Culinary Craft & Food Fair",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    date: "August 28, 2026",
    time: "11:00 AM IST",
    location: "Jawaharlal Nehru Stadium Grounds",
    city: "Kochi",
    category: "food",
    price: 299,
    originalPrice: 499,
    organizer: "Culinary Club Kochi",
    organizerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    description: "A mouth-watering festival bringing together over 80 artisan chefs, street food masters, craft breweries, live acoustic music, and cooking masterclasses.",
    highlights: [
      "Live cooking demonstrations by celebrity chefs",
      "80+ food trucks & gourmet tasting booths",
      "Craft beverage sampling sessions",
      "Live acoustic band performances all day"
    ],
    agenda: [
      { time: "11:00 AM", title: "Food Fair Opening & Tasting Alley", speaker: "Chef Sanjeev" },
      { time: "02:30 PM", title: "Seafood Masterclass: Kerala Spices", speaker: "Chef Chef Chef" },
      { time: "06:00 PM", title: "Sunset Acoustic Live Sessions", speaker: "The Local Band" }
    ],
    totalTickets: 3000,
    availableTickets: 1200,
    isFeatured: false,
    ticketTypes: [
      { id: "gen-3", name: "Day Entry Pass", price: 299, description: "Access to food stalls & live stage performance", availableQuantity: 1000 },
      { id: "vip-3", name: "Tasting VIP Pass", price: 999, description: "Includes 5 food vouchers & VIP seating area", availableQuantity: 200 }
    ]
  },
  {
    id: 4,
    title: "Indie Rock & Fusion Live Night",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    date: "September 05, 2026",
    time: "07:00 PM IST",
    location: "Crowne Plaza Amphitheater",
    city: "Kochi",
    category: "music",
    price: 699,
    originalPrice: 899,
    organizer: "SoundWave Events",
    organizerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    description: "An electrifying evening of indie rock, Carnatic fusion, and alternative music from top touring bands in South India.",
    highlights: [
      "3 renowned live fusion bands",
      "State of the art sound system & acoustics",
      "Craft beverages and lounge snacks"
    ],
    agenda: [
      { time: "07:00 PM", title: "Opening Act: The Rhythm Project", speaker: "Band A" },
      { time: "08:30 PM", title: "Main Act: Carnatic Fusion Explosion", speaker: "Band B" }
    ],
    totalTickets: 800,
    availableTickets: 180,
    isFeatured: false,
    ticketTypes: [
      { id: "gen-4", name: "Standard Standing", price: 699, description: "Standing floor entry", availableQuantity: 150 },
      { id: "vip-4", name: "Seated Row Pass", price: 1299, description: "Front reserved seating", availableQuantity: 30 }
    ]
  },
  {
    id: 5,
    title: "UX/UI Design & Modern Product Systems",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    date: "September 18, 2026",
    time: "10:00 AM IST",
    location: "Maker Village Tech Hub",
    city: "Kochi",
    category: "arts",
    price: 899,
    originalPrice: 1199,
    organizer: "Design Craft Guild",
    description: "A interactive workshop covering design systems, micro-interactions, Figma component architecture, and responsive UX design patterns.",
    highlights: [
      "Interactive Figma live design challenge",
      "1-on-1 portfolio review session with senior design leads",
      "Certificate of participation & design kit download"
    ],
    totalTickets: 100,
    availableTickets: 25,
    isFeatured: false,
    ticketTypes: [
      { id: "gen-5", name: "Workshop Seat", price: 899, description: "Full workshop participation & design assets kit", availableQuantity: 25 }
    ]
  },
  {
    id: 6,
    title: "Startup Pitch & Angel Investor Meetup",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    date: "October 02, 2026",
    time: "02:00 PM IST",
    location: "Hyatt Regency Business Center",
    city: "Kochi",
    category: "business",
    price: 1299,
    originalPrice: 1699,
    organizer: "Venture Kerala Network",
    description: "Connecting early-stage founders with angel investors, seed funds, and mentor advisors across South India.",
    highlights: [
      "10 Curated 5-minute founder pitches",
      "Panel on Seed Round valuation & term sheets",
      "Structured networking speed-dating"
    ],
    totalTickets: 250,
    availableTickets: 60,
    isFeatured: true,
    ticketTypes: [
      { id: "gen-6", name: "Founder / General Ticket", price: 1299, description: "Access to pitches and networking floor", availableQuantity: 50 },
      { id: "vip-6", name: "Investor Pass", price: 3499, description: "Access to private pitch decks & investor lounge", availableQuantity: 10 }
    ]
  }
];

export const mockUser: User = {
  id: "usr-101",
  name: "Rahul Nair",
  email: "rahul.nair@example.com",
  role: "attendee",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  phone: "+91 98765 43210",
  bio: "Tech enthusiast, live music lover, and event explorer based in Kochi.",
  joinedDate: "January 2026"
};

export const mockBookings: Booking[] = [
  {
    id: "bk-8821",
    bookingReference: "EVT-2026-8821",
    eventId: 1,
    eventTitle: "Sunburn Beach Electronic Music Fest 2026",
    eventImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    eventDate: "August 20, 2026",
    eventTime: "05:00 PM IST",
    eventLocation: "Bolgatty Palace Grounds, Kochi",
    ticketType: "VIP Lounge Pass",
    quantity: 2,
    unitPrice: 2499,
    totalPrice: 4998,
    status: "Confirmed",
    userName: "Rahul Nair",
    userEmail: "rahul.nair@example.com",
    bookingDate: "August 02, 2026",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EVT-2026-8821-RAHUL"
  },
  {
    id: "bk-7412",
    bookingReference: "EVT-2026-7412",
    eventId: 2,
    eventTitle: "Global AI & NextGen Web Summit 2026",
    eventImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    eventDate: "September 12, 2026",
    eventTime: "09:30 AM IST",
    eventLocation: "Lulu International Convention Center, Kochi",
    ticketType: "Attendee Pass",
    quantity: 1,
    unitPrice: 1499,
    totalPrice: 1499,
    status: "Confirmed",
    userName: "Rahul Nair",
    userEmail: "rahul.nair@example.com",
    bookingDate: "August 05, 2026",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EVT-2026-7412-RAHUL"
  }
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    userName: "Priya Sharma",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment: "The sound setup and security management last year was phenomenal. Super excited for 2026!",
    date: "3 days ago"
  },
  {
    id: "rev-2",
    userName: "Arjun Das",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    rating: 4,
    comment: "Smooth ticket booking process via Evento. Got my QR code instantly!",
    date: "1 week ago"
  }
];

export const mockStats = {
  totalEvents: 48,
  totalTicketsSold: 14850,
  activeUsers: 8420,
  totalRevenue: 3450000
};
