export type ErrorCode = { code: string; meaning: string; fix: string };
export type TechSpec = { specification: string; detail: string };

export const BRAND_ERROR_CODES: Record<string, ErrorCode[]> = {
  daikin: [
    {
      code: "A1",
      meaning: "Indoor PCB fault",
      fix: "PCB board inspection / replacement",
    },
    {
      code: "C4",
      meaning: "Heat exchanger sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "J3",
      meaning: "Discharge pipe sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "L5",
      meaning: "Inverter overcurrent (low gas)",
      fix: "Gas top-up + leak check",
    },
    {
      code: "U4",
      meaning: "Indoor/outdoor communication error",
      fix: "Wiring + PCB diagnosis",
    },
  ],
  panasonic: [
    {
      code: "H11",
      meaning: "Outdoor unit communication fault",
      fix: "PCB + wiring inspection",
    },
    {
      code: "H15",
      meaning: "Outdoor fan motor fault",
      fix: "Fan motor replacement",
    },
    {
      code: "H23",
      meaning: "Pipe temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "F11",
      meaning: "Refrigerant pressure issue",
      fix: "Gas top-up + leak check",
    },
    { code: "E18", meaning: "Drive PCB fault", fix: "PCB board replacement" },
  ],
  mitsubishi: [
    {
      code: "P8",
      meaning: "Outdoor unit error (general)",
      fix: "Outdoor unit diagnosis",
    },
    {
      code: "E6",
      meaning: "Communication fault indoor/outdoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "U1",
      meaning: "Reverse phase / open phase",
      fix: "Electrical supply inspection",
    },
    {
      code: "P4",
      meaning: "Drain sensor fault",
      fix: "Drain sensor replacement",
    },
    {
      code: "E4",
      meaning: "Remote controller error",
      fix: "Remote controller / PCB check",
    },
  ],
  york: [
    {
      code: "E1",
      meaning: "High pressure protection",
      fix: "Outdoor unit + gas pressure check",
    },
    {
      code: "E2",
      meaning: "Low pressure protection",
      fix: "Gas top-up + leak check",
    },
    {
      code: "E3",
      meaning: "Compressor overload",
      fix: "Compressor + capacitor diagnosis",
    },
    {
      code: "E6",
      meaning: "Fan motor fault",
      fix: "Fan motor inspection / replacement",
    },
    {
      code: "F4",
      meaning: "Discharge temperature sensor fault",
      fix: "Sensor replacement",
    },
  ],
  acson: [
    {
      code: "E1",
      meaning: "Indoor fan motor fault",
      fix: "Fan motor replacement",
    },
    {
      code: "E2",
      meaning: "Outdoor fan motor fault",
      fix: "Fan motor replacement",
    },
    {
      code: "E3",
      meaning: "Compressor protection",
      fix: "Compressor + gas diagnosis",
    },
    {
      code: "E5",
      meaning: "Refrigerant low pressure",
      fix: "Gas top-up + leak check",
    },
    {
      code: "F2",
      meaning: "Condenser sensor fault",
      fix: "Sensor inspection / replacement",
    },
  ],
  carrier: [
    {
      code: "E1",
      meaning: "Room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E2",
      meaning: "Indoor coil sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E3",
      meaning: "Outdoor coil sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E4",
      meaning: "Compressor system abnormal",
      fix: "Compressor diagnosis + wiring",
    },
    {
      code: "E5",
      meaning: "Communication fault",
      fix: "PCB + wiring diagnosis",
    },
  ],
  midea: [
    {
      code: "E1",
      meaning: "High pressure protection",
      fix: "Outdoor unit + condenser check",
    },
    {
      code: "E3",
      meaning: "Low pressure protection / low gas",
      fix: "Gas top-up + leak check",
    },
    {
      code: "P2",
      meaning: "Overcurrent protection (compressor)",
      fix: "Compressor + capacitor diagnosis",
    },
    {
      code: "F3",
      meaning: "Outdoor ambient sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "EC",
      meaning: "Refrigerant leakage detected",
      fix: "Leak test + gas top-up",
    },
  ],
  haier: [
    {
      code: "E1",
      meaning: "Room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E2",
      meaning: "Heat-exchange sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E4",
      meaning: "Indoor EEPROM error",
      fix: "PCB board replacement",
    },
    {
      code: "E7",
      meaning: "Communication fault indoor/outdoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "F1",
      meaning: "IPM protection (Inverter)",
      fix: "Outdoor PCB + compressor diagnosis",
    },
  ],
  toshiba: [
    { code: "04", meaning: "Communication error", fix: "Wiring + PCB check" },
    {
      code: "14",
      meaning: "Inverter overcurrent",
      fix: "Compressor + gas diagnosis",
    },
    {
      code: "1C",
      meaning: "Compressor drive fault",
      fix: "Compressor PCB replacement",
    },
    {
      code: "1E",
      meaning: "Discharge temperature error",
      fix: "Gas top-up + sensor check",
    },
    {
      code: "1F",
      meaning: "Power supply error",
      fix: "Voltage + wiring inspection",
    },
  ],
  hitachi: [
    {
      code: "01",
      meaning: "Reversing valve defect",
      fix: "Valve replacement / inspection",
    },
    {
      code: "02",
      meaning: "Outdoor unit protection",
      fix: "Outdoor unit diagnosis",
    },
    {
      code: "03",
      meaning: "Communication fault",
      fix: "Wiring + PCB inspection",
    },
    {
      code: "04",
      meaning: "Inverter failure",
      fix: "Inverter PCB board replacement",
    },
    {
      code: "08",
      meaning: "Discharge temperature too high",
      fix: "Gas top-up + sensor inspection",
    },
  ],
  samsung: [
    {
      code: "E101",
      meaning: "Communication error indoor/outdoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "E121",
      meaning: "Indoor room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E202",
      meaning: "Communication error outdoor/indoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "E464",
      meaning: "Compressor IPM overcurrent",
      fix: "Compressor diagnosis",
    },
    {
      code: "E554",
      meaning: "Gas leak detected",
      fix: "Leak test + gas top-up",
    },
  ],
  lg: [
    {
      code: "CH01",
      meaning: "Indoor room sensor error",
      fix: "Sensor replacement",
    },
    {
      code: "CH05",
      meaning: "Communication error indoor/outdoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "CH10",
      meaning: "Indoor fan motor problem",
      fix: "Fan motor replacement",
    },
    {
      code: "CH21",
      meaning: "Compressor DC peak error",
      fix: "Compressor + PCB diagnosis",
    },
    {
      code: "CH23",
      meaning: "DC link low voltage",
      fix: "Power supply + PCB check",
    },
  ],
  sharp: [
    {
      code: "E1",
      meaning: "High pressure abnormal",
      fix: "Condenser + gas check",
    },
    {
      code: "E2",
      meaning: "Indoor coil sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E3",
      meaning: "Low pressure abnormal",
      fix: "Gas top-up + leak check",
    },
    {
      code: "E5",
      meaning: "Compressor protection",
      fix: "Compressor diagnosis",
    },
    {
      code: "F1",
      meaning: "Outdoor thermistor error",
      fix: "Sensor replacement",
    },
  ],
  fujitsu: [
    {
      code: "11",
      meaning: "Serial communication error",
      fix: "Wiring + PCB check",
    },
    {
      code: "22",
      meaning: "Indoor capacity error",
      fix: "PCB board replacement",
    },
    {
      code: "32",
      meaning: "Indoor heat exchanger sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "42",
      meaning: "Indoor fan motor error",
      fix: "Fan motor replacement",
    },
    {
      code: "71",
      meaning: "Discharge thermistor error",
      fix: "Sensor replacement",
    },
  ],
  gree: [
    {
      code: "E1",
      meaning: "High pressure protection",
      fix: "Outdoor unit + condenser check",
    },
    {
      code: "E2",
      meaning: "Anti-freezing protection",
      fix: "Gas top-up + coil cleaning",
    },
    {
      code: "E4",
      meaning: "Compressor discharge high temp",
      fix: "Gas top-up + compressor check",
    },
    { code: "E6", meaning: "Communication fault", fix: "Wiring + PCB check" },
    {
      code: "F0",
      meaning: "Refrigerant recovery mode / low gas",
      fix: "Gas top-up + leak check",
    },
  ],
  hisense: [
    {
      code: "33",
      meaning: "Compressor discharge temp abnormal",
      fix: "Gas top-up + sensor check",
    },
    {
      code: "34",
      meaning: "Outdoor coil temp abnormal",
      fix: "Sensor replacement",
    },
    { code: "36", meaning: "Communication failure", fix: "Wiring + PCB check" },
    { code: "38", meaning: "EEPROM error", fix: "PCB board replacement" },
    {
      code: "39",
      meaning: "Indoor fan motor abnormal",
      fix: "Fan motor replacement",
    },
  ],
  aux: [
    {
      code: "E1",
      meaning: "Room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E2",
      meaning: "Compressor protection",
      fix: "Compressor diagnosis",
    },
    {
      code: "E3",
      meaning: "Indoor coil sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E4",
      meaning: "Outdoor unit protection",
      fix: "Outdoor unit diagnosis",
    },
    { code: "E5", meaning: "Communication error", fix: "Wiring + PCB check" },
  ],
  tcl: [
    {
      code: "E1",
      meaning: "Room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E2",
      meaning: "Outdoor temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E3",
      meaning: "Indoor fan motor fault",
      fix: "Fan motor replacement",
    },
    {
      code: "E5",
      meaning: "Communication fault indoor/outdoor",
      fix: "Wiring + PCB check",
    },
    {
      code: "E6",
      meaning: "Indoor coil sensor fault",
      fix: "Sensor replacement",
    },
  ],
  national: [
    {
      code: "H11",
      meaning: "Communication fault indoor/outdoor",
      fix: "PCB + wiring inspection",
    },
    {
      code: "H15",
      meaning: "Compressor discharge sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "H23",
      meaning: "Indoor pipe temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "F11",
      meaning: "Refrigerant cycle abnormality",
      fix: "Gas top-up + leak check",
    },
    {
      code: "F99",
      meaning: "DC peak detection",
      fix: "Compressor + PCB diagnosis",
    },
  ],
  isonic: [
    {
      code: "E1",
      meaning: "Indoor room temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E2",
      meaning: "Indoor coil temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E3",
      meaning: "Outdoor coil temperature sensor fault",
      fix: "Sensor replacement",
    },
    {
      code: "E4",
      meaning: "System abnormal",
      fix: "General diagnosis required",
    },
    {
      code: "E5",
      meaning: "Configuration error",
      fix: "PCB configuration / check",
    },
  ],
  _default: [
    {
      code: "E1/E2/E3",
      meaning: "Various pressure / temperature faults",
      fix: "Diagnosis by KL Renovator technician",
    },
    {
      code: "P-series",
      meaning: "Protection mode triggered",
      fix: "On-site error code reading + diagnosis",
    },
    {
      code: "F-series",
      meaning: "Sensor fault codes",
      fix: "Sensor inspection + replacement if needed",
    },
    {
      code: "CH/H-series",
      meaning: "Communication or sensor issue",
      fix: "Wiring / PCB diagnosis",
    },
  ],
};

export const BRAND_TECH_SPECS: Record<string, TechSpec[]> = {
  daikin: [
    {
      specification: "Compressor Type",
      detail: "Swing / Scroll Inverter & Non-Inverter",
    },
    {
      specification: "Refrigerant",
      detail: "R32 (Newer models) / R410A (Legacy)",
    },
    {
      specification: "Key Technology",
      detail: "Streamer Technology, Coanda Airflow",
    },
    {
      specification: "Energy Efficiency",
      detail: "Up to 5-Star Suruhanjaya Tenaga",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash recommended every 6-9 months",
    },
  ],
  panasonic: [
    {
      specification: "Compressor Type",
      detail: "Rotary Inverter & Non-Inverter",
    },
    { specification: "Refrigerant", detail: "R32 / R410A" },
    {
      specification: "Key Technology",
      detail: "nanoe™ X, AEROWINGS, iAUTO-X",
    },
    {
      specification: "Energy Efficiency",
      detail: "ECO Mode with A.I., 5-Star rated",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash recommended every 6-9 months",
    },
  ],
  mitsubishi: [
    { specification: "Compressor Type", detail: "DC Inverter / Rotary" },
    { specification: "Refrigerant", detail: "R32 / R410A" },
    {
      specification: "Key Technology",
      detail: "Dual Barrier Coating, Microparticle Catching Filter",
    },
    {
      specification: "Energy Efficiency",
      detail: "High CSPF (Cooling Seasonal Performance Factor)",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash recommended every 6-9 months",
    },
  ],
  york: [
    { specification: "Compressor Type", detail: "Rotary / Scroll" },
    { specification: "Refrigerant", detail: "R32 / R410A / R22 (Old models)" },
    {
      specification: "Key Technology",
      detail: "Follow Me feature, 3D Airflow",
    },
    { specification: "Energy Efficiency", detail: "3 to 5-Star rated" },
    {
      specification: "Service Frequency",
      detail: "Heavy duty, wash every 8-12 months",
    },
  ],
  acson: [
    {
      specification: "Compressor Type",
      detail: "Rotary Inverter & Non-Inverter",
    },
    { specification: "Refrigerant", detail: "R32 (MyEco Series) / R410A" },
    { specification: "Key Technology", detail: "Filtronz+, i-SENSE, Plusma" },
    { specification: "Energy Efficiency", detail: "Standard to 5-Star rated" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash recommended every 6-9 months",
    },
  ],
  carrier: [
    { specification: "Compressor Type", detail: "Twin Rotary / Rotary" },
    { specification: "Refrigerant", detail: "R32 / R410A" },
    {
      specification: "Key Technology",
      detail: "X-Power Inverter, Aqua Resin Coating",
    },
    {
      specification: "Energy Efficiency",
      detail: "5-Star rated models available",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-12 months",
    },
  ],
  midea: [
    { specification: "Compressor Type", detail: "Inverter Quattro / Rotary" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Flash Cooling, 3D Surrounding Flow",
    },
    { specification: "Energy Efficiency", detail: "Gear Energy Saving Mode" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  haier: [
    { specification: "Compressor Type", detail: "DC Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Self-Clean, PID Inverter Control",
    },
    {
      specification: "Energy Efficiency",
      detail: "Eco Mode, up to 63% energy saving",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  toshiba: [
    { specification: "Compressor Type", detail: "DC Hybrid Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Magic Coil, Ultra Pure Filter",
    },
    { specification: "Energy Efficiency", detail: "5-Star rated, Eco Logic" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 8-12 months",
    },
  ],
  hitachi: [
    { specification: "Compressor Type", detail: "Cascade Vector DC Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Frost Wash, Scene Camera Twin",
    },
    {
      specification: "Energy Efficiency",
      detail: "A+++ class energy performance",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 8-12 months",
    },
  ],
  samsung: [
    { specification: "Compressor Type", detail: "Digital Inverter Boost" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "WindFree™ Cooling, Tri-Care Filter",
    },
    { specification: "Energy Efficiency", detail: "Up to 73% energy saving" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  lg: [
    { specification: "Compressor Type", detail: "Dual Inverter Compressor" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Plasmaster™ Ionizer, UVnano™",
    },
    { specification: "Energy Efficiency", detail: "Up to 70% energy saving" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  sharp: [
    { specification: "Compressor Type", detail: "J-Tech Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Plasmacluster Ion, Super Jet Mode",
    },
    { specification: "Energy Efficiency", detail: "Eco Mode, 5-Star rated" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  fujitsu: [
    { specification: "Compressor Type", detail: "All DC Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    {
      specification: "Key Technology",
      detail: "Human Sensor, High Density Multi-path Heat Exchanger",
    },
    { specification: "Energy Efficiency", detail: "5-Star rated" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 8-12 months",
    },
  ],
  gree: [
    { specification: "Compressor Type", detail: "G10 Inverter Technology" },
    { specification: "Refrigerant", detail: "R32" },
    { specification: "Key Technology", detail: "Cold Plasma, 3D Airflow" },
    {
      specification: "Energy Efficiency",
      detail: "High energy savings, wide voltage operation",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  hisense: [
    { specification: "Compressor Type", detail: "DC Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    { specification: "Key Technology", detail: "Smart Mode, I Feel Sensor" },
    { specification: "Energy Efficiency", detail: "Fast cooling, Eco mode" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  aux: [
    {
      specification: "Compressor Type",
      detail: "Rotary Inverter & Non-Inverter",
    },
    { specification: "Refrigerant", detail: "R32 / R410A" },
    { specification: "Key Technology", detail: "Golden Fin, Auto Restart" },
    {
      specification: "Energy Efficiency",
      detail: "Cost-effective energy cooling",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  tcl: [
    { specification: "Compressor Type", detail: "Smart Inverter" },
    { specification: "Refrigerant", detail: "R32" },
    { specification: "Key Technology", detail: "Gentle Breeze, AI Inverter" },
    { specification: "Energy Efficiency", detail: "Up to 60% energy saving" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  national: [
    {
      specification: "Compressor Type",
      detail: "Legacy Rotary (mostly Non-Inverter)",
    },
    { specification: "Refrigerant", detail: "R22 (predominantly)" },
    {
      specification: "Key Technology",
      detail: "Durable conventional cooling (now under Panasonic)",
    },
    {
      specification: "Energy Efficiency",
      detail: "Older standard, reliable build",
    },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 8-12 months",
    },
  ],
  isonic: [
    { specification: "Compressor Type", detail: "Rotary / Non-Inverter" },
    { specification: "Refrigerant", detail: "R32 / R410A" },
    { specification: "Key Technology", detail: "Budget-friendly, Turbo Mode" },
    { specification: "Energy Efficiency", detail: "Standard 3-Star rated" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash every 6-9 months",
    },
  ],
  _default: [
    { specification: "Compressor Type", detail: "Standard / Inverter" },
    { specification: "Refrigerant", detail: "R32 / R410A / R22" },
    { specification: "Key Technology", detail: "Standard cooling technology" },
    { specification: "Energy Efficiency", detail: "Varies by model" },
    {
      specification: "Service Frequency",
      detail: "Chemical wash recommended every 6-12 months",
    },
  ],
};
