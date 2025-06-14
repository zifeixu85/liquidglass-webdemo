import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GlassParams {
  tintOpacity: number;
  backdropBlur: number;
  displacementScale: number;
  shineIntensity: number;
  borderRadius: number;
  shadowIntensity: number;
}

interface GlassControlsProps {
  params: GlassParams;
  onParamsChange: (params: GlassParams) => void;
  mousePosition: { x: number; y: number };
  autoOffset: { x: number; y: number };
}

export function GlassControls({ params, onParamsChange, mousePosition, autoOffset }: GlassControlsProps) {
  // Check if mobile device on initial render
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Desktop: default expanded, Mobile: default collapsed
      setIsExpanded(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleParamChange = (key: keyof GlassParams, value: number) => {
    onParamsChange({
      ...params,
      [key]: value
    });
  };

  const resetToDefaults = () => {
    onParamsChange({
      tintOpacity: 0.15,
      backdropBlur: 3,
      displacementScale: 150,
      shineIntensity: 0.5,
      borderRadius: 20,
      shadowIntensity: 0.3
    });
  };

  return (
    <div className={`fixed z-50 ${isMobile ? 'glass-controls-mobile top-2 left-2 right-2' : 'top-4 left-4'}`}>
      <div className="bg-black/20 backdrop-blur-md rounded-xl text-white text-xs font-mono overflow-hidden">
        {/* Header with toggle button */}
        <div 
          className={`p-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between ${isMobile ? 'glass-controls-header' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">Glass Controls</span>
            {isMobile && <span className="text-white/60">(Tap to expand)</span>}
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>

        {/* Collapsible Content */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 pt-0">
            {/* Position Info */}
            <div className="mb-4 space-y-1 border-b border-white/20 pb-3">
              <div>Mouse: ({Math.round(mousePosition.x * 100)}, {Math.round(mousePosition.y * 100)})</div>
              <div>Flow: ({Math.round(autoOffset.x)}, {Math.round(autoOffset.y)})</div>
              <div className="text-white/60">💡 Drag cards to move • Bottom-right to resize</div>
            </div>

            {/* Glass Parameters */}
            <div className="space-y-3">
          <div className="text-white/80 font-semibold text-sm mb-2">Glass Parameters</div>
          
          {/* Tint Opacity */}
          <div>
            <label className="block text-white/70 mb-1">
              Tint Opacity: {params.tintOpacity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={params.tintOpacity}
              onChange={(e) => handleParamChange('tintOpacity', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

          {/* Backdrop Blur */}
          <div>
            <label className="block text-white/70 mb-1">
              Backdrop Blur: {params.backdropBlur}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={params.backdropBlur}
              onChange={(e) => handleParamChange('backdropBlur', parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

          {/* Displacement Scale */}
          <div>
            <label className="block text-white/70 mb-1">
              Distortion: {params.displacementScale}
            </label>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={params.displacementScale}
              onChange={(e) => handleParamChange('displacementScale', parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

          {/* Shine Intensity */}
          <div>
            <label className="block text-white/70 mb-1">
              Shine: {params.shineIntensity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={params.shineIntensity}
              onChange={(e) => handleParamChange('shineIntensity', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-white/70 mb-1">
              Radius: {params.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={params.borderRadius}
              onChange={(e) => handleParamChange('borderRadius', parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

          {/* Shadow Intensity */}
          <div>
            <label className="block text-white/70 mb-1">
              Shadow: {params.shadowIntensity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={params.shadowIntensity}
              onChange={(e) => handleParamChange('shadowIntensity', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>

              {/* Reset Button */}
              <button
                onClick={resetToDefaults}
                className="w-full mt-4 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}