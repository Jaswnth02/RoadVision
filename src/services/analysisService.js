// RoadVision AI — Analysis & Data Service Layer
// Clean abstraction ready to swap with FastAPI / Flask (POST /api/analyze)

import { INITIAL_HISTORY, INITIAL_REPORTS, SAMPLE_IMAGES } from '../data/mockData';

const HISTORY_STORAGE_KEY = 'roadvision_history_v1';
const SETTINGS_STORAGE_KEY = 'roadvision_settings_v1';
const REPORTS_STORAGE_KEY = 'roadvision_reports_v1';

// Default configuration settings
export const DEFAULT_SETTINGS = {
  appName: 'RoadVision AI',
  confidenceThreshold: 85,
  defaultStandard: 'MoRTH Section 500 (Indian Roads Congress)',
  autoSaveAnalysis: true,
  simulatePipelineDelay: true,
  layoutDensity: 'comfortable',
  themeMode: 'light',
  backendStatus: 'Demo Mode (Local CV Emulator)'
};

/**
 * Get saved history from localStorage or fallback to initial records
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Failed reading history from localStorage', e);
  }
  return [...INITIAL_HISTORY];
}

/**
 * Save new analysis record to localStorage history
 */
export function saveAnalysis(record) {
  try {
    const current = getHistory();
    const updated = [record, ...current.filter(item => item.id !== record.id)];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed saving analysis to localStorage', e);
    return [record, ...INITIAL_HISTORY];
  }
}

/**
 * Delete an analysis record
 */
export function deleteHistoryItem(id) {
  try {
    const current = getHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed deleting history item', e);
    return [];
  }
}

/**
 * Get reports list
 */
export function getReports() {
  try {
    const data = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Failed reading reports', e);
  }
  return [...INITIAL_REPORTS];
}

/**
 * Get user settings
 */
export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch (e) {
    console.warn('Failed reading settings', e);
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * Save user settings
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed saving settings', e);
  }
}

/**
 * Core analysis engine abstraction
 * Simulates the 7-step computer vision pipeline:
 * 1. Image Capture -> 2. Preprocessing -> 3. Material Recognition
 * -> 4. Aggregate Size -> 5. Visual Quality -> 6. Quality Assessment -> 7. Recommendation
 */
export async function analyzeMaterialImage(imagePayload, options = {}, onStepProgress = null) {
  const steps = [
    { step: 1, label: 'Validating Image Capture and Sensor Metadata...' },
    { step: 2, label: 'Running Bilateral Filter & Contrast Normalization...' },
    { step: 3, label: 'Extracting Feature Maps via Deep CNN / YOLO...' },
    { step: 4, label: 'Classifying Aggregate Sieve Projection (10/20/40 mm)...' },
    { step: 5, label: 'Assessing Moisture, Dust Coating, and Foreign Particles...' },
    { step: 6, label: 'Evaluating Statistical Quality Score against MoRTH/IRC...' },
    { step: 7, label: 'Synthesizing Final Compliance Recommendation...' }
  ];

  const delayTime = options.fast ? 150 : 350;

  for (let i = 0; i < steps.length; i++) {
    if (onStepProgress) {
      onStepProgress(steps[i].step, steps[i].label);
    }
    await new Promise(resolve => setTimeout(resolve, delayTime));
  }

  // Determine realistic mock response
  // If matched with a sample preset, return high-fidelity data
  const sampleMatch = SAMPLE_IMAGES.find(s => s.id === options.sampleId || s.title === options.sampleTitle);

  const timestamp = new Date();
  const dateFormatted = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeFormatted = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  if (sampleMatch) {
    const isSuitable = sampleMatch.recommendation === 'Suitable for Use';
    const isReview = sampleMatch.recommendation === 'Needs Review';
    return {
      id: `INS-2026-${randomSuffix}`,
      timestamp: `${dateFormatted} ${timeFormatted}`,
      date: dateFormatted,
      time: timeFormatted,
      material: sampleMatch.category,
      confidence: sampleMatch.confidence,
      confidenceDecimal: (sampleMatch.confidence / 100).toFixed(3),
      size: sampleMatch.size,
      sizeCategory: sampleMatch.size.includes('10') ? 'Small (10 mm)' : sampleMatch.size.includes('20') ? 'Medium (20 mm)' : sampleMatch.size.includes('40') ? 'Large (40 mm)' : 'Graded Matrix',
      condition: sampleMatch.condition,
      moisture: sampleMatch.moisture,
      distribution: sampleMatch.distribution,
      foreignObjects: sampleMatch.foreignObjects,
      qualityScore: sampleMatch.qualityScore,
      recommendation: sampleMatch.recommendation,
      batchNo: `BATCH-CV-${randomSuffix}`,
      inspector: 'Er. R. Sharma (QA/QC Lead)',
      location: 'Field Laboratory Km 142+500',
      standard: 'MoRTH Section 500 / IRC:111-2009',
      notes: isSuitable
        ? 'Aggregate gradation conforms to specification limits. Flakiness index and moisture within allowable thresholds.'
        : isReview
        ? 'Minor dust film observed on aggregate facets. Recommend secondary washing prior to hot-mix batching.'
        : 'Excessive moisture and organic foreign particles detected. Reject batch per specification IRC:111.',
      imageUrl: sampleMatch.svg,
      isDemoPreset: true
    };
  }

  // Generic upload fallback
  const isGoodQuality = Math.random() > 0.15;
  const confidenceVal = Number((91 + Math.random() * 7).toFixed(1));
  const qualityScoreVal = isGoodQuality ? Math.floor(88 + Math.random() * 9) : Math.floor(55 + Math.random() * 20);

  return {
    id: `INS-2026-${randomSuffix}`,
    timestamp: `${dateFormatted} ${timeFormatted}`,
    date: dateFormatted,
    time: timeFormatted,
    material: 'Coarse Aggregate',
    confidence: confidenceVal,
    confidenceDecimal: (confidenceVal / 100).toFixed(3),
    size: '20 mm – Medium',
    sizeCategory: 'Medium (20 mm)',
    condition: isGoodQuality ? 'Clean' : 'Dusty',
    moisture: isGoodQuality ? 'Dry' : 'Wet',
    distribution: isGoodQuality ? 'Uniform Size' : 'Mixed Size',
    foreignObjects: isGoodQuality ? 'Absent' : 'Present',
    qualityScore: qualityScoreVal,
    recommendation: isGoodQuality ? 'Suitable for Use' : 'Not Suitable for Use',
    batchNo: `BATCH-CV-${randomSuffix}`,
    inspector: 'Er. R. Sharma (QA/QC Lead)',
    location: 'Field Laboratory Km 142+500',
    standard: 'MoRTH Section 500 / IRC:111-2009',
    notes: isGoodQuality
      ? 'Vision model confirmed angular crushed aggregate structure with uniform distribution and zero foreign debris.'
      : 'Visual quality check failed due to moisture saturation and fine silt dust coating.',
    imageUrl: imagePayload,
    isDemoPreset: false
  };
}
