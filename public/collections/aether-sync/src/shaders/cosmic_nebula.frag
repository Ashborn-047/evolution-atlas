void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    
    float t = u_time * 0.1;
    vec2 q = vec2(0.);
    q.x = snoise(uv + 0.00 * t);
    q.y = snoise(uv + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = snoise(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
    r.y = snoise(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

    float f = snoise(uv + r);

    vec3 color = mix(vec3(0.1, 0.0, 0.2), vec3(0.0, 0.0, 0.1), clamp((f*f)*4.0, 0.0, 1.0));
    color = mix(color, vec3(0, 0, 0.164706), clamp(length(q), 0.0, 1.0));
    color = mix(color, vec3(0.2, 0.5, 1.0), clamp(length(r.x), 0.0, 1.0));
    
    // Interactive glow
    float dist = distance(uv, u_mouse.xy/u_resolution.xy * vec2(u_resolution.x/u_resolution.y, 1.0));
    color *= 3.5; // Optimized for contrast (down from 5.0)
    gl_FragColor = vec4((f*f*f + 0.9 * f*f + 0.5 * f) * color, 1.0);
}
