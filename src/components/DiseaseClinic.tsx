import React, { useState } from 'react';
import { DISEASE_SAMPLES } from '../data/mockData';
import type { DiseaseSample } from '../types';
import { ScanLine, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Upload, RotateCw, Stethoscope } from 'lucide-react';

interface DiseaseClinicProps {
  onOpenSubscription: () => void;
}

export const DiseaseClinic: React.FC<DiseaseClinicProps> = ({ onOpenSubscription }) => {
  const [selectedSample, setSelectedSample] = useState<DiseaseSample>(DISEASE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [activeTab, setActiveTab] = useState<'treatment' | 'prevention' | 'homecare'>('treatment');

  const handleStartScan = (sample: DiseaseSample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <section id="disease-detection" className="py-24 bg-[#F4F1EA] relative overflow-hidden">
      {/* Clinic Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8DAA91]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-[#3A7D44]" />
            <span>Digital Plant Clinic & Diagnostics</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E] leading-tight">
            Something wrong with your plant?<br />
            <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
              Let GreenCare take a closer look.
            </span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-2xl mx-auto">
            Our neural vision clinic analyzes microscopic leaf tissue patterns, fungal spores, and chlorophyll pigmentation to identify diseases in seconds.
          </p>
        </div>

        {/* Clinic Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Interactive Scanner Viewport */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sample Selector Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                Select Sample Leaf or Upload
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DISEASE_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleStartScan(sample)}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left flex flex-col gap-1 ${
                      selectedSample.id === sample.id
                        ? 'bg-[#132E1E] text-[#FAF8F5] border-[#132E1E] shadow-sm'
                        : 'bg-white text-[#132E1E] border-[#132E1E]/10 hover:border-[#2D6A4F]/40'
                    }`}
                  >
                    <span className="truncate">{sample.name}</span>
                    <span className="text-[10px] opacity-75 truncate">{sample.plantName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scanning Leaf Box */}
            <div className="relative rounded-3xl overflow-hidden border border-[#132E1E]/20 bg-black aspect-4/3 shadow-2xl group">
              <img
                src={selectedSample.image}
                alt={selectedSample.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isScanning ? 'opacity-80 scale-105' : 'opacity-100'
                }`}
              />

              {/* Laser Scanning Beam Overlay */}
              {isScanning && (
                <>
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8DAA91] to-transparent shadow-[0_0_15px_#8DAA91] animate-scan-beam" />
                  <div className="absolute inset-0 bg-[#2D6A4F]/10 pointer-events-none" />
                </>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-xs font-semibold text-[#132E1E] flex items-center gap-2 shadow-sm">
                {isScanning ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-[#2D6A4F] animate-spin" />
                    <span>Analyzing Leaf Micro-texture ({scanProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3A7D44]" />
                    <span>Analysis Complete • {selectedSample.confidence}% AI Confidence</span>
                  </>
                )}
              </div>

              {/* Target Bounding Box Overlay */}
              {!isScanning && (
                <div className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-dashed border-[#FAF8F5]/80 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 rounded-full bg-[#FAF8F5] shadow-[0_0_10px_white]" />
                </div>
              )}

              {/* Action Trigger inside Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={() => handleStartScan(selectedSample)}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#132E1E] text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <ScanLine className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Rescan Sample</span>
                </button>

                <label className="px-4 py-2 rounded-full bg-[#132E1E]/80 hover:bg-[#132E1E] text-[#FAF8F5] text-xs font-semibold cursor-pointer flex items-center gap-2 backdrop-blur-md transition-all">
                  <Upload className="w-3.5 h-3.5 text-[#A3B18A]" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = URL.createObjectURL(e.target.files[0]);
                        handleStartScan({
                          ...selectedSample,
                          id: 'custom-upload',
                          name: 'Custom Leaf Sample',
                          plantName: 'User Plant',
                          image: url,
                        });
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={onOpenSubscription}
              className="w-full py-4 rounded-2xl bg-[#132E1E] text-[#FAF8F5] font-semibold text-sm hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#A3B18A]" />
              <span>Try Plant Detection on Your Plant</span>
            </button>

          </div>

          {/* Right Side: Digital Clinic Diagnostic Report */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#132E1E]/10 shadow-xl space-y-6">
            
            {/* Header Result Tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#132E1E]/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Possible Condition Detected
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#132E1E] flex items-center gap-3 mt-1">
                  <span>{selectedSample.name}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20">
                    {selectedSample.plantName}
                  </span>
                </h3>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-[#2D6A4F]">
                  {selectedSample.confidence}%
                </div>
                <div className="text-[11px] text-[#132E1E]/60 font-medium">Diagnostic Match</div>
              </div>
            </div>

            {/* Immediate Action Alert Banner */}
            <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#132E1E]/15 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#132E1E]">Immediate Action Required</h4>
                <p className="text-sm text-[#132E1E]/80 mt-0.5">{selectedSample.immediateAction}</p>
              </div>
            </div>

            {/* Symptoms & Causes Dual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Observed Symptoms</span>
                </h4>
                <ul className="space-y-2">
                  {selectedSample.symptoms.map((symptom, i) => (
                    <li key={i} className="text-xs text-[#132E1E]/80 flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#132E1E]/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] shrink-0 mt-1.5" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Root Causes</span>
                </h4>
                <ul className="space-y-2">
                  {selectedSample.causes.map((cause, i) => (
                    <li key={i} className="text-xs text-[#132E1E]/80 flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#132E1E]/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3A7D44] shrink-0 mt-1.5" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Tabbed Guidance (Treatment / Home Care / Prevention) */}
            <div className="space-y-3 pt-2">
              <div className="flex border-b border-[#132E1E]/10 gap-4">
                <button
                  onClick={() => setActiveTab('treatment')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'treatment'
                      ? 'border-[#2D6A4F] text-[#2D6A4F]'
                      : 'border-transparent text-[#132E1E]/50 hover:text-[#132E1E]'
                  }`}
                >
                  Treatment Plan
                </button>
                <button
                  onClick={() => setActiveTab('homecare')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'homecare'
                      ? 'border-[#2D6A4F] text-[#2D6A4F]'
                      : 'border-transparent text-[#132E1E]/50 hover:text-[#132E1E]'
                  }`}
                >
                  Home Care
                </button>
                <button
                  onClick={() => setActiveTab('prevention')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'prevention'
                      ? 'border-[#2D6A4F] text-[#2D6A4F]'
                      : 'border-transparent text-[#132E1E]/50 hover:text-[#132E1E]'
                  }`}
                >
                  Prevention
                </button>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#132E1E]/5">
                {activeTab === 'treatment' && (
                  <ul className="space-y-2">
                    {selectedSample.treatment.map((t, idx) => (
                      <li key={idx} className="text-xs text-[#132E1E]/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3A7D44] shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'homecare' && (
                  <ul className="space-y-2">
                    {selectedSample.homeCare.map((h, idx) => (
                      <li key={idx} className="text-xs text-[#132E1E]/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3A7D44] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'prevention' && (
                  <ul className="space-y-2">
                    {selectedSample.prevention.map((p, idx) => (
                      <li key={idx} className="text-xs text-[#132E1E]/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3A7D44] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Recovery Timeline Footer */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#132E1E]/70 border-t border-[#132E1E]/10">
              <span className="font-semibold">Expected Recovery:</span>
              <span className="font-bold text-[#2D6A4F]">{selectedSample.recoveryTimeline}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
