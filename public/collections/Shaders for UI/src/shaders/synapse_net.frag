void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec2 st = uv * 5.0;
    
    // Voronoi
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float m_dist = 1.0;  // minimum distance
    
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x),float(y));
            vec2 point = vec2(snoise(i_st + neighbor + u_time*0.2), snoise(i_st + neighbor + u_time*0.2 + 10.0));
            point = 0.5 + 0.5*sin(u_time + 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            m_dist = min(m_dist, dist);
        }
    }
    
    vec3 color = vec3(0.0);
    // Draw cells (Smoothed)
    color += smoothstep(0.06, 0.04, m_dist);
    
    // Invert
    color = 1.0 - color;
    
    // Coloring
    color *= vec3(0.0, 0.8, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}
