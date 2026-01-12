'use client';

import { useRef, useEffect } from 'react';
import { View } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAtlasStore } from '@/lib/store';
import { LiquidShader } from '../exhibits/LiquidShader';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DocumentarySection {
  title: string;
  subtitle: string;
  content: string;
  shaderState: {
    uViscosity?: number;
    uDistortion?: number;
    uIntensity?: number;
    uColor?: [number, number, number];
  };
}

const DOCUMENTARY_SECTIONS: DocumentarySection[] = [
  {
    title: 'The Beginning',
    subtitle: 'Where Static Interfaces Ruled',
    content:
      'In the early web, interfaces were lifeless. HTML rendered text and images, but nothing breathed. CSS added color and layout, but pixels remained inert. The gap between what we could imagine and what browsers could render felt insurmountable.',
    shaderState: {
      uViscosity: 0.1,
      uDistortion: 0.5,
      uIntensity: 0.3,
    },
  },
  {
    title: 'The Awakening',
    subtitle: 'WebGL Opens the GPU',
    content:
      'When WebGL arrived, everything changed. Suddenly, the GPU—dormant in browsers for years—became accessible. We could write shaders, manipulate vertices, and render 60fps graphics that rivaled native applications. The web was no longer a document viewer; it was a canvas.',
    shaderState: {
      uViscosity: 0.5,
      uDistortion: 1.0,
      uIntensity: 0.7,
    },
  },
  {
    title: 'The Experimentation',
    subtitle: 'Shaders as UI Language',
    content:
      'We began treating shaders not as effects, but as fundamental building blocks. Noise functions became animations. Fragment shaders became buttons. Vertex displacement became feedback. The line between "graphics" and "interface" dissolved.',
    shaderState: {
      uViscosity: 0.8,
      uDistortion: 1.5,
      uIntensity: 1.0,
    },
  },
  {
    title: 'The Synthesis',
    subtitle: 'Biotech Brutalism Emerges',
    content:
      'The aesthetic you see here—rigid grids housing organic chaos—emerged from this experimentation. We call it Biotech Brutalism. Thin borders and monospace type (The Cyber) contain fluid, bioluminescent shaders (The Organic). Order and entropy, in harmony.',
    shaderState: {
      uViscosity: 1.0,
      uDistortion: 2.0,
      uIntensity: 1.5,
      uColor: [0, 1, 0.53], // Shift to bio green
    },
  },
  {
    title: 'The Future',
    subtitle: 'Interfaces That Think',
    content:
      'Where do we go from here? AI-driven shaders that adapt to user emotion? Haptic feedback via visual distortion? Interfaces that blur the line between screen and reality? The next decade will answer these questions. This atlas is just the beginning.',
    shaderState: {
      uViscosity: 0.5,
      uDistortion: 1.0,
      uIntensity: 1.0,
      uColor: [0, 0.94, 1], // Back to cyan
    },
  },
];

export function DocumentaryScroll() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const { updateUniform } = useAtlasStore();

  useEffect(() => {
    if (!canvasRef.current || sectionsRef.current.length === 0) return;

    // Create scroll triggers for each section
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const sectionData = DOCUMENTARY_SECTIONS[index];

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          // Animate shader uniforms when entering section
          gsap.to({}, {
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: function() {
              const progress = this.progress();
              
              if (sectionData.shaderState.uViscosity !== undefined) {
                updateUniform('uViscosity', sectionData.shaderState.uViscosity * progress);
              }
              if (sectionData.shaderState.uDistortion !== undefined) {
                updateUniform('uDistortion', sectionData.shaderState.uDistortion * progress);
              }
              if (sectionData.shaderState.uIntensity !== undefined) {
                updateUniform('uIntensity', sectionData.shaderState.uIntensity * progress);
              }
              if (sectionData.shaderState.uColor) {
                updateUniform('uColor', sectionData.shaderState.uColor);
              }
            },
          });
        },
        markers: false, // Set to true for debugging
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [updateUniform]);

  return (
    <div className="relative">
      {/* Fixed 3D Background */}
      <div
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ isolation: 'isolate' }}
      >
        {canvasRef.current && (
          <View track={canvasRef}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <LiquidShader />
          </View>
        )}
      </div>

      {/* Scrolling Text Content */}
      <div className="relative z-10 min-h-screen">
        {/* Spacer for initial scroll */}
        <div className="h-screen" />

        {/* Documentary Sections */}
        <div className="container mx-auto max-w-3xl px-6 space-y-screen">
          {DOCUMENTARY_SECTIONS.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              className="min-h-screen flex items-center"
            >
              <div className="glass-panel hud-border p-12 w-full">
                <div className="mb-6">
                  <span className="text-xs text-[#999999] tracking-widest">
                    CHAPTER {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-editorial text-5xl mb-4">
                  {section.title}
                </h2>
                <h3 className="text-2xl text-[#00F0FF] mb-8">
                  {section.subtitle}
                </h3>
                <p className="text-lg text-[#E0E0E0] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for final scroll */}
        <div className="h-screen" />
      </div>
    </div>
  );
}
