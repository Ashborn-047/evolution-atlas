// Plasma Ball - High Fidelity Lightning Effect
// Transitions: Pinkish-Red -> Purple -> Violet-Blue

// --- Simplex Noise Implementation (Required for tendrils) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec3 col = vec3(0.0);
    
    float d = length(uv);
    float t = u_time * 0.8;
    
    // --- 1. Central Electrode ---
    float core = smoothstep(0.1, 0.0, d);
    col += vec3(1.0, 0.4, 0.7) * core * 2.0;
    col += vec3(0.8, 0.2, 0.5) * exp(-d * 20.0);

    // --- 2. Lightning Tendrils (fBm Ridge Noise) ---
    // Domain Warping for unstable logic
    vec2 warp = vec2(snoise(vec3(uv * 2.0, t * 0.5)), snoise(vec3(uv * 2.0 + 10.0, t * 0.5)));
    
    for(float i = 0.0; i < 4.0; i++) {
        float radius = length(uv);
        
        // Ridge Noise math for thin electrical filaments
        float n = snoise(vec3(uv * (2.0 + i) + warp * 0.5, t + i));
        float ridge = 1.0 - abs(n);
        float line = pow(ridge, 16.0); // Ultra-thin sharpening
        
        // Masking and Flicker
        float mask = smoothstep(0.45, 0.1, radius);
        float flicker = 0.8 + 0.2 * sin(t * 10.0 + i);
        
        // Palette: Pinkish-Red -> Purple -> Violet-Blue
        vec3 colRed = vec3(1.0, 0.1, 0.4);
        vec3 colPurple = vec3(0.6, 0.1, 0.9);
        vec3 colBlue = vec3(0.3, 0.2, 1.0);
        
        vec3 filCol = mix(colRed, colPurple, ridge);
        filCol = mix(filCol, colBlue, smoothstep(0.0, 1.0, n * 0.5 + 0.5));
        
        col += filCol * line * mask * flicker * 1.8;
        col += filCol * pow(ridge, 4.0) * mask * 0.2; // Soft surround glow
    }
    
    // --- 3. Outer Boundary ---
    float rim = smoothstep(0.47, 0.485, d) * smoothstep(0.5, 0.485, d);
    col += vec3(0.4, 0.2, 1.0) * rim * 1.2;
    
    // Central Electrode Base Glow
    col += vec3(1.0, 0.1, 0.3) * exp(-d * 10.0) * 0.3;
    
    // Global Atmosphere
    col += vec3(0.1, 0.0, 0.25) * exp(-d * 4.0) * 0.6;

    // Polish: Contrast boost & Brightness cap for UI safety
    col = pow(col, vec3(0.8));
    col = clamp(col, 0.0, 1.3);

    gl_FragColor = vec4(col, 1.0);
}
