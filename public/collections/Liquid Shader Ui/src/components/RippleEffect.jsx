import { useRef, useEffect } from "react";

/**
 * RIPPLE EFFECT COMPONENT
 * Interactive WebGL fluid waves that react to mouse movements
 */
export function RippleEffect({ id = "ripple", opacity = 0.6, className = "" }) {
    const canvasRef = useRef(null);
    const canvasId = `ripple-canvas-${id}`;

    useEffect(() => {
        if (!canvasRef.current) return;

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        
        // Ripple Configuration
        app.loadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
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

export default RippleEffect;
