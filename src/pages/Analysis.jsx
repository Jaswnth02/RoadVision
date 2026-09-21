import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Image as ImageIcon,
  ScanSearch,
  CheckCircle,
  Sparkles,
  RefreshCw,
  X,
  FileCheck,
  Eye,
  Sliders,
  ChevronRight,
  BookmarkPlus,
  AlertCircle,
  FileText,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { RecommendationBadge } from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Alert from '../components/ui/Alert';
import WorkflowStepper from '../components/analysis/WorkflowStepper';
import AIInspectionOverlay from '../components/analysis/AIInspectionOverlay';
import AggregateSizeSelector from '../components/analysis/AggregateSizeSelector';
import QualityIndicatorsGrid from '../components/analysis/QualityIndicatorsGrid';

import { SAMPLE_IMAGES } from '../data/mockData';
import { analyzeMaterialImage, saveAnalysis } from '../services/analysisService';

export default function Analysis() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepMessage, setStepMessage] = useState('Ready for material image acquisition');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [savedNotification, setSavedNotification] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [errorNotice, setErrorNotice] = useState(null);

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    setErrorNotice(null);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorNotice('Invalid file format. Please upload JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorNotice('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setSelectedPresetId(null);
      setAnalysisResult(null);
      setCurrentStep(1);
      setSavedNotification(false);
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  // Select a preset sample
  const handleSelectPreset = (sample) => {
    setErrorNotice(null);
    setSelectedImage(sample.svg);
    setSelectedPresetId(sample.id);
    setAnalysisResult(null);
    setCurrentStep(1);
    setSavedNotification(false);
  };

  // Run the 7-step analysis pipeline
  const handleRunAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSavedNotification(false);

    try {
      const result = await analyzeMaterialImage(
        selectedImage,
        { sampleId: selectedPresetId },
        (step, message) => {
          setCurrentStep(step);
          setStepMessage(message);
        }
      );

      setAnalysisResult(result);
      setCurrentStep(7);

      // Auto save if enabled
      saveAnalysis(result);
    } catch (err) {
      setErrorNotice('Analysis process failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Save explicitly
  const handleSaveExplicitly = () => {
    if (analysisResult) {
      saveAnalysis(analysisResult);
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 4000);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedPresetId(null);
    setAnalysisResult(null);
    setCurrentStep(1);
    setErrorNotice(null);
    setSavedNotification(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Material Analysis"
        subtitle="Upload or capture high-resolution imagery to classify road construction materials, assess aggregate sieve sizing, and verify engineering specifications."
        badge={<Badge variant="primary" dot size="sm">7-Step CV Pipeline</Badge>}
      />

      {/* 7-Step Methodology Stepper */}
      <WorkflowStepper currentStep={currentStep} isAnalyzing={isAnalyzing} />

      {/* Error & Saved Notifications */}
      {errorNotice && (
        <Alert
          type="error"
          title="Validation Notice"
          onClose={() => setErrorNotice(null)}
        >
          {errorNotice}
        </Alert>
      )}

      {savedNotification && (
        <Alert
          type="success"
          title="Analysis Record Saved"
          onClose={() => setSavedNotification(false)}
        >
          Inspection record #{analysisResult?.id} has been saved to your local history and updated in reports.
        </Alert>
      )}

      {/* Main Analysis Workspace: Upload/Preview Left, Action/Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Visual Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Material Image Acquisition</CardTitle>
                <CardDescription>
                  Supported formats: JPG, JPEG, PNG, WEBP (Max 10MB)
                </CardDescription>
              </div>

              {selectedImage && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOverlay(!showOverlay)}
                  >
                    {showOverlay ? 'Hide CV Overlay' : 'Show CV Overlay'}
                  </Button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-surface-muted transition-colors"
                    title="Clear Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              {!selectedImage ? (
                /* Drag & Drop Box */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary bg-primary-light/40'
                      : 'border-surface-border bg-surface-subtle/60 hover:bg-surface-subtle hover:border-gray-300'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-white border border-surface-border mx-auto flex items-center justify-center text-primary shadow-soft-sm mb-4">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-charcoal">
                    Upload Material Image
                  </h4>
                  <p className="text-xs text-charcoal-light mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Drag and drop an image here or <span className="text-primary font-semibold underline">browse from your device</span>
                  </p>
                  <span className="inline-block mt-3 text-[11px] text-gray-400 font-mono">
                    High contrast field or laboratory photo recommended
                  </span>
                </div>
              ) : (
                /* Image Preview with Optional Computer Vision Overlay */
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center border border-surface-border shadow-inner">
                  <img
                    src={selectedImage}
                    alt="Road Material Sample"
                    className="w-full h-full object-cover"
                  />

                  {/* Computer Vision Overlay */}
                  {analysisResult && (
                    <AIInspectionOverlay
                      active={showOverlay}
                      material={analysisResult.material}
                      confidence={analysisResult.confidence}
                      size={analysisResult.size}
                      quality={analysisResult.recommendation}
                    />
                  )}

                  {/* Processing Overlay when analyzing */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in">
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-sand animate-spin mb-4" />
                      <h4 className="text-base font-bold tracking-tight">
                        Analyzing material...
                      </h4>
                      <p className="text-xs text-primary-light mt-1 max-w-xs font-mono">
                        {stepMessage}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            {/* One-Click Demo Sample Presets */}
            <div className="p-4 bg-surface-subtle/50 border-t border-surface-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sand" />
                  <span>One-Click Test Presets</span>
                </span>
                <span className="text-[11px] text-charcoal-light">
                  Click to test standard samples
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_IMAGES.map((sample) => {
                  const isSelected = selectedPresetId === sample.id;
                  return (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectPreset(sample)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'bg-primary-light text-primary-dark border-primary font-semibold ring-1 ring-primary/40'
                          : 'bg-white border-surface-border hover:bg-gray-50 text-charcoal'
                      }`}
                    >
                      <div className="truncate font-medium">{sample.title}</div>
                      <div className="text-[10px] text-charcoal-light truncate">
                        {sample.size}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Execution Control & Live Result Preview */}
        <div className="lg:col-span-5 space-y-4">
          {/* Action Card */}
          <Card>
            <CardHeader>
              <CardTitle>Inference Execution</CardTitle>
              <CardDescription>
                Trigger CNN feature extraction and aggregate sieve measurement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-surface-muted text-xs text-charcoal-muted leading-relaxed space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-charcoal">
                  <span>Inspection Protocol:</span>
                  <span>MoRTH Section 500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Selected Sample:</span>
                  <span className="font-mono text-charcoal">
                    {selectedPresetId ? selectedPresetId : selectedImage ? 'Custom Upload' : 'None Selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pipeline State:</span>
                  <span className="text-primary font-medium">{stepMessage}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ScanSearch}
                  disabled={!selectedImage || isAnalyzing}
                  loading={isAnalyzing}
                  onClick={handleRunAnalysis}
                  className="flex-1"
                >
                  {analysisResult ? 'Re-Analyze Image' : 'Analyze Image'}
                </Button>

                {selectedImage && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    disabled={isAnalyzing}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Result Preview Panel (Displayed after Analyze) */}
          {analysisResult ? (
            <Card className="border-primary/30 shadow-soft animate-in fade-in duration-300">
              <CardHeader className="bg-primary-light/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Analysis Result Preview</CardTitle>
                    <RecommendationBadge
                      recommendation={analysisResult.recommendation}
                      size="sm"
                    />
                  </div>
                  <CardDescription>Sample #{analysisResult.id} • {analysisResult.time}</CardDescription>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  {analysisResult.confidence}% CONF
                </span>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Material & Confidence */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal-light font-medium">Detected Material</span>
                    <span className="font-bold text-charcoal text-sm">{analysisResult.material}</span>
                  </div>
                  <ProgressBar
                    value={analysisResult.confidence}
                    color="primary"
                    size="sm"
                    showLabel
                    labelPrefix="Model Confidence"
                  />
                </div>

                {/* Aggregate Size */}
                <div className="pt-2 border-t border-surface-border">
                  <span className="text-xs font-medium text-charcoal-light block mb-2">
                    Aggregate Size Classification
                  </span>
                  <AggregateSizeSelector selectedSize={analysisResult.size} />
                </div>

                {/* Visual Indicators */}
                <div className="pt-2 border-t border-surface-border">
                  <span className="text-xs font-medium text-charcoal-light block mb-2">
                    Quality Indicators
                  </span>
                  <QualityIndicatorsGrid
                    condition={analysisResult.condition}
                    moisture={analysisResult.moisture}
                    distribution={analysisResult.distribution}
                    foreignObjects={analysisResult.foreignObjects}
                  />
                </div>
              </CardContent>

              {/* Action Buttons */}
              <CardFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ChevronRight}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                  onClick={() => navigate('/results', { state: { result: analysisResult } })}
                >
                  View Full Results
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={BookmarkPlus}
                    onClick={handleSaveExplicitly}
                    className="flex-1 sm:flex-initial"
                  >
                    Save Analysis
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={FileText}
                    onClick={() => navigate('/reports')}
                    className="flex-1 sm:flex-initial"
                  >
                    Reports
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            /* Prompt to begin */
            <Card className="border-dashed p-8 text-center bg-surface-subtle/40">
              <div className="w-10 h-10 rounded-xl bg-white border border-surface-border flex items-center justify-center text-charcoal-light mx-auto mb-2 shadow-soft-sm">
                <ScanSearch className="w-5 h-5 text-primary" />
              </div>
              <h5 className="text-xs font-semibold text-charcoal">
                Awaiting Inspection Trigger
              </h5>
              <p className="text-[11px] text-charcoal-light mt-1 max-w-xs mx-auto">
                Select an image preset above or upload a site capture, then click &quot;Analyze Image&quot; to execute the automated quality evaluation.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
