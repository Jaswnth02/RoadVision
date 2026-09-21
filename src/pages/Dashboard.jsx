import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScanSearch,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Ruler,
  Calendar,
  FileCheck,
  Eye,
  Sliders,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { RecommendationBadge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import CircularProgress from '../components/ui/CircularProgress';
import QualityIndicatorsGrid from '../components/analysis/QualityIndicatorsGrid';
import { getHistory } from '../services/analysisService';
import { DASHBOARD_STATS, MATERIAL_DISTRIBUTION, QUALITY_OVERVIEW_DATA } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);

  useEffect(() => {
    setHistory(getHistory().slice(0, 5));
  }, []);

  const totalAnalyses = 348 + (history.length > 5 ? history.length - 5 : 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Inspection Dashboard"
        subtitle="Monitor real-time road construction materials, aggregate classifications, and quality assessment results."
        actions={
          <Button
            variant="primary"
            icon={ScanSearch}
            onClick={() => navigate('/analysis')}
          >
            Start New Analysis
          </Button>
        }
      />

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyses */}
        <Card className="p-4 bg-white hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider">
              Total Analyses
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal">{totalAnalyses}</span>
            <span className="text-xs font-semibold text-status-success flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12 today
            </span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Recorded across 4 active highway chainages
          </p>
        </Card>

        {/* Materials Detected */}
        <Card className="p-4 bg-white hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider">
              Materials Detected
            </span>
            <div className="w-8 h-8 rounded-xl bg-sand-light text-sand-dark flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal">5 Classes</span>
            <span className="text-xs font-medium text-charcoal-light">MoRTH specs</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Coarse, Fine Sand, Bitumen, Soil, Cement
          </p>
        </Card>

        {/* Suitable Materials */}
        <Card className="p-4 bg-white hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider">
              Suitable Materials
            </span>
            <div className="w-8 h-8 rounded-xl bg-status-success-light text-status-success-text flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-status-success-text">88.5%</span>
            <span className="text-xs font-medium text-status-success">308 compliant</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Conforms to IRC:111-2009 gradation limits
          </p>
        </Card>

        {/* Quality Alerts */}
        <Card className="p-4 bg-white hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider">
              Quality Alerts
            </span>
            <div className="w-8 h-8 rounded-xl bg-status-warning-light text-status-warning-text flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-status-warning-text">4 Batches</span>
            <span className="text-xs font-medium text-status-warning">Needs Review</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Flagged for moisture & excess fines
          </p>
        </Card>
      </div>

      {/* Quick Analysis Hero CTA & System Status Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary-light/40 via-white to-surface-muted border-primary/20 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" dot size="sm">
                Real-Time AI Pipeline
              </Badge>
              <span className="text-xs text-charcoal-light">
                YOLOv8 + Custom Classification Head
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-charcoal tracking-tight">
              Automated Road Construction Material & Aggregate Sizing
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-light mt-2 max-w-xl leading-relaxed">
              Upload site imagery or live lab captures to identify base materials, estimate sieve gradation (10 mm / 20 mm / 40 mm), and verify visual purity against national highway specifications.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <Button
              variant="primary"
              size="md"
              icon={ScanSearch}
              onClick={() => navigate('/analysis')}
            >
              Start New Analysis
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={ArrowUpRight}
              onClick={() => navigate('/history')}
            >
              Browse History
            </Button>
          </div>
        </Card>

        {/* Small System Status Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                System Diagnostics
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal-light">Vision Model</span>
                <span className="font-semibold text-charcoal font-mono">ResNet-50 / YOLO</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal-light">Inference Latency</span>
                <span className="font-semibold text-status-success font-mono">~240 ms (est.)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal-light">Inspection Standard</span>
                <span className="font-semibold text-charcoal">MoRTH Sec 500</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal-light">Mean Confidence</span>
                <span className="font-semibold text-primary font-mono">94.2%</span>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-surface-border flex items-center justify-between">
            <span className="text-[11px] text-charcoal-light">Status: Ready for Analysis</span>
            <Badge variant="success" size="sm">Operational</Badge>
          </div>
        </Card>
      </div>

      {/* Visual Charts: Material Distribution & Quality Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Material Distribution (Bar Chart) */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Material Distribution</CardTitle>
              <CardDescription>
                Classification counts across surveyed highway material batches (Mock Data)
              </CardDescription>
            </div>
            <Badge variant="neutral" size="sm">5 Classes</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MATERIAL_DISTRIBUTION}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-charcoal text-white p-2.5 rounded-xl text-xs shadow-soft-md">
                            <p className="font-bold">{data.name}</p>
                            <p className="text-gray-300">Batches: {data.count} ({data.percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {MATERIAL_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quality Overview (Pie Chart / Breakdown) */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Quality Compliance Overview</CardTitle>
              <CardDescription>
                Quality assessment decisions based on visual indicators (Mock Data)
              </CardDescription>
            </div>
            <Badge variant="success" size="sm">88.5% Pass</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 h-64">
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={QUALITY_OVERVIEW_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {QUALITY_OVERVIEW_DATA.map((entry, index) => (
                        <Cell key={`slice-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-charcoal text-white p-2 rounded-lg text-xs shadow-soft">
                              <span className="font-bold">{data.name}: </span>
                              <span>{data.value} samples</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 pr-2">
                {QUALITY_OVERVIEW_DATA.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-charcoal font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-charcoal">{item.value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-surface-border text-[11px] text-charcoal-light">
                  Criteria: Surface moisture, silt fines, flakiness, and foreign inclusions.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analysis List */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Material Inspections</CardTitle>
            <CardDescription>
              Latest computer vision analysis runs and quality determinations
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/history')}
          >
            View All History
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-surface-border text-charcoal-light uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Sample ID</th>
                <th className="px-5 py-3">Material</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Aggregate Size</th>
                <th className="px-5 py-3">Quality Score</th>
                <th className="px-5 py-3">Recommendation</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {history.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-surface-muted/50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono font-medium text-charcoal">
                    {row.id}
                    <span className="block text-[10px] text-charcoal-light font-sans font-normal">
                      {row.date}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-charcoal">
                    {row.material}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{row.confidence}%</span>
                      <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${row.confidence}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-charcoal-muted">
                    {row.size || 'N/A'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`font-bold ${
                        row.qualityScore >= 85
                          ? 'text-status-success-text'
                          : row.qualityScore >= 70
                          ? 'text-status-warning-text'
                          : 'text-status-error-text'
                      }`}
                    >
                      {row.qualityScore} / 100
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <RecommendationBadge recommendation={row.recommendation} size="sm" />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedInspection(row)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Inspection View Modal */}
      {selectedInspection && (
        <Modal
          isOpen={!!selectedInspection}
          onClose={() => setSelectedInspection(null)}
          title={`Inspection Details — ${selectedInspection.id}`}
          subtitle={`${selectedInspection.date} • ${selectedInspection.location || 'Field Laboratory'}`}
          maxWidth="max-w-2xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedInspection(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  navigate('/results', { state: { result: selectedInspection } });
                }}
              >
                Open Full Results
              </Button>
            </>
          }
        >
          <div className="space-y-5">
            {/* Top row with circular score and high level badges */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-surface-subtle border border-surface-border">
              <CircularProgress
                score={selectedInspection.qualityScore}
                size={90}
                strokeWidth={8}
                label="Compliance Score"
              />
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-base font-bold text-charcoal">
                    {selectedInspection.material}
                  </span>
                  <RecommendationBadge recommendation={selectedInspection.recommendation} />
                </div>
                <p className="text-xs text-charcoal-light">
                  Batch: <span className="font-mono text-charcoal font-medium">{selectedInspection.batchNo || 'N/A'}</span> • Standard: <span className="text-charcoal font-medium">{selectedInspection.standard || 'MoRTH Sec 500'}</span>
                </p>
                <div className="text-xs text-charcoal-muted pt-1">
                  AI Confidence: <strong className="text-primary font-mono">{selectedInspection.confidence}%</strong> • Sieve Category: <strong className="text-charcoal">{selectedInspection.size}</strong>
                </div>
              </div>
            </div>

            {/* Quality Indicators Grid */}
            <div>
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2.5">
                Visual Quality Assessment Indicators
              </h4>
              <QualityIndicatorsGrid
                condition={selectedInspection.condition}
                moisture={selectedInspection.moisture}
                distribution={selectedInspection.distribution}
                foreignObjects={selectedInspection.foreignObjects}
              />
            </div>

            {/* Engineering Inspection Notes */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-surface-border text-xs text-charcoal-muted leading-relaxed">
              <strong className="text-charcoal block mb-1">Field Assessment Remarks:</strong>
              {selectedInspection.notes ||
                'Visual texture confirmed regular aggregate angularity. Sample passed flakiness index limits and is compliant for hot mix bituminous courses.'}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
