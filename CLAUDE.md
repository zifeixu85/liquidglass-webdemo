# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview

# Run ESLint check
npm run lint
```

## Project Architecture

This is a single-page application (SPA) showcasing Apple's "Liquid Glass" design system.

### Tech Stack
- **Vite** - Build tool and development server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Atomic CSS framework
- **Lucide React** - Icon library

### Core Component Architecture

**App.tsx** (src/App.tsx) is the main component containing all application functionality:
- Interactive draggable glass cards
- Real-time parameter adjustment controls
- Mouse-following parallax background
- Background image switching
- Liquid glass effect implementation

### Style System

The project uses a layered style architecture:

1. **Tailwind Base Styles** - Provides atomic CSS classes
2. **Custom Component Styles** (src/index.css):
   - `.liquidGlass-wrapper` - Main glass container
   - `.liquidGlass-effect` - Distortion effect layer
   - `.liquidGlass-tint` - Color tint layer
   - `.liquidGlass-shine` - Shine effect layer
   - Uses `backdrop-filter` for glassmorphism effects with fallbacks

### Key Design Patterns

1. **State Management**: Uses React hooks (useState, useEffect) for local state
2. **Responsive Design**: Implemented through Tailwind's responsive prefixes
3. **Animation Effects**: 
   - CSS animations (floating, auto-flow)
   - Tailwind transition effects
   - Mouse tracking for parallax effects
   - SVG filters for liquid distortion

### Project Structure Features

- Component-based architecture with draggable UI elements
- Real-time parameter controls for glass effects
- No routing system - single page application
- No external state management - uses component local state
- Interactive content with mouse and drag interactions

### Build Configuration

- Vite configuration excludes lucide-react from dependency optimization
- TypeScript configuration split into three files: tsconfig.json (main), tsconfig.app.json (app), tsconfig.node.json (Node)