import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge, { RecommendationBadge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import CircularProgress from '../components/ui/CircularProgress';
import QualityIndicatorsGrid from '../components/analysis/QualityIndicatorsGrid';

import { getHistory, deleteHistoryItem } from '../services/analysisService';
import { MATERIAL_CLASSES } from '../data/mockData';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [materialFilter, setMaterialFilter] = useState('ALL');
  const [qualityFilter, setQualityFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id, e) => {
    e?.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setMaterialFilter('ALL');
    setQualityFilter('ALL');
    setSortBy('newest');
  };

  // Filter & Search Logic
  const filteredData = history
    .filter((item) => {
      const matchesSearch =
        item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.batchNo && item.batchNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.inspector && item.inspector.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesMaterial =
        materialFilter === 'ALL' || item.material === materialFilter;

      const matchesQuality =
        qualityFilter === 'ALL' ||
        (qualityFilter === 'SUITABLE' && item.recommendation.toLowerCase().includes('suitable') && !item.recommendation.toLowerCase().includes('not')) ||
        (qualityFilter === 'REVIEW' && item.recommendation.toLowerCase().includes('review')) ||
        (qualityFilter === 'NOT_SUITABLE' && item.recommendation.toLowerCase().includes('not'));

      return matchesSearch && matchesMaterial && matchesQuality;
    })
    .sort((a, b) => {
      if (sortBy === 'highest_score') return b.qualityScore - a.qualityScore;
      if (sortBy === 'lowest_score') return a.qualityScore - b.qualityScore;
      if (sortBy === 'highest_conf') return b.confidence - a.confidence;
      return 0; // default order in list
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Analysis History"
        subtitle="Review previous material inspection logs, aggregate size determinations, and quality certificates."
        badge={<Badge variant="neutral" size="sm">{filteredData.length} Records</Badge>}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/analysis')}
          >
            New Inspection
          </Button>
        }
      />

      {/* Filter and Search Toolbar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder="Search by ID, Material, Batch, Inspector..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Materials' },
              { value: 'Coarse Aggregate', label: 'Coarse Aggregate' },
              { value: 'Fine Aggregate / Sand', label: 'Fine Aggregate / Sand' },
              { value: 'Bitumen', label: 'Bitumen' },
              { value: 'Soil', label: 'Soil' },
              { value: 'Cement', label: 'Cement' },
            ]}
          />

          <Select
            value={qualityFilter}
            onChange={(e) => setQualityFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Recommendations' },
              { value: 'SUITABLE', label: 'Suitable for Use' },
              { value: 'REVIEW', label: 'Needs Review' },
              { value: 'NOT_SUITABLE', label: 'Not Suitable' },
            ]}
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'newest', label: 'Sort: Most Recent' },
              { value: 'highest_score', label: 'Sort: Highest Quality' },
              { value: 'lowest_score', label: 'Sort: Lowest Quality' },
              { value: 'highest_conf', label: 'Sort: Highest Confidence' },
            ]}
          />
        </div>

        {(searchQuery || materialFilter !== 'ALL' || qualityFilter !== 'ALL') && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border text-xs text-charcoal-light">
            <span>
              Showing {filteredData.length} of {history.length} total inspections
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-primary hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </Card>

      {/* History Records Display */}
      {filteredData.length === 0 ? (
        <EmptyState
          title="No inspection records found"
          description="Try adjusting your search terms or filter selections to view matching items."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle border-b border-surface-border text-charcoal-light uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Sample ID & Date</th>
                      <th className="px-5 py-3.5">Material</th>
                      <th className="px-5 py-3.5">AI Confidence</th>
                      <th className="px-5 py-3.5">Aggregate Size</th>
                      <th className="px-5 py-3.5">Quality Score</th>
                      <th className="px-5 py-3.5">Recommendation</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {filteredData.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedItem(row)}
                        className="hover:bg-surface-muted/60 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <span className="font-mono font-bold text-charcoal block">
                            {row.id}
                          </span>
                          <span className="text-[10px] text-charcoal-light">
                            {row.timestamp || row.date}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-charcoal">
                          {row.material}
                          {row.batchNo && (
                            <span className="block text-[10px] font-mono text-gray-400 font-normal">
                              {row.batchNo}
                            </span>
                          )}
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
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Eye}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(row);
                              }}
                            >
                              View
                            </Button>
                            <button
                              type="button"
                              onClick={(e) => handleDelete(row.id, e)}
                              className="p-1.5 text-gray-400 hover:text-status-error rounded-lg hover:bg-status-error-light transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden space-y-3">
            {filteredData.map((row) => (
              <Card
                key={row.id}
                className="p-4 space-y-3 cursor-pointer"
                onClick={() => setSelectedItem(row)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-charcoal">
                      {row.id}
                    </span>
                    <span className="text-[10px] text-charcoal-light block">
                      {row.timestamp || row.date}
                    </span>
                  </div>
                  <RecommendationBadge recommendation={row.recommendation} size="sm" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-surface-border">
                  <span className="font-semibold text-charcoal">{row.material}</span>
                  <span className="text-charcoal-light">{row.size || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between text-xs bg-surface-subtle p-2.5 rounded-lg">
                  <div>
                    <span className="text-charcoal-light text-[10px] block">Confidence</span>
                    <span className="font-mono font-bold text-primary">{row.confidence}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-charcoal-light text-[10px] block">Quality Score</span>
                    <span className="font-bold text-charcoal">{row.qualityScore} / 100</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-charcoal-light">
                    {row.inspector || 'QC Inspector'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(row);
                      }}
                    >
                      Inspect
                    </Button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(row.id, e)}
                      className="p-1.5 text-gray-400 hover:text-status-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Record Inspection Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Sample Log: ${selectedItem.id}`}
          subtitle={`${selectedItem.date} • ${selectedItem.material} • Batch: ${selectedItem.batchNo || 'N/A'}`}
          maxWidth="max-w-2xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={ExternalLink}
                onClick={() => {
                  navigate('/results', { state: { result: selectedItem } });
                }}
              >
                Open Full Results
              </Button>
            </>
          }
        >
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-surface-subtle border border-surface-border">
              <CircularProgress
                score={selectedItem.qualityScore}
                size={95}
                strokeWidth={8}
                label="Quality Score"
              />
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-base font-bold text-charcoal">
                    {selectedItem.material}
                  </span>
                  <RecommendationBadge recommendation={selectedItem.recommendation} />
                </div>
                <p className="text-xs text-charcoal-light">
                  Standard: {selectedItem.standard || 'MoRTH Section 500'}
                </p>
                <p className="text-xs text-charcoal-muted">
                  Sieve Size: <strong className="text-charcoal">{selectedItem.size}</strong> • Model Confidence: <strong className="text-primary font-mono">{selectedItem.confidence}%</strong>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2.5">
                Quality Criteria Assessment
              </h4>
              <QualityIndicatorsGrid
                condition={selectedItem.condition}
                moisture={selectedItem.moisture}
                distribution={selectedItem.distribution}
                foreignObjects={selectedItem.foreignObjects}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-surface-border text-xs text-charcoal-muted leading-relaxed">
              <strong className="text-charcoal block mb-1">Inspection Notes:</strong>
              {selectedItem.notes ||
                'Aggregate conforms to grading requirements and soundness criteria per IRC:111-2009.'}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
