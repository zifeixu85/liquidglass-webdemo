import React, { useState, useEffect } from 'react';
import { Shuffle, Share2, Link, Check } from 'lucide-react';
import LiquidGlass from './LiquidGlass';

// Unsplash 背景图片集合
const backgroundImages = [
  'https://images.unsplash.com/photo-1491466424936-e304919aada7?w=1920&h=1080&fit=crop&crop=center', // 深夜冰岛
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&crop=center', // 星空渐变
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center', // 山脉风景
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop&crop=center', // 抽象紫色
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop&crop=center', // 海洋波浪
  'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&h=1080&fit=crop&crop=center', // 城市夜景
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop&crop=center', // 自然纹理
  'https://images.unsplash.com/photo-1604076850742-4c7221f3101b?w=1920&h=1080&fit=crop&crop=center', // 彩色抽象
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop&crop=center', // 流体艺术
];

const FloatingControls: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const changeBackground = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = (currentBgIndex + 1) % backgroundImages.length;
    setCurrentBgIndex(newIndex);
    
    // 更新主容器的背景图
    const mainContainer = document.querySelector('.dynamic-background');
    if (mainContainer) {
      const htmlElement = mainContainer as HTMLElement;
      htmlElement.style.backgroundImage = `url(${backgroundImages[newIndex]})`;
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleShareX = () => {
    const text = '🔥 Experience the coolest Liquid Glass web effects! Apple WWDC 2025 Design System complete resource hub - with code examples, design resources & tutorials #LiquidGlass #WWDC2025 #AppleDesign #iOS26 #UI #UX';
    const url = 'https://liquidglass-kit.dev';
    const imageUrl = 'https://liquidglass-kit.dev/liquidglass-kit.png';
    
    // 尝试使用带图片的分享（如果支持）
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [] })) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], 'liquidglass-kit.png', { type: 'image/png' });
          navigator.share({
            title: 'Liquid Glass Design System',
            text: text,
            url: url,
            files: [file]
          });
        })
        .catch(() => {
          // 降级到普通文字分享
          window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text + '\n\n📸 Preview: ' + imageUrl)}&url=${encodeURIComponent(url)}`, '_blank');
        });
    } else {
      // 普通文字分享，包含图片链接
      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text + '\n\n📸 Preview: ' + imageUrl)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const handleCopyLink = () => {
    const url = 'https://liquidglass-kit.dev';
    navigator.clipboard.writeText(url);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus(''), 2000);
  };

  // 初始化背景
  useEffect(() => {
    const mainContainer = document.querySelector('.dynamic-background');
    if (mainContainer) {
      const htmlElement = mainContainer as HTMLElement;
      htmlElement.style.backgroundImage = `url(${backgroundImages[currentBgIndex]})`;
    }
  }, []);

  return (
    <div className="floating-controls">
      <LiquidGlass className="floating-controls-container" borderRadius="16px">
        {/* 切换背景按钮 */}
        <button
          onClick={changeBackground}
          className={`floating-control-btn ${isAnimating ? 'animate-spin' : ''}`}
          title="切换背景图片"
          disabled={isAnimating}
        >
          <Shuffle size={20} />
        </button>

        {/* 分割线 */}
        <div className="floating-controls-divider" />

        {/* 分享到 X 按钮 */}
        <button
          onClick={handleShareX}
          className="floating-control-btn"
          title="分享到 X"
        >
          <div className="x-icon">
            <span className="text-sm font-bold">𝕏</span>
          </div>
        </button>

        {/* 复制链接按钮 */}
        <button
          onClick={handleCopyLink}
          className="floating-control-btn"
          title={copyStatus || "复制链接"}
        >
          {copyStatus ? (
            <Check size={20} className="text-green-400" />
          ) : (
            <Link size={20} />
          )}
        </button>
      </LiquidGlass>
    </div>
  );
};

export default FloatingControls;