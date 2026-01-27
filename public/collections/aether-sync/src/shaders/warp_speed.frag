void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    float t = u_time * 1.5;
    vec3 col = vec3(0.0);
    
    // Increased layers for more depth (15 layers instead of 10)
    for(float i=0.0; i<1.0; i+=0.06) {
        float depth = fract(i + t);
        
        // Scale needs to be higher to avoid the stars merging at center
        float scale = mix(20.0, 0.2, depth);
        
        // Brighter fade logic
        float fade = smoothstep(0.0, 0.4, depth) * smoothstep(1.0, 0.8, depth);
        
        vec2 st = uv * scale;
        vec2 id = floor(st);
        vec2 q = fract(st) - 0.5;
        
        // Noise for star placement
        float r = snoise(id + i * 99.0);
        
        // Lowered threshold (0.6 instead of 0.8) for more star density
        if(r > 0.6) {
            float star = smoothstep(0.15, 0.0, length(q));
            // Brighter star colors
            vec3 starColor = mix(vec3(1.0), vec3(0.2, 0.6, 1.0), abs(r));
            col += star * fade * starColor * 2.0; // Double intensity
        }
    }
    
    // Stronger radial bluish glow for atmospheric background
    col += vec3(0.02, 0.05, 0.2) * (1.0 - length(uv) * 0.8);
    col += vec3(0.0, 0.1, 0.4) * exp(-length(uv) * 2.0);

    gl_FragColor = vec4(col, 1.0);
}
