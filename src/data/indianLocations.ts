
export interface IndianLocation {
  city: string;
  state: string;
}

export const indianLocations: IndianLocation[] = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Chandigarh", state: "Punjab & Haryana" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Mysore", state: "Karnataka" },
  { city: "Goa", state: "Goa" },
  { city: "Varanasi", state: "Uttar Pradesh" },
  { city: "Amritsar", state: "Punjab" },
  { city: "Bhubaneswar", state: "Odisha" },
  { city: "Dehradun", state: "Uttarakhand" },
  { city: "Shillong", state: "Meghalaya" }
];

export const getRandomIndianLocation = (): IndianLocation => {
  const randomIndex = Math.floor(Math.random() * indianLocations.length);
  return indianLocations[randomIndex];
};
