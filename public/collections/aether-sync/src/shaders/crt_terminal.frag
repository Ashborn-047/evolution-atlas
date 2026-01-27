void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Curvature
    vec2 d = uv - 0.5;
    float r = dot(d, d);
    uv = 0.5 + d * (1.0 + 0.05 * r);
    
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    // Base Pattern (Green text-like noise)
    float txt = step(0.5, snoise(uv * 50.0 + floor(u_time * 5.0)));
    
    // Scanlines
    float scan = sin(uv.y * 800.0) * 0.1;
    float scan2 = sin(uv.y * 10.0 - u_time * 5.0); // Moving band
    
    // Chromatic Aberration
    float r_chan = txt * (1.0 + scan) * step(0.98, sin(uv.y * 10.0 + u_time + 0.1));
    float g_chan = txt * (1.0 + scan);
    float b_chan = txt * (1.0 + scan) * step(0.98, sin(uv.y * 10.0 + u_time));
    
    vec3 col = vec3(0.0, g_chan, 0.0); // Green phosphor base
    col += vec3(0.1, 0.0, 0.1) * r_chan; // Red tint/aberration
    col += vec3(0.1, 0.1, 1.0) * b_chan; // Blue tint/aberration
    
    // Bloom / Glow
    col += vec3(0.0, 0.2, 0.0) * txt;
    
    // Vignette
    float vig = 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    col *= vec3(pow(vig, 0.2));

    gl_FragColor = vec4(col, 1.0);
}
