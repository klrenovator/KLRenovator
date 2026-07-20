export const BOOKING_HOURS = {
  start: 10, // 10:00 AM
  end: 18,   // 6:00 PM
};

export const MAX_RESCHEDULES = 1;

export function calculateDurationMinutes(serviceType: string, aircondType: string, quantity: number): number {
  let minsPerUnit = 90; // Default 1.5 hours
  
  if (serviceType === "installation") {
    if (aircondType === "Ceiling Cassette") {
      minsPerUnit = 240; // 4 hours per unit (2 units = 8 hours = Full Day)
    } else {
      minsPerUnit = 180; // 3 hours per unit
    }
  } else if (serviceType === "relocate") {
    if (aircondType === "Ceiling Cassette") {
      // Dismantle (1.5h) + Install (4h) = 5.5 hours
      minsPerUnit = 330; 
    } else {
      // 3 units = 8 hours (480 mins). Therefore 1 unit = 160 mins (~2.6 hours)
      minsPerUnit = 160; 
    }
  } else if (serviceType === "repair") {
    minsPerUnit = 120; // 2 hours
  } else if (serviceType === "conceal_piping") {
    minsPerUnit = 150; // 2.5 hours per unit
  } else {
    // service, gas_top_up, dismantle = 1.5 hours per unit (Including Ceiling Cassette)
    minsPerUnit = 90;
  }
  
  return minsPerUnit * quantity;
}
