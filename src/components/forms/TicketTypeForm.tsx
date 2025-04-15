
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TicketType } from '@/data/mockData';
import { Ticket, DollarSign, Trash2, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TicketTypeFormProps {
  ticketType: TicketType;
  onUpdate: (updates: Partial<TicketType>) => void;
  onRemove: () => void;
  showRemoveButton?: boolean;
}

const TicketTypeForm: React.FC<TicketTypeFormProps> = ({
  ticketType,
  onUpdate,
  onRemove,
  showRemoveButton = true
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Ticket className="h-5 w-5 text-eventify-purple" />
          <Label className="text-lg font-semibold">Ticket Type</Label>
        </div>
        {showRemoveButton && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`name-${ticketType.id}`}>Ticket Name</Label>
          <Input
            id={`name-${ticketType.id}`}
            value={ticketType.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., General Admission, VIP, Early Bird"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`price-${ticketType.id}`}>Price ($)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set to 0 for free tickets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id={`price-${ticketType.id}`}
              type="number"
              min="0"
              step="0.01"
              value={ticketType.price}
              onChange={(e) => onUpdate({ price: parseFloat(e.target.value) })}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`available-${ticketType.id}`}>Available Quantity</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of tickets available for sale</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id={`available-${ticketType.id}`}
            type="number"
            min="1"
            value={ticketType.available}
            onChange={(e) => onUpdate({ available: parseInt(e.target.value) })}
            required
          />
        </div>
        
        {ticketType.sold > 0 && (
          <div className="space-y-2">
            <Label htmlFor={`sold-${ticketType.id}`}>Tickets Sold</Label>
            <Input
              id={`sold-${ticketType.id}`}
              type="number"
              value={ticketType.sold}
              readOnly
              className="bg-gray-50"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`description-${ticketType.id}`}>Description (Optional)</Label>
        <Textarea
          id={`description-${ticketType.id}`}
          value={ticketType.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe what's included with this ticket type..."
          rows={2}
        />
      </div>
    </div>
  );
};

export default TicketTypeForm;
