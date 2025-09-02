# DNA & RNA 3D Interactive Game

## Overview

This project is a 3D educational science-based game that teaches molecular biology concepts through interactive gameplay. The application features two distinct game modes: Genetic Modification (where players edit DNA/RNA sequences to create disease resistance) and Drug Discovery (where players design and test drugs to combat pathogens). Built with React Three Fiber for 3D visualization and modern web technologies, the game combines real biological logic with beginner-friendly gameplay mechanics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript as the core frontend framework
- **React Three Fiber** (@react-three/fiber) for 3D rendering and WebGL integration
- **Three.js ecosystem** including @react-three/drei for 3D utilities and @react-three/postprocessing for visual effects
- **Tailwind CSS** for styling with custom CSS variables for theming
- **Radix UI** components for accessible and consistent UI elements
- **Vite** as the build tool and development server
- **Zustand** stores for state management (game state, DNA/RNA manipulation, drug building, audio)

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** structure with routes organized under `/api` prefix
- **Memory-based storage** system with interface abstraction for future database integration
- **Vite middleware integration** for development with HMR support
- **Error handling middleware** with proper HTTP status codes

### 3D Scene Architecture
- **Modular 3D components** (DNAHelix, DrugMolecule, Pathogen, Lighting)
- **Interactive camera controls** using OrbitControls
- **Keyboard input system** with configurable key mappings
- **Shader support** through vite-plugin-glsl for custom materials
- **Asset loading** for 3D models (GLTF/GLB) and audio files

### Game Logic Structure
- **State-driven game phases** (menu, genetic_modification, drug_discovery, tutorial)
- **Level progression system** with difficulty scaling
- **Scientific accuracy validation** for molecular interactions
- **Real-time simulation** of biological processes
- **Audio feedback system** with mute/unmute capabilities

### Data Management
- **Type-safe schemas** using Drizzle ORM with Zod validation
- **PostgreSQL integration** ready with Neon Database serverless connection
- **Migration system** with Drizzle Kit for schema changes
- **Shared type definitions** between frontend and backend

### UI/UX Architecture
- **Responsive design** with mobile-first approach using Tailwind breakpoints
- **Accessible components** leveraging Radix UI primitives
- **Professional educational software styling** following international standards
- **Scientific color coding** for nucleotides and molecular components
- **Multi-panel interface** with dedicated areas for editing, information, and tutorials

## External Dependencies

### Database & ORM
- **Neon Database** (@neondatabase/serverless) - Serverless PostgreSQL database
- **Drizzle ORM** (drizzle-orm) - Type-safe database toolkit
- **Drizzle Kit** (drizzle-kit) - Database migration and schema management

### 3D Graphics & Visualization
- **Three.js ecosystem** - WebGL 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Three Postprocessing** - Post-processing effects

### UI Framework & Components
- **Radix UI** - Comprehensive set of accessible React components
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority** - Utility for creating variant-based component APIs
- **Lucide React** - Icon library for consistent iconography

### State Management & Data Fetching
- **TanStack Query** (@tanstack/react-query) - Data fetching and caching
- **Zustand** (implied from store structure) - Lightweight state management

### Development & Build Tools
- **Vite** - Fast build tool and development server
- **TypeScript** - Static type checking
- **ESBuild** - Fast JavaScript bundler for production builds
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

### Audio & Fonts
- **Inter font** (@fontsource/inter) - Professional typography
- **Web Audio API** (implied) - Audio playback and sound effects management