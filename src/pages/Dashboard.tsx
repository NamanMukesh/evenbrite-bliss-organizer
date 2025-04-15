
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import EventManagementTable from '@/components/dashboard/EventManagementTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  Users, 
  Settings, 
  CreditCard, 
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="eventify-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="eventify-heading mb-4 md:mb-0">Dashboard</h1>
            <Tabs defaultValue="overview" className="w-full max-w-md">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <div className="md:col-span-5">
              <DashboardSummary />
            </div>
            
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <a href="/create-event" className="flex items-center text-sm text-eventify-purple hover:underline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create Event
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 hover:text-eventify-purple">
                    <Ticket className="h-4 w-4 mr-2" />
                    Manage Tickets
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 hover:text-eventify-purple">
                    <Users className="h-4 w-4 mr-2" />
                    Attendees
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 hover:text-eventify-purple">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payouts
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 hover:text-eventify-purple">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Support
                  </a>
                </div>
              </div>
              
              <div className="bg-eventify-lightPurple p-4 rounded-lg">
                <h3 className="font-medium mb-2">Pro Tip</h3>
                <p className="text-sm text-gray-700">
                  Share your event on social media to boost ticket sales and reach a wider audience.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <EventManagementTable />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
