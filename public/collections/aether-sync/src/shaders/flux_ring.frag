void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    // Deform circle with noise
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    
    float def = snoise(vec2(angle * 2.0, u_time * 0.5)) * 0.05;
    
    // Main ring
    float dist = abs(radius - 0.3 - def);
    float glow = 0.02 / (dist + 0.001);
    
    // Inner pulse
    float pulse = smoothstep(0.2, 0.0, radius) * sin(u_time * 3.0);
    
    vec3 col = vec3(0.2, 0.6, 1.0) * glow;
    col += vec3(0.5, 0.0, 1.0) * glow * 0.5;
    col += vec3(1.0) * smoothstep(0.01, 0.0, dist);
    
    gl_FragColor = vec4(col, 1.0);
}
