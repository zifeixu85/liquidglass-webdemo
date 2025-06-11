import React from 'react';

interface GlassParams {
  tintOpacity: number;
  backdropBlur: number;
  displacementScale: number;
  shineIntensity: number;
  borderRadius: number;
  shadowIntensity: number;
}

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  params?: GlassParams;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({ 
  children, 
  className = "",
  params
}) => {
  const wrapperStyle = params ? {
    borderRadius: `${params.borderRadius}px`,
    boxShadow: `0 6px 6px rgba(0, 0, 0, ${params.shadowIntensity * 0.67}), 0 0 20px rgba(0, 0, 0, ${params.shadowIntensity * 0.33})`
  } : {};

  const effectStyle = params ? {
    backdropFilter: `blur(${params.backdropBlur}px)`,
    borderRadius: 'inherit'
  } : {};

  const tintStyle = params ? {
    background: `rgba(255, 255, 255, ${params.tintOpacity})`,
    borderRadius: 'inherit'
  } : {};

  const shineStyle = params ? {
    boxShadow: `inset 2px 2px 1px 0 rgba(255, 255, 255, ${params.shineIntensity}), inset -1px -1px 1px 1px rgba(255, 255, 255, ${params.shineIntensity})`,
    borderRadius: 'inherit'
  } : {};

  return (
    <div className={`liquidGlass-wrapper ${className}`} style={wrapperStyle}>
      {/* Liquid Glass distortion effect layer */}
      <div className="liquidGlass-effect" style={effectStyle} />
      
      {/* Liquid Glass tint layer */}
      <div className="liquidGlass-tint" style={tintStyle} />
      
      {/* Liquid Glass shine layer */}
      <div className="liquidGlass-shine" style={shineStyle} />
      
      {/* Content layer */}
      <div className="liquidGlass-text">
        {children}
      </div>
    </div>
  );
};

export { LiquidGlass };
export default LiquidGlass;