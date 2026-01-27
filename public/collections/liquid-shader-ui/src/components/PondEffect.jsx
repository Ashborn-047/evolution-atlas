import { useRef, useEffect } from "react";

/**
 * POND EFFECT COMPONENT
 * Rainy pond simulation with procedural ripples
 */
export function PondEffect({ id = "pond", opacity = 0.6, className = "" }) {
    const canvasRef = useRef(null);
    const canvasId = `pond-canvas-${id}`;

    useEffect(() => {
        if (!canvasRef.current) return;

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        
        // Pond Configuration
        app.loadImage('https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=2574&auto=format&fit=crop');
        app.liquidPlane.material.metalness = 0.1;
        app.liquidPlane.material.roughness = 0.9;
        app.liquidPlane.uniforms.displacementScale.value = 10;
        app.setRain(true);
      }
    `;
        document.body.appendChild(script);
        return () => {
            if (script.parentNode) document.body.removeChild(script);
        };
    }, [canvasId]);

    return (
        <div className={`absolute inset-0 z-0 bg-slate-950 ${className}`}>
            <canvas
                id={canvasId}
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ opacity }}
            />
        </div>
    );
}

export default PondEffect;
