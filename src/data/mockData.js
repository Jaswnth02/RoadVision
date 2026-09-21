// Mock Data for RoadVision AI
// Specifications adhering to IRC:111-2009, MoRTH Section 500, and IS 383:2016

// High-quality SVG Data URIs representing road construction materials for instant demo testing
export const SAMPLE_IMAGES = [
  {
    id: 'sample-coarse-20',
    title: 'Coarse Aggregate (20 mm)',
    category: 'Coarse Aggregate',
    size: '20 mm – Medium',
    description: 'Crushed blue metal granite aggregate for dense bituminous macadam (DBM).',
    recommendation: 'Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%239CA3AF"/><circle cx="120" cy="110" r="45" fill="%234B5563"/><circle cx="210" cy="90" r="50" fill="%23374151"/><circle cx="310" cy="120" r="40" fill="%236B7280"/><circle cx="430" cy="100" r="48" fill="%234B5563"/><circle cx="510" cy="140" r="42" fill="%23374151"/><circle cx="90" cy="220" r="46" fill="%236B7280"/><circle cx="200" cy="210" r="52" fill="%234B5563"/><circle cx="320" cy="230" r="48" fill="%23374151"/><circle cx="440" cy="200" r="44" fill="%236B7280"/><circle cx="520" cy="260" r="50" fill="%234B5563"/><circle cx="130" cy="320" r="42" fill="%23374151"/><circle cx="240" cy="310" r="47" fill="%236B7280"/><circle cx="370" cy="330" r="52" fill="%234B5563"/><circle cx="470" cy="315" r="45" fill="%23374151"/><polygon points="180,140 230,190 160,180" fill="%231F2937" opacity="0.6"/><polygon points="360,150 410,180 340,210" fill="%231F2937" opacity="0.5"/><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FFFFFF" font-weight="bold">SAMPLE #CA-20MM (CRUSHED GRANITE)</text></svg>`,
    qualityScore: 94,
    confidence: 96.4,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-coarse-10',
    title: 'Coarse Aggregate (10 mm)',
    category: 'Coarse Aggregate',
    size: '10 mm – Small',
    description: 'Chipped aggregate for surface dressing and wearing course micro-surfacing.',
    recommendation: 'Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2364748B"/><g fill="%23334155"><circle cx="60" cy="60" r="22"/><circle cx="120" cy="70" r="24"/><circle cx="180" cy="50" r="20"/><circle cx="250" cy="65" r="23"/><circle cx="320" cy="55" r="21"/><circle cx="390" cy="70" r="25"/><circle cx="460" cy="60" r="22"/><circle cx="530" cy="75" r="24"/><circle cx="80" cy="140" r="23"/><circle cx="150" cy="135" r="22"/><circle cx="220" cy="145" r="26"/><circle cx="290" cy="130" r="21"/><circle cx="360" cy="140" r="24"/><circle cx="430" cy="135" r="22"/><circle cx="500" cy="145" r="25"/><circle cx="70" cy="220" r="24"/><circle cx="140" cy="210" r="21"/><circle cx="210" cy="225" r="25"/><circle cx="280" cy="215" r="23"/><circle cx="350" cy="220" r="22"/><circle cx="420" cy="210" r="24"/><circle cx="490" cy="230" r="23"/><circle cx="90" cy="300" r="22"/><circle cx="170" cy="295" r="25"/><circle cx="250" cy="305" r="23"/><circle cx="330" cy="290" r="21"/><circle cx="410" cy="310" r="24"/><circle cx="490" cy="300" r="22"/></g><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FFFFFF" font-weight="bold">SAMPLE #CA-10MM (CHIPPING STONE)</text></svg>`,
    qualityScore: 91,
    confidence: 93.8,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-coarse-40',
    title: 'Coarse Aggregate (40 mm)',
    category: 'Coarse Aggregate',
    size: '40 mm – Large',
    description: 'Heavy ballast aggregate for granular sub-base (GSB) and wet mix macadam.',
    recommendation: 'Needs Review',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2378716C"/><polygon points="80,60 160,80 180,180 90,160" fill="%2344403C"/><polygon points="240,70 360,50 380,170 230,160" fill="%23292524"/><polygon points="420,90 540,80 520,200 400,180" fill="%2357534E"/><polygon points="110,210 230,220 200,340 70,320" fill="%23292524"/><polygon points="280,210 390,200 410,330 260,320" fill="%2344403C"/><polygon points="440,230 550,220 540,340 420,330" fill="%231C1917"/><circle cx="310" cy="185" r="14" fill="%23B45309" opacity="0.8"/><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FFFFFF" font-weight="bold">SAMPLE #CA-40MM (SUB-BASE BALLAST)</text></svg>`,
    qualityScore: 78,
    confidence: 89.2,
    condition: 'Dusty',
    moisture: 'Dry',
    distribution: 'Mixed Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-coarse-150',
    title: 'Heavy Boulder / Rip-Rap (150 mm)',
    category: 'Coarse Aggregate',
    size: '150 mm – Heavy / Boulder',
    description: 'Heavy pitching stone and granular sub-base boulder (150 mm) for road embankment and subgrade stabilization.',
    recommendation: 'Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2352525B"/><polygon points="40,50 180,30 220,190 60,210" fill="%2327272A"/><polygon points="260,40 450,20 490,200 280,180" fill="%233F3F46"/><polygon points="80,240 280,210 240,380 50,350" fill="%2318181B"/><polygon points="320,220 540,190 560,370 310,360" fill="%2327272A"/><circle cx="270" cy="180" r="30" fill="%2371717A" opacity="0.4"/><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FFFFFF" font-weight="bold">SAMPLE #CA-150MM (HEAVY BOULDER / RIP-RAP)</text></svg>`,
    qualityScore: 93,
    confidence: 95.4,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-sand',
    title: 'Fine Aggregate / River Sand',
    category: 'Fine Aggregate / Sand',
    size: 'Zone II (Fine)',
    description: 'Graded river sand for cement mortar and asphalt mastic matrix.',
    recommendation: 'Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><radialGradient id="sandG" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="%23FBBF24"/><stop offset="50%" stop-color="%23D97706"/><stop offset="100%" stop-color="%2392400E"/></radialGradient></defs><rect width="600" height="400" fill="url(%23sandG)"/><g opacity="0.35" fill="%23451A03"><circle cx="40" cy="50" r="3"/><circle cx="120" cy="80" r="4"/><circle cx="200" cy="40" r="2"/><circle cx="280" cy="90" r="3"/><circle cx="360" cy="50" r="4"/><circle cx="440" cy="80" r="2"/><circle cx="520" cy="40" r="3"/><circle cx="60" cy="160" r="3"/><circle cx="150" cy="140" r="4"/><circle cx="240" cy="180" r="2"/><circle cx="330" cy="150" r="3"/><circle cx="420" cy="170" r="4"/><circle cx="500" cy="140" r="3"/><circle cx="80" cy="270" r="4"/><circle cx="170" cy="250" r="3"/><circle cx="260" cy="280" r="2"/><circle cx="350" cy="260" r="4"/><circle cx="440" cy="290" r="3"/><circle cx="530" cy="260" r="2"/></g><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FFFFFF" font-weight="bold">SAMPLE #FA-RIVER-SAND (ZONE II)</text></svg>`,
    qualityScore: 95,
    confidence: 97.1,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-bitumen',
    title: 'Bitumen Binder (VG-30)',
    category: 'Bitumen',
    size: 'Viscous Binder',
    description: 'Viscosity Grade VG-30 paving bitumen for heavy-traffic national highway surfacing.',
    recommendation: 'Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2318181B"/><path d="M0 220 Q 150 170 300 230 T 600 210 L 600 400 L 0 400 Z" fill="%2309090B"/><ellipse cx="300" cy="160" rx="200" ry="40" fill="%2327272A" opacity="0.7"/><path d="M120 180 C 180 130 400 130 480 180" stroke="%233F3F46" stroke-width="8" fill="none" opacity="0.4"/><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23A1A1AA" font-weight="bold">SAMPLE #BIT-VG30 (PAVING GRADE)</text></svg>`,
    qualityScore: 96,
    confidence: 98.2,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent'
  },
  {
    id: 'sample-soil',
    title: 'Subgrade Soil (In-Situ)',
    category: 'Soil',
    size: 'Fine Silty Clay',
    description: 'Subgrade embankment soil undergoing CBR compaction & moisture testing.',
    recommendation: 'Not Suitable for Use',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23854D0E"/><path d="M50 80 Q 200 40 380 90 T 550 80" stroke="%23713F12" stroke-width="12" fill="none"/><path d="M80 190 Q 280 230 480 170" stroke="%23713F12" stroke-width="16" fill="none"/><circle cx="220" cy="140" r="16" fill="%231E3A8A" opacity="0.6"/><circle cx="390" cy="240" r="22" fill="%231E3A8A" opacity="0.7"/><polygon points="120,240 140,290 100,270" fill="%23064E3B"/><circle cx="480" cy="290" r="12" fill="%23DC2626"/><text x="20" y="380" font-family="sans-serif" font-size="16" fill="%23FEF08A" font-weight="bold">SAMPLE #SOIL-SUBGRADE (WET / DEBRIS PRESENT)</text></svg>`,
    qualityScore: 48,
    confidence: 91.5,
    condition: 'Dusty',
    moisture: 'Wet',
    distribution: 'Mixed Size',
    foreignObjects: 'Present'
  }
];

export const MATERIAL_CLASSES = [
  { id: 'cement', name: 'Cement', color: '#6B7280', description: 'Ordinary Portland Cement (OPC 43/53) & PPC binding agent' },
  { id: 'fine_aggregate', name: 'Fine Aggregate / Sand', color: '#D9A441', description: 'Zone II River Sand / Manufactured M-Sand' },
  { id: 'coarse_aggregate', name: 'Coarse Aggregate', color: '#4A6FA5', description: 'Crushed granite & basalt stone in 10mm, 20mm, 40mm, 150mm' },
  { id: 'bitumen', name: 'Bitumen', color: '#2B2F36', description: 'Viscosity grade VG-10, VG-30, VG-40 paving binder' },
  { id: 'soil', name: 'Soil', color: '#854D0E', description: 'Subgrade filling earth, gravel, and granular sub-base' }
];

export const AGGREGATE_SIZES = [
  { id: '10mm', label: 'Small – 10 mm', code: '10 mm', purpose: 'Surface dressing, chip seals, and micro-surfacing wearing layer' },
  { id: '20mm', label: 'Medium – 20 mm', code: '20 mm', purpose: 'Dense Bituminous Macadam (DBM) and structural pavement courses' },
  { id: '40mm', label: 'Large – 40 mm', code: '40 mm', purpose: 'Granular Sub-Base (GSB), wet mix macadam, and track ballast' },
  { id: '150mm', label: 'Heavy – 150 mm', code: '150 mm', purpose: 'Subgrade boulder, pitching stone, rip-rap & 150 mm lab specimen core' }
];

export const QUALITY_CRITERIA = [
  { key: 'condition', label: 'Visual Condition', passVal: 'Clean', failVal: 'Dusty', passDesc: 'Free from surface silts and deleterious coatings' },
  { key: 'moisture', label: 'Moisture State', passVal: 'Dry', failVal: 'Wet', passDesc: 'Moisture content < 2.0% for immediate hot-mix application' },
  { key: 'distribution', label: 'Size Uniformity', passVal: 'Uniform Size', failVal: 'Mixed Size', passDesc: 'Flakiness and Elongation Index compliant (< 15%)' },
  { key: 'foreignObjects', label: 'Foreign Objects', passVal: 'Absent', failVal: 'Present', passDesc: 'Zero vegetative organics, clay lumps, or plastic debris' }
];

// Initial realistic historical inspection records
export const INITIAL_HISTORY = [
  {
    id: 'INS-2026-0891',
    timestamp: '2026-09-15 14:32',
    date: 'Sep 15, 2026',
    material: 'Coarse Aggregate',
    confidence: 96.4,
    size: '20 mm – Medium',
    qualityScore: 94,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent',
    recommendation: 'Suitable for Use',
    batchNo: 'PKG-NH48-B3-441',
    inspector: 'Er. R. Sharma (QA/QC)',
    location: 'Chainage 142+500, Sector 4',
    standard: 'MoRTH Section 500 / IRC:111'
  },
  {
    id: 'INS-2026-0890',
    timestamp: '2026-09-15 11:15',
    date: 'Sep 15, 2026',
    material: 'Fine Aggregate / Sand',
    confidence: 97.1,
    size: 'Zone II (Fine)',
    qualityScore: 95,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent',
    recommendation: 'Suitable for Use',
    batchNo: 'SAND-RIV-890',
    inspector: 'Er. K. Mehta',
    location: 'Batching Plant Yard 2',
    standard: 'IS 383:2016'
  },
  {
    id: 'INS-2026-0889',
    timestamp: '2026-09-14 16:40',
    date: 'Sep 14, 2026',
    material: 'Coarse Aggregate',
    confidence: 89.2,
    size: '40 mm – Large',
    qualityScore: 78,
    condition: 'Dusty',
    moisture: 'Dry',
    distribution: 'Mixed Size',
    foreignObjects: 'Absent',
    recommendation: 'Needs Review',
    batchNo: 'AGG-GSB-102',
    inspector: 'Er. R. Sharma (QA/QC)',
    location: 'Quarry Stockpile A',
    standard: 'MoRTH Section 400'
  },
  {
    id: 'INS-2026-0888',
    timestamp: '2026-09-14 10:20',
    date: 'Sep 14, 2026',
    material: 'Bitumen',
    confidence: 98.2,
    size: 'Viscous Binder',
    qualityScore: 96,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent',
    recommendation: 'Suitable for Use',
    batchNo: 'BIT-IOCL-VG30-12',
    inspector: 'Er. P. Varma',
    location: 'Hot Mix Plant 1',
    standard: 'IS 73:2013'
  },
  {
    id: 'INS-2026-0887',
    timestamp: '2026-09-13 15:55',
    date: 'Sep 13, 2026',
    material: 'Soil',
    confidence: 91.5,
    size: 'Fine Silty Clay',
    qualityScore: 48,
    condition: 'Dusty',
    moisture: 'Wet',
    distribution: 'Mixed Size',
    foreignObjects: 'Present',
    recommendation: 'Not Suitable for Use',
    batchNo: 'SUB-BORROW-44',
    inspector: 'Er. K. Mehta',
    location: 'Embankment Km 18+200',
    standard: 'IRC:37-2018'
  },
  {
    id: 'INS-2026-0886',
    timestamp: '2026-09-13 09:10',
    date: 'Sep 13, 2026',
    material: 'Cement',
    confidence: 95.8,
    size: 'Powder (Blaine 340)',
    qualityScore: 92,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent',
    recommendation: 'Suitable for Use',
    batchNo: 'CEM-OPC53-902',
    inspector: 'Er. P. Varma',
    location: 'Silo No. 3 Storage',
    standard: 'IS 269:2015'
  },
  {
    id: 'INS-2026-0885',
    timestamp: '2026-09-12 13:45',
    date: 'Sep 12, 2026',
    material: 'Coarse Aggregate',
    confidence: 93.8,
    size: '10 mm – Small',
    qualityScore: 91,
    condition: 'Clean',
    moisture: 'Dry',
    distribution: 'Uniform Size',
    foreignObjects: 'Absent',
    recommendation: 'Suitable for Use',
    batchNo: 'AGG-CHIP-604',
    inspector: 'Er. R. Sharma (QA/QC)',
    location: 'Surface Dressing Yard',
    standard: 'MoRTH Section 500'
  },
  {
    id: 'INS-2026-0884',
    timestamp: '2026-09-11 17:00',
    date: 'Sep 11, 2026',
    material: 'Coarse Aggregate',
    confidence: 86.3,
    size: '20 mm – Medium',
    qualityScore: 62,
    condition: 'Dusty',
    moisture: 'Wet',
    distribution: 'Mixed Size',
    foreignObjects: 'Present',
    recommendation: 'Not Suitable for Use',
    batchNo: 'AGG-UNWASHED-22',
    inspector: 'Er. K. Mehta',
    location: 'Secondary Feeder B',
    standard: 'MoRTH Section 500'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'REP-2026-0042',
    title: 'MoRTH Section 500 Compliance Audit — Chainage 140 to 145',
    date: 'Sep 15, 2026',
    material: 'Coarse Aggregate (20 mm)',
    samplesCount: 14,
    passRate: '92.8%',
    recommendation: 'Suitable for Use',
    status: 'Approved',
    fileSize: '1.8 MB',
    inspectionBatch: 'PKG-NH48-B3-441'
  },
  {
    id: 'REP-2026-0041',
    title: 'Quality Verification Certificate: Zone II River Sand Intake',
    date: 'Sep 15, 2026',
    material: 'Fine Aggregate / Sand',
    samplesCount: 8,
    passRate: '100%',
    recommendation: 'Suitable for Use',
    status: 'Approved',
    fileSize: '1.2 MB',
    inspectionBatch: 'SAND-RIV-890'
  },
  {
    id: 'REP-2026-0040',
    title: 'Subgrade Embankment Rejection Notice: Borrow Pit #44',
    date: 'Sep 13, 2026',
    material: 'Soil',
    samplesCount: 6,
    passRate: '33.3%',
    recommendation: 'Not Suitable for Use',
    status: 'Rejected',
    fileSize: '2.4 MB',
    inspectionBatch: 'SUB-BORROW-44'
  },
  {
    id: 'REP-2026-0039',
    title: 'Hot Mix Asphalt Bitumen Penetration & Viscosity Report',
    date: 'Sep 14, 2026',
    material: 'Bitumen',
    samplesCount: 12,
    passRate: '100%',
    recommendation: 'Suitable for Use',
    status: 'Approved',
    fileSize: '1.5 MB',
    inspectionBatch: 'BIT-IOCL-VG30-12'
  },
  {
    id: 'REP-2026-0038',
    title: '40mm GSB Aggregate Gradation & Flakiness Inspection',
    date: 'Sep 14, 2026',
    material: 'Coarse Aggregate (40 mm)',
    samplesCount: 10,
    passRate: '70.0%',
    recommendation: 'Needs Review',
    status: 'Under Review',
    fileSize: '1.9 MB',
    inspectionBatch: 'AGG-GSB-102'
  }
];

export const DASHBOARD_STATS = {
  totalAnalyses: 348,
  todayAnalyses: 12,
  suitableRatio: 88.5,
  qualityAlerts: 4,
  averageConfidence: 94.2
};

export const MATERIAL_DISTRIBUTION = [
  { name: 'Coarse Aggregate', count: 142, percentage: 41, color: '#4A6FA5' },
  { name: 'Fine Aggregate', count: 88, percentage: 25, color: '#D9A441' },
  { name: 'Bitumen', count: 48, percentage: 14, color: '#3E7C8C' },
  { name: 'Soil', count: 42, percentage: 12, color: '#854D0E' },
  { name: 'Cement', count: 28, percentage: 8, color: '#6B7280' }
];

export const QUALITY_OVERVIEW_DATA = [
  { name: 'Suitable for Use', value: 308, color: '#5D9C7C' },
  { name: 'Needs Review', value: 26, color: '#D8A657' },
  { name: 'Not Suitable', value: 14, color: '#C4635C' }
];

export const METHODOLOGY_STEPS = [
  { step: 1, title: 'Image Capture', subtitle: 'High-res site or lab camera acquisition', icon: 'Camera' },
  { step: 2, title: 'Preprocessing', subtitle: 'Bilateral filtering & contrast equalization', icon: 'Cpu' },
  { step: 3, title: 'Material Recognition', subtitle: 'CNN / YOLO deep feature classification', icon: 'ScanSearch' },
  { step: 4, title: 'Size Classification', subtitle: 'Sieve mesh projection (10 / 20 / 40 mm)', icon: 'Ruler' },
  { step: 5, title: 'Visual Quality', subtitle: 'Moisture, dust, flakiness & debris detection', icon: 'Eye' },
  { step: 6, title: 'Quality Assessment', subtitle: 'Statistical compliance evaluation', icon: 'ShieldCheck' },
  { step: 7, title: 'Recommendation', subtitle: 'Suitable / Not Suitable engineering decision', icon: 'CheckCircle' }
];
