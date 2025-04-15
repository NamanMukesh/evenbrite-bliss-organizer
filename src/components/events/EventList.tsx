
import React, { useState } from 'react';
import EventCard from './EventCard';
import { EventType, categories } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface EventListProps {
  events: EventType[];
  title?: string;
  showFilters?: boolean;
  columns?: 1 | 2 | 3 | 4;
  featured?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  title = "Upcoming Events",
  showFilters = true,
  columns = 3,
  featured = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const filteredEvents = events
    .filter(event => 
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' ? true : event.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'price') {
        const aPrice = Math.min(...a.ticketTypes.map(type => type.price));
        const bPrice = Math.min(...b.ticketTypes.map(type => type.price));
        return aPrice - bPrice;
      } else if (sortBy === 'popularity') {
        return (b.soldTickets / b.totalTickets) - (a.soldTickets / a.totalTickets);
      }
      return 0;
    });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('date');
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="w-full">
      {title && <h2 className="eventify-heading mb-6">{title}</h2>}

      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 eventify-input w-full"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Soonest)</SelectItem>
                  <SelectItem value="price">Price (Lowest)</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            {/* Mobile Filters Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      Filters
                    </span>
                    <SlidersHorizontal size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down events to find exactly what you're looking for.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort by</label>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date (Soonest)</SelectItem>
                          <SelectItem value="price">Price (Lowest)</SelectItem>
                          <SelectItem value="popularity">Popularity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={resetFilters} variant="outline" className="w-full">
                        Reset Filters
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="w-full bg-eventify-purple">
                        Apply Filters
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        <div className={`grid ${colClasses[columns]} gap-6`}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              featured={featured}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          <Button onClick={resetFilters} className="mt-4 bg-eventify-purple">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventList;
