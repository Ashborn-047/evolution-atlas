'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DitheringShader } from '../ui/DitheringShader';
import { ChapterModal } from './ChapterModal';
import { ChromaticDispersion } from '../ui/ChromaticDispersion';
import { ArrowLeft } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Note: SplitText is a premium plugin, we'll use a CSS-based approach instead
}

interface DocumentaryMarker {
  label: string;
  url: string;
}

interface DocumentarySection {
  title: string;
  subtitle: string;
  content: string;
  color: string;
  icon: string;
  markers: DocumentaryMarker[];
}

export const DOCUMENTARY_SECTIONS: DocumentarySection[] = [
  {
    title: 'The Beginning',
    subtitle: 'Where Static Interfaces Ruled',
    content:
      'In the early web, interfaces were lifeless. HTML rendered text and images, but nothing breathed. CSS added color and layout, but pixels remained inert. The gap between what we could imagine and what browsers could render felt insurmountable.',
    color: '#ff3333',
    icon: '◉',
    markers: [
      { label: 'Solid State (1995)', url: '/collections/Interface design/index.html#standalone-solid' },
      { label: 'Terminal Hierarchy', url: '/collections/Interface design/index.html#standalone-solid' },
      { label: 'Static CSS Layouts', url: '/collections/Interface design/index.html#standalone-solid' },
      { label: 'Monospace Type', url: '/collections/Typography/experiments/pixels.html#standalone' }
    ],
  },
  {
    title: 'The Awakening',
    subtitle: 'WebGL Opens the GPU',
    content:
      'When WebGL arrived, everything changed. Suddenly, the GPU—dormant in browsers for years—became accessible. We could write shaders, manipulate vertices, and render 60fps graphics that rivaled native applications. The web was no longer a document viewer; it was a canvas.',
    color: '#06b6d4',
    icon: '◎',
    markers: [
      { label: 'ELASTIC Physics', url: '/collections/Typography/experiments/elastic.html#standalone' },
      { label: 'VERTEX Primitives', url: '/collections/Typography/experiments/vertex.html#standalone' },
      { label: 'Plasma Ball GLSL', url: '/collections/Shaders for UI/index.html#standalone-Plasma Ball' },
      { label: 'Binary Streams', url: '/collections/Shaders for UI/index.html#standalone-Binary Stream' }
    ],
  },
  {
    title: 'The Experimentation',
    subtitle: 'Shaders as UI Language',
    content:
      'We began treating shaders not as effects, but as fundamental building blocks. Noise functions became animations. Fragment shaders became buttons. Vertex displacement became feedback. The line between "graphics" and "interface" dissolved.',
    color: '#22c55e',
    icon: '◈',
    markers: [
      { label: 'Interactive Ripple', url: '/collections/Liquid Shader Ui/examples/ripple/index.html#standalone' },
      { label: 'Liquid Mercury Nav', url: '/collections/Liquid Shader Ui/examples/mercury/index.html#standalone' },
      { label: 'Rainy Pond Surface', url: '/collections/Liquid Shader Ui/examples/pond/index.html#standalone' },
      { label: 'Physics Feedback', url: '/collections/Liquid Shader Ui/examples/rain/index.html#standalone' }
    ],
  },
  {
    title: 'The Synthesis',
    subtitle: 'Biotech Brutalism Emerges',
    content:
      'The aesthetic you see here—rigid grids housing organic chaos—emerged from this experimentation. We call it Biotech Brutalism. Thin borders and monospace type (The Cyber) contain fluid, bioluminescent shaders (The Organic). Order and entropy, in harmony.',
    color: '#8b5cf6',
    icon: '◇',
    markers: [
      { label: 'Glass Age (2010)', url: '/collections/Interface design/index.html#standalone-glass' },
      { label: 'Organic Flow (2020)', url: '/collections/Interface design/index.html#standalone-fluid' },
      { label: 'Hybrid Design', url: '/collections/Interface design/index.html#standalone-hybrid' },
      { label: 'Biotech Layouts', url: '/collections/Interface design/index.html#standalone-hybrid' }
    ],
  },
  {
    title: 'The Future',
    subtitle: 'Interfaces That Think',
    content:
      'Where do we go from here? AI-driven shaders that adapt to user emotion? Haptic feedback via visual distortion? Interfaces that blur the line between screen and reality? The next decade will answer these questions. This atlas is just the beginning.',
    color: '#00F0FF',
    icon: '◆',
    markers: [
      { label: 'Neural Ripple AI', url: '/collections/Shaders V2/index.html#standalone' },
      { label: 'Probabilistic UI', url: '/collections/Interface ecosystem and environment/index.html#standalone' },
      { label: 'Ambient Wash', url: '/collections/Interface ecosystem and environment/index.html#standalone' },
      { label: 'Adaptive Shapes', url: '/collections/Shaders V2/index.html#standalone' }
    ],
  },
];

export function DocumentaryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each section
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const chapterLabel = section.querySelector('.chapter-label');
        const title = section.querySelector('.section-title');
        const subtitle = section.querySelector('.section-subtitle');
        const content = section.querySelector('.section-content');
        const decorLine = section.querySelector('.decor-line');
        const icon = section.querySelector('.section-icon');

        // Create timeline for each section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // Icon animation
        if (icon) {
          tl.fromTo(icon,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
            0
          );
        }

        // Chapter label
        if (chapterLabel) {
          tl.fromTo(chapterLabel,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
            0.1
          );
        }

        // Decorative line
        if (decorLine) {
          tl.fromTo(decorLine,
            { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 0.8, ease: 'power3.out' },
            0.2
          );
        }

        // Title - letter by letter animation
        if (title) {
          tl.fromTo(title,
            { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' },
            0.3
          );
        }

        // Subtitle
        if (subtitle) {
          tl.fromTo(subtitle,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            0.5
          );
        }

        // Content - fade up
        if (content) {
          tl.fromTo(content,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            0.6
          );
        }

        // Parallax effect on the card
        gsap.to(section.querySelector('.section-card'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Sidebars removed as requested
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-24">

      {/* Documentary Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Shader */}
        <div className="absolute inset-0 z-0">
          <DitheringShader
            shape="ripple"
            type="2x2"
            colorBack="#050505"
            colorFront="#1a3040"
            pxSize={3}
            speed={0.8}
          />
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] pointer-events-none" />

        <div className="container mx-auto max-w-4xl px-6 pb-32 text-center relative z-10">
          <p className="text-xs text-[#00F0FF] tracking-[0.3em] mb-6 uppercase opacity-80">Documentary Mode</p>
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            The Story of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88] mt-2">
              Interface Evolution
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#E0E0E0]/70 max-w-2xl mx-auto font-light leading-relaxed">
            A visual narrative through five transformative eras that shaped how we interact with digital interfaces.
          </p>
        </div>

        {/* Scroll Indicator - Outside container to avoid flex conflicts */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-mono">Scroll to Begin</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00F0FF] to-transparent" />
        </div>
      </section>

      {/* Spacer to first chapter */}
      <div className="h-32" />

      {/* Documentary Sections */}
      <div className="container mx-auto max-w-4xl px-6 space-y-48 pb-48">
        {DOCUMENTARY_SECTIONS.map((section, index) => (
          <div
            key={index}
            id={`chapter-${index + 1}`}
            ref={(el) => { sectionsRef.current[index] = el; }}
            className="relative"
          >
            {/* Section card */}
            <div
              className="section-card relative p-8 md:p-12 lg:p-16"
              style={{
                background: `linear-gradient(135deg, ${section.color}08 0%, transparent 50%)`,
                borderLeft: `3px solid ${section.color}`,
              }}
            >
              {/* Icon */}
              <div
                className="section-icon absolute -left-6 top-8 w-12 h-12 flex items-center justify-center text-2xl rounded-full"
                style={{
                  backgroundColor: section.color,
                  color: '#050505',
                  boxShadow: `0 0 30px ${section.color}50`,
                }}
              >
                {section.icon}
              </div>

              {/* Chapter label */}
              <div className="chapter-label mb-6">
                <span
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: section.color }}
                >
                  Chapter {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Decorative line */}
              <div
                className="decor-line h-px mb-8"
                style={{
                  background: `linear-gradient(90deg, ${section.color} 0%, transparent 100%)`,
                }}
              />

              {/* Title */}
              <h2
                className="section-title font-editorial text-4xl md:text-5xl lg:text-6xl mb-4"
                style={{ color: '#E0E0E0' }}
              >
                {section.title}
              </h2>

              {/* Subtitle */}
              <h3
                className="section-subtitle text-xl md:text-2xl mb-8"
                style={{ color: section.color }}
              >
                {section.subtitle}
              </h3>

              {/* Content */}
              <p className="section-content text-base md:text-lg text-[#999999] leading-relaxed max-w-3xl mb-10">
                {section.content}
              </p>

              {/* Read More Button */}
              <button
                onClick={() => setSelectedChapter(index)}
                className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full transition-all group-hover:scale-150" style={{ backgroundColor: section.color }} />
                <span className="text-sm font-mono tracking-widest uppercase">Read Insight</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Era indicator */}
              <div className="mt-12 flex items-center gap-4">
                <div
                  className="text-6xl md:text-8xl font-editorial font-bold opacity-10"
                  style={{ color: section.color }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-xs text-[#999999]">
                  of {DOCUMENTARY_SECTIONS.length} chapters
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Immersive Footer Redesign */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* New Shader Kind */}
        <ChromaticDispersion />

        {/* Dynamic Typography Reveal */}
        <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="font-editorial text-4xl md:text-6xl text-white mb-12 drop-shadow-2xl">
              "The interface is no longer waiting."
            </h2>

            <div className="flex flex-col items-center gap-12">
              <div className="w-px h-24 bg-gradient-to-b from-white to-transparent opacity-20" />

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-mono">
                  Evolution Synthesis Complete
                </p>
                <div className="text-xl md:text-2xl text-[#00F0FF] font-light">
                  Living Interface Ecosystem
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group relative px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 to-[#FF00FF]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative flex items-center gap-3">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm font-mono tracking-widest uppercase text-white">Return to Evolution</span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter Modal */}
      <ChapterModal
        isOpen={selectedChapter !== null}
        onClose={() => setSelectedChapter(null)}
        chapterIndex={selectedChapter}
      />
    </div>
  );
}
