import { useMemo } from 'react'

// ============================================
// METEORS SHADER - Falling meteor animation
// ============================================

interface MeteorsProps {
    number?: number
    color?: string
}

export function Meteors({ number = 20, color = '#64748b' }: MeteorsProps) {
    // Generate array of meteors with random properties
    const meteors = useMemo(() => {
        return Array.from({ length: number }, (_, idx) => ({
            id: idx,
            left: Math.floor(Math.random() * 800 - 400),
            delay: Math.random() * 0.6 + 0.2,
            duration: Math.floor(Math.random() * 8 + 2),
        }))
    }, [number])

    return (
        <>
            {/* Keyframe styles */}
            <style>{`
        @keyframes meteor {
          0% { 
            transform: rotate(215deg) translateX(0); 
            opacity: 1; 
          }
          70% { 
            opacity: 1; 
          }
          100% { 
            transform: rotate(215deg) translateX(-500px); 
            opacity: 0; 
          }
        }
      `}</style>

            {meteors.map((meteor) => (
                <span
                    key={`meteor-${meteor.id}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: `${meteor.left}px`,
                        width: '2px',
                        height: '2px',
                        borderRadius: '9999px',
                        backgroundColor: color,
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                        transform: 'rotate(215deg)',
                        animation: `meteor ${meteor.duration}s linear infinite`,
                        animationDelay: `${meteor.delay}s`,
                    }}
                >
                    {/* Meteor tail */}
                    <span
                        style={{
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '1px',
                            background: `linear-gradient(to right, ${color}, transparent)`,
                        }}
                    />
                </span>
            ))}
        </>
    )
}

// Full-screen standalone component
export default function MeteorShader() {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            background: '#020617',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Background gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top right, #0f172a, #020617)',
            }} />

            {/* Meteor Effect */}
            <Meteors number={40} />

            {/* Demo text */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                color: '#94a3b8',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
            }}>
                Meteor Shower Effect
            </div>
        </div>
    )
}

export { Meteors as MeteorEffect }
