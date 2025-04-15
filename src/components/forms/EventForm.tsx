
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { EventType, categories } from '@/data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Info, 
  Image, 
  ImagePlus, 
  Save, 
  ArrowLeft, 
  Trash2, 
  DollarSign, 
  Plus 
} from 'lucide-react';
import TicketTypeForm from './TicketTypeForm';

interface EventFormProps {
  initialEvent?: EventType;
  isEditing?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ 
  initialEvent,
  isEditing = false
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [ticketTypes, setTicketTypes] = useState(
    initialEvent?.ticketTypes || [
      {
        id: uuidv4(),
        name: 'General Admission',
        price: 0,
        available: 100,
        sold: 0,
        description: 'Standard entry to the event'
      }
    ]
  );
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialEvent?.image || null
  );

  // Demo function to simulate image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we just create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      {
        id: uuidv4(),
        name: 'New Ticket Type',
        price: 0,
        available: 100,
        sold: 0,
        description: 'Description for this ticket type'
      }
    ]);
  };

  const handleUpdateTicketType = (id: string, updatedTicket: any) => {
    setTicketTypes(
      ticketTypes.map(ticket => 
        ticket.id === id ? { ...ticket, ...updatedTicket } : ticket
      )
    );
  };

  const handleRemoveTicketType = (id: string) => {
    if (ticketTypes.length <= 1) {
      toast({
        title: "Cannot remove ticket type",
        description: "Your event must have at least one ticket type.",
        variant: "destructive",
      });
      return;
    }
    
    setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    // In a real app, you would save the form data to a database
    // For now, we'll just simulate a form submission
    setTimeout(() => {
      toast({
        title: isEditing ? "Event updated" : "Event created",
        description: isEditing 
          ? "Your event has been updated successfully." 
          : "Your event has been created successfully.",
      });
      setFormSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="eventify-heading">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            type="button" 
            variant="outline"
            disabled={formSubmitting}
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-eventify-purple"
            disabled={formSubmitting}
          >
            {formSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Event' : 'Create Event'}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details" className="flex items-center space-x-2">
            <Info className="h-4 w-4" />
            <span>Event Details</span>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Location</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center space-x-2">
            <Ticket className="h-4 w-4" />
            <span>Tickets</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide the core details about your event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    defaultValue={initialEvent?.title || ''} 
                    placeholder="Enter event title"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={initialEvent?.category || categories[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={initialEvent?.description || ''} 
                  placeholder="Describe your event..."
                  rows={5}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <Input 
                      id="date" 
                      type="date" 
                      defaultValue={initialEvent?.date || ''} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        id="startTime" 
                        type="time" 
                        defaultValue={initialEvent?.startTime || ''} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        id="endTime" 
                        type="time" 
                        defaultValue={initialEvent?.endTime || ''} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Image</CardTitle>
              <CardDescription>
                Upload a compelling image that showcases your event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Event Image</Label>
                  <div className="flex items-center">
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                    <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                      {imagePreview ? (
                        <>
                          <img 
                            src={imagePreview} 
                            alt="Event preview" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <label 
                              htmlFor="image"
                              className="bg-white rounded-md px-3 py-2 text-sm cursor-pointer flex items-center"
                            >
                              <ImagePlus className="h-4 w-4 mr-2" />
                              Change Image
                            </label>
                          </div>
                        </>
                      ) : (
                        <label 
                          htmlFor="image"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <Image className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload image</span>
                        </label>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended image size: 1200 x 630 pixels (16:9 ratio)
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="organizer">Organizer</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The organization or person hosting the event</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input 
                      id="organizer" 
                      defaultValue={initialEvent?.organizer || ''} 
                      placeholder="Organization or individual name"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured">Featured Event</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Featured events are highlighted on the homepage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue={initialEvent?.featured ? "true" : "false"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select featured status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Venue Details</CardTitle>
              <CardDescription>
                Specify where your event will take place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Venue Name</Label>
                <Input 
                  id="location" 
                  defaultValue={initialEvent?.location || ''} 
                  placeholder="e.g., Madison Square Garden"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  defaultValue={initialEvent?.address || ''} 
                  placeholder="Street address"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    defaultValue={initialEvent?.city || ''} 
                    placeholder="City"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    defaultValue={initialEvent?.state || ''} 
                    placeholder="State/Province"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    defaultValue={initialEvent?.zipCode || ''} 
                    placeholder="Postal/Zip Code"
                    required 
                  />
                </div>
              </div>
              
              {/* This would be a map integration in a real application */}
              <div className="w-full h-80 bg-gray-100 rounded-md flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400 mr-2" />
                <span className="text-gray-500">Map integration would display here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
              <CardDescription>
                Set up ticket types, prices, and availability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Ticket Types</h3>
                  <Button 
                    type="button" 
                    onClick={handleAddTicketType} 
                    variant="outline"
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ticket Type
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Create different ticket options for your event (e.g., General Admission, VIP, Early Bird).
                </p>
              </div>
              
              <div className="space-y-6">
                {ticketTypes.map((ticket, index) => (
                  <React.Fragment key={ticket.id}>
                    {index > 0 && <Separator />}
                    <TicketTypeForm
                      ticketType={ticket}
                      onUpdate={(updates) => handleUpdateTicketType(ticket.id, updates)}
                      onRemove={() => handleRemoveTicketType(ticket.id)}
                      showRemoveButton={ticketTypes.length > 1}
                    />
                  </React.Fragment>
                ))}
              </div>
              
              <div className="pt-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Summary</h3>
                    <span className="text-sm text-gray-500">
                      {ticketTypes.length} Ticket {ticketTypes.length === 1 ? 'Type' : 'Types'}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Capacity</span>
                      <span className="font-medium">
                        {ticketTypes.reduce((sum, ticket) => sum + ticket.available, 0)} tickets
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Price Range</span>
                      <span className="font-medium">
                        ${Math.min(...ticketTypes.map(t => t.price))} - ${Math.max(...ticketTypes.map(t => t.price))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default EventForm;
