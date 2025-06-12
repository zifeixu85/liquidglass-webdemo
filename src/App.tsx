import { useState, useEffect } from 'react';
import { ExternalLink, Image, GitBranch } from 'lucide-react';
import { LiquidGlass } from './components/LiquidGlass';
import { DraggableCard } from './components/DraggableCard';
import { GlassControls } from './components/GlassControls';

const backgrounds = [
  // Nature/Landscape first
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=2940',
  // Abstract/Gradient styles
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2940',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=2940'
];

function App() {
  const [currentBg, setCurrentBg] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [autoOffset, setAutoOffset] = useState({ x: 0, y: 0 });
  const [activeCardId, setActiveCardId] = useState<string>('main-card');
  const [isMobile, setIsMobile] = useState(false);
  const [svgKey, setSvgKey] = useState(0);
  
  // Liquid Glass adjustable parameters
  const [glassParams, setGlassParams] = useState({
    tintOpacity: 0.15,        // Tint layer opacity (0-1)
    backdropBlur: 3,          // Background blur intensity (0-20)
    displacementScale: 150,   // Displacement distortion strength (0-300)
    shineIntensity: 0.5,      // Shine intensity (0-1)
    borderRadius: 20,         // Border radius size (0-50)
    shadowIntensity: 0.3      // Shadow intensity (0-1)
  });

  // Force SVG re-render on params change for mobile
  useEffect(() => {
    if (isMobile) {
      setSvgKey(prev => prev + 1);
    }
  }, [glassParams.displacementScale, isMobile]);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Preload images
    backgrounds.forEach(bg => {
      const img = document.createElement('img');
      img.src = bg;
    });

    // Mouse move handler for background parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage (-1 to 1)
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x: xPercent, y: yPercent });
    };

    // Auto-flowing background animation
    const startTime = Date.now();
    const animateBackground = () => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds
      
      // Create smooth flowing motion with different speeds for x and y
      const x = Math.sin(elapsed * 0.3) * 30 + Math.cos(elapsed * 0.2) * 20;
      const y = Math.cos(elapsed * 0.25) * 25 + Math.sin(elapsed * 0.15) * 15;
      
      setAutoOffset({ x, y });
      requestAnimationFrame(animateBackground);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateBackground();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const nextBackground = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const handleCardInteraction = (cardId: string) => {
    setActiveCardId(cardId);
  };

  const getCardZIndex = (cardId: string) => {
    return cardId === activeCardId ? 10 : 1;
  };

  // Calculate background transform combining auto-flow and mouse position
  const backgroundTransform = {
    transform: `translate(${autoOffset.x + mousePosition.x * 15}px, ${autoOffset.y + mousePosition.y * 15}px) scale(1.15)`,
    transition: 'none' // Remove transition for smooth auto-animation
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* SVG Filter for Liquid Glass Effect - strictly following original project */}
      <svg key={svgKey} style={{ display: 'none' }} width="0" height="0">
        <defs>
          <filter
            id="glass-distortion"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
          >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={glassParams.displacementScale.toString()}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          </filter>
        </defs>
      </svg>

      {/* Mouse-Following Background */}
      <div className="fixed inset-0 -z-10">
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={backgrounds[currentBg]}
            alt="Background"
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={backgroundTransform}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 gap-6">
        {/* Main Card - Draggable */}
        <DraggableCard 
          className={isMobile ? "w-full max-w-lg" : ""} 
          id="main-card"
          initialPosition={{ x: 0, y: 0 }} 
          initialSize={{ width: isMobile ? '90vw' : 600, height: 'auto' }}
          onInteraction={handleCardInteraction}
          zIndex={getCardZIndex('main-card')}
        >
          <LiquidGlass params={glassParams}>
            <div className="p-6 md:p-12">
              {/* Header with background switch */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="text-white/60 text-xs md:text-sm flex items-center gap-2">
                  {!isMobile && <span>🖱️ Drag to move • ↘️ Resize</span>}
                </div>
                {/* Background Switch Button */}
                <button
                  onClick={nextBackground}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-105"
                  title="Switch Background"
                >
                  <Image className="w-4 h-4" />
                  <span className="text-xs md:text-sm">{isMobile ? 'Switch' : 'Switch Background'}</span>
                </button>
              </div>

              {/* Content */}
              <div className="text-center">
                <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-4">
                  Liquid Glass
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-4 md:mb-6">
                  WWDC 2025 Preview
                </p>
                <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-lg">
                  {isMobile ? (
                    <>Experience the future of design<br />with real-time glass effects</>
                  ) : (
                    <>Experience the revolutionary Liquid Glass design system.<br />
                    Drag the cards around and move your mouse to see the interactive effects.</>
                  )}
                </p>
                <div className="text-white/70 text-xs md:text-sm">
                  CSS-powered glassmorphism with interactive parallax
                </div>
              </div>
            </div>
          </LiquidGlass>
        </DraggableCard>

        {/* Recommendation Card - Draggable */}
        <DraggableCard 
          className={isMobile ? "w-full max-w-lg" : ""} 
          id="recommendation-card"
          initialPosition={{ x: 0, y: 0 }} 
          initialSize={{ width: isMobile ? '90vw' : 600, height: 'auto' }}
          onInteraction={handleCardInteraction}
          zIndex={getCardZIndex('recommendation-card')}
        >
          <LiquidGlass params={glassParams}>
            <div className="p-6 md:p-12 w-full h-full flex flex-col items-center justify-center text-center min-h-[150px] md:min-h-[200px]">
              <h3 className="text-lg font-semibold text-white mb-2">
                Want to Learn More?
              </h3>
              <p className="text-white/80 text-sm mb-4 max-w-md">
                Explore comprehensive tutorials and resources
              </p>
              <a
                href="https://liquidglass-kit.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-105"
              >
<span>View More Resources & Tutorials</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </LiquidGlass>
        </DraggableCard>
      </div>

      {/* Glass Controls Panel */}
      <GlassControls
        params={glassParams}
        onParamsChange={setGlassParams}
        mousePosition={mousePosition}
        autoOffset={autoOffset}
      />

      {/* Footer */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <a
          href="https://github.com/zifeixu85/liquidglass-webdemo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-105"
        >
          <GitBranch className="w-4 h-4" />
          <span className="text-sm">View on GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default App;