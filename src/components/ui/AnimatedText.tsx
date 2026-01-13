import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export type TypographyEffect =
    | 'elastic'
    | 'layers'
    | 'glitch'
    | 'vapor'
    | 'pixels'
    | 'aura'
    | 'fluid'
    | 'breathe'
    | 'typewriter';

interface AnimatedTextProps {
    text: string;
    effect?: TypographyEffect;
    className?: string;
    stagger?: number;
    delay?: number;
    trigger?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
    text,
    effect = 'breathe',
    className,
    stagger = 0.05,
    delay = 0,
    trigger = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!trigger || !containerRef.current) return;

        const charElements = containerRef.current.querySelectorAll('.char-item');

        switch (effect) {
            case 'elastic':
                gsap.fromTo(
                    charElements,
                    { y: 50, opacity: 0, scaleY: 0.5 },
                    {
                        y: 0,
                        opacity: 1,
                        scaleY: 1,
                        duration: 1,
                        stagger,
                        delay,
                        ease: 'elastic.out(1, 0.3)',
                    }
                );
                break;

            case 'vapor':
                gsap.fromTo(
                    charElements,
                    { opacity: 0, filter: 'blur(20px)', x: -20 },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        x: 0,
                        duration: 1.5,
                        stagger,
                        delay,
                        ease: 'power2.out',
                    }
                );
                break;

            case 'layers':
                gsap.fromTo(
                    charElements,
                    { opacity: 0, x: -10 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger,
                        delay,
                        ease: 'back.out(1.7)',
                    }
                );
                break;

            case 'typewriter':
                gsap.fromTo(
                    charElements,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.01,
                        stagger: 0.05,
                        delay,
                        ease: 'none',
                    }
                );
                break;

            default:
                gsap.fromTo(
                    charElements,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger,
                        delay,
                        ease: 'power2.out',
                    }
                );
        }
    }, [trigger, effect, stagger, delay]);

    const renderWord = (word: string, wordIdx: number) => {
        return (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => {

                    if (effect === 'glitch') {
                        return (
                            <span
                                key={charIdx}
                                className="char-item relative inline-block group"
                                data-text={char}
                            >
                                <span className="relative z-10">{char}</span>
                                <span className="glitch-layer-red absolute inset-0 opacity-0 group-hover:opacity-70 pointer-events-none" aria-hidden="true">{char}</span>
                                <span className="glitch-layer-cyan absolute inset-0 opacity-0 group-hover:opacity-70 pointer-events-none" aria-hidden="true">{char}</span>
                            </span>
                        );
                    }

                    if (effect === 'aura') {
                        return (
                            <span
                                key={charIdx}
                                className="char-item inline-block transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            >
                                {char}
                            </span>
                        );
                    }

                    return (
                        <span
                            key={charIdx}
                            className={cn(
                                'char-item inline-block',
                                effect === 'breathe' && 'animate-typo-breathe'
                            )}
                        >
                            {char}
                        </span>
                    );
                })}
                {/* Add space after word if not the last one */}
                {wordIdx < text.split(' ').length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
        );
    };

    return (
        <div
            ref={containerRef}
            className={cn('inline-flex flex-wrap items-baseline', className)}
        >
            {text.split(' ').map((word, idx) => renderWord(word, idx))}
        </div>
    );
};
