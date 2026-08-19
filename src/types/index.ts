export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  availableQuantity: number;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
}

export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  category: string;
  price: number;
  originalPrice?: number;
  organizer: string;
  organizerAvatar?: string;
  description: string;
  highlights: string[];
  agenda?: AgendaItem[];
  totalTickets: number;
  availableTickets: number;
  isFeatured?: boolean;
  ticketTypes: TicketType[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Booking {
  id: string;
  bookingReference: string;
  eventId: number;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketType: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Pending';
  userName: string;
  userEmail: string;
  bookingDate: string;
  qrCodeUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer' | 'admin';
  avatar?: string;
  phone?: string;
  bio?: string;
  joinedDate?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EventFilter {
  category: string;
  searchQuery: string;
  city: string;
  priceMax: number;
}


export interface Items {
  name: string;
  email: string;
  role: "attendee" | "organiser";
  phone?: string;
  city?: string;
  bio?: string;
}