void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    // Diagonal coordinates
    vec2 pos = uv * vec2(1.0, 1.0);
    float pattern = pos.x + pos.y;
    
    // Animate
    pattern += u_time * 0.2;
    
    // Sine wave stripes with varying width
    float w = sin(pos.y * 5.0 + u_time) * 0.2 + 0.5; // Warping width
    float stripes = sin(pattern * 20.0);
    
    // Smooth edges
    float val = smoothstep(-0.1, 0.1, stripes - w);
    
    // Color palette
    vec3 c1 = vec3(0.1, 0.1, 0.1);
    vec3 c2 = vec3(1.0, 0.8, 0.0); // Hazard yellow
    
    // Add iridescent coating
    vec3 c3 = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0,2,4));
    
    vec3 col = mix(c1, c2, val);
    col += c3 * 0.2 * val;
    
    gl_FragColor = vec4(col, 1.0);
}
