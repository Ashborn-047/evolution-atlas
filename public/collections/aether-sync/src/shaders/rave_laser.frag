void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec3 finalColor = vec3(0.0);
    
    for(float i = 0.0; i < 4.0; i++) {
        uv = abs(uv * 1.5) - 1.0;
        
        vec3 col = vec3(0.2, 0.8, 0.9); 
        
        // Rotate
        float t = u_time * 0.5;
        uv *= mat2(cos(t), -sin(t), sin(t), cos(t));

        // Smoother glow falloff
        float f = 0.02 / (abs(sin(uv.y * 10.0 + u_time * 2.0) - uv.x) + 0.05);
        
        finalColor += col * f;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
