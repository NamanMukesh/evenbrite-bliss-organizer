
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventForm from '@/components/forms/EventForm';
import { eventsMockData } from '@/data/mockData';

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const event = eventsMockData.find(e => e.id === id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="eventify-container">
          <EventForm initialEvent={event} isEditing={true} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditEvent;
