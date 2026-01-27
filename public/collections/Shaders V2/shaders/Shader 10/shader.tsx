'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";

// --- Types & Interfaces ---
interface Character {
    char: string;
    x: number;
    y: number;
    speed: number;
}

interface QueueItem {
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
}

// --- TextScramble Logic ---
class TextScramble {
    el: HTMLElement;
    chars: string;
    queue: QueueItem[];
    frame: number;
    frameRequest: number;
    resolve: (value: void | PromiseLike<void>) => void;

    constructor(el: HTMLElement) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#';
        this.queue = [];
        this.frame = 0;
        this.frameRequest = 0;
        this.resolve = () => { };
        this.update = this.update.bind(this);
    }

    setText(newText: string) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((resolve) => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                // Using inline styling for 'dud' characters
                output += `<span style="color: #0f0; opacity: 0.7;">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++
        }
    }
}

// --- Sub-Component: Scrambled Title ---
const ScrambledTitle: React.FC = () => {
    const elementRef = useRef<HTMLHeadingElement>(null);
    const scramblerRef = useRef<TextScramble | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (elementRef.current && !scramblerRef.current) {
            scramblerRef.current = new TextScramble(elementRef.current);
            setMounted(true);
        }
    }, []);

    useEffect(() => {
        if (mounted && scramblerRef.current) {
            const phrases = [
                'Hello there',
                'It\'s RAINING',
                'with letters',
                'and alphabets',
                'dont FORGET to bring',
                'your umbrella today'
            ];

            let counter = 0;
            const next = () => {
                if (scramblerRef.current) {
                    scramblerRef.current.setText(phrases[counter]).then(() => {
                        setTimeout(next, 2000);
                    });
                    counter = (counter + 1) % phrases.length;
                }
            };

            next();
        }
    }, [mounted]);

    return (
        <h1
            ref={elementRef}
            style={{
                color: 'white',
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textAlign: 'center',
                fontFamily: 'monospace',
                margin: 0
            }}
        >
            RAINING LETTERS
        </h1>
    );
};

// --- Main Component: RainingLetters ---
export const RainingLetters: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

    const createCharacters = useCallback(() => {
        const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        const charCount = 300;
        const newCharacters: Character[] = [];

        for (let i = 0; i < charCount; i++) {
            newCharacters.push({
                char: allChars[Math.floor(Math.random() * allChars.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.1 + Math.random() * 0.3,
            });
        }

        return newCharacters;
    }, []);

    useEffect(() => {
        setCharacters(createCharacters());
    }, [createCharacters]);

    // Handle flickering
    useEffect(() => {
        const updateActiveIndices = () => {
            const newActiveIndices = new Set<number>();
            const numActive = Math.floor(Math.random() * 3) + 3;
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * characters.length));
            }
            setActiveIndices(newActiveIndices);
        };

        const flickerInterval = setInterval(updateActiveIndices, 50);
        return () => clearInterval(flickerInterval);
    }, [characters.length]);

    // Animation Loop
    useEffect(() => {
        let animationFrameId: number;

        const updatePositions = () => {
            setCharacters((prevChars) =>
                prevChars.map((char) => ({
                    ...char,
                    y: char.y + char.speed,
                    ...(char.y >= 100 && {
                        y: -5,
                        x: Math.random() * 100,
                        char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>? "[
                            Math.floor(Math.random() * 63)
                        ],
                    }),
                }))
            );
            animationFrameId = requestAnimationFrame(updatePositions);
        };

        animationFrameId = requestAnimationFrame(updatePositions);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundColor: 'black',
            overflow: 'hidden',
            fontFamily: 'monospace'
        }}>
            {/* Title Container */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                width: '100%',
                padding: '0 1rem'
            }}>
                <ScrambledTitle />
            </div>

            {/* Raining Characters */}
            {characters.map((char, index) => {
                const isActive = activeIndices.has(index);
                return (
                    <span
                        key={index}
                        style={{
                            position: 'absolute',
                            left: `${char.x}%`,
                            top: `${char.y}%`,
                            transform: `translate(-50%, -50%) ${isActive ? 'scale(1.25)' : 'scale(1)'}`,
                            color: isActive ? '#00ff00' : '#475569', // text-slate-600 is roughly #475569
                            fontWeight: isActive ? 'bold' : 'light',
                            fontSize: isActive ? '1.8rem' : '1.2rem',
                            textShadow: isActive
                                ? '0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)'
                                : 'none',
                            opacity: isActive ? 1 : 0.4,
                            transition: 'color 0.1s, transform 0.1s, text-shadow 0.1s',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            willChange: 'transform, top',
                            zIndex: isActive ? 10 : 0
                        }}
                    >
                        {char.char}
                    </span>
                );
            })}
        </div>
    );
};

export default RainingLetters;
