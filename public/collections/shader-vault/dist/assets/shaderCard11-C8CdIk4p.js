var x=Object.defineProperty;var y=(i,r,e)=>r in i?x(i,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[r]=e;var l=(i,r,e)=>y(i,typeof r!="symbol"?r+"":r,e);import{j as t,r as p,a as v,R as b}from"./client-jcPAbkVI.js";import{c as m,L as j,M as S}from"./map-pin-BXffzo_v.js";import{B as w}from"./BackButton-CBV6DpJJ.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],u=m("activity",R);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],A=m("sparkles",k),F=i=>`#version 300 es
precision highp float;

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t) {
    vec3 a = vec3(${i.paletteA.join(", ")});
    vec3 b = vec3(${i.paletteB.join(", ")});
    vec3 c = vec3(${i.paletteC.join(", ")});
    vec3 d = vec3(${i.paletteD.join(", ")});
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float angle = atan(uv.y, uv.x);
    float r = length(uv);

    angle += time * ${i.rotationSpeed.toFixed(2)};

    float bands = mod(r * ${i.bandFrequency.toFixed(1)} + time * ${i.bandSpeed.toFixed(2)}, 1.0);
    float glow = smoothstep(0.0, ${i.glowSoftness.toFixed(2)}, bands) * smoothstep(1.0, ${(1-i.glowSoftness).toFixed(2)}, bands);

    float spokes = mod(angle * ${i.spokeCount.toFixed(1)}, 6.28318);
    float spoke_value = sin(spokes) * 0.5 + 0.5;

    float final_v = (glow * ${i.glowMix.toFixed(2)} + spoke_value * ${(1-i.glowMix).toFixed(2)});
    final_v = pow(final_v, ${i.contrast.toFixed(2)});

    vec3 col = palette(final_v + time * ${i.colorCycleSpeed.toFixed(2)});
    
    // Depth shift
    col *= (0.5 + 0.5 * cos(r * ${i.depthFrequency.toFixed(1)} + time * 0.5 + vec3(0, 1, 2)));

    // Vignette
    float vig = 1.0 - pow(r, 2.0) * ${i.vignetteStrength.toFixed(2)};
    col *= vig;

    fragColor = vec4(col, 1.0);
}
`,C={paletteA:[.5,.5,.5],paletteB:[.5,.5,.5],paletteC:[1,1,1],paletteD:[0,.33,.67],rotationSpeed:.1,bandFrequency:20,bandSpeed:.5,glowSoftness:.1,spokeCount:10,glowMix:.6,contrast:1.8,colorCycleSpeed:.1,depthFrequency:4,vignetteStrength:.5},_={intense:{...C,rotationSpeed:.2,bandSpeed:.8,contrast:2.5,colorCycleSpeed:.2}};class z{constructor(r,e){l(this,"canvas");l(this,"gl");l(this,"program",null);l(this,"uTime",null);l(this,"uRes",null);l(this,"isReady",!1);this.canvas=r,this.gl=r.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"low-power"}),this._init(e)}_compile(r,e){const o=this.gl;if(!o)return null;const n=o.createShader(r);return n?(o.shaderSource(n,e),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)?n:(o.deleteShader(n),null)):null}_init(r){const e=this.gl;if(!e)return;const n=this._compile(e.VERTEX_SHADER,`#version 300 es
    precision highp float;
    in vec4 position;
    void main() { gl_Position = position; }`),s=this._compile(e.FRAGMENT_SHADER,r);if(!n||!s||(this.program=e.createProgram(),!this.program)||(e.attachShader(this.program,n),e.attachShader(this.program,s),e.linkProgram(this.program),!e.getProgramParameter(this.program,e.LINK_STATUS)))return;const c=new Float32Array([-1,1,-1,-1,1,1,1,-1]),a=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,c,e.STATIC_DRAW);const d=e.getAttribLocation(this.program,"position");e.enableVertexAttribArray(d),e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0),this.uTime=e.getUniformLocation(this.program,"time"),this.uRes=e.getUniformLocation(this.program,"resolution"),this.isReady=!0}resize(r,e){var n;const o=window.devicePixelRatio||1;this.canvas.width=r*o,this.canvas.height=e*o,(n=this.gl)==null||n.viewport(0,0,this.canvas.width,this.canvas.height)}render(r){const e=this.gl;!this.program||!e||!this.isReady||(e.useProgram(this.program),e.uniform1f(this.uTime,r*.001),e.uniform2f(this.uRes,e.canvas.width,e.canvas.height),e.drawArrays(e.TRIANGLE_STRIP,0,4))}dispose(){this.gl&&this.program&&(this.gl.deleteProgram(this.program),this.program=null)}}const T=({shaderParams:i,animated:r})=>{const e=p.useRef(null);return p.useEffect(()=>{const o=e.current;if(!o)return;const n=F(i);let s=null;try{s=new z(o,n)}catch{return}if(!s.isReady)return;let c;const a=o.parentElement;function d(){a&&s&&(s.resize(a.clientWidth,a.clientHeight),r||s.render(0))}function h(f){r&&s&&(s.render(f),c=requestAnimationFrame(h))}d(),r?c=requestAnimationFrame(h):s.render(1e3);const g=new ResizeObserver(d);return a&&g.observe(a),()=>{c&&cancelAnimationFrame(c),g.disconnect(),s==null||s.dispose()}},[i,r]),t.jsx("div",{style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",backgroundColor:"#18181b"},children:t.jsx("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}})})},P=({name:i,params:r})=>{const[e,o]=p.useState(!1);return t.jsxs("div",{onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),style:{position:"relative",maxWidth:"24rem",width:"100%",height:"500px",borderRadius:"1.5rem",overflow:"hidden",boxShadow:e?"0 25px 50px -12px rgba(24, 24, 27, 0.5)":"0 25px 50px -12px rgba(0, 0, 0, 0.5)",border:"1px solid #27272a",backgroundColor:"black",transition:"all 0.3s ease",cursor:"default"},children:[t.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:t.jsx("div",{style:{width:"100%",height:"100%",opacity:e?1:.5,transition:"opacity 0.7s ease-in-out"},children:t.jsx(T,{shaderParams:r,animated:e})})}),t.jsxs("div",{style:{position:"relative",zIndex:10,height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"1.5rem",background:"linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.95) 90%)"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx("div",{style:{padding:"0.25rem 0.75rem",borderRadius:"9999px",backgroundColor:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.1)",fontSize:"0.75rem",fontWeight:500,color:"white",textTransform:"uppercase",letterSpacing:"0.05em"},children:"PRESET"}),t.jsx("button",{style:{padding:"0.5rem",borderRadius:"50%",backgroundColor:"rgba(255,255,255,0.1)",border:"none",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background-color 0.2s ease",backdropFilter:"blur(8px)"},children:t.jsx(j,{size:16})})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[t.jsxs("div",{style:{position:"relative",width:"6rem",height:"6rem",margin:"0 auto",transform:e?"scale(1.05)":"scale(1)",transition:"transform 0.5s ease"},children:[t.jsx("div",{style:{position:"absolute",inset:0,backgroundColor:"rgba(255,255,255,0.2)",borderRadius:"50%",filter:"blur(12px)",opacity:e?.75:.5,transition:"opacity 0.5s ease"}}),t.jsx("img",{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",alt:"Profile",style:{position:"relative",width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.2)"}})]}),t.jsxs("div",{style:{textAlign:"center",display:"flex",flexDirection:"column",gap:"0.25rem"},children:[t.jsx("h2",{style:{fontSize:"1.5rem",fontWeight:"bold",color:"white",letterSpacing:"-0.025em",textTransform:"capitalize",margin:0},children:i}),t.jsx("p",{style:{color:"#d8b4fe",fontWeight:500,fontSize:"0.875rem",margin:0},children:"Visual Identity"}),t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem",color:"#a1a1aa",fontSize:"0.75rem",marginTop:"0.25rem"},children:[t.jsx(S,{size:12}),t.jsx("span",{children:"WebGL Context"})]})]}),t.jsxs("p",{style:{color:"#d4d4d8",fontSize:"0.875rem",textAlign:"center",lineHeight:1.5,margin:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:["Procedural shader config with ",r.spokeCount.toFixed(0)," radial spokes and ",r.contrast.toFixed(1),"x contrast."]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",paddingTop:"1rem"},children:[t.jsxs("button",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.5rem 1rem",backgroundColor:"white",color:"black",borderRadius:"0.75rem",fontWeight:600,border:"none",cursor:"pointer",fontSize:"0.875rem",transition:"background-color 0.2s ease"},children:[t.jsx(u,{size:16}),t.jsx("span",{children:"Apply"})]}),t.jsxs("button",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.5rem 1rem",backgroundColor:"#18181b",color:"white",borderRadius:"0.75rem",fontWeight:600,border:"1px solid #3f3f46",cursor:"pointer",fontSize:"0.875rem",transition:"background-color 0.2s ease"},children:[t.jsx(A,{size:16}),t.jsx("span",{children:"Remix"})]})]})]})]})]})};function E(){return t.jsx("div",{style:{minHeight:"100vh",backgroundColor:"black",color:"white",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"system-ui, -apple-system, sans-serif"},children:t.jsxs("div",{style:{maxWidth:"80rem",margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:"3rem"},children:[t.jsxs("div",{style:{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",color:"#a855f7"},children:[t.jsx(u,{size:20}),t.jsx("span",{style:{fontSize:"0.875rem",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.1em"},children:"System Library"})]}),t.jsx("h1",{style:{fontSize:"clamp(2rem, 8vw, 3rem)",fontWeight:900,letterSpacing:"-0.05em",margin:0,color:"white"},children:"Vortex Persona."})]}),t.jsx(P,{name:"Intense",params:_.intense}),t.jsx("p",{style:{color:"#71717a",maxWidth:"32rem",fontSize:"1rem",lineHeight:1.6,textAlign:"center"},children:"A procedural mathematical identity. Hover to activate the WebGL simulation engine."})]})})}v.createRoot(document.getElementById("root")).render(t.jsxs(b.StrictMode,{children:[t.jsx(w,{}),t.jsx(E,{})]}));
