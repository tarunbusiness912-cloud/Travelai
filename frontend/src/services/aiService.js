export const generateItinerary = (trip) => {
  return `
🌍 Destination
${trip.destination}

💰 Budget
₹${trip.budget}

────────────────────────

📅 Day 1
✔ Arrive at ${trip.destination}
✔ Hotel Check-in
✔ Explore the city
✔ Visit famous attractions
✔ Enjoy local dinner

────────────────────────

📅 Day 2
✔ Local sightseeing
✔ Shopping
✔ Visit museums
✔ Sunset photography

────────────────────────

📅 Day 3
✔ Local market
✔ Relax
✔ Pack luggage
✔ Return journey

Have a Safe Journey ✈️
`;
};