
import React from 'react';

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
      
      {/* Seating */}
      <div className="grid gap-4">
        {seatRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seatId) => {
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              const canSelect = selectedSeats.length < maxSelectableSeats || isSelected;
              
              return (
                <button
                  key={seatId}
                  className={`w-8 h-8 text-xs rounded flex items-center justify-center ${
                    isBooked ? 'bg-gray-400 cursor-not-allowed' :
                    isSelected ? 'bg-eventify-purple text-white' :
                    'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => !isBooked && canSelect && onSeatSelect(seatId)}
                  disabled={isBooked}
                  title={`Seat ${seatId}${isBooked ? ' (Already booked)' : ''}`}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
