'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { View } from '@react-three/drei';
import { Exhibit } from '@/lib/exhibits';
import { PortalScene } from '../exhibits/PortalScene';

interface PortalCardProps {
  exhibit: Exhibit;
  onClick: () => void;
}

// Map exhibit IDs to 3D variants and colors
const PORTAL_CONFIG: Record<string, { variant: 'cube' | 'sphere' | 'torus'; color: string }> = {
  'kinetic-typography': { variant: 'cube', color: '#00F0FF' },
  'liquid-shader-ui': { variant: 'sphere', color: '#FF00FF' },
  'aether-sync': { variant: 'torus', color: '#00FF88' },
  'shader-vault': { variant: 'cube', color: '#FFD700' },
  'chroma-kinetics': { variant: 'sphere', color: '#FF3366' },
  'ui-evolution-atlas': { variant: 'torus', color: '#8b5cf6' },
  'living-interface': { variant: 'sphere', color: '#6366f1' },
};

export function PortalCard({ exhibit, onClick }: PortalCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = PORTAL_CONFIG[exhibit.id] || { variant: 'cube', color: '#00F0FF' };

  return (
    <motion.div
      layoutId={`card-${exhibit.id}`}
      className="relative hud-border glass-panel overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 3D Portal View */}
      <div
        ref={containerRef}
        className="w-full h-64 relative"
        style={{ isolation: 'isolate' }}
      >
        {/* View tracks this ref and renders 3D scene here */}
        {containerRef.current && (
          <View track={containerRef as React.MutableRefObject<HTMLElement>}>
            <PortalScene variant={config.variant} color={config.color} />
          </View>
        )}

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs text-[#999999]">{exhibit.year}</span>
          <span
            className="text-xs px-2 py-1 border text-[#00F0FF]"
            style={{ borderColor: config.color, color: config.color }}
          >
            {exhibit.category}
          </span>
        </div>

        <h4 className="font-editorial text-2xl mb-2 group-hover:text-[#00F0FF] transition-colors">
          {exhibit.title}
        </h4>

        <p className="text-sm text-[#999999] mb-4 line-clamp-2">
          {exhibit.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {exhibit.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-[#1A1A1A] border border-[rgba(224,224,224,0.1)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Enter button */}
        <button className="w-full py-2 border border-[rgba(224,224,224,0.1)] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors text-sm">
          ENTER EXHIBIT →
        </button>
      </div>
    </motion.div>
  );
}
