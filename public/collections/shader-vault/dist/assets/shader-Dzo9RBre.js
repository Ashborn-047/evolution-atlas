var f=Object.defineProperty;var g=(t,o,e)=>o in t?f(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e;var n=(t,o,e)=>g(t,typeof o!="symbol"?o+"":o,e);import{r as d,j as c}from"./client-jcPAbkVI.js";const u=t=>`#version 300 es
precision highp float;

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t) {
    vec3 a = vec3(${t.paletteA.join(", ")});
    vec3 b = vec3(${t.paletteB.join(", ")});
    vec3 c = vec3(${t.paletteC.join(", ")});
    vec3 d = vec3(${t.paletteD.join(", ")});
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float angle = atan(uv.y, uv.x);
    float r = length(uv);

    angle += time * ${t.rotationSpeed.toFixed(2)};

    float bands = mod(r * ${t.bandFrequency.toFixed(1)} + time * ${t.bandSpeed.toFixed(2)}, 1.0);
    float glow = smoothstep(0.0, ${t.glowSoftness.toFixed(2)}, bands) * smoothstep(1.0, ${(1-t.glowSoftness).toFixed(2)}, bands);

    float spokes = mod(angle * ${t.spokeCount.toFixed(1)}, 6.28318);
    float spoke_value = sin(spokes) * 0.5 + 0.5;

    float final_v = (glow * ${t.glowMix.toFixed(2)} + spoke_value * ${(1-t.glowMix).toFixed(2)});
    final_v = pow(final_v, ${t.contrast.toFixed(2)});

    vec3 col = palette(final_v + time * ${t.colorCycleSpeed.toFixed(2)});
    
    // Depth shift
    col *= (0.5 + 0.5 * cos(r * ${t.depthFrequency.toFixed(1)} + time * 0.5 + vec3(0, 1, 2)));

    // Vignette
    float vig = 1.0 - pow(r, 2.0) * ${t.vignetteStrength.toFixed(2)};
    col *= vig;

    fragColor = vec4(col, 1.0);
}
`,p={paletteA:[.5,.5,.5],paletteB:[.5,.5,.5],paletteC:[1,1,1],paletteD:[0,.33,.67],rotationSpeed:.1,bandFrequency:20,bandSpeed:.5,glowSoftness:.1,spokeCount:10,glowMix:.6,contrast:1.8,colorCycleSpeed:.1,depthFrequency:4,vignetteStrength:.5};class v{constructor(o,e){n(this,"canvas");n(this,"gl");n(this,"program",null);n(this,"uTime",null);n(this,"uRes",null);n(this,"isReady",!1);this.canvas=o,this.gl=o.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"}),this._init(e)}_compile(o,e){const r=this.gl;if(!r)return null;const i=r.createShader(o);return i?(r.shaderSource(i,e),r.compileShader(i),r.getShaderParameter(i,r.COMPILE_STATUS)?i:(console.error(r.getShaderInfoLog(i)),r.deleteShader(i),null)):null}_init(o){const e=this.gl;if(!e)return;const i=this._compile(e.VERTEX_SHADER,`#version 300 es
    precision highp float;
    in vec4 position;
    void main() { gl_Position = position; }`),s=this._compile(e.FRAGMENT_SHADER,o);if(!i||!s||(this.program=e.createProgram(),!this.program)||(e.attachShader(this.program,i),e.attachShader(this.program,s),e.linkProgram(this.program),!e.getProgramParameter(this.program,e.LINK_STATUS)))return;const a=new Float32Array([-1,1,-1,-1,1,1,1,-1]),h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW);const l=e.getAttribLocation(this.program,"position");e.enableVertexAttribArray(l),e.vertexAttribPointer(l,2,e.FLOAT,!1,0,0),this.uTime=e.getUniformLocation(this.program,"time"),this.uRes=e.getUniformLocation(this.program,"resolution"),this.isReady=!0}resize(o,e){var i;const r=window.devicePixelRatio||1;this.canvas.width=o*r,this.canvas.height=e*r,(i=this.gl)==null||i.viewport(0,0,this.canvas.width,this.canvas.height)}render(o){const e=this.gl;!this.program||!e||!this.isReady||(e.useProgram(this.program),e.uniform1f(this.uTime,o*.001),e.uniform2f(this.uRes,e.canvas.width,e.canvas.height),e.drawArrays(e.TRIANGLE_STRIP,0,4))}dispose(){this.gl&&this.program&&(this.gl.deleteProgram(this.program),this.program=null)}}function S(){const t=d.useRef(null),o=d.useRef(null);return d.useEffect(()=>{const e=t.current;if(!e)return;const r=u(p);let i=null;try{i=new v(e,r)}catch{return}if(!i.isReady)return;let s;function a(){i&&o.current&&i.resize(window.innerWidth,window.innerHeight)}function h(l){i&&(i.render(l),s=requestAnimationFrame(h))}return window.addEventListener("resize",a),a(),s=requestAnimationFrame(h),()=>{cancelAnimationFrame(s),window.removeEventListener("resize",a),i==null||i.dispose()}},[]),c.jsxs("div",{ref:o,style:{position:"fixed",inset:0,width:"100%",height:"100vh",backgroundColor:"#09090b",overflow:"hidden"},children:[c.jsx("canvas",{ref:t,style:{width:"100%",height:"100%",display:"block"}}),c.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center",zIndex:10,pointerEvents:"none",mixBlendMode:"difference"},children:[c.jsx("h1",{style:{fontSize:"clamp(3rem, 15vw, 10rem)",fontWeight:900,color:"white",letterSpacing:"-0.05em",margin:0,textTransform:"uppercase"},children:"Vortex"}),c.jsx("p",{style:{fontSize:"1rem",color:"rgba(255,255,255,0.7)",letterSpacing:"0.4em",textTransform:"uppercase",marginTop:"1rem"},children:"Procedural Simulation Engine"})]})]})}export{S as PsychedelicVortex,S as default};
