import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Sliders,
  Shield,
  Palette,
  Server,
  RefreshCw,
  CheckCircle2,
  Info,
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';

import { getSettings, saveSettings } from '../services/analysisService';

export default function Settings() {
  const [settings, setSettings] = useState(getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    const defaultVals = {
      appName: 'RoadVision AI',
      confidenceThreshold: 85,
      defaultStandard: 'MoRTH Section 500 (Indian Roads Congress)',
      autoSaveAnalysis: true,
      simulatePipelineDelay: true,
      layoutDensity: 'comfortable',
      themeMode: 'light',
      backendStatus: 'Demo Mode (Local CV Emulator)'
    };
    setSettings(defaultVals);
    saveSettings(defaultVals);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="System Settings"
        subtitle="Manage inspection parameters, model confidence thresholds, specifications standards, and system diagnostics."
        badge={<Badge variant="neutral" size="sm">Configuration</Badge>}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSave}
          >
            Save Settings
          </Button>
        }
      />

      {savedSuccess && (
        <Alert
          type="success"
          title="Configuration Saved"
          onClose={() => setSavedSuccess(false)}
        >
          System preferences updated and stored in local configuration.
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Application naming and primary engineering standards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Application Title"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              helperText="Branding display name for the inspection interface"
            />

            <Select
              label="Default Regulatory Standard"
              value={settings.defaultStandard}
              onChange={(e) => setSettings({ ...settings, defaultStandard: e.target.value })}
              options={[
                { value: 'MoRTH Section 500 (Indian Roads Congress)', label: 'MoRTH Section 500 (Indian Roads Congress)' },
                { value: 'IRC:111-2009 (Dense Bituminous Macadam)', label: 'IRC:111-2009 (Dense Bituminous Macadam)' },
                { value: 'IS 383:2016 (Coarse and Fine Aggregates)', label: 'IS 383:2016 (Coarse and Fine Aggregates)' },
                { value: 'ASTM D692 / D1073 (Standard Road Aggregates)', label: 'ASTM D692 / D1073 (Standard Road Aggregates)' },
              ]}
              helperText="Baseline regulatory specification used for pass/fail determination"
            />
          </CardContent>
        </Card>

        {/* Analysis Parameters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-sand-dark" />
              <CardTitle>Analysis Parameters</CardTitle>
            </div>
            <CardDescription>
              Model confidence limits and automated workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-charcoal">
                  Minimum Confidence Threshold
                </label>
                <span className="font-mono font-bold text-primary">
                  {settings.confidenceThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={settings.confidenceThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, confidenceThreshold: Number(e.target.value) })
                }
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-charcoal-light mt-1">
                Classifications below this threshold will automatically flag for manual laboratory review.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border">
              <div>
                <span className="text-xs font-semibold text-charcoal block">
                  Auto-Save Inspections to History
                </span>
                <span className="text-[11px] text-charcoal-light">
                  Automatically register new analyses into history log
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSaveAnalysis}
                onChange={(e) =>
                  setSettings({ ...settings, autoSaveAnalysis: e.target.checked })
                }
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border">
              <div>
                <span className="text-xs font-semibold text-charcoal block">
                  Simulated 7-Step Pipeline Latency
                </span>
                <span className="text-[11px] text-charcoal-light">
                  Smooth step-by-step progress animation for presentation
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.simulatePipelineDelay}
                onChange={(e) =>
                  setSettings({ ...settings, simulatePipelineDelay: e.target.checked })
                }
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-teal" />
              <CardTitle>Interface Appearance</CardTitle>
            </div>
            <CardDescription>
              Layout density and clean laboratory color scheme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Layout Density"
              value={settings.layoutDensity}
              onChange={(e) => setSettings({ ...settings, layoutDensity: e.target.value })}
              options={[
                { value: 'comfortable', label: 'Comfortable (Standard laboratory view)' },
                { value: 'compact', label: 'Compact (High-density telemetry)' },
              ]}
              helperText="Adjusts vertical padding across cards and tables"
            />

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-charcoal-light space-y-1">
              <strong className="text-charcoal block">Theme Mode: Clear & Modern Mild</strong>
              <p>
                RoadVision AI is styled with a soft off-white canvas, slate blue accents, and gentle sage/amber indicators designed for low visual noise and maximum clarity during engineering reviews.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Information & Diagnostic Card */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-charcoal" />
              <CardTitle>System Information & Diagnostics</CardTitle>
            </div>
            <Badge variant="warning" size="sm">Demo Mode</Badge>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-surface-border">
              <span className="text-charcoal-light">Frontend Version:</span>
              <span className="font-mono font-semibold text-charcoal">v1.0.0 (React 18 + Vite)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-border">
              <span className="text-charcoal-light">CV Inference Engine:</span>
              <span className="font-mono font-semibold text-primary">YOLOv8 + ResNet50 Emulator</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-border">
              <span className="text-charcoal-light">Backend Connection:</span>
              <span className="font-semibold text-status-warning-text">Stand-Alone Demo Mode (Not Connected)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-border">
              <span className="text-charcoal-light">API Endpoint Abstraction:</span>
              <span className="font-mono text-charcoal">POST /api/analyze (Ready for FastAPI)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-charcoal-light">Database Storage:</span>
              <span className="font-mono text-charcoal">Browser LocalStorage Cache</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={handleResetDefaults}
            >
              Reset to Defaults
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
