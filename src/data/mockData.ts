
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
    title: "Summer Music Festival 2023",
    description: "Join us for three days of amazing music from top artists across the globe. There will be multiple stages, food vendors, and camping available.",
    date: "2023-07-15",
    startTime: "12:00",
    endTime: "23:00",
    location: "Central Park",
    address: "123 Park Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    organizer: "Music Events Inc",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Music",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "General Admission",
        price: 99.99,
        available: 5000,
        sold: 3500,
        description: "Access to all stages and common areas"
      },
      {
        id: uuidv4(),
        name: "VIP",
        price: 199.99,
        available: 1000,
        sold: 750,
        description: "VIP lounge access, complimentary drinks, and premium viewing areas"
      }
    ],
    totalTickets: 6000,
    soldTickets: 4250,
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-02-20T14:15:00Z"
  },
  {
    id: uuidv4(),
    title: "Tech Conference 2023",
    description: "A two-day conference featuring talks from industry leaders, workshops, and networking opportunities for tech professionals.",
    date: "2023-09-20",
    startTime: "09:00",
    endTime: "18:00",
    location: "Tech Convention Center",
    address: "456 Innovation Blvd",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    organizer: "TechEvents Co",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Technology",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Standard",
        price: 299.99,
        available: 2000,
        sold: 1800,
        description: "Access to all talks and workshops"
      },
      {
        id: uuidv4(),
        name: "Premium",
        price: 499.99,
        available: 500,
        sold: 350,
        description: "Standard access plus exclusive networking events and speaker meet-and-greets"
      }
    ],
    totalTickets: 2500,
    soldTickets: 2150,
    createdAt: "2023-03-10T10:45:00Z",
    updatedAt: "2023-04-05T16:20:00Z"
  },
  {
    id: uuidv4(),
    title: "Food & Wine Festival",
    description: "Sample delicious cuisine from local restaurants and taste premium wines from regional vineyards.",
    date: "2023-08-05",
    startTime: "11:00",
    endTime: "20:00",
    location: "Riverfront Park",
    address: "789 Riverside Dr",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    organizer: "Taste of the City",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false,
    category: "Food & Drink",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "General",
        price: 75.00,
        available: 3000,
        sold: 2250,
        description: "Includes 10 food and 5 wine tasting tokens"
      },
      {
        id: uuidv4(),
        name: "Gourmet",
        price: 150.00,
        available: 1000,
        sold: 850,
        description: "Includes 20 food and 10 wine tasting tokens, plus chef meet-and-greets"
      }
    ],
    totalTickets: 4000,
    soldTickets: 3100,
    createdAt: "2023-02-18T09:15:00Z",
    updatedAt: "2023-03-22T13:40:00Z"
  },
  {
    id: uuidv4(),
    title: "Basketball Tournament",
    description: "Watch top college basketball teams compete in this annual tournament.",
    date: "2023-11-12",
    startTime: "13:00",
    endTime: "19:00",
    location: "Sports Arena",
    address: "101 Arena Way",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90015",
    organizer: "College Sports Network",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=3337&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false,
    category: "Sports & Fitness",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Upper Level",
        price: 35.00,
        available: 8000,
        sold: 6000,
        description: "Upper level seating with good view of the court"
      },
      {
        id: uuidv4(),
        name: "Lower Level",
        price: 75.00,
        available: 5000,
        sold: 4500,
        description: "Lower level seating closer to the action"
      },
      {
        id: uuidv4(),
        name: "Courtside",
        price: 250.00,
        available: 500,
        sold: 480,
        description: "Exclusive courtside seating"
      }
    ],
    totalTickets: 13500,
    soldTickets: 10980,
    createdAt: "2023-05-05T11:30:00Z",
    updatedAt: "2023-06-10T15:45:00Z"
  },
  {
    id: uuidv4(),
    title: "Art Exhibition: Modern Masters",
    description: "A curated collection of modern art masterpieces from renowned galleries around the world.",
    date: "2023-10-08",
    startTime: "10:00",
    endTime: "19:00",
    location: "Metropolitan Art Museum",
    address: "234 Gallery Ave",
    city: "Boston",
    state: "MA",
    zipCode: "02115",
    organizer: "Arts Council",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=3296&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
    category: "Arts",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Adult",
        price: 25.00,
        available: 10000,
        sold: 7500,
        description: "Regular admission for adults"
      },
      {
        id: uuidv4(),
        name: "Student/Senior",
        price: 15.00,
        available: 5000,
        sold: 3000,
        description: "Discounted admission for students and seniors with ID"
      },
      {
        id: uuidv4(),
        name: "VIP Preview",
        price: 100.00,
        available: 500,
        sold: 350,
        description: "Exclusive preview before public opening and guided tour"
      }
    ],
    totalTickets: 15500,
    soldTickets: 10850,
    createdAt: "2023-04-12T13:20:00Z",
    updatedAt: "2023-05-18T10:15:00Z"
  },
  {
    id: uuidv4(),
    title: "Charity 5K Run",
    description: "Run or walk to support local children's hospitals. All proceeds go directly to medical equipment and patient care programs.",
    date: "2023-09-02",
    startTime: "08:00",
    endTime: "12:00",
    location: "Memorial Park",
    address: "345 Park Rd",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    organizer: "Health Foundation",
    organizerId: uuidv4(),
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false,
    category: "Charity & Causes",
    ticketTypes: [
      {
        id: uuidv4(),
        name: "Adult Runner",
        price: 35.00,
        available: 2000,
        sold: 1850,
        description: "Race entry, t-shirt, and finisher medal"
      },
      {
        id: uuidv4(),
        name: "Child Runner",
        price: 20.00,
        available: 1000,
        sold: 750,
        description: "Race entry for kids under 12, includes t-shirt and medal"
      },
      {
        id: uuidv4(),
        name: "Virtual Runner",
        price: 25.00,
        available: 5000,
        sold: 2500,
        description: "Support the cause and receive a t-shirt by mail"
      }
    ],
    totalTickets: 8000,
    soldTickets: 5100,
    createdAt: "2023-03-28T09:45:00Z",
    updatedAt: "2023-05-02T14:30:00Z"
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
