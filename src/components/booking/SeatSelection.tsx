
import React from 'react';
import { cn } from '@/lib/utils';

interface SeatSelectionProps {
  totalSeats: number;
  bookedSeats: string[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  maxSelectableSeats: number;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  totalSeats,
  bookedSeats,
  selectedSeats,
  onSeatSelect,
  maxSelectableSeats
}) => {
  const rowSize = 10; // Number of seats per row
  const rows = Math.ceil(totalSeats / rowSize);
  
  // Create an array of rows with seat IDs
  const seatRows = Array.from({ length: rows }, (_, rowIndex) => {
    const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C, etc.
    return Array.from({ length: rowSize }, (_, seatIndex) => {
      const seatNumber = seatIndex + 1;
      return `${rowLetter}${seatNumber}`;
    }).filter((_, seatIndex) => rowIndex * rowSize + seatIndex < totalSeats);
  });

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Stage */}
      <div className="w-full bg-gray-200 text-center py-2 rounded-lg mb-6">
        STAGE
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-eventify-purple rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
      
      {/* Seating */}
      <div className="grid gap-4">
        {seatRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            <div className="flex items-center justify-center w-6 text-sm font-medium text-gray-500">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            {row.map((seatId) => {
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              const canSelect = selectedSeats.length < maxSelectableSeats || isSelected;
              
              return (
                <button
                  key={seatId}
                  className={cn(
                    "w-8 h-8 text-xs rounded flex items-center justify-center transition-colors",
                    isBooked ? "bg-gray-400 cursor-not-allowed" :
                    isSelected ? "bg-eventify-purple text-white" :
                    canSelect ? "bg-gray-200 hover:bg-gray-300" :
                    "bg-gray-200 opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isBooked && canSelect && onSeatSelect(seatId)}
                  disabled={isBooked || (!canSelect && !isSelected)}
                  title={`Seat ${seatId}${isBooked ? ' (Already booked)' : isSelected ? ' (Selected)' : !canSelect ? ' (Max seats selected)' : ''}`}
                >
                  {seatId}
                </button>
              );
            })}
            <div className="flex items-center justify-center w-6 text-sm font-medium text-gray-500">
              {String.fromCharCode(65 + rowIndex)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected seats summary */}
      <div className="w-full max-w-md bg-gray-50 p-4 rounded-lg text-sm">
        <div className="font-medium mb-2">Selected Seats: {selectedSeats.length}/{maxSelectableSeats}</div>
        <div className="flex flex-wrap gap-2">
          {selectedSeats.length > 0 ? (
            selectedSeats.map(seat => (
              <span key={seat} className="bg-eventify-purple text-white px-2 py-1 rounded">
                {seat}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No seats selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
