import React from 'react';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({ 
  children, 
  className = "", 
  borderRadius = "20px" 
}) => {
  return (
    <div 
      className={`liquid-glass-wrapper ${className}`}
      style={{ 
        borderRadius,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: `
          0 6px 6px rgba(0, 0, 0, 0.2),
          0 0 20px rgba(0, 0, 0, 0.1)
        `
      }}
    >
      {/* Liquid Glass 扭曲效果层 */}
      <div 
        className="liquid-glass-effect"
        style={{ borderRadius }}
      />
      
      {/* Liquid Glass 着色层 */}
      <div 
        className="liquid-glass-tint"
        style={{ borderRadius }}
      />
      
      {/* Liquid Glass 光泽层 */}
      <div 
        className="liquid-glass-shine"
        style={{ borderRadius }}
      />
      
      {/* 内容层 */}
      <div className="liquid-glass-content">
        {children}
      </div>
    </div>
  );
};

export default LiquidGlass;