'use client';

import { Canvas } from '@react-three/fiber';
import { View, Preload, OrbitControls } from '@react-three/drei';
import { Suspense, useRef, ReactNode, RefObject, MutableRefObject } from 'react';
import { ACESFilmicToneMapping } from 'three';

/**
 * GlobalCanvas Component
 * 
 * Architecture: Single Canvas Pattern with View Scissors
 * 
 * This component renders ONE WebGL context that all 3D scenes share.
 * Individual <View> components project their scenes into specific DOM regions
 * using gl.scissor() under the hood, avoiding WebGL context limits.
 * 
 * CRITICAL: This Canvas is mounted once in the root layout and never unmounts.
 */
export function GlobalCanvas({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Fixed canvas layer - renders behind all HTML */}
      <div
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        <Canvas
          eventSource={canvasRef as any}
          className="pointer-events-auto"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]} // Adaptive pixel ratio for performance
        >
          {/* Ambient lighting for all scenes */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Preload common assets */}
          <Preload all />

          {/* This is where View components will inject their scenes */}
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </div>

      {/* HTML content layer - renders above canvas */}
      <div className="relative z-10 pointer-events-auto">
        {/* App content goes here via layout */}
      </div>
    </>
  );
}

/**
 * ViewportScene Component
 * 
 * Wrapper for individual 3D scenes that need to be tracked to a DOM element.
 * Use this in page components with a ref to bind the 3D scene to HTML.
 */
interface ViewportSceneProps {
  trackRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  orbit?: boolean;
}

export function ViewportScene({ trackRef, children, orbit = false }: ViewportSceneProps) {
  return (
    <View track={trackRef as MutableRefObject<HTMLElement>}>
      {children}
      {orbit && <OrbitControls makeDefault />}
    </View>
  );
}
