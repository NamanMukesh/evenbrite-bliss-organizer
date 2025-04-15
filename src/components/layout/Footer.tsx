
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eventify-darkPurple text-white pt-12 pb-8">
      <div className="eventify-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-eventify-purple" />
              <span className="text-xl font-bold">Eventify</span>
            </div>
            <p className="text-gray-300 mb-4">
              Creating unforgettable experiences made simple. Manage your events with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Organizer Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-eventify-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-eventify-purple" />
                <span className="text-gray-300">support@eventify.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-eventify-purple" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center md:text-left">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
