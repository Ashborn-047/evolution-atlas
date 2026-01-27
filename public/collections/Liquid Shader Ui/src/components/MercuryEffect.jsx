import { useRef, useEffect } from "react";

/**
 * MERCURY EFFECT COMPONENT
 * Hyper-reflective metallic liquid surface
 */
export function MercuryEffect({ id = "mercury", opacity = 0.6, className = "" }) {
    const canvasRef = useRef(null);
    const canvasId = `mercury-canvas-${id}`;

    useEffect(() => {
        if (!canvasRef.current) return;

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        
        // Mercury Configuration
        app.loadImage('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop');
        app.liquidPlane.material.metalness = 1.0;
        app.liquidPlane.material.roughness = 0.05;
        app.liquidPlane.uniforms.displacementScale.value = 15;
        app.setRain(false);
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

export default MercuryEffect;
