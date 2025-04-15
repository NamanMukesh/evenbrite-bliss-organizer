
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { EventType } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: EventType;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const formattedDate = new Date(event.date);
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100;
  const lowestPrice = Math.min(...event.ticketTypes.map(type => type.price));
  const highestPrice = Math.max(...event.ticketTypes.map(type => type.price));
  const priceRange = `$${lowestPrice.toFixed(2)} - $${highestPrice.toFixed(2)}`;
  
  return (
    <div className={`eventify-card transition-all duration-300 ${featured ? 'md:flex md:h-80' : 'h-full'}`}>
      {/* Image */}
      <div 
        className={`relative overflow-hidden ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}
      >
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-eventify-purple text-white">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white md:hidden">
          <h3 className="text-lg font-semibold line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-sm space-x-1">
            <Calendar size={14} />
            <span>
              {formattedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-4 ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
        <div className="hidden md:block">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
            <Badge className={`${event.category === 'Music' ? 'bg-pink-500' : 
                        event.category === 'Technology' ? 'bg-blue-500' : 
                        event.category === 'Food & Drink' ? 'bg-orange-500' : 
                        event.category === 'Sports & Fitness' ? 'bg-green-500' : 
                        event.category === 'Arts' ? 'bg-purple-500' : 
                        event.category === 'Charity & Causes' ? 'bg-red-500' : 
                        'bg-gray-500'} text-white`}>
              {event.category}
            </Badge>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>
                {formattedDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{event.city}, {event.state}</span>
            </div>
          </div>
        </div>
        
        <p className={`text-gray-600 mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {event.description}
        </p>
        
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tickets</span>
            <span className="font-medium">{priceRange}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${soldPercentage > 80 ? 'bg-red-500' : 
                          soldPercentage > 50 ? 'bg-orange-500' : 
                          'bg-eventify-success'}`}
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>{soldPercentage.toFixed(0)}% Sold</span>
            <span>{event.totalTickets - event.soldTickets} left</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            By {event.organizer}
          </div>
          <Link 
            to={`/events/${event.id}`}
            className="bg-eventify-purple text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors text-sm font-medium flex items-center"
          >
            <Ticket size={16} className="mr-1" />
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
