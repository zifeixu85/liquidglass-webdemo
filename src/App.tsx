import React, { useState, useEffect } from 'react';
import { ExternalLink, Mail, Download, Code2, Palette, Layers, Sparkles, ChevronDown, Check, Share2, Link, Star } from 'lucide-react';
import { VideoPlayer } from './components/VideoPlayer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };


  // 视频数据 - 简化为 3 个主要分类
  const videoCategories = {
    essentials: {
      title: "Essentials",
      description: "Fundamental concepts and design principles",
      videos: [
        {
          title: "Glass Design Principles",
          duration: "12 min",
          description: "Understanding transparency, depth, and visual hierarchy in glass design.",
          thumbnail: "bg-gradient-to-br from-blue-500 to-cyan-600",
          youtubeId: "uhMo6IEcR1w"
        },
        {
          title: "Color Theory in Translucent UI",
          duration: "8 min",
          description: "How color perception changes with opacity and layering effects.",
          thumbnail: "bg-gradient-to-br from-purple-500 to-pink-600",
          youtubeId: "rs7hP913ypo"
        },
        {
          title: "Typography for Glass Interfaces",
          duration: "10 min",
          description: "Ensuring readability and contrast in translucent designs.",
          thumbnail: "bg-gradient-to-br from-green-500 to-emerald-600",
          youtubeId: "xV7iIXyOOzg"
        },
        {
          title: "Accessibility in Glass Design",
          duration: "12 min",
          description: "Ensuring glass interfaces are accessible to all users.",
          thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-600",
          youtubeId: "3MugGCtm26A"
        }
      ]
    },
    implementation: {
      title: "Implementation",
      description: "Practical guides for building glass interfaces",
      videos: [
        {
          title: "CSS Glass Effects Masterclass",
          duration: "18 min",
          description: "Building realistic glass effects with CSS backdrop-filter and shadows.",
          thumbnail: "bg-gradient-to-br from-orange-500 to-red-600",
          youtubeId: "l-9tYm0U998"
        },
        {
          title: "React Glass Components",
          duration: "15 min",
          description: "Creating reusable glass UI components in React applications.",
          thumbnail: "bg-gradient-to-br from-indigo-500 to-purple-600",
          youtubeId: "cETgTtu6atM"
        },
        {
          title: "Performance Optimization",
          duration: "11 min",
          description: "Optimizing glass effects for smooth animations and better performance.",
          thumbnail: "bg-gradient-to-br from-teal-500 to-cyan-600",
          youtubeId: "QYUFSEcwx4U"
        },
        {
          title: "Mobile Glass UI Patterns",
          duration: "13 min",
          description: "Adapting glass design for mobile and touch interfaces.",
          thumbnail: "bg-gradient-to-br from-pink-500 to-rose-600",
          youtubeId: "KUvb7pm1b3U"
        },
        {
          title: "Interactive Glass Animations",
          duration: "20 min",
          description: "Creating dynamic animations that respond to user interaction.",
          thumbnail: "bg-gradient-to-br from-amber-500 to-orange-600",
          youtubeId: "AP2kex2cGJI"
        },
        {
          title: "3D Glass Effects with WebGL",
          duration: "25 min",
          description: "Advanced 3D glass rendering techniques using WebGL shaders.",
          thumbnail: "bg-gradient-to-br from-violet-500 to-purple-600",
          youtubeId: "dGcqqA3Sl-o"
        }
      ]
    },
    showcase: {
      title: "Showcase",
      description: "Real-world examples and case studies",
      videos: [
        {
          title: "Real-world Glass UI Examples",
          duration: "22 min",
          description: "Analyzing successful glass design implementations in popular apps.",
          thumbnail: "bg-gradient-to-br from-rose-500 to-pink-600",
          youtubeId: "VqTn9NgiE1s"
        },
        {
          title: "Design System Integration",
          duration: "17 min",
          description: "Incorporating glass elements into existing design systems.",
          thumbnail: "bg-gradient-to-br from-lime-500 to-green-600",
          youtubeId: "JvQtvbhtXmo"
        },
        {
          title: "Glass Morphism in AR/VR",
          duration: "16 min",
          description: "Implementing glass effects in augmented and virtual reality environments.",
          thumbnail: "bg-gradient-to-br from-emerald-500 to-teal-600",
          youtubeId: "Un6mgU-JyPw"
        },
        {
          title: "Dynamic Light Reflection",
          duration: "14 min",
          description: "Creating realistic light reflection and refraction effects.",
          thumbnail: "bg-gradient-to-br from-sky-500 to-blue-600",
          youtubeId: "DS2ildqCrB0"
        },
        {
          title: "Future of Glass Interfaces",
          duration: "19 min",
          description: "Exploring emerging trends and future possibilities in glass design.",
          thumbnail: "bg-gradient-to-br from-purple-500 to-violet-600",
          youtubeId: "l8DHZZ9GvAo"
        }
      ]
    }
  };

  // 主视频（首屏展示）
  const heroVideo = {
    title: "Meet Liquid Glass",
    description: "Liquid Glass unifies Apple platform design language while providing a more dynamic and expressive user experience. Get to know the design principles of Liquid Glass, explore its core optical and physical properties, and learn where to use it and why.",
    youtubeId: "IrGYUq1mklk"
  };

  // Tab 状态管理
  const [activeTab, setActiveTab] = useState('essentials');
  
  // 滚动功能
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // 分享功能
  const shareContent = {
    title: 'Liquid Glass Design System - WWDC 2025 Resources',
    text: 'Check out this comprehensive resource for Apple\'s Liquid Glass design system from WWDC 2025!',
    url: 'https://liquidglass-kit.dev'
  };
  
  const handleShare = (platform: string) => {
    const { title, text, url } = shareContent;
    
    switch (platform) {
      case 'x':
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(''), 2000);
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({ title, text, url });
        }
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 top-0 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">Liquid Glass</span>
                <span className="text-sm text-white/80 font-medium">liquidglass-kit.dev</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('overview')} className="text-white/80 hover:text-white transition-colors">Overview</button>
              <button onClick={() => scrollToSection('features')} className="text-white/80 hover:text-white transition-colors">Design Principles</button>
              <button onClick={() => scrollToSection('learning')} className="text-white/80 hover:text-white transition-colors">Learn & Code</button>
              <button onClick={() => scrollToSection('resources')} className="text-white/80 hover:text-white transition-colors">Resources</button>
            </div>
            <div className="flex items-center space-x-4">
              {/* 分享按钮 */}
              <div className="relative group share-menu-hover">
                <button className="glass-button text-white/80 hover:text-white p-2 relative z-10">
                  <Share2 className="w-5 h-5" />
                </button>
                
                {/* Liquid Glass 风格浮层 - hover 显示 */}
                <div className="absolute right-0 top-full glass-card p-3 space-y-2 min-w-[140px] z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                  <button 
                    onClick={() => handleShare('x')} 
                    className="flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm w-full transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-4 h-4 flex items-center justify-center text-white bg-black rounded-sm">
                      <span className="text-xs font-bold">𝕏</span>
                    </div>
                    <span>X</span>
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm w-full transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-4 h-4 flex items-center justify-center text-white bg-blue-600 rounded-sm">
                      <span className="text-xs font-bold">f</span>
                    </div>
                    <span>Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')} 
                    className="flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm w-full transition-all duration-200 hover:scale-105"
                  >
                    {copyStatus ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>{copyStatus}</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4 text-green-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('resources')}
                className="glass-button text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Resources
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="glass-orb glass-orb-1"></div>
        <div className="glass-orb glass-orb-2"></div>
        <div className="glass-orb glass-orb-3"></div>
        
        {/* Liquid Glass Background Elements */}
        <div className="liquid-element liquid-element-1"></div>
        <div className="liquid-element liquid-element-2"></div>
        <div className="liquid-element liquid-element-3"></div>
        
        {/* Glass Shapes */}
        <div className="glass-shape glass-shape-1"></div>
        <div className="glass-shape glass-shape-2"></div>
        
        {/* 大型圆形 Liquid Glass 元素 */}
        <div className="liquid-circle liquid-circle-1"></div>
        <div className="liquid-circle liquid-circle-2"></div>
        <div className="liquid-circle liquid-circle-3"></div>
        <div className="liquid-circle liquid-circle-4"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* 单一大的 glass 容器 */}
          <div className="glass-card p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 左侧文字内容 */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30">
                      <Star className="w-4 h-4 mr-2" />
                      WWDC 2025 Featured
                    </span>
                  </div>
                  
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                      Liquid
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Glass</span>
                      <span className="block text-2xl lg:text-3xl font-normal text-white/80 mt-2">Developer Toolkit</span>
                    </h1>
                    
                    <div className="space-y-3">
                      <p className="text-lg text-white/80 leading-relaxed">
                        SwiftUI components • React libraries • CSS frameworks • Open-source projects
                      </p>
                      
                      <p className="text-base text-white/70 leading-relaxed max-w-lg">
                        Your one-stop resource hub for implementing stunning glassmorphism effects. 
                        Curated tools, comprehensive documentation, and ready-to-use code snippets 
                        to seamlessly integrate Liquid Glass into your next breakthrough app.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-white/10 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>iOS 26</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>macOS 26</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>iPadOS 26</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>visionOS 26</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>watchOS 26</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧视频 */}
              <div className="relative">
                <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden ring-1 ring-white/20">
                  <iframe
                    src={`https://www.youtube.com/embed/${heroVideo.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                    title={heroVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{heroVideo.title}</h3>
                  <p className="text-white/60 text-sm">{heroVideo.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 邮件订阅区域 - 拉通显示 */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Mail className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Get Developer Updates</h3>
                  </div>
                  <p className="text-white/70">
                    Join thousands of developers • Weekly code snippets • New libraries & frameworks • Zero spam
                  </p>
                </div>
                
                <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your-email@company.com"
                      className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubscribed}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all whitespace-nowrap ${
                        isSubscribed
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                      }`}
                    >
                      {isSubscribed ? (
                        <div className="flex items-center">
                          <Check className="w-5 h-5 mr-2" />
                          Subscribed!
                        </div>
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-white/60 text-sm">
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1 text-green-400" />
                      Weekly updates
                    </span>
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1 text-green-400" />
                      Code examples
                    </span>
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1 text-green-400" />
                      New libraries
                    </span>
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1 text-green-400" />
                      Unsubscribe anytime
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="space-y-3">
              <p className="text-white/80 text-sm font-medium">
                Explore comprehensive tutorials, code examples & design resources below
              </p>
              <div className="animate-bounce">
                <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
              </div>
              <p className="text-white/60 text-xs">
                Scroll to discover all developer resources
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Overview Section */}
      <section id="overview" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Overview</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Unveiled at WWDC 2025, Liquid Glass represents the most significant interface redesign 
              since iOS 7, creating the first unified visual system across all Apple platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Digital Meta-Material</h3>
              <p className="text-white/70 leading-relaxed">
                Not recreating physical glass, but creating an adaptive digital material that 
                combines optical qualities with fluid interactions only Apple can achieve.
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Unified Ecosystem</h3>
              <p className="text-white/70 leading-relaxed">
                One unified development framework across iOS 26, iPadOS 26, macOS 26, watchOS 26, 
                and visionOS 26 with consistent APIs and design patterns.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 text-center">
            <blockquote className="text-2xl text-white/90 italic mb-4">
              "The optical qualities of glass with a fluidity only Apple can achieve."
            </blockquote>
            <cite className="text-white/60">— Alan Dye, VP of Human Interface Design</cite>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Design Principles</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the core elements that make Liquid Glass a revolutionary interface design system.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Translucency</h3>
              <p className="text-white/70 leading-relaxed">
                Frosted glass appearance with dynamic light refraction and reflection, 
                creating depth and visual hierarchy.
              </p>
            </div>

            <div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Specular Highlights</h3>
              <p className="text-white/70 leading-relaxed">
                Dynamic light reflection responding to movement in real-time, 
                enhancing the tactile feel of digital interfaces.
              </p>
            </div>

            <div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lensing Effects</h3>
              <p className="text-white/70 leading-relaxed">
                Visual warping and bending that communicates depth and layering, 
                creating immersive spatial experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section id="learning" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Learn & Code</h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              Master Apple's Liquid Glass design system with comprehensive code examples and video tutorials. 
              From fundamental glassmorphism CSS to advanced SwiftUI implementations for iOS 26, macOS 26, and visionOS 26.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center space-x-4 text-sm text-white/60">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Regular Updates
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  WWDC 2025 Content
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  All Skill Levels
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="glass-card p-2">
              <div className="flex space-x-2">
                {Object.entries(videoCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === key
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {videoCategories[activeTab as keyof typeof videoCategories].title}
              </h3>
              <p className="text-lg text-white/70">
                {videoCategories[activeTab as keyof typeof videoCategories].description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoCategories[activeTab as keyof typeof videoCategories].videos.map((video, index) => (
                <VideoPlayer
                  key={index}
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  appleUrl=""
                  youtubeId={video.youtubeId}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer & Design Resources */}
      <section id="resources" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Resources</h2>
            <p className="text-xl text-white/70">
              Everything you need to implement Liquid Glass in your projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Developer Resources */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <Code2 className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Developer Resources</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-green-300">
                  <div>.glass-effect {`{`}</div>
                  <div className="ml-4">backdrop-filter: blur(20px);</div>
                  <div className="ml-4">background: rgba(255,255,255,0.1);</div>
                  <div className="ml-4">border: 1px solid rgba(255,255,255,0.2);</div>
                  <div>{`}`}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a 
                  href="https://developer.apple.com/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <span className="text-white/80 group-hover:text-white">Xcode & SDKs</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                </a>
                <a 
                  href="https://developer.apple.com/download/applications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <span className="text-white/80 group-hover:text-white">Development Apps</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                </a>
                <a 
                  href="https://developer.apple.com/download/all/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <span className="text-white/80 group-hover:text-white">All Downloads</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Design Resources */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <Palette className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Design Resources</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg text-center">
                    <div className="text-xs text-white/60 mb-1">iPhone 15 Pro</div>
                    <div className="text-sm text-white font-medium">Figma Kit</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-lg text-center">
                    <div className="text-xs text-white/60 mb-1">iPad Pro</div>
                    <div className="text-sm text-white font-medium">Sketch Kit</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-4 rounded-lg text-center">
                    <div className="text-xs text-white/60 mb-1">MacBook Pro</div>
                    <div className="text-sm text-white font-medium">Adobe XD</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "SF Symbols 5",
                  "Apple Design Resources",
                  "iOS 18 UI Kit",
                  "macOS Sequoia Kit"
                ].map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-3" />
                      <span className="text-white/80">{tool}</span>
                    </div>
                    <Download className="w-4 h-4 text-white/60" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a 
                  href="https://developer.apple.com/design/resources/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-primary w-full justify-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Download All Resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="mb-8">
              <Mail className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Never Miss an Update</h2>
              <p className="text-xl text-white/80 mb-4">
                Join thousands of designers and developers staying ahead with Liquid Glass
              </p>
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
                Get exclusive access to new design resources, SwiftUI code snippets, WWDC 2025 insights, 
                glassmorphism tutorials, and early previews of upcoming iOS 18 and macOS Sequoia design patterns. 
                Delivered weekly to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for Liquid Glass updates"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                  }`}
                >
                  {isSubscribed ? (
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      Subscribed!
                    </div>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                <span className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-400" />
                  No spam
                </span>
                <span className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-400" />
                  Unsubscribe anytime
                </span>
                <span className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-400" />
                  Weekly updates
                </span>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm">
                Join the community: Follow <strong className="text-white/80">liquidglass-kit.dev</strong> for the latest in Apple design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight">Liquid Glass</span>
                  <span className="text-lg text-blue-300 font-semibold">liquidglass-kit.dev</span>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">
                Your ultimate resource hub for Apple's Liquid Glass design system from WWDC 2025. 
                Comprehensive tutorials, design kits, and SwiftUI examples for iOS 18, macOS Sequoia, and visionOS.
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <button 
                  onClick={() => handleShare('x')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Share on X"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-white bg-black rounded-sm">
                    <span className="text-sm font-bold">𝕏</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Share on Facebook"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-white bg-blue-600 rounded-sm">
                    <span className="text-sm font-bold">f</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Copy"
                >
                  <Link className="w-5 h-5 text-white/70 hover:text-white" />
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('learning')} className="block text-white/60 hover:text-white transition-colors">Learning Resources</button>
                <button onClick={() => scrollToSection('resources')} className="block text-white/60 hover:text-white transition-colors">Design Resources</button>
                <button onClick={() => scrollToSection('features')} className="block text-white/60 hover:text-white transition-colors">Features</button>
                <button onClick={() => scrollToSection('overview')} className="block text-white/60 hover:text-white transition-colors">Overview</button>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Developer Resources</h3>
              <div className="space-y-2">
                <a href="https://developer.apple.com/design/resources/" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">Apple Design Resources</a>
                <a href="https://developer.apple.com/download/" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">Xcode & SDKs</a>
                <a href="https://developer.apple.com/design/human-interface-guidelines/" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">Human Interface Guidelines</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-white/70 text-sm">
                  © 2025 <strong className="text-white font-medium">liquidglass-kit.dev</strong> - Community resource for Apple's Liquid Glass design system
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Liquid Glass and Apple trademarks are property of Apple Inc. This is an independent community resource.
                </p>
              </div>
              
              <div className="flex items-center space-x-1 text-white/50 text-xs">
                <span>Made with</span>
                <span className="text-red-400">♥</span>
                <span>for the design community</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;