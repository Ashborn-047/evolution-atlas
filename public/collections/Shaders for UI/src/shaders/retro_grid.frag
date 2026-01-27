void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    // Horizon
    float horizon = 0.1;
    if (uv.y > horizon) {
         // Sky
         float star = step(0.995, fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453));
         gl_FragColor = vec4(vec3(star), 1.0) * vec4(0.1, 0.0, 0.2, 1.0);
         return;
    }
    
    // 3D Projection
    float z = 1.0 / (abs(uv.y - horizon));
    vec2 gridUv = vec2(uv.x * z, z);
    
    // Move grid
    gridUv.y += u_time * 2.0;
    
    // Smooth lines
    float width = 0.05;
    float gridVal = smoothstep(1.0 - width, 1.0 - width + 0.02, fract(gridUv.x)) + 
                    smoothstep(1.0 - width, 1.0 - width + 0.02, fract(gridUv.y));
    
    // Fade into distance
    float fade = smoothstep(0.0, 1.5, abs(uv.y - horizon));
    
    vec3 col = vec3(1.0, 0.0, 1.0) * gridVal * fade;
    col += vec3(0.1, 0.0, 0.2); // ground base
    
    gl_FragColor = vec4(col, 1.0);
}
