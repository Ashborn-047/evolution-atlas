'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
import { User, MapPin, Link as LinkIcon, Github, Twitter, Mail } from "lucide-react";

// --- Types ---
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

// --- TextScramble Logic (Reusable) ---
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
                output += `<span style="color: #4ade80; opacity: 0.7;">${char}</span>`;
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

// --- Component: Matrix Rain Background ---
const MatrixRainBackground: React.FC<{ density?: number }> = ({ density = 50 }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

    const createCharacters = useCallback(() => {
        const allChars = "01";
        const newCharacters: Character[] = [];

        for (let i = 0; i < density; i++) {
            newCharacters.push({
                char: allChars[Math.floor(Math.random() * allChars.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.2 + Math.random() * 0.5,
            });
        }
        return newCharacters;
    }, [density]);

    useEffect(() => {
        setCharacters(createCharacters());
    }, [createCharacters]);

    useEffect(() => {
        const updateActiveIndices = () => {
            const newActiveIndices = new Set<number>();
            const numActive = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * characters.length));
            }
            setActiveIndices(newActiveIndices);
        };
        const interval = setInterval(updateActiveIndices, 100);
        return () => clearInterval(interval);
    }, [characters.length]);

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
                        speed: 0.2 + Math.random() * 0.5,
                    }),
                }))
            );
            animationFrameId = requestAnimationFrame(updatePositions);
        };
        animationFrameId = requestAnimationFrame(updatePositions);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.3 }}>
            {characters.map((char, index) => (
                <span
                    key={index}
                    style={{
                        position: 'absolute',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        left: `${char.x}%`,
                        top: `${char.y}%`,
                        color: activeIndices.has(index) ? '#4ade80' : '#052e16',
                        fontWeight: activeIndices.has(index) ? 'bold' : 'normal',
                        transition: 'color 0.1s'
                    }}
                >
                    {char.char}
                </span>
            ))}
        </div>
    );
};

// --- Component: Scrambled Text ---
const ScrambleText: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const scramblerRef = useRef<TextScramble | null>(null);

    useEffect(() => {
        if (elementRef.current && !scramblerRef.current) {
            scramblerRef.current = new TextScramble(elementRef.current);
        }
    }, []);

    useEffect(() => {
        if (scramblerRef.current) {
            scramblerRef.current.setText(text);
        }
    }, [text]);

    return <span ref={elementRef} style={style}>{text}</span>;
};

// --- Main Component: MatrixProfileCard ---
export const MatrixProfileCard: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: 'monospace',
            color: '#e5e5e5'
        }}>

            {/* Card Container */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '24rem',
                    backgroundColor: 'black',
                    border: `1px solid ${isHovered ? 'rgba(34, 197, 94, 0.5)' : 'rgba(5, 46, 22, 0.5)'}`,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: isHovered ? '0 25px 50px -12px rgba(5, 46, 22, 0.2)' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease'
                }}
            >

                {/* Background Animation Layer */}
                <MatrixRainBackground density={80} />

                {/* Decorative Header Bar */}
                <div style={{
                    height: '0.5rem',
                    width: '100%',
                    background: 'linear-gradient(to right, #052e16, #22c55e, #052e16)',
                    opacity: 0.5
                }} />

                <div style={{ position: 'relative', zIndex: 10, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

                    {/* Avatar Section */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '6rem',
                            height: '6rem',
                            borderRadius: '50%',
                            border: '2px solid rgba(34, 197, 94, 0.3)',
                            padding: '0.25rem',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: '#262626',
                                overflow: 'hidden',
                                position: 'relative',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
                                        transition: 'all 0.5s ease'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Status Dot */}
                        <div style={{
                            position: 'absolute',
                            bottom: '0.25rem',
                            right: '0.25rem',
                            width: '1rem',
                            height: '1rem',
                            backgroundColor: '#22c55e',
                            borderRadius: '50%',
                            border: '4px solid black'
                        }} />
                    </div>

                    {/* Info Section */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.025em', color: 'white', margin: 0 }}>
                            <ScrambleText text={isHovered ? "NEO ANDERSON" : "THOMAS A."} />
                        </h2>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(34, 197, 94, 0.8)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                            System Architect
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#737373', marginTop: '0.5rem' }}>
                            <MapPin size={12} />
                            <span>Zion, Mainframe 01</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        width: '100%',
                        padding: '1rem 0',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '0.5rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white' }}>98%</div>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#737373' }}>Uptime</div>
                        </div>
                        <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white' }}>2.4k</div>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#737373' }}>Commits</div>
                        </div>
                        <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white' }}>42</div>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#737373' }}>Projects</div>
                        </div>
                    </div>

                    {/* Bio */}
                    <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#a3a3a3', lineHeight: 1.6, padding: '0 0.5rem', margin: 0 }}>
                        "Wake up, Neo... The Matrix has you. Follow the white rabbit."
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
                        <button style={{
                            flex: 1,
                            backgroundColor: 'rgba(22, 163, 74, 0.1)',
                            color: '#4ade80',
                            border: '1px solid rgba(22, 163, 74, 0.3)',
                            borderRadius: '0.375rem',
                            padding: '0.5rem 0',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease'
                        }}>
                            <Mail size={16} />
                            <span>Contact</span>
                        </button>
                        <button style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '0.375rem',
                            padding: '0.5rem 0',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}>
                            Portfolio
                        </button>
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <a href="#" style={{ color: '#737373', transition: 'color 0.2s ease' }}>
                            <Github size={20} />
                        </a>
                        <a href="#" style={{ color: '#737373', transition: 'color 0.2s ease' }}>
                            <Twitter size={20} />
                        </a>
                        <a href="#" style={{ color: '#737373', transition: 'color 0.2s ease' }}>
                            <LinkIcon size={20} />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatrixProfileCard;
