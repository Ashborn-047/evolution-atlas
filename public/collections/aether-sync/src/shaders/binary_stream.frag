void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Quantize rows
    float rows = 40.0;
    float y = floor(uv.y * rows);
    
    // Speed varies per row
    float speed = snoise(vec2(y, 0.0)) * 2.0 + 3.0;
    
    // Move x
    float x = uv.x + u_time * speed * 0.2;
    
    // Generate binary-like blocks
    float signal = step(0.5, snoise(vec2(x * 10.0, y)));
    
    // Color
    vec3 col = vec3(0.0, 1.0, 0.4) * signal;
    
    // Dim background traces
    col += vec3(0.0, 0.2, 0.1) * 0.2;
    
    // Scanlines
    col *= step(0.1, fract(uv.y * rows));

    gl_FragColor = vec4(col, 1.0);
}
