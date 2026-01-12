'use client';

import { useState } from 'react';
import { GlobalCanvas } from './components/canvas/GlobalCanvas';
import { AtlasGrid } from './components/atlas/AtlasGrid';
import { DocumentaryScroll } from './components/documentary/DocumentaryScroll';
import { ShaderVault } from './components/library/ShaderVault';
import { ShaderControls } from './components/library/ShaderControls';

type Mode = 'gallery' | 'documentary';

export default function App() {
  const [mode, setMode] = useState<Mode>('gallery');

  return (
    <>
      {/* Global WebGL Canvas - renders behind everything */}
      <GlobalCanvas />
      
      {/* Shader Vault - global slide-out panel */}
      <ShaderVault />
      
      {/* Shader Controls - HUD for uniform manipulation */}
      <ShaderControls />
      
      {/* Main content - renders above canvas */}
      <div className="relative min-h-screen">
        {/* Header HUD */}
        <header className="fixed top-0 left-0 right-0 z-50 hud-border border-b glass-panel">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-editorial text-2xl tracking-tight">
                The Evolution Atlas
              </h1>
              <p className="text-xs text-[#999999] mt-1">
                A Digital Museum of Interface Design
              </p>
            </div>
            
            <nav className="flex items-center gap-6 text-sm">
              <button
                onClick={() => setMode('gallery')}
                className={`hover:text-[#00F0FF] transition-colors ${
                  mode === 'gallery' ? 'text-[#00F0FF]' : ''
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setMode('documentary')}
                className={`hover:text-[#00F0FF] transition-colors ${
                  mode === 'documentary' ? 'text-[#00F0FF]' : ''
                }`}
              >
                Documentary
              </button>
            </nav>
          </div>
        </header>

        {/* Conditional rendering based on mode */}
        {mode === 'gallery' ? (
          <>
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center max-w-4xl px-6">
                <h2 className="font-editorial text-7xl mb-6 leading-tight">
                  Where Code Becomes
                  <span className="text-[#00F0FF]"> Experience</span>
                </h2>
                <p className="text-xl text-[#999999] max-w-2xl mx-auto mb-12">
                  Six experiments in computational aesthetics. Each a thesis on the future
                  of digital interaction. Explore the exhibits below.
                </p>
                
                {/* Scroll indicator */}
                <div className="flex flex-col items-center gap-2 animate-pulse">
                  <span className="text-xs text-[#999999]">SCROLL TO EXPLORE</span>
                  <div className="w-px h-12 bg-[#00F0FF]" />
                </div>
              </div>
            </section>

            {/* Coming next: Atlas Grid will go here */}
            <section className="container mx-auto px-6 pb-20">
              <div className="text-center mb-16">
                <h3 className="font-editorial text-4xl mb-4">The Exhibits</h3>
                <p className="text-[#999999]">
                  Six repositories, unified. Click any exhibit to enter.
                </p>
              </div>

              {/* Interactive Portal Cards with 3D scenes */}
              <AtlasGrid />
            </section>

            {/* Footer */}
            <footer className="hud-border border-t glass-panel py-8">
              <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-[#999999]">
                  Built with React Three Fiber, Next.js, and GLSL
                </p>
                <p className="text-xs text-[#999999] mt-2">
                  © 2025 The Evolution Atlas. All shaders open source.
                </p>
              </div>
            </footer>
          </>
        ) : (
          <DocumentaryScroll />
        )}
      </div>
    </>
  );
}