// Hexagon math
float hexDist(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1,1.73)));
    c = max(c, p.x);
    return c;
}

vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1, 1.73);
    vec2 h = r*.5;
    vec2 a = mod(uv, r)-h;
    vec2 b = mod(uv-h, r)-h;
    vec2 gv = dot(a, a) < dot(b,b) ? a : b;
    vec2 id = uv - gv;
    return vec4(gv.x, gv.y, id.x, id.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    // Rotate slightly
    uv *= mat2(cos(0.1), -sin(0.1), sin(0.1), cos(0.1));
    
    float scale = 8.0;
    vec4 hc = hexCoords(uv * scale);
    
    // Distance to edge of hex
    float d = smoothstep(0.45, 0.5, hexDist(hc.xy));
    
    // Pulse wave
    float pulse = sin(length(hc.zw) - u_time * 2.0);
    
    // Glow calculations
    vec3 col = vec3(0.0);
    col += vec3(0.0, 0.8, 1.0) * (1.0 - d); // Lines
    col *= 0.5 + 0.5 * pulse; // Apply pulse
    
    // Core glow
    col += vec3(0.0, 0.4, 0.8) * smoothstep(0.5, 0.0, hexDist(hc.xy)) * max(0.0, pulse);
    
    gl_FragColor = vec4(col, 1.0);
}
