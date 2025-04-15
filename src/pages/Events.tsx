
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';
import { eventsMockData } from '@/data/mockData';

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-eventify-darkPurple to-eventify-purple py-12">
          <div className="eventify-container text-white text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover Events
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Find and attend events that match your interests and passions.
            </p>
          </div>
        </section>
        
        {/* Events List Section */}
        <section className="py-12">
          <div className="eventify-container">
            <EventList 
              events={eventsMockData} 
              showFilters={true}
              title="All Events"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
