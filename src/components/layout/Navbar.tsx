
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  User, 
  Search, 
  Calendar, 
  LayoutDashboard, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="eventify-container py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-eventify-purple" />
            <span className="text-xl font-bold text-eventify-darkPurple">Eventify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-eventify-darkPurple hover:text-eventify-purple transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-eventify-darkPurple hover:text-eventify-purple transition-colors">
              Browse Events
            </Link>
            <Link to="/create-event" className="text-eventify-darkPurple hover:text-eventify-purple transition-colors">
              Create Event
            </Link>
            <Link to="/dashboard" className="text-eventify-darkPurple hover:text-eventify-purple transition-colors">
              Dashboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-eventify-darkPurple border-eventify-darkPurple hover:bg-eventify-lightPurple hover:text-eventify-purple">
              Log in
            </Button>
            <Button size="sm" className="bg-eventify-purple hover:bg-opacity-90 text-white">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-eventify-darkPurple focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-eventify-darkPurple hover:bg-eventify-lightPurple rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-4 py-2 text-eventify-darkPurple hover:bg-eventify-lightPurple rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Events
            </Link>
            <Link
              to="/create-event"
              className="block px-4 py-2 text-eventify-darkPurple hover:bg-eventify-lightPurple rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Event
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-eventify-darkPurple hover:bg-eventify-lightPurple rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-center text-eventify-darkPurple border-eventify-darkPurple hover:bg-eventify-lightPurple hover:text-eventify-purple">
                Log in
              </Button>
              <Button className="w-full justify-center bg-eventify-purple hover:bg-opacity-90 text-white">
                Sign up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
