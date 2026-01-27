void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    float len = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Accretion disk
    float f = snoise(vec2(angle * 4.0 + u_time, len * 10.0 - u_time * 2.0));
    
    // Event horizon
    float circle = smoothstep(0.2, 0.25, len);
    float glow = 0.02 / abs(len - 0.2);
    
    vec3 col = vec3(0.0);
    col += vec3(0.8, 0.3, 0.1) * f * circle * smoothstep(0.5, 0.2, len);
    col += vec3(1.0, 0.6, 0.2) * glow;
    
    // Black hole center
    col *= smoothstep(0.18, 0.2, len);

    gl_FragColor = vec4(col, 1.0);
}
