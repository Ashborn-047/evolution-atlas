'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Note: SplitText is a premium plugin, we'll use a CSS-based approach instead
}

interface DocumentarySection {
  title: string;
  subtitle: string;
  content: string;
  color: string;
  icon: string;
}

const DOCUMENTARY_SECTIONS: DocumentarySection[] = [
  {
    title: 'The Beginning',
    subtitle: 'Where Static Interfaces Ruled',
    content:
      'In the early web, interfaces were lifeless. HTML rendered text and images, but nothing breathed. CSS added color and layout, but pixels remained inert. The gap between what we could imagine and what browsers could render felt insurmountable.',
    color: '#ff3333',
    icon: '◉',
  },
  {
    title: 'The Awakening',
    subtitle: 'WebGL Opens the GPU',
    content:
      'When WebGL arrived, everything changed. Suddenly, the GPU—dormant in browsers for years—became accessible. We could write shaders, manipulate vertices, and render 60fps graphics that rivaled native applications. The web was no longer a document viewer; it was a canvas.',
    color: '#06b6d4',
    icon: '◎',
  },
  {
    title: 'The Experimentation',
    subtitle: 'Shaders as UI Language',
    content:
      'We began treating shaders not as effects, but as fundamental building blocks. Noise functions became animations. Fragment shaders became buttons. Vertex displacement became feedback. The line between "graphics" and "interface" dissolved.',
    color: '#22c55e',
    icon: '◈',
  },
  {
    title: 'The Synthesis',
    subtitle: 'Biotech Brutalism Emerges',
    content:
      'The aesthetic you see here—rigid grids housing organic chaos—emerged from this experimentation. We call it Biotech Brutalism. Thin borders and monospace type (The Cyber) contain fluid, bioluminescent shaders (The Organic). Order and entropy, in harmony.',
    color: '#8b5cf6',
    icon: '◇',
  },
  {
    title: 'The Future',
    subtitle: 'Interfaces That Think',
    content:
      'Where do we go from here? AI-driven shaders that adapt to user emotion? Haptic feedback via visual distortion? Interfaces that blur the line between screen and reality? The next decade will answer these questions. This atlas is just the beginning.',
    color: '#00F0FF',
    icon: '◆',
  },
];

export function DocumentaryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-24">
      {/* Fixed progress line on the left */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 h-64 w-px bg-[#1A1A1A] z-40 hidden lg:block">
        <div
          ref={progressRef}
          className="w-full h-full bg-gradient-to-b from-[#00F0FF] to-[#FF00FF]"
          style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
        />
        {/* Progress dots */}
        {DOCUMENTARY_SECTIONS.map((section, index) => (
          <div
            key={index}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 bg-[#050505]"
            style={{
              top: `${(index / (DOCUMENTARY_SECTIONS.length - 1)) * 100}%`,
              borderColor: section.color,
            }}
          />
        ))}
      </div>

      {/* Chapter navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {DOCUMENTARY_SECTIONS.map((section, index) => (
          <a
            key={index}
            href={`#chapter-${index + 1}`}
            className="group flex items-center gap-3 text-right"
          >
            <span className="text-xs text-[#999999] opacity-0 group-hover:opacity-100 transition-opacity">
              {section.title}
            </span>
            <div
              className="w-2 h-2 rounded-full transition-all group-hover:scale-150"
              style={{ backgroundColor: section.color }}
            />
          </a>
        ))}
      </div>

      {/* Header */}
      <div className="container mx-auto max-w-4xl px-6 mb-24 text-center">
        <p className="text-xs text-[#00F0FF] tracking-[0.3em] mb-4 uppercase">Documentary Mode</p>
        <h1 className="font-editorial text-5xl md:text-6xl lg:text-7xl mb-6">
          The Story of
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88]">
            Interface Evolution
          </span>
        </h1>
        <p className="text-lg text-[#999999] max-w-2xl mx-auto">
          A visual narrative through five transformative eras that shaped how we interact with digital interfaces.
        </p>
      </div>

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
              <p className="section-content text-base md:text-lg text-[#999999] leading-relaxed max-w-3xl">
                {section.content}
              </p>

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

      {/* Ending */}
      <div className="container mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="glass-panel hud-border p-12 md:p-16">
          <p className="font-editorial text-2xl md:text-3xl text-[#E0E0E0] mb-4">
            "The interface is no longer waiting."
          </p>
          <p className="text-sm text-[#999999]">
            — Living Interface Ecosystem
          </p>
        </div>
      </div>
    </div>
  );
}
