
import { v4 as uuidv4 } from 'uuid';

export type TicketType = {
  id: string;
  name: string;
  price: number;
  available: number;
  sold: number;
  description?: string;
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  organizer: string;
  organizerId: string;
  image: string;
  featured: boolean;
  category: string;
  ticketTypes: TicketType[];
  totalTickets: number;
  soldTickets: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export const categories = [
  'Music',
  'Business',
  'Food & Drink',
  'Community',
  'Arts',
  'Sports & Fitness',
  'Health',
  'Technology',
  'Travel & Outdoor',
  'Film & Media',
  'Charity & Causes',
  'Education',
  'Other'
];

export const eventsMockData: EventType[] = [
  {
    id: uuidv4(),
    title: "Summer Music Festival 2025",
    description: "Join us for three days of amazing music from top artists across the globe. Experience the best of Indian and international music, with multiple stages, food stalls, and camping facilities.",
    date: "2025-07-15",
    startTime: "12:00",
    endTime: "23:00",
    location: "Jawaharlal Nehru Stadium",
    address: "Pragati Vihar",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110003",
    organizer: "Indian Music Events Ltd",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Music",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "General Admission",
        price: 2999,
        available: 5000,
        sold: 3500,
        description: "Access to all stages and common areas"
      },
      {
        id: uuidv4(),
        name: "VIP",
        price: 5999,
        available: 1000,
        sold: 750,
        description: "VIP lounge access, complimentary food & beverages, and premium viewing areas"
      }
    ],
    totalTickets: 6000,
    soldTickets: 4250,
    createdAt: "2025-01-15T08:30:00Z",
    updatedAt: "2025-02-20T14:15:00Z"
  },
  {
    id: uuidv4(),
    title: "Tech Summit India 2025",
    description: "India's largest tech conference featuring talks from industry leaders, workshops, and networking opportunities for tech professionals.",
    date: "2025-09-20",
    startTime: "09:00",
    endTime: "18:00",
    location: "Bangalore International Exhibition Centre",
    address: "10th Mile, Tumkur Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "562123",
    organizer: "TechEvents India",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Technology",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Standard",
        price: 4999,
        available: 2000,
        sold: 1800,
        description: "Access to all talks and workshops"
      },
      {
        id: uuidv4(),
        name: "Premium",
        price: 9999,
        available: 500,
        sold: 350,
        description: "Standard access plus exclusive networking events and speaker meet-and-greets"
      }
    ],
    totalTickets: 2500,
    soldTickets: 2150,
    createdAt: "2025-03-10T10:45:00Z",
    updatedAt: "2025-04-05T16:20:00Z"
  },
  {
    id: uuidv4(),
    title: "Mumbai Food Festival 2025",
    description: "Experience the diverse flavors of India with premium cuisine from top restaurants and taste finest wines from local vineyards.",
    date: "2025-08-05",
    startTime: "11:00",
    endTime: "20:00",
    location: "Jio World Convention Centre",
    address: "G Block BKC",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400051",
    organizer: "Taste of India Events",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false,
    category: "Food & Drink",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "General",
        price: 1499,
        available: 3000,
        sold: 2250,
        description: "Includes 10 food and 5 beverage tasting coupons"
      },
      {
        id: uuidv4(),
        name: "Gourmet",
        price: 2999,
        available: 1000,
        sold: 850,
        description: "Includes 20 food and 10 beverage tasting coupons, plus chef meet-and-greets"
      }
    ],
    totalTickets: 4000,
    soldTickets: 3100,
    createdAt: "2025-02-18T09:15:00Z",
    updatedAt: "2025-03-22T13:40:00Z"
  },
  {
    id: uuidv4(),
    title: "IPL Finals 2025",
    description: "Watch the grand finale of Indian Premier League 2025 live at the stadium.",
    date: "2025-05-24",
    startTime: "19:00",
    endTime: "23:00",
    location: "Narendra Modi Stadium",
    address: "Motera",
    city: "Ahmedabad",
    state: "Gujarat",
    zipCode: "380005",
    organizer: "BCCI",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=3337&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Sports & Fitness",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Upper Level",
        price: 1999,
        available: 8000,
        sold: 6000,
        description: "Upper level seating with good view of the ground"
      },
      {
        id: uuidv4(),
        name: "Lower Level",
        price: 3999,
        available: 5000,
        sold: 4500,
        description: "Lower level seating closer to the action"
      },
      {
        id: uuidv4(),
        name: "Premium",
        price: 7999,
        available: 500,
        sold: 480,
        description: "Premium seating with best view and hospitality services"
      }
    ],
    totalTickets: 13500,
    soldTickets: 10980,
    createdAt: "2025-01-05T11:30:00Z",
    updatedAt: "2025-02-10T15:45:00Z"
  },
  {
    id: uuidv4(),
    title: "India Art Fair 2025",
    description: "India's premier modern and contemporary art fair showcasing artwork from renowned galleries across South Asia.",
    date: "2025-10-08",
    startTime: "10:00",
    endTime: "19:00",
    location: "NSIC Exhibition Complex",
    address: "Okhla Industrial Estate",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110020",
    organizer: "India Art Council",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=3296&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Arts",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Regular",
        price: 799,
        available: 10000,
        sold: 7500,
        description: "Regular admission for adults"
      },
      {
        id: uuidv4(),
        name: "Student/Senior",
        price: 499,
        available: 5000,
        sold: 3000,
        description: "Discounted admission for students and seniors with ID"
      },
      {
        id: uuidv4(),
        name: "Preview Pass",
        price: 2999,
        available: 500,
        sold: 350,
        description: "Exclusive preview before public opening and guided tour"
      }
    ],
    totalTickets: 15500,
    soldTickets: 10850,
    createdAt: "2025-04-12T13:20:00Z",
    updatedAt: "2025-05-18T10:15:00Z"
  },
  {
    id: uuidv4(),
    title: "Marathon for a Cause 2025",
    description: "Run for charity - supporting children's education in rural India. All proceeds go directly to educational programs.",
    date: "2025-12-02",
    startTime: "06:00",
    endTime: "12:00",
    location: "Cubbon Park",
    address: "Kasturba Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    organizer: "Education Foundation India",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false,
    category: "Charity & Causes",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "5K Run",
        price: 699,
        available: 2000,
        sold: 1850,
        description: "5K run entry, t-shirt, and finisher medal"
      },
      {
        id: uuidv4(),
        name: "Half Marathon",
        price: 999,
        available: 1000,
        sold: 750,
        description: "21K run entry, premium t-shirt, medal and refreshments"
      },
      {
        id: uuidv4(),
        name: "Virtual Run",
        price: 499,
        available: 5000,
        sold: 2500,
        description: "Support the cause and receive a t-shirt by mail"
      }
    ],
    totalTickets: 8000,
    soldTickets: 5100,
    createdAt: "2025-03-28T09:45:00Z",
    updatedAt: "2025-05-02T14:30:00Z"
  }
];

// Sales data for dashboard charts
export const weeklyTicketSales = [
  { day: 'Mon', sales: 120 },
  { day: 'Tue', sales: 180 },
  { day: 'Wed', sales: 150 },
  { day: 'Thu', sales: 250 },
  { day: 'Fri', sales: 300 },
  { day: 'Sat', sales: 290 },
  { day: 'Sun', sales: 200 }
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 25000 },
  { month: 'Jul', revenue: 28000 },
  { month: 'Aug', revenue: 30000 },
  { month: 'Sep', revenue: 26000 },
  { month: 'Oct', revenue: 22000 },
  { month: 'Nov', revenue: 20000 },
  { month: 'Dec', revenue: 24000 }
];

export const visitorDemographics = [
  { name: '18-24', value: 15 },
  { name: '25-34', value: 30 },
  { name: '35-44', value: 25 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 15 }
];

export const ticketCategoryDistribution = [
  { name: 'General', value: 60 },
  { name: 'VIP', value: 20 },
  { name: 'Premium', value: 15 },
  { name: 'Other', value: 5 }
];
