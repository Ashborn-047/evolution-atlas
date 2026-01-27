void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float time = u_time * 0.5;
    
    vec3 color = vec3(0.0);
    
    for(float i = 1.0; i < 4.0; i++) {
        uv.x += 0.6 / i * sin(i * 3.0 * uv.y + time);
        uv.y += 0.6 / i * cos(i * 3.0 * uv.x + time);
    }
    
    color.r = cos(uv.x + uv.y + 2.0) * 0.5 + 0.5;
    color.g = sin(uv.x + uv.y - 1.0) * 0.5 + 0.5;
    color.b = (sin(uv.x + uv.y) + cos(uv.x + uv.y)) * 0.5 + 0.5;
    
    gl_FragColor = vec4(color, 1.0);
}
