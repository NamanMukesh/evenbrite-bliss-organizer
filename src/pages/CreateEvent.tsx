
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventForm from '@/components/forms/EventForm';

const CreateEvent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="eventify-container">
          <EventForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
