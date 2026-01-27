void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    float v = sin(20.0 * r - 4.0 * u_time + 5.0 * a);
    
    vec3 col = vec3(smoothstep(0.0, 0.1, v));
    col *= vec3(uv.x + 0.5, uv.y + 0.5, 1.0);
    
    gl_FragColor = vec4(col, 1.0);
}
