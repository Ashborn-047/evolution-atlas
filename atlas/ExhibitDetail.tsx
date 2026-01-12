'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { View } from '@react-three/drei';
import { X } from 'lucide-react';
import { Exhibit } from '@/lib/exhibits';
import { PortalScene } from '../exhibits/PortalScene';
import { useAtlasStore } from '@/lib/store';
import { SHADERS } from '@/lib/shaders';

interface ExhibitDetailProps {
  exhibit: Exhibit;
  onClose: () => void;
}

const PORTAL_CONFIG: Record<string, { variant: 'cube' | 'sphere' | 'torus'; color: string }> = {
  'kinetic-typography': { variant: 'cube', color: '#00F0FF' },
  'liquid-shader-ui': { variant: 'sphere', color: '#FF00FF' },
  'aether-sync': { variant: 'torus', color: '#00FF88' },
  'shader-vault': { variant: 'cube', color: '#FFD700' },
  'chroma-kinetics': { variant: 'sphere', color: '#FF3366' },
  'ui-atlas': { variant: 'torus', color: '#00F0FF' },
};

export function ExhibitDetail({ exhibit, onClose }: ExhibitDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = PORTAL_CONFIG[exhibit.id] || { variant: 'cube', color: '#00F0FF' };
  const { toggleVault, setActiveShaderCode } = useAtlasStore();

  useEffect(() => {
    // Load shader code if available
    if (exhibit.shaderKey && SHADERS[exhibit.shaderKey]) {
      const shader = SHADERS[exhibit.shaderKey];
      const code = `// ${shader.name}\n// ${shader.description}\n\n// VERTEX SHADER\n${shader.vertex}\n\n// FRAGMENT SHADER\n${shader.fragment}`;
      setActiveShaderCode(code);
    }
  }, [exhibit.shaderKey, setActiveShaderCode]);

  const handleOpenVault = () => {
    if (exhibit.shaderKey) {
      toggleVault();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-sm" />

      {/* Detail Card */}
      <motion.div
        layoutId={`card-${exhibit.id}`}
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto hud-border glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-[#1A1A1A] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero 3D Scene */}
        <div
          ref={containerRef}
          className="w-full h-96 relative"
          style={{ isolation: 'isolate' }}
        >
          {containerRef.current && (
            <View track={containerRef}>
              <PortalScene variant={config.variant} color={config.color} />
            </View>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-[#999999]">{exhibit.year}</span>
                <span
                  className="text-xs px-3 py-1 border"
                  style={{ borderColor: config.color, color: config.color }}
                >
                  {exhibit.category}
                </span>
              </div>
              <h2 className="font-editorial text-5xl mb-4">{exhibit.title}</h2>
              <p className="text-xl text-[#999999]">{exhibit.tagline}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h3 className="text-sm text-[#999999] mb-3">TECHNOLOGY STACK</h3>
            <div className="flex flex-wrap gap-2">
              {exhibit.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-2 bg-[#1A1A1A] border border-[rgba(224,224,224,0.1)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* The Hypothesis */}
          <div className="mb-12">
            <h3 className="font-editorial text-3xl mb-4">The Hypothesis</h3>
            <p className="text-lg text-[#E0E0E0] leading-relaxed">
              {exhibit.hypothesis}
            </p>
          </div>

          {/* The Architecture */}
          <div className="mb-12">
            <h3 className="font-editorial text-3xl mb-4">The Architecture</h3>
            <p className="text-lg text-[#E0E0E0] leading-relaxed">
              {exhibit.architecture}
            </p>
          </div>

          {/* Future Implications */}
          <div className="mb-12">
            <h3 className="font-editorial text-3xl mb-4">Future Implications</h3>
            <p className="text-lg text-[#E0E0E0] leading-relaxed">
              {exhibit.implications}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {exhibit.shaderKey && (
              <button
                onClick={handleOpenVault}
                className="px-6 py-3 border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#050505] transition-colors"
              >
                VIEW SHADER CODE
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[rgba(224,224,224,0.1)] hover:border-[#E0E0E0] transition-colors"
            >
              BACK TO ATLAS
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
