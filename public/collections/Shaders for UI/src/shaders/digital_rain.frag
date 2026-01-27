float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    
    float rows = 50.0;
    vec2 ipos = floor(uv * rows);
    
    // Rain speed varies by column
    float speed = random(vec2(ipos.x, 0.0)) * 0.5 + 0.2;
    float y = fract(uv.y + u_time * speed);
    
    // Trail fade
    float brightness = 1.0 / (y * 20.0);
    
    // Random flicker
    float flicker = step(0.95, random(ipos + floor(u_time * 10.0)));
    if (flicker > 0.5) brightness = 1.0;
    
    // Grid lines (Smoothed)
    vec2 fpos = fract(uv * rows);
    float grid = smoothstep(0.0, 0.1, fpos.x) * smoothstep(0.0, 0.1, fpos.y);
    
    vec3 color = vec3(0.0, 1.0, 0.2) * brightness * grid;
    
    gl_FragColor = vec4(color, 1.0);
}
