float rand(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Distort
    float wave = sin(uv.y * 10.0 + u_time * 20.0) * 0.005;
    float tracking = step(0.9, sin(u_time * 2.0 + uv.y * 0.5)) * 0.05 * sin(u_time * 50.0);
    uv.x += wave + tracking;
    
    // Color Shift
    float r = rand(uv + u_time);
    float g = rand(uv + u_time + 0.1);
    float b = rand(uv + u_time + 0.2);
    
    vec3 col = vec3(0.0);
    
    // Static bars
    float bar = step(0.95, rand(vec2(0.0, uv.y + u_time * 5.0)));
    col += vec3(bar) * 0.3;
    
    // Grain
    col += vec3(r, g, b) * 0.15;
    
    // Scanlines
    col *= 0.9 + 0.1 * sin(uv.y * u_resolution.y * 0.5);
    
    // Base blue screen tint
    col += vec3(0.0, 0.0, 0.2);

    gl_FragColor = vec4(col, 1.0);
}
