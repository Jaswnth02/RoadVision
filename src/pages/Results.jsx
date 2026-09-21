import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FileCheck,
  ScanSearch,
  Printer,
  Share2,
  BookmarkPlus,
  ArrowLeft,
  ShieldCheck,
  Ruler,
  AlertTriangle,
  Info,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { RecommendationBadge } from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import CircularProgress from '../components/ui/CircularProgress';
import Alert from '../components/ui/Alert';
import AIInspectionOverlay from '../components/analysis/AIInspectionOverlay';
import AggregateSizeSelector from '../components/analysis/AggregateSizeSelector';
import QualityIndicatorsGrid from '../components/analysis/QualityIndicatorsGrid';

import { getHistory, saveAnalysis } from '../services/analysisService';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve result passed from Analysis or fall back to most recent historical record
  const initialData = location.state?.result || getHistory()[0] || {
    id: 'INS-2026-0891',
    timestamp: '2026-09-15 14:32',
    date: 'Sep 15, 2026',
    time: '14:32',
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
    standard: 'MoRTH Section 500 / IRC:111',
    notes: 'Aggregate gradation conforms to specification limits. Flakiness index and moisture within allowable thresholds.',
  };

  const [result, setResult] = useState(initialData);
  const [showOverlay, setShowOverlay] = useState(true);
  const [savedAlert, setSavedAlert] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToHistory = () => {
    saveAnalysis(result);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3500);
  };

  const handleUpdateResultSize = (newSizeCode) => {
    const is150 = newSizeCode.includes('150');
    const is40 = newSizeCode.includes('40');
    const is10 = newSizeCode.includes('10');
    const is20 = newSizeCode.includes('20');

    let newSize = newSizeCode;
    let newCategory = 'Graded Matrix';
    let newStandard = result.standard;
    let newNotes = result.notes;

    if (is150) {
      newSize = '150 mm – Heavy / Boulder';
      newCategory = 'Heavy / Boulder (150 mm)';
      newStandard = 'MoRTH Section 300 / IRC:75-2015';
      newNotes =
        '150 mm heavy pitching aggregate / subgrade boulder conforms to MoRTH Section 300 & IRC:75 compaction and rock fill standards.';
    } else if (is40) {
      newSize = '40 mm – Large';
      newCategory = 'Large (40 mm)';
      newStandard = 'MoRTH Section 400 / IRC:109';
      newNotes =
        '40 mm ballast aggregate conforms to Granular Sub-Base (GSB) and Wet Mix Macadam (WMM) specifications.';
    } else if (is10) {
      newSize = '10 mm – Small';
      newCategory = 'Small (10 mm)';
      newStandard = 'MoRTH Section 500 / IRC:110';
      newNotes =
        '10 mm chipping stone conforms to surface dressing, chip seal, and micro-surfacing wearing layer requirements.';
    } else if (is20) {
      newSize = '20 mm – Medium';
      newCategory = 'Medium (20 mm)';
      newStandard = 'MoRTH Section 500 / IRC:111-2009';
      newNotes =
        '20 mm aggregate gradation conforms to Dense Bituminous Macadam (DBM) and asphaltic concrete limits.';
    }

    const updated = {
      ...result,
      size: newSize,
      sizeCategory: newCategory,
      standard: newStandard,
      notes: newNotes,
    };
    setResult(updated);
    saveAnalysis(updated);
  };

  const isSuitable = result.recommendation?.toLowerCase().includes('suitable') && !result.recommendation?.toLowerCase().includes('not');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Analysis Results"
        subtitle={`Complete computer vision assessment and engineering suitability certification for ${result.material}.`}
        badge={
          <RecommendationBadge recommendation={result.recommendation} size="md" />
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/analysis')}
            >
              Back to Analysis
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={BookmarkPlus}
              onClick={handleSaveToHistory}
            >
              Save to History
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print Certificate
            </Button>
          </>
        }
      />

      {savedAlert && (
        <Alert
          type="success"
          title="Record Updated"
          onClose={() => setSavedAlert(false)}
        >
          Inspection record #{result.id} successfully saved to local records.
        </Alert>
      )}

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Large Image Preview with Toggleable AI Inspection Overlay */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Inspected Material Sample</CardTitle>
                <CardDescription>Sample #{result.id} • {result.date}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOverlay(!showOverlay)}
              >
                {showOverlay ? 'Hide CV Overlay' : 'Show CV Overlay'}
              </Button>
            </CardHeader>

            <CardContent className="p-4">
              <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-square flex items-center justify-center border border-surface-border shadow-inner">
                {result.imageUrl ? (
                  <img
                    src={result.imageUrl}
                    alt={result.material}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                    <Layers className="w-12 h-12 mb-2 text-gray-500" />
                    <span className="text-xs font-mono">Sample Image Record</span>
                  </div>
                )}

                <AIInspectionOverlay
                  active={showOverlay}
                  material={result.material}
                  confidence={result.confidence}
                  size={result.size}
                  quality={result.recommendation}
                />
              </div>

              {/* Sample Metadata Metadata Strip */}
              <div className="mt-4 p-3.5 rounded-xl bg-surface-subtle border border-surface-border text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Inspection Batch ID:</span>
                  <span className="font-mono font-semibold text-charcoal">{result.batchNo || 'BATCH-CV-092'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Standard Specification:</span>
                  <span className="font-semibold text-charcoal">{result.standard || 'MoRTH Section 500'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Lead QA Inspector:</span>
                  <span className="text-charcoal">{result.inspector || 'Er. R. Sharma (QA/QC)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Survey Location:</span>
                  <span className="text-charcoal">{result.location || 'Field Laboratory Km 142+500'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Confidence Breakdown Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AI Confidence Distribution</span>
              </span>
              <span className="text-xs font-mono font-bold text-primary">
                {result.confidence}%
              </span>
            </div>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-charcoal">{result.material} (Primary Match)</span>
                  <span className="font-bold text-primary">{result.confidence}%</span>
                </div>
                <ProgressBar value={result.confidence} color="primary" size="sm" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 text-charcoal-light">
                  <span>Fine Sand / Aggregate Slag (Secondary)</span>
                  <span>{(100 - result.confidence).toFixed(1)}%</span>
                </div>
                <ProgressBar value={100 - result.confidence} color="sand" size="sm" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: 4-Tier Inspection Cards */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tier 1: Material Recognition */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>1. Material Recognition Classification</CardTitle>
                <CardDescription>Deep convolutional visual feature extraction</CardDescription>
              </div>
              <Badge variant="primary" size="sm">Tier 1 Match</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-subtle border border-surface-border">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                    Identified Class
                  </span>
                  <h3 className="text-xl font-bold text-charcoal mt-0.5">
                    {result.material}
                  </h3>
                  <p className="text-xs text-charcoal-light mt-1">
                    Conforms to Indian Roads Congress (IRC) specified mineral aggregates.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs text-charcoal-light block">Model Confidence</span>
                  <span className="text-2xl font-bold text-primary font-mono">
                    {result.confidence}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tier 2: Aggregate Size Classification */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>2. Aggregate Size Classification</CardTitle>
                <CardDescription>Sieve mesh pixel-scale projection and grading</CardDescription>
              </div>
              <Badge variant="neutral" size="sm">Sieve Gradation</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-charcoal-light">
                  Select sieve / boulder specification to calibrate test record:
                </span>
                <span className="text-[10px] text-primary font-semibold">
                  Click to switch
                </span>
              </div>
              <AggregateSizeSelector
                selectedSize={result.size}
                interactive={true}
                onSelectSize={handleUpdateResultSize}
              />
            </CardContent>
          </Card>

          {/* Tier 3: Visual Quality Assessment */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>3. Visual Quality Assessment</CardTitle>
                <CardDescription>Moisture, surface silts, uniformity, and foreign contaminants</CardDescription>
              </div>
              <Badge variant="neutral" size="sm">4 Indicators</Badge>
            </CardHeader>
            <CardContent>
              <QualityIndicatorsGrid
                condition={result.condition}
                moisture={result.moisture}
                distribution={result.distribution}
                foreignObjects={result.foreignObjects}
              />
            </CardContent>
          </Card>

          {/* Tier 4: Final Quality Score & Recommendation */}
          <Card className="border-primary/20 bg-gradient-to-br from-white to-surface-subtle">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>4. Final Assessment & Engineering Recommendation</CardTitle>
                <CardDescription>Synthesized decision for road pavement construction</CardDescription>
              </div>
              <RecommendationBadge recommendation={result.recommendation} size="md" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-white border border-surface-border">
                <CircularProgress
                  score={result.qualityScore}
                  size={110}
                  strokeWidth={9}
                  label="Quality Score"
                />

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-base font-bold text-charcoal">
                      Decision: {result.recommendation}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-light leading-relaxed">
                    {result.notes ||
                      'Material exhibits optimal gradation and surface cleanliness. Cleared for Dense Bituminous Macadam (DBM) batching per MoRTH Section 500 standards.'}
                  </p>
                  <div className="text-[11px] font-mono text-charcoal-muted pt-1">
                    Compliance Certificate: <span className="font-semibold text-charcoal">IRC-CERT-{result.id}</span>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Inspection Summary Disclaimer */}
            <CardFooter className="flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-charcoal-light">
                <Info className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Simulated laboratory evaluation (Demo Mode). Ready for Flask/FastAPI backend connection.</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={ScanSearch}
                onClick={() => navigate('/analysis')}
              >
                Analyze Another
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
