'use client';

import { useRef } from 'react';
import { View } from '@react-three/drei';
import { LiquidShader } from './LiquidShader';
import { KineticTypography } from './KineticTypography';
import { AetherSync } from './AetherSync';

interface ExhibitViewerProps {
  exhibitId: string;
  className?: string;
}

/**
 * ExhibitViewer Component
 * 
 * Renders the appropriate 3D exhibit based on ID.
 * Uses View pattern to inject into the global Canvas.
 */
export function ExhibitViewer({ exhibitId, className }: ExhibitViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map exhibit IDs to their 3D components
  const renderExhibit = () => {
    switch (exhibitId) {
      case 'kinetic-typography':
        return <KineticTypography />;
      case 'liquid-shader-ui':
        return <LiquidShader />;
      case 'aether-sync':
        return <AetherSync />;
      default:
        // Fallback for exhibits without custom 3D scenes
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#00F0FF" wireframe />
          </mesh>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ isolation: 'isolate' }}
    >
      {containerRef.current && (
        <View track={containerRef}>
          {/* Ambient lighting for the exhibit */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
          
          {/* Render the selected exhibit */}
          {renderExhibit()}
        </View>
      )}
    </div>
  );
}
