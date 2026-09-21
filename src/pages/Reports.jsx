import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  ShieldCheck,
  Building,
  Info,
  Layers,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { RecommendationBadge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';

import { getReports } from '../services/analysisService';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleDownload = (report) => {
    setDownloadNotice(
      `Certificate ${report.id} downloaded in demo mode. Full automated server-side PDF generation connects via the FastAPI backend export pipeline.`
    );
    setTimeout(() => setDownloadNotice(null), 5000);
  };

  const handlePrintModal = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Inspection Reports"
        subtitle="Formal quality audit reports, compliance certificates, and laboratory batch evaluations adhering to IRC and MoRTH standards."
        badge={<Badge variant="neutral" size="sm">{reports.length} Audit Reports</Badge>}
      />

      {downloadNotice && (
        <Alert
          type="info"
          title="Demo Report Generation"
          onClose={() => setDownloadNotice(null)}
        >
          {downloadNotice}
        </Alert>
      )}

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider block">
            Total Reports
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-charcoal">{reports.length}</span>
            <span className="text-xs font-medium text-charcoal-light">Audited Batches</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Certified quality reports
          </p>
        </Card>

        <Card className="p-4 bg-white">
          <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider block">
            Suitable Materials
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-status-success-text">3 Batches</span>
            <span className="text-xs font-medium text-status-success">100% Passed</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Cleared for road paving
          </p>
        </Card>

        <Card className="p-4 bg-white">
          <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider block">
            Not Suitable / Review
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-status-warning-text">2 Batches</span>
            <span className="text-xs font-medium text-status-warning">Flagged</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Requires secondary screening
          </p>
        </Card>

        <Card className="p-4 bg-white">
          <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wider block">
            Average Confidence
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">94.8%</span>
            <span className="text-xs font-medium text-primary">CV Accuracy</span>
          </div>
          <p className="text-[11px] text-charcoal-light mt-1">
            Mean model confidence
          </p>
        </Card>
      </div>

      {/* Reports Table Card */}
      <Card className="overflow-hidden">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Batch Inspection Certificates</CardTitle>
            <CardDescription>
              Official verification documents ready for regulatory compliance review
            </CardDescription>
          </div>
          <span className="text-xs text-charcoal-light font-mono">
            Standard: MoRTH Sec 500 / IRC:111
          </span>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-surface-border text-charcoal-light uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">Report ID & Date</th>
                <th className="px-5 py-3.5">Report Title</th>
                <th className="px-5 py-3.5">Material Tested</th>
                <th className="px-5 py-3.5">Pass Rate</th>
                <th className="px-5 py-3.5">Recommendation</th>
                <th className="px-5 py-3.5">Audit Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-surface-muted/50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono font-bold text-charcoal">
                    {report.id}
                    <span className="block text-[10px] text-charcoal-light font-sans font-normal">
                      {report.date}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-charcoal block line-clamp-1">
                      {report.title}
                    </span>
                    <span className="text-[10px] text-charcoal-light font-mono">
                      Batch: {report.inspectionBatch}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-charcoal">
                    {report.material}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-charcoal">
                    {report.passRate}
                    <span className="block text-[10px] font-sans font-normal text-charcoal-light">
                      {report.samplesCount} samples
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <RecommendationBadge recommendation={report.recommendation} size="sm" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={
                        report.status === 'Approved'
                          ? 'success'
                          : report.status === 'Under Review'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {report.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Download}
                        onClick={() => handleDownload(report)}
                      >
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Backend Integration Notice Banner */}
      <Card className="p-4 bg-surface-subtle/70 border-surface-border">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal-light leading-relaxed">
            <strong className="text-charcoal block mb-0.5">Backend Report Integration:</strong>
            These reports reflect realistic frontend demo data conforming to IRC/MoRTH quality guidelines. When connected to the Python/FastAPI backend, the &quot;Download&quot; button will fetch dynamically compiled, high-resolution PDF inspection dossiers with sieve distribution curves and YOLO bounding box annotations.
          </div>
        </div>
      </Card>

      {/* Official Inspection Report Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Audit Certificate — ${selectedReport.id}`}
          subtitle={`${selectedReport.date} • Ministry of Road Transport & Highways Compliant`}
          maxWidth="max-w-3xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Printer}
                onClick={handlePrintModal}
              >
                Print Report
              </Button>
            </>
          }
        >
          {/* Certificate Design */}
          <div className="space-y-6 text-charcoal">
            {/* Header Header */}
            <div className="border-b border-surface-border pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm text-charcoal uppercase tracking-wider">
                    RoadVision AI Quality Assessment Certificate
                  </span>
                </div>
                <p className="text-xs text-charcoal-light">
                  Automated Computer Vision Material & Sieve Gradation Audit
                </p>
              </div>
              <RecommendationBadge recommendation={selectedReport.recommendation} size="md" />
            </div>

            {/* Audit Details Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-surface-subtle rounded-xl">
                <span className="text-[10px] text-charcoal-light uppercase block">Report Ref</span>
                <span className="font-mono font-bold text-charcoal">{selectedReport.id}</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded-xl">
                <span className="text-[10px] text-charcoal-light uppercase block">Batch Number</span>
                <span className="font-mono font-bold text-charcoal">{selectedReport.inspectionBatch}</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded-xl">
                <span className="text-[10px] text-charcoal-light uppercase block">Sample Count</span>
                <span className="font-bold text-charcoal">{selectedReport.samplesCount} Test Frames</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded-xl">
                <span className="text-[10px] text-charcoal-light uppercase block">Compliance Rate</span>
                <span className="font-bold text-status-success-text">{selectedReport.passRate}</span>
              </div>
            </div>

            {/* Assessment Narrative */}
            <div className="space-y-3 text-xs leading-relaxed">
              <h4 className="font-bold text-charcoal uppercase text-[11px] tracking-wider">
                Engineering Assessment Synopsis
              </h4>
              <p className="text-charcoal-muted">
                Material inspection was conducted for <strong>{selectedReport.material}</strong> using the automated RoadVision 7-step computer vision framework. Evaluated criteria included particle gradation, moisture saturation index, surface dust coating, and presence of foreign clay lumps or deleterious matter.
              </p>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-surface-border">
                <div className="flex items-center justify-between font-semibold text-charcoal mb-1">
                  <span>Recommendation Status:</span>
                  <span className="text-primary">{selectedReport.recommendation}</span>
                </div>
                <p className="text-charcoal-light text-[11px]">
                  {selectedReport.recommendation === 'Suitable for Use'
                    ? 'The sample satisfies all limits specified in MoRTH Section 500 for bituminous macadam and wearing course layers. Cleared for pavement construction.'
                    : 'The sample exhibited deviations from allowable sieve size uniformity or excessive surface fines. Re-grading or washing recommended.'}
                </p>
              </div>
            </div>

            {/* Inspector Sign-off */}
            <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs text-charcoal-light">
              <div>
                <span className="font-semibold text-charcoal block">QA/QC Inspecting Officer</span>
                <span>Er. R. Sharma, Executive Quality Engineer</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-charcoal block font-semibold">DIGITALLY VERIFIED</span>
                <span className="text-[10px]">RoadVision AI Vision Core</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
