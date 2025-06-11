# Liquid Glass Effect Demo

An interactive preview tool showcasing the Liquid Glass effect with CSS glassmorphism, draggable cards, and real-time parameter adjustment.

[![Liquid Glass Effect Demo](./public/demo-screenshot.png)](https://liquidglass-webdemo.vercel.app/)

## Video Demo

<div align="center">
  <a href="https://liquidglass-webdemo.vercel.app/" target="_blank">
    <video width="100%" controls>
      <source src="./public/demo-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </a>
</div>

*Click the video to open the live demo*

## Live Demo

🌐 **[View Live Demo on Vercel ↗](https://liquidglass-webdemo.vercel.app/)**

*Click the screenshot above to open the live demo in a new tab*

## Features

- 🎨 Switch between 9 different background images
- ✨ CSS-powered glassmorphism effects
- 🖱️ Interactive mouse-following parallax background
- 🎯 Draggable glass cards
- ⚙️ Real-time parameter adjustment panel
- 📱 Fully responsive design

## Effect Implementation

This project showcases CSS-based liquid glass effects:

- **Repository**: [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos)
- **Implementation**: Uses CSS filters, backdrop-filter, and SVG filters for the glass distortion effect
- **Interactivity**: Real-time parameter controls with draggable UI components

## How to Implement Liquid Glass Effect

### Core Components

1. **SVG Filter for Distortion**
```xml
<filter id="glass-distortion">
  <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" />
  <feDisplacementMap scale="150" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

2. **CSS Glassmorphism Layers**
```css
.liquidGlass-wrapper {
  position: relative;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5);
}

.liquidGlass-effect {
  filter: url(#glass-distortion);
  backdrop-filter: blur(3px);
}
```

3. **React Component Structure**
```tsx
<div className="liquidGlass-wrapper">
  <div className="liquidGlass-effect" />     {/* Distortion layer */}
  <div className="liquidGlass-tint" />       {/* Color tint layer */}
  <div className="liquidGlass-shine" />      {/* Shine effect layer */}
  <div className="liquidGlass-text">        {/* Content layer */}
    {children}
  </div>
</div>
```

## Tech Stack

- **Vite** - Build tool
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Interactive Features

- **Draggable Cards**: Click and drag any glass card to move it around the screen
- **Real-time Controls**: Adjust glass parameters (tint, blur, distortion, shine, radius, shadows) in real-time
- **Background Parallax**: Move your mouse to see the background follow with smooth parallax motion
- **Background Switching**: Click the "Switch Background" button to cycle through 9 beautiful images
- **Glass Effects**: Experience authentic glassmorphism with backdrop blur and transparency
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Learn More

For more resources and tutorials about the Liquid Glass design system, visit:
👉 [liquidglass-kit.dev ↗](https://liquidglass-kit.dev)

## License

MIT