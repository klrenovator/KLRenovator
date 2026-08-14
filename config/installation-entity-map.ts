// ─────────────────────────────────────────────────────────────────────────
// Installation Entity Map — INS-12
// ─────────────────────────────────────────────────────────────────────────
// Structured entity data for AI Search (Google AI Overviews, ChatGPT Search,
// Gemini, Claude, Perplexity) to understand installation content semantically.
// Entities are injected naturally into page copy via shared modules — NOT as
// visible labels. They appear as natural language in customer-facing content.
// ─────────────────────────────────────────────────────────────────────────

export interface InstallationEntity {
  name: string;
  type: "Industry" | "ProductType" | "Material" | "Tool" | "Chemical" | "Measurement" | "Rating" | "HealthBenefit" | "Geography" | "Brand" | "Technique" | "Electrical" | "Standard";
  description: string;
  aliases: string[];
  whereToAppear: string[];
  relatedEntities: string[];
}

export const installationEntities: Record<string, InstallationEntity> = {
  // ─── Industry ───
  HVAC: {
    name: "HVAC (Heating, Ventilation, Air Conditioning)",
    type: "Industry",
    description: "The complete climate control industry covering heating, ventilation, and air conditioning systems for residential and commercial buildings.",
    aliases: ["HVAC system", "air conditioning system", "climate control", "cooling system"],
    whereToAppear: ["homepage", "about", "pillar-page-intro", "service-pages"],
    relatedEntities: ["SplitAirConditioner", "CeilingCassette", "RefrigerantR32", "RefrigerantR410A", "RefrigerantR22", "EnergyEfficiencySEER"],
  },

  // ─── Product Types ───
  SplitAirConditioner: {
    name: "Split Air Conditioner",
    type: "ProductType",
    description: "Residential/light-commercial air conditioner with separate indoor (evaporator) and outdoor (condenser) units connected by refrigerant piping.",
    aliases: ["split unit", "split AC", "wall-mounted AC", "split system", "ductless mini-split"],
    whereToAppear: ["installation-pages", "service-pages", "hp-guide-pages", "brand-pages"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "ClosedCellInsulation", "VacuumPump", "FlareConnection", "BTUMeasurement"],
  },

  CeilingCassette: {
    name: "Ceiling Cassette",
    type: "ProductType",
    description: "Commercial-grade air conditioner mounted flush in ceiling with 4-way airflow, common in offices, retail, and restaurants.",
    aliases: ["cassette unit", "ceiling-mounted AC", "4-way cassette", "commercial cassette", "ceiling cassette aircon"],
    whereToAppear: ["commercial-pages", "ceiling-cassette-pages", "brand-pages", "installation-pages"],
    relatedEntities: ["DrainPipePVC", "DrainPump", "CeilingSuspensionKit", "CopperPipeTypeL", "ClosedCellInsulation", "VacuumPump"],
  },

  WindowUnit: {
    name: "Window Unit",
    type: "ProductType",
    description: "Self-contained air conditioner installed in window frame, combining all components in single housing.",
    aliases: ["window AC", "window aircon", "window-type AC", "room air conditioner"],
    whereToAppear: ["installation-pages", "window-unit-pages", "pricing-pages"],
    relatedEntities: ["WindowFrameMounting", "CopperPipeTypeL", "VacuumPump"],
  },

  // ─── Materials ───
  CopperPipeTypeL: {
    name: "Copper Pipe (Type L)",
    type: "Material",
    description: "Thicker-walled copper tubing (Type L) for refrigerant lines 1.0–2.5 HP. Superior corrosion resistance and pressure rating vs Type M.",
    aliases: ["Type L copper", "Type L tubing", "refrigerant copper pipe", "AC copper pipe"],
    whereToAppear: ["installation-pages", "pricing-guide", "materials-section", "hp-guide-pages"],
    relatedEntities: ["FlareConnection", "ClosedCellInsulation", "VacuumPump", "CleanPipePreparation", "SplitAirConditioner"],
  },

  CopperPipeTypeM: {
    name: "Copper Pipe (Type M)",
    type: "Material",
    description: "Standard-walled copper tubing (Type M) approved for 3.0 HP+ systems where wall thickness permits. Cost-effective for larger capacity.",
    aliases: ["Type M copper", "Type M tubing", "large-capacity copper pipe"],
    whereToAppear: ["installation-pages", "pricing-guide", "hp-guide-pages"],
    relatedEntities: ["FlareConnection", "ClosedCellInsulation", "VacuumPump", "CleanPipePreparation"],
  },

  ClosedCellInsulation: {
    name: "insulation Insulation (Closed-Cell Elastomeric)",
    type: "Material",
    description: "Closed-cell elastomeric foam insulation (closed-cell). Minimum 9mm for standard runs, 13mm for ceiling cassette and long pipe runs (>15 ft). Prevents condensation drips and energy loss.",
    aliases: ["closed-cell insulation", "closed-cell insulation", "elastomeric foam", "refrigerant pipe insulation", "AC pipe insulation"],
    whereToAppear: ["installation-pages", "materials-section", "pricing-guide", "insulation-section"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "UVResistantTape", "SplitAirConditioner", "CeilingCassette"],
  },

  UVResistantTape: {
    name: "UV-Resistant Insulation Tape",
    type: "Material",
    description: "Weather-resistant tape for sealing insulation joints and terminations against UV degradation and moisture ingress.",
    aliases: ["insulation tape", "UV tape", "pipe wrap tape", "insulation tape"],
    whereToAppear: ["installation-pages", "materials-section"],
    relatedEntities: ["ClosedCellInsulation", "CopperPipeTypeL", "CopperPipeTypeM"],
  },

  PVCCasing: {
    name: "PVC Casing / Conduit",
    type: "Material",
    description: "PVC trunking or conduit for concealing and protecting copper piping, wiring, and drain pipe — available in various sizes for aesthetic installation.",
    aliases: ["PVC conduit", "pipe casing", "cable trunking", "concealment casing", "pipe cover"],
    whereToAppear: ["installation-pages", "pricing-guide", "additional-charges"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "ElectricalWiring", "PVCCasing"],
  },

  // ─── Tools ───
  VacuumPump: {
    name: "Two-Stage Vacuum Pump",
    type: "Tool",
    description: "Professional two-stage rotary vane vacuum pump capable of pulling 500 microns or below. Mandatory for every installation to remove moisture and non-condensables. Prevents compressor failure, acid formation, and voided manufacturer warranty.",
    aliases: ["vacuum pump", "HVAC vacuum pump", "micron gauge pump", "evacuation pump"],
    whereToAppear: ["installation-pages", "process-section", "why-vacuum-section", "commissioning-section"],
    relatedEntities: ["ManifoldGaugeSet", "MicronGauge", "RefrigerantR32", "RefrigerantR410A", "RefrigerantR22", "SplitAirConditioner", "CeilingCassette"],
  },

  ManifoldGaugeSet: {
    name: "Manifold Gauge Set",
    type: "Tool",
    description: "Compound gauge set (high/low side) for measuring refrigerant pressures during evacuation, charging, and system diagnostics. Essential for precision commissioning.",
    aliases: ["manifold gauges", "HVAC gauges", "refrigerant gauges", "pressure gauges"],
    whereToAppear: ["installation-pages", "commissioning-section", "gas-topup-pages"],
    relatedEntities: ["VacuumPump", "RefrigerantR32", "RefrigerantR410A", "RefrigerantR22"],
  },

  MicronGauge: {
    name: "Digital Micron Gauge",
    type: "Tool",
    description: "Precision digital vacuum gauge reading in microns. Used to verify 500-micron evacuation level and 15+ minute decay test for leak confirmation.",
    aliases: ["micron gauge", "vacuum gauge", "digital micron meter", "vacuum tester"],
    whereToAppear: ["installation-pages", "commissioning-section", "why-vacuum-section"],
    relatedEntities: ["VacuumPump", "ManifoldGaugeSet"],
  },

  FlaringTool: {
    name: "Flaring Tool & Torque Wrench",
    type: "Tool",
    description: "Eccentric cone flaring tool for 45° SAE flares + calibrated torque wrench for precise flare nut tightening to manufacturer specs. Prevents over/under-torqued connections.",
    aliases: ["flaring tool", "flare tool", "torque wrench", "flare nut wrench"],
    whereToAppear: ["installation-pages", "copper-piping-section", "materials-section"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "FlareConnection", "CleanPipePreparation"],
  },

  CleanPipePreparationKit: {
    name: "Clean Preparation Kit",
    type: "Tool",
    description: "regulator, hose, and flow meter for purging copper lines during brazing. Prevents internal copper oxide formation that contaminates refrigerant and clogs capillary tubes.",
    aliases: ["purge", "brazing", "brazing ", "oxide prevention"],
    whereToAppear: ["installation-pages", "copper-piping-section", "brazing-section"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "FlaringTool", "VacuumPump"],
  },

  ClampMeter: {
    name: "Digital Clamp Meter",
    type: "Tool",
    description: "True-RMS clamp meter for measuring compressor and fan motor amp draw during commissioning. Verifies electrical load within manufacturer specifications.",
    aliases: ["clamp meter", "amp meter", "current meter", "electrical tester"],
    whereToAppear: ["installation-pages", "commissioning-section", "electrical-section"],
    relatedEntities: ["ElectricalBreakerMCB", "DedicatedCircuit", "SplitAirConditioner", "CeilingCassette"],
  },

  DigitalThermometer: {
    name: "Digital Thermometer (Supply/Return)",
    type: "Tool",
    description: "Fast-response digital thermometer for measuring supply and return air temperature delta-T (target 14–20°F / 8–11°C) to verify cooling performance.",
    aliases: ["thermometer", "temp probe", "delta-T meter", "air temp meter"],
    whereToAppear: ["installation-pages", "commissioning-section", "testing-section"],
    relatedEntities: ["SplitAirConditioner", "CeilingCassette", "CommissioningRun"],
  },

  // ─── Electrical ───
  DedicatedCircuit: {
    name: "Dedicated Electrical Circuit",
    type: "Electrical",
    description: "Independent circuit from distribution board (DB) with its own MCB per MS IEC 60364. Required for each aircond unit. Cable: 2.5mm² (1.0–2.5 HP), 4mm² (3.0–5.0 HP). Includes outdoor isolator switch.",
    aliases: ["dedicated circuit", "independent circuit", "AC circuit", "aircon wiring", "DB circuit"],
    whereToAppear: ["installation-pages", "electrical-section", "pricing-guide", "faq-electrical"],
    relatedEntities: ["ElectricalBreakerMCB", "OutdoorIsolator", "ElectricalWiring", "EarthLeakageProtection", "SplitAirConditioner", "CeilingCassette"],
  },

  ElectricalBreakerMCB: {
    name: "Miniature Circuit Breaker (MCB)",
    type: "Electrical",
    description: "Correctly rated MCB per HP: 16A (1.0–1.5 HP), 20A (2.0–2.5 HP), 32A (3.0 HP+). Type C curve for motor starting inrush. Protects wiring and compressor.",
    aliases: ["MCB", "circuit breaker", "breaker", "MCB breaker", "AC breaker"],
    whereToAppear: ["installation-pages", "electrical-section", "pricing-guide", "commissioning-section"],
    relatedEntities: ["DedicatedCircuit", "ElectricalWiring", "EarthLeakageProtection", "SplitAirConditioner", "CeilingCassette"],
  },

  EarthLeakageProtection: {
    name: "Earth Leakage Protection (ELCB/RCCB)",
    type: "Electrical",
    description: "Residual current device (30mA sensitivity) protecting against shock hazard from insulation failure or moisture ingress. Mandatory per Malaysian wiring regulations.",
    aliases: ["ELCB", "RCCB", "earth leakage breaker", "RCD", "GFCI", "leakage protection"],
    whereToAppear: ["installation-pages", "electrical-section", "safety-section"],
    relatedEntities: ["DedicatedCircuit", "ElectricalBreakerMCB", "OutdoorIsolator"],
  },

  OutdoorIsolator: {
    name: "Outdoor Unit Isolator Switch",
    type: "Electrical",
    description: "Weatherproof lockable isolator (disconnect) at outdoor unit for safe maintenance and emergency shutdown. Required per electrical code for service access.",
    aliases: ["isolator", "disconnect switch", "outdoor isolator", "AC isolator", "maintenance switch"],
    whereToAppear: ["installation-pages", "electrical-section", "safety-section", "pricing-guide"],
    relatedEntities: ["DedicatedCircuit", "ElectricalBreakerMCB", "EarthLeakageProtection"],
  },

  ElectricalWiring: {
    name: "Electrical Wiring (PVC Insulated Copper)",
    type: "Electrical",
    description: "PVC-insulated copper conductors: 2.5mm² for 1.0–2.5 HP, 4mm² for 3.0–5.0 HP. 3-core (L, N, E) for single-phase. Run in PVC conduit/trunking.",
    aliases: ["AC wiring", "aircon cable", "electrical cable", "power cable", "3-core cable"],
    whereToAppear: ["installation-pages", "electrical-section", "pricing-guide", "additional-charges"],
    relatedEntities: ["DedicatedCircuit", "ElectricalBreakerMCB", "PVC Casing", "OutdoorIsolator"],
  },

  // ─── Techniques ───
  FlareConnection: {
    name: "Flare Connection (SAE 45°)",
    type: "Technique",
    description: "Precision 45° flare on copper tubing with flare nut torqued to spec (typically 18–42 Nm depending on size). Primary mechanical joint for split-system refrigerant lines. No brazing required at indoor/outdoor connections.",
    aliases: ["flare joint", "flare fitting", "mechanical flare", "flare nut", "SAE flare"],
    whereToAppear: ["installation-pages", "copper-piping-section", "commissioning-section", "quality-section"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "FlaringTool", "TorqueWrench", "ManifoldGaugeSet", "VacuumPump"],
  },

  CleanPipeBrazing: {
    name: "Brazing with Purge",
    type: "Technique",
    description: "Silver-alloy brazing (15% Ag min) with continuous low-flow (2–3 CFM) through the joint. Prevents internal copper oxide (cupric oxide) formation that would circulate as contamination.",
    aliases: ["brazing", "brazing with purge", "oxide-free brazing", "silver brazing", "HVAC brazing"],
    whereToAppear: ["installation-pages", "copper-piping-section", "brazing-section"],
    relatedEntities: ["CopperPipeTypeL", "CopperPipeTypeM", "CleanPipePreparationKit", "VacuumPump", "ManifoldGaugeSet"],
  },

  // ─── Chemicals ───
  RefrigerantR32: {
    name: "Refrigerant R32 (Difluoromethane)",
    type: "Chemical",
    description: "Low-GWP (675) HFC refrigerant replacing R410A in modern inverter units. Higher efficiency, lower charge required. Mildly flammable (A2L) — requires certified handling.",
    aliases: ["R32", "R-32", "difluoromethane", "HFC-32", "new refrigerant", "eco refrigerant"],
    whereToAppear: ["installation-pages", "gas-topup-pages", "brand-specs", "commissioning-section", "refrigerant-section"],
    relatedEntities: ["VacuumPump", "ManifoldGaugeSet", "SplitAirConditioner", "CeilingCassette", "EnergyEfficiencySEER", "ManufacturerWarranty"],
  },

  RefrigerantR410A: {
    name: "Refrigerant R410A (Puron)",
    type: "Chemical",
    description: "Standard HFC blend (R32/R125) for inverter and non-inverter units 2010–2020. GWP 2088. Higher pressure than R22 — requires POE oil and compatible components.",
    aliases: ["R410A", "R-410A", "Puron", "HFC-410A", "410A gas"],
    whereToAppear: ["installation-pages", "gas-topup-pages", "brand-specs", "commissioning-section", "refrigerant-section"],
    relatedEntities: ["VacuumPump", "ManifoldGaugeSet", "SplitAirConditioner", "CeilingCassette", "EnergyEfficiencySEER"],
  },

  RefrigerantR22: {
    name: "Refrigerant R22 (Freon/HCFC-22)",
    type: "Chemical",
    description: "Legacy HCFC refrigerant (GWP 1810) phased out 2010 for new equipment. Still in older non-inverter units (pre-2010). Uses mineral oil. Top-up only — no new installs.",
    aliases: ["R22", "R-22", "Freon", "HCFC-22", "old refrigerant", "R22 gas"],
    whereToAppear: ["gas-topup-pages", "repair-pages", "brand-specs", "legacy-units-section", "refrigerant-section"],
    relatedEntities: ["VacuumPump", "ManifoldGaugeSet", "SplitAirConditioner", "LegacyUnit"],
  },

  POEOil: {
    name: "POE Oil (Polyolester)",
    type: "Chemical",
    description: "Synthetic lubricant required for R410A and R32 systems. Hygroscopic — absorbs moisture rapidly. Must be kept sealed. Never mix with mineral oil (R22 systems).",
    aliases: ["polyolester oil", "POE lubricant", "HFC oil", "synthetic compressor oil"],
    whereToAppear: ["commissioning-section", "refrigerant-section", "brand-specs"],
    relatedEntities: ["RefrigerantR410A", "RefrigerantR32", "VacuumPump"],
  },

  MineralOil: {
    name: "Mineral Oil (Alkylbenzene)",
    type: "Chemical",
    description: "Traditional compressor lubricant for R22 systems. Not compatible with HFC refrigerants (R410A, R32). Used only in legacy non-inverter units.",
    aliases: ["mineral compressor oil", "AB oil", "alkylbenzene", "R22 oil"],
    whereToAppear: ["legacy-units-section", "gas-topup-pages", "refrigerant-section"],
    relatedEntities: ["RefrigerantR22", "SplitAirConditioner"],
  },

  // ─── Measurements & Ratings ───
  BTUMeasurement: {
    name: "BTU (British Thermal Unit)",
    type: "Measurement",
    description: "Cooling capacity measurement. 1 HP ≈ 9,000–10,000 BTU/hr. Room sizing: 1 HP (100–150 sq ft), 1.5 HP (150–250 sq ft), 2 HP (250–350 sq ft), 2.5 HP (350–450 sq ft).",
    aliases: ["BTU", "BTU/hr", "British Thermal Unit", "cooling capacity", "HP to BTU", "aircon sizing"],
    whereToAppear: ["hp-guide-pages", "btu-calculator", "installation-pages", "room-sizing-section"],
    relatedEntities: ["SplitAirConditioner", "CeilingCassette", "RoomSizing", "SunExposure", "OccupantCount"],
  },

  HorsepowerHP: {
    name: "Horsepower (HP) Rating",
    type: "Measurement",
    description: "Common Malaysian sizing metric for residential AC. 1 HP = ~746W cooling. Not exact — actual capacity varies by brand/model. Always cross-reference BTU.",
    aliases: ["HP", "horsepower", "aircon HP", "1HP", "1.5HP", "2HP", "2.5HP"],
    whereToAppear: ["hp-guide-pages", "pricing-guide", "installation-pages", "brand-pages"],
    relatedEntities: ["BTUMeasurement", "SplitAirConditioner", "CeilingCassette", "WindowUnit"],
  },

  EnergyEfficiencySEER: {
    name: "Energy Efficiency (SEER / CSPF)",
    type: "Rating",
    description: "Seasonal Energy Efficiency Ratio (SEER) or Cooling Seasonal Performance Factor (CSPF). Higher = lower electricity cost. Malaysia MEPS minimum CSPF 3.0 for split units. Inverter units typically CSPF 4.0–6.0+.",
    aliases: ["SEER", "CSPF", "energy efficiency", "MEPS", "star rating", "electricity saving", "inverter efficiency"],
    whereToAppear: ["brand-pages", "buying-guides", "hp-guide-pages", "commercial-pages", "maintenance-contract-pages"],
    relatedEntities: ["RefrigerantR32", "RefrigerantR410A", "InverterTechnology", "SplitAirConditioner", "CeilingCassette"],
  },

  InverterTechnology: {
    name: "Inverter Technology (Variable Speed Compressor)",
    type: "Technique",
    description: "Variable-frequency drive controlling compressor motor speed to match cooling load. 30–50% energy savings vs fixed-speed. Smoother temperature control, quieter operation, longer compressor life.",
    aliases: ["inverter", "variable speed", "DC inverter", "inverter AC", "inverter compressor"],
    whereToAppear: ["brand-pages", "hp-guide-pages", "buying-guides", "gas-topup-pages", "energy-saving-section"],
    relatedEntities: ["EnergyEfficiencySEER", "RefrigerantR32", "RefrigerantR410A", "SplitAirConditioner", "CeilingCassette"],
  },

  // ─── Health & Environment ───
  IndoorAirQuality: {
    name: "Indoor Air Quality (IAQ)",
    type: "HealthBenefit",
    description: "Clean evaporator coil, blower wheel, and filters reduce airborne mould spores, bacteria, dust mites, and VOCs. Chemical wash/overhaul restores IAQ. Critical in Malaysia's humid climate where mould proliferates.",
    aliases: ["IAQ", "indoor air quality", "air quality", "mould prevention", "healthy air", "clean air"],
    whereToAppear: ["chemical-wash-pages", "chemical-overhaul-pages", "servicing-pages", "health-section", "why-service-section"],
    relatedEntities: ["PressureChemicalWash", "ChemicalOverhaul", "SplitAirConditioner", "CeilingCassette", "MalaysiaClimate"],
  },

  MalaysiaClimate: {
    name: "Malaysia Climate (Tropical, Humid)",
    type: "Geography",
    description: "Year-round high humidity (70–90%) and temperatures (27–35°C) with no distinct seasons. Accelerates mould growth, corrosion, and refrigerant degradation. Drives 6–12 month service cycles vs 12–24 months in temperate zones.",
    aliases: ["tropical climate", "humid climate", "Malaysia weather", "KL weather", "Klang Valley climate", "monsoon climate"],
    whereToAppear: ["homepage", "about", "why-service-section", "service-frequency-section", "installation-pages", "area-pages"],
    relatedEntities: ["IndoorAirQuality", "PressureChemicalWash", "ChemicalOverhaul", "SplitAirConditioner", "CorrosionProtection"],
  },

  CorrosionProtection: {
    name: "Corrosion Protection (Coated Coils / Coastal)",
    type: "Technique",
    description: "Epoxy-coated or blue-fin condenser coils for coastal areas (Port Klang, Pandamaran, Morib) where salt-laden air accelerates corrosion. Extends outdoor unit life 2–3x in aggressive environments.",
    aliases: ["coated coil", "blue fin", "gold fin", "anti-corrosion coil", "coastal protection", "salt protection"],
    whereToAppear: ["area-pages-coastal", "installation-pages", "brand-specs", "outdoor-unit-section"],
    relatedEntities: ["MalaysiaClimate", "OutdoorUnit", "RefrigerantR410A", "RefrigerantR32"],
  },

  // ─── Brands ───
  DaikinBrand: {
    name: "Daikin",
    type: "Brand",
    description: "Japanese market leader. Inverter multi-split pioneer. Residential: FTXS, FTXZ, FTXM series. Known for reliability, high CSPF (5.0+), and proprietary Daikin Eye service app. R32 across range.",
    aliases: ["Daikin AC", "Daikin aircon", "Daikin inverter"],
    whereToAppear: ["brand-pages", "comparison-posts", "installation-pages", "pricing-guide"],
    relatedEntities: ["RefrigerantR32", "InverterTechnology", "EnergyEfficiencySEER", "SplitAirConditioner", "CeilingCassette", "ManufacturerWarranty"],
  },

  PanasonicBrand: {
    name: "Panasonic",
    type: "Brand",
    description: "Strong in Malaysia with nanoe™ X air purification. CS/XU series popular. R32 refrigerant. Good parts availability. nanoe™ X inhibits bacteria/viruses — marketing differentiator.",
    aliases: ["Panasonic AC", "Panasonic aircon", "nanoe X", "Panasonic inverter"],
    whereToAppear: ["brand-pages", "comparison-posts", "installation-pages", "chemical-wash-pages"],
    relatedEntities: ["RefrigerantR32", "IndoorAirQuality", "InverterTechnology", "SplitAirConditioner", "CeilingCassette"],
  },

  MitsubishiElectricBrand: {
    name: "Mitsubishi Electric",
    type: "Brand",
    description: "Premium positioning. MSZ-LN (Kirigamine) flagship with 3D i-see sensor. R32. Excellent heating performance (Hyper Heating) for rare cold snaps. Higher price point.",
    aliases: ["Mitsubishi AC", "Mitsubishi Electric aircon", "Kirigamine", "Mitsubishi Heavy Industries (distinct)"],
    whereToAppear: ["brand-pages", "comparison-posts", "installation-pages", "premium-segment"],
    relatedEntities: ["RefrigerantR32", "InverterTechnology", "EnergyEfficiencySEER", "SplitAirConditioner", "CeilingCassette"],
  },

  YorkBrand: {
    name: "York (Johnson Controls)",
    type: "Brand",
    description: "US heritage, strong commercial portfolio. Residential YVAA/YVHA series. Competitive pricing. R32 transition underway. Good for budget-conscious commercial projects.",
    aliases: ["York AC", "York aircon", "Johnson Controls York"],
    whereToAppear: ["brand-pages", "comparison-posts", "commercial-pages", "installation-pages"],
    relatedEntities: ["RefrigerantR32", "RefrigerantR410A", "SplitAirConditioner", "CeilingCassette"],
  },

  MideaBrand: {
    name: "Midea",
    type: "Brand",
    description: "World's largest AC manufacturer (OEM for many brands). Value-for-money. MS11/MS12 series popular in Malaysia. R32. Aggressive pricing with decent specs. Rising market share.",
    aliases: ["Midea AC", "Midea aircon", "Midea inverter"],
    whereToAppear: ["brand-pages", "comparison-posts", "installation-pages", "value-segment"],
    relatedEntities: ["RefrigerantR32", "InverterTechnology", "SplitAirConditioner", "CeilingCassette"],
  },

  CarrierBrand: {
    name: "Carrier",
    type: "Brand",
    description: "Inventor of modern AC. WeatherMaker/Infinity series. Premium US brand. R32/R410A. Strong dealer network. Higher price — perceived quality.",
    aliases: ["Carrier AC", "Carrier aircon", "WeatherMaker", "Infinity series"],
    whereToAppear: ["brand-pages", "comparison-posts", "installation-pages", "premium-segment"],
    relatedEntities: ["RefrigerantR32", "RefrigerantR410A", "InverterTechnology", "SplitAirConditioner", "CeilingCassette"],
  },

  // ─── Standards ───
  MS_IEC_60364: {
    name: "MS IEC 60364 (Malaysian Electrical Installation Standard)",
    type: "Standard",
    description: "Malaysian adoption of IEC 60364 for low-voltage electrical installations. Mandates dedicated circuits, MCB sizing, earth leakage protection, and isolator switches for air conditioning equipment.",
    aliases: ["MS IEC 60364", "Malaysian wiring standard", "IEC 60364", "electrical code Malaysia", "MS standard"],
    whereToAppear: ["installation-pages", "electrical-section", "faq-electrical", "compliance-section"],
    relatedEntities: ["DedicatedCircuit", "ElectricalBreakerMCB", "EarthLeakageProtection", "OutdoorIsolator", "ElectricalWiring"],
  },

  MEPS_Malaysia: {
    name: "MEPS Malaysia (Minimum Energy Performance Standards)",
    type: "Standard",
    description: "Malaysia Energy Commission regulation: minimum CSPF 3.0 for single-split non-ducted AC (effective 2021). Inverter units must meet higher tiers. Display label mandatory at point of sale.",
    aliases: ["MEPS", "Minimum Energy Performance Standards", "energy label Malaysia", "CSPF 3.0", "ST label"],
    whereToAppear: ["brand-pages", "buying-guides", "hp-guide-pages", "energy-saving-section", "compliance-section"],
    relatedEntities: ["EnergyEfficiencySEER", "InverterTechnology", "SplitAirConditioner", "CeilingCassette", "RefrigerantR32"],
  },
};

// Helper functions for content injection
export function getEntity(entityKey: keyof typeof installationEntities): InstallationEntity {
  return installationEntities[entityKey];
}

export function getEntitiesByType(type: InstallationEntity["type"]): InstallationEntity[] {
  return Object.values(installationEntities).filter((e) => e.type === type);
}

export function getEntitiesForPage(pageType: string): InstallationEntity[] {
  return Object.values(installationEntities).filter((e) => e.whereToAppear.includes(pageType));
}

export function getRelatedEntities(entityKey: string): InstallationEntity[] {
  const entity = installationEntities[entityKey as keyof typeof installationEntities];
  if (!entity) return [];
  return entity.relatedEntities
    .map((key) => installationEntities[key as keyof typeof installationEntities])
    .filter(Boolean) as InstallationEntity[];
}

// Natural language injection helpers — use these in components to weave entities naturally
export const entityPhrases = {
  // HVAC Industry
  hvacIntro: "As a full-service HVAC (Heating, Ventilation, Air Conditioning) specialist in KL & Selangor...",
  hvacScope: "Our HVAC expertise covers split air conditioners, ceiling cassettes, and window units across all major brands.",

  // Split Air Conditioner
  splitSystemDesc: "A split air conditioner separates the noisy compressor (outdoor) from the quiet evaporator (indoor), connected by refrigerant piping.",
  splitInstall: "Every split system installation requires precision copper piping, vacuum evacuation, and refrigerant charging to manufacturer specs.",

  // Ceiling Cassette
  cassetteDesc: "Ceiling cassette units mount flush in suspended ceilings with 4-way airflow — ideal for offices, retail, and restaurants with grid ceilings.",
  cassetteInstall: "Cassette installation adds ceiling suspension kits, condensate drain pumps, and longer refrigerant runs versus wall-mounted units.",

  // Materials — Copper
  copperTypeL: "We use Type L copper pipe (thicker walls) for 1.0–2.5 HP systems — better corrosion resistance and pressure rating than Type M.",
  copperTypeM: "For 3.0 HP and above, Type M copper is approved where wall thickness permits — cost-effective for larger capacity.",
  copperPreparation: "All brazing is done with continuous purge to prevent internal copper oxide that contaminates refrigerant and clogs capillary tubes.",
  copperFlare: "Indoor/outdoor connections use precision 45° SAE flares torqued to spec — no brazing at the unit, leak-free mechanical joints.",

  // Materials — Insulation
  insulationStandard: "Closed-cell insulation (minimum 9mm) on all refrigerant lines prevents condensation drips and energy loss.",
  insulationThick: "Ceiling cassettes and pipe runs over 15 ft get 13mm insulation for extra thermal protection in unconditioned ceiling spaces.",
  uvTape: "All insulation joints and terminations are sealed with UV-resistant tape — no exposed foam to degrade in sunlight.",

  // Tools — Vacuum
  vacuumMandatory: "A two-stage vacuum pump pulling 500 microns or below is NON-NEGOTIABLE on every install. Skipping it causes compressor failure, acid formation, and voids manufacturer warranty.",
  vacuumHold: "We hold deep vacuum for 15+ minutes to confirm zero leak rate — decay test proves system integrity before refrigerant release.",
  micronGauge: "Digital micron gauge verifies true 500-micron evacuation — analog gauges can't read this low accurately.",

  // Tools — Commissioning
  manifoldGauges: "Manifold gauge set monitors high/low side pressures during evacuation, charging, and run-test — precision commissioning requires real data.",
  clampMeter: "Clamp meter verifies compressor and fan motor amp draw within manufacturer specs — over-amp = future failure.",
  deltaTTest: "Supply/return temperature delta-T (target 14–20°F) confirms cooling performance matches design capacity.",

  // Electrical
  dedicatedCircuit: "MS IEC 60364 requires a dedicated circuit from your DB with its own MCB for each aircond — no sharing with lights or outlets.",
  mcbSizing: "Correct MCB per HP: 16A (1.0–1.5 HP), 20A (2.0–2.5 HP), 32A (3.0 HP+). Type C curve handles compressor inrush current.",
  earthLeakage: "30mA RCCB/ELCB protects against shock from insulation failure or moisture — mandatory per Malaysian wiring regulations.",
  outdoorIsolator: "Weatherproof lockable isolator at outdoor unit enables safe maintenance and emergency shutdown — required for service access.",

  // Refrigerants
  r32Desc: "R32 (GWP 675) is the modern standard — higher efficiency, lower charge, mildly flammable (A2L) requiring certified handling.",
  r410aDesc: "R410A (GWP 2088) dominated 2010–2020 — higher pressure than R22, requires POE oil. Still common in existing inverter units.",
  r22Desc: "R22 (GWP 1810) phased out 2010 — only for topping up legacy non-inverter units. Uses mineral oil, not compatible with HFC systems.",
  poeOil: "R32/R410A systems use hygroscopic POE oil — absorbs moisture instantly. Kept sealed until commissioning. Never mix with mineral oil.",

  // Sizing & Efficiency
  btuSizing: "Rough sizing: 1 HP ≈ 9,000–10,000 BTU/hr for 100–150 sq ft. 1.5 HP for 150–250 sq ft. 2 HP for 250–350 sq ft. 2.5 HP for 350–450 sq ft.",
  hpVsBtu: "HP is a rough metric — always cross-reference actual BTU/hr on the spec sheet. Inverter units often deliver more cooling per HP.",
  cspfRating: "Malaysia MEPS minimum CSPF 3.0. Inverter units typically 4.0–6.0+. Higher CSPF = lower monthly electricity bill.",
  inverterBenefit: "Variable-speed inverter compressor matches cooling load exactly — 30–50% energy savings vs fixed-speed, quieter, longer compressor life.",

  // Malaysia Climate
  malaysiaHumidity: "Malaysia's year-round 70–90% humidity accelerates mould growth on evaporator coils — drives 6–12 month chemical wash cycles vs 12–24 months in temperate zones.",
  coastalCorrosion: "Coastal areas (Port Klang, Pandamaran) need epoxy-coated or blue-fin condenser coils — salt air corrodes standard coils in 2–3 years.",
  monsoonInstalls: "We install year-round. Rainy season: pop-up canopies for outdoor work. Only lightning pauses compressor placement for safety.",

  // IAQ & Health
  iaqChemicalWash: "Pressure chemical wash removes mould, bacteria, and dust from evaporator coil and blower wheel — restores indoor air quality and cooling airflow.",
  iaqOverhaul: "Chemical overhaul fully dismantles indoor unit for deep cleaning — resolves persistent smells, water leaks, and ice formation from severe contamination.",
  mouldHealth: "Malaysia's humidity makes mould on AC coils a real health concern — spores circulate every time the fan runs. Annual chemical wash is preventive health care.",

  // Brands
  daikinExpertise: "Daikin multi-zone inverter heritage translates to reliable residential splits (FTXS, FTXM, FTXZ). R32 across range. Daikin Eye app for service history.",
  panasonicExpertise: "Panasonic nanoe™ X purifies air while cooling — inhibits bacteria/viruses. CS/XU series popular. Good parts availability in Malaysia.",
  mitsubishiExpertise: "Mitsubishi Electric MSZ-LN (Kirigamine) with 3D i-see sensor — premium positioning. Excellent heating for rare cold snaps.",
  mideaExpertise: "World's largest AC OEM. MS11/MS12 series — value-for-money with decent specs. Rising Malaysia market share. R32 across range.",
  carrierExpertise: "WeatherMaker/Infinity series — Carrier invented modern AC. Premium US engineering. Strong dealer network. R32 transition underway.",
  lgExpertise: "LG Dual Inverter compressor — 10-year compressor warranty. ThinQ app control. R32. Strong in both residential and light commercial.",
  samsungExpertise: "Samsung WindFree™ (micro-holes for still air) — unique comfort feature. Digital Inverter. R32. Good smart-home integration.",
  sharpExpertise: "Sharp Plasmacluster ion technology — active air purification. J-Tech inverter. Popular in Malaysia mid-range segment.",
  fujitsuExpertise: "Fujitsu General — Japanese precision engineering. High CSPF inverter models. Quiet operation. Strong in premium residential.",
  hitachiExpertise: "Hitachi (JCH) — tropicalized compressors for SE Asia heat. Auto-climate modes. R32. Reliable mid-range performer.",
};

export default installationEntities;