
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Printer, 
  QrCode, 
  Copy,
  ArrowUpDown,
  ChevronDown,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { eventsMockData, EventType } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

const EventManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof EventType>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleSort = (field: keyof EventType) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredEvents = eventsMockData
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortField === 'location') {
        return sortDirection === 'asc' 
          ? a.location.localeCompare(b.location) 
          : b.location.localeCompare(a.location);
      } else if (sortField === 'totalTickets') {
        return sortDirection === 'asc' 
          ? a.totalTickets - b.totalTickets 
          : b.totalTickets - a.totalTickets;
      } else if (sortField === 'soldTickets') {
        return sortDirection === 'asc' 
          ? a.soldTickets - b.soldTickets 
          : b.soldTickets - a.soldTickets;
      }
      return 0;
    });

  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(event => event.id));
    }
  };

  const handleSelectEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedEvents.length === 0) {
      toast({
        title: "No events selected",
        description: "Please select at least one event to perform this action.",
        variant: "destructive",
      });
      return;
    }

    // Simulate bulk actions
    if (action === 'delete') {
      toast({
        title: `${selectedEvents.length} events deleted`,
        description: "The selected events have been deleted successfully.",
      });
    } else if (action === 'export') {
      toast({
        title: "Export successful",
        description: `${selectedEvents.length} events exported to CSV.`,
      });
    } else if (action === 'duplicate') {
      toast({
        title: "Events duplicated",
        description: `${selectedEvents.length} events have been duplicated.`,
      });
    }

    setSelectedEvents([]);
  };

  const getSalesStatus = (soldPercent: number) => {
    if (soldPercent >= 90) return "Sold Out";
    if (soldPercent >= 75) return "Almost Sold Out";
    if (soldPercent >= 50) return "Selling Fast";
    if (soldPercent >= 25) return "On Sale";
    return "Just Launched";
  };

  const getStatusColor = (soldPercent: number) => {
    if (soldPercent >= 90) return "bg-red-500";
    if (soldPercent >= 75) return "bg-orange-500";
    if (soldPercent >= 50) return "bg-yellow-500";
    if (soldPercent >= 25) return "bg-green-500";
    return "bg-blue-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="eventify-subheading">Your Events</h2>
        <Link to="/create-event">
          <Button className="bg-eventify-purple w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Create New Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {selectedEvents.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedEvents.length} selected
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                  <Printer className="mr-2 h-4 w-4" /> Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('duplicate')}>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={
                    filteredEvents.length > 0 && 
                    selectedEvents.length === filteredEvents.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all events"
                />
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  Event
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('soldTickets')}
                >
                  Sales
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const soldPercent = (event.soldTickets / event.totalTickets) * 100;
                const salesStatus = getSalesStatus(soldPercent);
                const statusColor = getStatusColor(soldPercent);
                
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleSelectEvent(event.id)}
                        aria-label={`Select ${event.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500 hidden sm:block">
                            {event.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                        <span>{event.city}, {event.state}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-col">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{soldPercent.toFixed(0)}%</span>
                          <span className="text-gray-500">
                            {event.soldTickets}/{event.totalTickets}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${statusColor}`}
                            style={{ width: `${soldPercent}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge className={`${statusColor} text-white`}>
                        {salesStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/events/${event.id}`}>
                              <Check className="mr-2 h-4 w-4" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/edit-event/${event.id}`}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" /> Check-ins
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-900">No events found</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {searchTerm ? 'Try adjusting your search term' : 'Create your first event to get started'}
                    </p>
                    {!searchTerm && (
                      <Link to="/create-event">
                        <Button className="bg-eventify-purple">
                          <Plus className="mr-2 h-4 w-4" /> Create New Event
                        </Button>
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventManagementTable;
