void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec3 col = vec3(0.01, 0.0, 0.03); // Deep space background

    // --- 1. Grid & Floor ---
    float horizonY = -0.15; 
    if (uv.y < horizonY) {
        // Projection
        float z = 1.0 / abs(uv.y - horizonY);
        vec2 gridUv = vec2(uv.x * z, z);
        
        // Animation
        gridUv.y += u_time * 2.0;
        
        // Grid Logic
        float scale = 1.3; 
        vec2 g = fract(gridUv * scale);
        
        // VISIBILITY FIX: Thicker lines and correct smoothstep order
        vec2 wrapped = abs(g - 0.5);
        
        // Use fwidth for anti-aliasing, but multiply for thickness
        vec2 range = fwidth(gridUv * scale) * 2.0;
        
        // Add base thickness (0.02) so lines are always visible
        float thickness = 0.02; 
        
        // Logic: 0.5 is the edge of the cell. We want 1.0 there.
        // FIXED: smoothstep requires matching types for edges. 
        vec2 lines = smoothstep(vec2(0.5) - thickness - range, vec2(0.5), wrapped);
        
        float grid = max(lines.x, lines.y);
        
        // Distance Fade
        float fade = smoothstep(0.0, 0.6, abs(uv.y - horizonY));
        
        // Color mixing
        vec3 gridCol = mix(vec3(1.0, 0.0, 0.6), vec3(0.0, 0.8, 1.0), 0.5 + 0.5 * sin(gridUv.y * 0.1));
        
        // VISIBILITY FIX: Use additive mixing for neon glow and boost intensity (3.0)
        col += gridCol * grid * 3.0 * fade;
        
        // Lower floor glow slightly so lines pop more
        col += gridCol * 0.05 * fade;
    } else {
        // --- 2. Sky ---
        // Stars
        float stars = pow(fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453), 22.0);
        col += stars * 0.3 * smoothstep(horizonY, horizonY + 0.3, uv.y);
        
        // Gradient
        vec3 skyColTop = vec3(0.04, 0.01, 0.08);
        vec3 skyColBot = vec3(0.12, 0.0, 0.25);
        col += mix(skyColBot, skyColTop, (uv.y - horizonY) * 1.5);
    }

    // --- 3. Sun ---
    vec2 sunPos = vec2(0.0, horizonY + 0.22);
    float sDist = length(uv - sunPos);
    float sSize = 0.42;
    
    if (sDist < sSize) {
        float scanlineFreq = 16.0;
        float scanlineSpeed = 0.5;
        float hLines = fract(uv.y * scanlineFreq - u_time * scanlineSpeed);
        
        // Dynamic cuts
        float cutThreshold = smoothstep(-0.1, 0.6, (sunPos.y - uv.y) / sSize);
        cutThreshold = pow(cutThreshold, 1.8) * 0.85;
        
        // Render Sun
        if (uv.y > horizonY && (uv.y > sunPos.y || hLines > cutThreshold)) {
            vec3 sColTop = vec3(1.0, 0.92, 0.1);
            vec3 sColMid = vec3(1.0, 0.15, 0.45);
            vec3 sColBot = vec3(0.6, 0.0, 1.0);
            
            float gradPos = (uv.y - sunPos.y + sSize) / (sSize * 2.0);
            vec3 sFinalCol = mix(sColBot, mix(sColMid, sColTop, smoothstep(0.4, 0.85, gradPos)), smoothstep(0.0, 0.4, gradPos));
            
            sFinalCol += 0.12 * pow(1.0 - sDist/sSize, 3.0);
            col = sFinalCol;
        }
    }

    // --- 4. Post-Processing / Glows ---
    float horizonGlow = smoothstep(0.08, 0.0, abs(uv.y - horizonY));
    col += vec3(0.0, 0.9, 1.0) * horizonGlow * 0.35; 
    col += vec3(1.0, 0.1, 0.5) * 0.15 * exp(-sDist * 3.0); 

    // Scanlines overlay
    col *= 0.92 + 0.08 * sin(gl_FragCoord.y * 2.5 + u_time * 10.0);

    gl_FragColor = vec4(col, 1.0);
}
