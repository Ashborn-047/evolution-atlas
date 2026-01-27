float line(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return smoothstep(0.02, 0.01, length(pa - ba * h));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec2 grid = floor(uv * 10.0);
    vec2 sub = fract(uv * 10.0);
    
    float rand = snoise(grid);
    float rand2 = snoise(grid + vec2(100.0));
    
    vec3 col = vec3(0.0);
    
    // Circuit lines logic
    float l = 0.0;
    if (rand > 0.5) {
        l = line(sub, vec2(0.5), vec2(0.5 + 0.5 * sign(rand2 - 0.5), 0.5)); // Horizontal
    } else {
        l = line(sub, vec2(0.5), vec2(0.5, 0.5 + 0.5 * sign(rand2 - 0.5))); // Vertical
    }
    
    // Nodes
    float node = smoothstep(0.15, 0.1, length(sub - 0.5));
    
    // Data packet (active energy)
    float packet = 0.0;
    float flow = mod(u_time * 2.0 + rand * 10.0, 10.0);
    if (flow < 1.0) {
        packet = node * 2.0;
    }
    
    col = vec3(0.0, 0.1, 0.1); // Base board
    col += vec3(0.0, 0.8, 0.6) * l; // Traces
    col += vec3(0.0, 0.4, 0.4) * node; // Nodes
    col += vec3(0.8, 1.0, 0.9) * packet; // Energy

    gl_FragColor = vec4(col, 1.0);
}
