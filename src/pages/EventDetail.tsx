
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Heart, 
  User, 
  Ticket, 
  Tag,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';
import { eventsMockData, EventType } from '@/data/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Find the event with the matching ID
  const event = eventsMockData.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button className="bg-eventify-purple">Browse All Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    if (quantity >= 0) {
      setTicketQuantities({
        ...ticketQuantities,
        [ticketId]: quantity,
      });
    }
  };
  
  const totalItems = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);
  
  const totalPrice = event.ticketTypes.reduce((sum, ticket) => {
    const quantity = ticketQuantities[ticket.id] || 0;
    return sum + (ticket.price * quantity);
  }, 0);
  
  const handleAddToCart = () => {
    if (totalItems === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would add the tickets to a cart or proceed to checkout
    toast({
      title: "Tickets added to cart",
      description: `${totalItems} tickets added to your cart.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const relatedEvents = eventsMockData
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Event Header */}
        <div 
          className="relative bg-cover bg-center h-96" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${event.image})` 
          }}
        >
          <div className="eventify-container h-full flex flex-col justify-end pb-12">
            <Link to="/events" className="text-white mb-4 flex items-center hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className={`${
                event.category === 'Music' ? 'bg-pink-500' : 
                event.category === 'Technology' ? 'bg-blue-500' : 
                event.category === 'Food & Drink' ? 'bg-orange-500' : 
                event.category === 'Sports & Fitness' ? 'bg-green-500' : 
                event.category === 'Arts' ? 'bg-purple-500' : 
                event.category === 'Charity & Causes' ? 'bg-red-500' : 
                'bg-gray-500'} text-white`}>
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-eventify-purple text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{event.location}, {event.city}, {event.state}</span>
              </div>
              
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <span>By {event.organizer}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="py-12 bg-gray-50">
          <div className="eventify-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details Section */}
              <div className="col-span-1 lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`prose max-w-none ${!isExpanded && 'line-clamp-5'}`}>
                      <p>{event.description}</p>
                      {/* Additional content would be here in a real event */}
                      <p>Join us for an unforgettable experience with amazing people, great entertainment, and memories that will last a lifetime. This event will feature top performers, delicious food options, and plenty of opportunities to connect with like-minded individuals.</p>
                      <p>Don't miss out on this incredible opportunity to be part of something special. Tickets are selling fast, so secure your spot today!</p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="mt-2 text-eventify-purple"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? 'Show less' : 'Read more'} 
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </CardContent>
                </Card>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Event Details</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="organizer">
                            <AccordionTrigger>Organizer Information</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <p className="font-medium">{event.organizer}</p>
                                <p className="text-sm text-gray-600">
                                  Contact the organizer with any questions about this event.
                                </p>
                                <Button variant="outline" className="text-eventify-purple border-eventify-purple">
                                  Contact Organizer
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="refunds">
                            <AccordionTrigger>Refund Policy</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-gray-600">
                                Refunds are available up to 7 days before the event. After that, tickets are non-refundable but can be transferred to another person.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="terms">
                            <AccordionTrigger>Terms and Conditions</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-gray-600">
                                By purchasing tickets to this event, you agree to the organizer's terms and conditions, including photography/video consent and liability waiver.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="relative pl-6 border-l-2 border-eventify-purple pb-6">
                            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-eventify-purple"></div>
                            <div>
                              <p className="text-gray-500 text-sm">{event.startTime}</p>
                              <h3 className="font-medium">Doors Open</h3>
                              <p className="text-sm text-gray-600">Arrive early to check in and find your seat</p>
                            </div>
                          </div>
                          
                          <div className="relative pl-6 border-l-2 border-eventify-purple pb-6">
                            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-eventify-purple"></div>
                            <div>
                              <p className="text-gray-500 text-sm">{
                                // Add 30 minutes to startTime
                                new Date(`2000-01-01T${event.startTime}:00`)
                                  .getHours() + ':' + 
                                  (new Date(`2000-01-01T${event.startTime}:00`).getMinutes() + 30)
                                    .toString().padStart(2, '0')
                              }</p>
                              <h3 className="font-medium">Event Begins</h3>
                              <p className="text-sm text-gray-600">Opening remarks and introductions</p>
                            </div>
                          </div>
                          
                          <div className="relative pl-6 border-l-2 border-eventify-purple pb-6">
                            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-eventify-purple"></div>
                            <div>
                              <p className="text-gray-500 text-sm">{event.endTime}</p>
                              <h3 className="font-medium">Event Concludes</h3>
                              <p className="text-sm text-gray-600">Closing remarks and networking</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="location" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-lg">{event.location}</h3>
                            <p className="text-gray-600">
                              {event.address}, {event.city}, {event.state} {event.zipCode}
                            </p>
                          </div>
                          
                          {/* Map would go here in a real application */}
                          <div className="w-full h-60 bg-gray-200 rounded-md flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-gray-400 mr-2" />
                            <span className="text-gray-500">Map integration would display here</span>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <h4 className="font-medium text-gray-900 mb-1">Getting There</h4>
                            <p>Public transportation is available within walking distance. Limited parking is available on-site.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Ticket Section */}
              <div className="col-span-1 space-y-6">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Tickets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {event.ticketTypes.map((ticket) => {
                      const quantity = ticketQuantities[ticket.id] || 0;
                      const soldOut = ticket.available - ticket.sold <= 0;
                      const availableText = soldOut 
                        ? 'Sold Out' 
                        : `${ticket.available - ticket.sold} tickets left`;
                      const availableClass = soldOut 
                        ? 'text-red-500' 
                        : ticket.available - ticket.sold < 10 
                          ? 'text-orange-500' 
                          : 'text-eventify-success';
                      
                      return (
                        <div key={ticket.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{ticket.name}</h3>
                              <p className="text-sm text-gray-600">{ticket.description}</p>
                            </div>
                            <span className="font-bold">${ticket.price.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <span className={`text-sm ${availableClass}`}>
                              {availableText}
                            </span>
                            
                            {soldOut ? (
                              <Button variant="outline" disabled className="opacity-50">
                                Sold Out
                              </Button>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  disabled={quantity === 0}
                                  onClick={() => handleQuantityChange(ticket.id, quantity - 1)}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  disabled={quantity >= (ticket.available - ticket.sold)}
                                  onClick={() => handleQuantityChange(ticket.id, quantity + 1)}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                  
                  {totalItems > 0 && (
                    <>
                      <Separator />
                      <CardFooter className="flex-col items-stretch space-y-4 pt-4">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <Button className="w-full bg-eventify-purple" onClick={handleAddToCart}>
                          <Ticket className="mr-2 h-4 w-4" />
                          Get Tickets
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex space-x-2 mb-4">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Heart className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Tag className="h-4 w-4" />
                      <span>Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.city}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="py-12 bg-white">
            <div className="eventify-container">
              <h2 className="eventify-heading mb-8">Similar Events You Might Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <Link key={relatedEvent.id} to={`/events/${relatedEvent.id}`}>
                    <div className="eventify-card h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedEvent.image} 
                          alt={relatedEvent.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-semibold mb-2 line-clamp-2">{relatedEvent.title}</h3>
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(relatedEvent.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{relatedEvent.city}, {relatedEvent.state}</span>
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="text-eventify-purple font-medium text-sm">
                            View Event
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
