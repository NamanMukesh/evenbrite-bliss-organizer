
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';
import { eventsMockData } from '@/data/mockData';
import { Calendar, Search, Ticket, PieChart, MapPin, ChevronRight } from 'lucide-react';

const Home = () => {
  const featuredEvents = eventsMockData.filter(event => event.featured);
  const upcomingEvents = eventsMockData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  ).slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-eventify-darkPurple to-eventify-purple py-16 md:py-24">
          <div className="eventify-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Create, Manage & Celebrate Amazing Events
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  The all-in-one platform for event organizers to create events, sell tickets, and manage attendees with ease.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/create-event">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-eventify-purple hover:bg-opacity-90">
                      Create Event
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                      Browse Events
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-eventify-purple/20 rounded-lg transform rotate-6 animate-pulse-slow"></div>
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Event celebration" 
                  className="relative z-10 rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-eventify-purple/20 rounded-lg transform -rotate-6 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="eventify-container">
            <div className="text-center mb-12">
              <h2 className="eventify-heading mb-4">Everything You Need for Successful Events</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From selling tickets to checking in attendees, our platform provides all the tools you need to create and manage memorable events.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-eventify-lightPurple rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-eventify-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
                <p className="text-gray-600">
                  Create and customize events in minutes with our intuitive interface and flexible options.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-eventify-lightPurple rounded-full flex items-center justify-center mb-4">
                  <Ticket className="h-6 w-6 text-eventify-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Powerful Ticketing</h3>
                <p className="text-gray-600">
                  Sell tickets online with multiple price tiers, custom fields, and promotional codes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-eventify-lightPurple rounded-full flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-eventify-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Track ticket sales, attendance, and revenue with detailed dashboards and reports.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Events Section */}
        <section className="py-16 bg-gray-50">
          <div className="eventify-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="eventify-heading">Featured Events</h2>
              <Link to="/events" className="text-eventify-purple hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <EventList 
              events={featuredEvents} 
              showFilters={false} 
              columns={2}
              featured={true}
              title=""
            />
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section className="py-16 bg-white">
          <div className="eventify-container">
            <h2 className="eventify-heading mb-8">Upcoming Events</h2>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="arts">Arts</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <EventList 
              events={upcomingEvents} 
              showFilters={false}
              title=""
            />
            
            <div className="mt-8 text-center">
              <Link to="/events">
                <Button className="bg-eventify-purple">
                  See All Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-eventify-darkPurple text-white">
          <div className="eventify-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Next Event?</h2>
              <p className="text-lg mb-8 text-gray-300">
                Join thousands of event organizers using our platform to create unforgettable experiences.
              </p>
              <Link to="/create-event">
                <Button size="lg" className="bg-eventify-purple hover:bg-opacity-90">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
