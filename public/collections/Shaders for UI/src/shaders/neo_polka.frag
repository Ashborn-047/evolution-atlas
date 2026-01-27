void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    
    // Tile the space
    float scale = 10.0;
    vec2 st = fract(uv * scale + u_time * 0.5);
    vec2 id = floor(uv * scale);
    
    float d = distance(st, vec2(0.5));
    
    // Animate size based on mouse or time
    float size = 0.3 + 0.2 * sin(u_time * 2.0 + id.x + id.y);
    
    // Smoothed edges (Anti-aliasing)
    float aa = 0.05;
    vec3 color = vec3(smoothstep(size, size - aa, d));
    
    // Add some color
    vec3 accent = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));
    color *= accent;

    gl_FragColor = vec4(color, 1.0);
}
