import { useRef, useEffect } from "react";

/**
 * WEBGL LIQUID COMPONENT
 * Uses Three.js liquid background from CDN for interactive fluid effects
 */
export function LiquidEffect({ variant = "ripple", id = "main", opacity = 0.6, className = "" }) {
    const canvasRef = useRef(null);
    const canvasId = `liquid-canvas-${id}-${variant}`;

    useEffect(() => {
        if (!canvasRef.current || variant === "rain") return;

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        
        if ("${variant}" === "pond") {
          app.loadImage('https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=2574&auto=format&fit=crop');
          app.liquidPlane.material.metalness = 0.1;
          app.liquidPlane.material.roughness = 0.9;
          app.liquidPlane.uniforms.displacementScale.value = 10;
          app.setRain(true);
        } else if ("${variant}" === "mercury") {
          app.loadImage('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop');
          app.liquidPlane.material.metalness = 1.0;
          app.liquidPlane.material.roughness = 0.05;
          app.liquidPlane.uniforms.displacementScale.value = 15;
          app.setRain(false);
        } else {
          app.loadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
          app.liquidPlane.material.metalness = 0.75;
          app.liquidPlane.material.roughness = 0.25;
          app.liquidPlane.uniforms.displacementScale.value = 5;
          app.setRain(false);
        }
      }
    `;
        document.body.appendChild(script);
        return () => {
            if (script.parentNode) document.body.removeChild(script);
        };
    }, [variant, canvasId]);

    if (variant === "rain") return null;

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

export default LiquidEffect;
