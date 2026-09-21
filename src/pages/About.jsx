import React from 'react';
import {
  Info,
  Layers,
  Cpu,
  ShieldCheck,
  Code2,
  FileCheck,
  Target,
  Sparkles,
  Server,
  Database,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import WorkflowStepper from '../components/analysis/WorkflowStepper';

export default function About() {
  const objectives = [
    'Automated material identification across 5 key road construction classes (Cement, Sand, Coarse Aggregate, Bitumen, Soil).',
    'Real-time coarse aggregate sieve classification into standardized 10 mm, 20 mm, and 40 mm sizing categories.',
    'Objective visual quality assessment evaluating surface dust coating, moisture content, flakiness index, and foreign debris.',
    'Generation of compliant engineering suitability recommendations (Suitable for Use vs Not Suitable) per MoRTH and IRC:111 guidelines.',
    'Elimination of human subjectivity, sampling delays, and hazardous on-site manual sieve shaker inspections.',
  ];

  const outcomes = [
    'High-speed quality assessment in under 500ms per frame, enabling continuous conveyor and truck-intake monitoring.',
    'Consistent, non-subjective compliance scoring minimizing early pavement distress, cracking, and pothole formation.',
    'Verifiable digital audit trails and batch inspection certificates for quality assurance and regulatory review.',
    'Extensible modular architecture ready for embedded roadside cameras or lab-based mobile inspection units.',
  ];

  const techStack = {
    frontend: [
      { name: 'React 18 + Vite', desc: 'Modern reactive frontend framework with lightning-fast bundling' },
      { name: 'Tailwind CSS', desc: 'Laboratory-grade design system with custom mild theme tokens' },
      { name: 'React Router v6', desc: 'Client-side routing across all project inspection views' },
      { name: 'Lucide React', desc: 'Clean, modern iconography for technical components' },
      { name: 'Recharts', desc: 'Data visualization for material distribution and compliance rates' },
    ],
    backendPlanned: [
      { name: 'Python 3.10+', desc: 'Core programming environment for computer vision and AI modeling' },
      { name: 'YOLOv8 / Faster R-CNN', desc: 'Deep object detection model for aggregate particle segmentation' },
      { name: 'OpenCV', desc: 'Image preprocessing, bilateral noise reduction, and pixel-scale calipers' },
      { name: 'TensorFlow / PyTorch', desc: 'Deep learning frameworks for material feature representation' },
      { name: 'FastAPI / Flask', desc: 'High-performance REST API serving POST /api/analyze endpoints' },
      { name: 'MySQL / SQLite', desc: 'Relational storage for batch histories, inspector logs, and audit trails' },
      { name: 'Docker & Google Colab', desc: 'Model containerization and GPU cloud training pipeline' },
    ],
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <PageHeader
        title="About RoadVision AI"
        subtitle="An AI-Driven Computer Vision Framework for Automated Real-Time Road Construction Material Recognition and Aggregate Size Classification for Quality Assessment."
        badge={<Badge variant="primary" dot size="sm">Academic Mini-Project</Badge>}
      />

      {/* Project Overview */}
      <Card className="p-6 bg-gradient-to-br from-primary-light/30 via-white to-surface-muted border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="neutral" size="sm">Project Overview</Badge>
          <span className="text-xs text-charcoal-light">Civil Engineering & AI Interdisciplinary Framework</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
          Automating Road Construction Quality Control with Computer Vision
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-light mt-3 leading-relaxed max-w-4xl">
          Highway longevity and structural safety fundamentally depend on the quality of base construction materials. <strong>RoadVision AI</strong> applies state-of-the-art deep learning and digital image processing to provide real-time, non-destructive recognition of paving materials, automated classification of coarse aggregate dimensions, and instant visual quality certification prior to hot-mix or concrete batching.
        </p>
      </Card>

      {/* Problem Statement & Objectives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-status-warning" />
              <CardTitle>Problem Statement</CardTitle>
            </div>
            <CardDescription>
              Shortcomings and failure points of conventional quality assurance methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            <p>
              Traditional quality assurance at road construction sites relies heavily on manual visual inspections, manual sieve shaker sieving, and periodic destructive laboratory sampling.
            </p>
            <div className="space-y-2 p-3 bg-surface-subtle rounded-xl border border-surface-border text-xs">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-error mt-1.5 flex-shrink-0" />
                <span><strong>Time-Consuming & Delayed:</strong> Manual mechanical sieve analysis takes hours, leading to batches being used before test results are finalized.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-error mt-1.5 flex-shrink-0" />
                <span><strong>Subjective & Inconsistent:</strong> Visual assessments of dust coating, moisture, and gradation vary widely between field technicians.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-error mt-1.5 flex-shrink-0" />
                <span><strong>Severe Pavement Failure Risks:</strong> Substandard aggregates lead to stripping, rutting, potholes, and premature highway deterioration.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>Research Objectives</CardTitle>
            </div>
            <CardDescription>
              Core targets of this AI-driven automated inspection framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Proposed 7-Step Methodology */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Proposed 7-Step Technical Methodology</CardTitle>
              <CardDescription>
                Systematic computer vision workflow from optical capture to engineering recommendation
              </CardDescription>
            </div>
            <Badge variant="primary" size="sm">End-to-End Pipeline</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <WorkflowStepper currentStep={7} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">1. Image Capture</span>
              <p className="text-charcoal-light">Optical acquisition via site cameras or lab imaging boxes under calibrated illumination.</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">2. Preprocessing</span>
              <p className="text-charcoal-light">Grayscale conversion, bilateral smoothing for noise, and CLAHE contrast enhancement.</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">3. Material Recognition</span>
              <p className="text-charcoal-light">Convolutional neural network extracts texture and spectral signatures to identify material class.</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">4. Aggregate Sizing</span>
              <p className="text-charcoal-light">Contour segmentation and major/minor caliper projection classify particles into 10/20/40 mm.</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">5. Visual Quality</span>
              <p className="text-charcoal-light">Detection of surface silt dust coating, moisture sheen, flakiness index, and foreign matter.</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
              <span className="font-bold text-charcoal block mb-1">6 & 7. Assessment & Decision</span>
              <p className="text-charcoal-light">Composite scoring (0-100) and regulatory verification for Suitable vs Not Suitable decision.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle>Expected Project Outcomes</CardTitle>
          <CardDescription>Measurable benefits for civil highway construction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-surface-muted border border-surface-border flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-sand mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-charcoal leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack Cards: Frontend Implemented vs Backend Planned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Frontend Architecture */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <CardTitle>Frontend Architecture</CardTitle>
            </div>
            <Badge variant="success" size="sm">Fully Implemented</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {techStack.frontend.map((item) => (
              <div key={item.name} className="p-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs flex justify-between items-center">
                <strong className="text-charcoal font-semibold">{item.name}</strong>
                <span className="text-charcoal-light text-[11px] text-right max-w-xs">{item.desc}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Backend & Planned Pipeline */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-sand-dark" />
              <CardTitle>Backend & Planned Pipeline</CardTitle>
            </div>
            <Badge variant="warning" size="sm">Planned / Demo Mode</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {techStack.backendPlanned.map((item) => (
              <div key={item.name} className="p-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs flex justify-between items-center">
                <strong className="text-charcoal font-semibold">{item.name}</strong>
                <span className="text-charcoal-light text-[11px] text-right max-w-xs">{item.desc}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
