import{r as n,j as e,a as m,R as h}from"./client-jcPAbkVI.js";import{C as f,u as a,a as p}from"./react-three-fiber.esm-BmoVAfYe.js";import{a as v,V as l,b as c}from"./three.module-DXxcgxC0.js";import{B as x}from"./BackButton-CBV6DpJJ.js";const g=`
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,y=`
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 dotColor;
  uniform vec3 bgColor;
  uniform vec2 uMouse;
  uniform float rotation;
  uniform float gridSize;
  uniform float dotOpacity;

  vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotationMatrix = mat2(c, -s, s, c);
    return rotationMatrix * (uv - 0.5) + 0.5;
  }

  vec2 coverUv(vec2 uv) {
    vec2 s = resolution.xy / max(resolution.x, resolution.y);
    vec2 newUv = (uv - 0.5) * s + 0.5;
    return clamp(newUv, 0.0, 1.0);
  }

  float sdfCircle(vec2 p, float r) {
    return length(p - 0.5) - r;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / resolution;
    vec2 uv = coverUv(screenUv);
    vec2 rotatedUv = rotate(uv, rotation);

    vec2 gridUv = fract(rotatedUv * gridSize);
    
    float baseDot = sdfCircle(gridUv, 0.25);
    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
    vec2 centerDisplace = vec2(0.7, 1.1);
    float circleMaskCenter = length(uv - centerDisplace);
    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
    
    float combinedMask = screenMask * circleMaskFromCenter;
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

    float distToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse); // Larger radius
    
    float scaleInfluence = max(mouseInfluence * 1.5, circleAnimatedMask * 0.3); // Stronger scale
    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.35, 0.35); // Slightly larger base
    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 1.2)); // More growth
    float smoothDot = smoothstep(0.05, 0.0, sdfDot);
    float opacityInfluence = max(mouseInfluence * 3.0, circleAnimatedMask * 0.5); // Brighter near mouse

    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));
    gl_FragColor = vec4(composition, 1.0);
  }
`;function b(){const t=a(i=>i.size),r=a(i=>i.viewport),o=n.useMemo(()=>new v({uniforms:{time:{value:0},resolution:{value:new l},dotColor:{value:new c("#c084fc")},bgColor:{value:new c("#030303")},uMouse:{value:new l(.5,.5)},rotation:{value:0},gridSize:{value:60},dotOpacity:{value:.6}},vertexShader:g,fragmentShader:y,transparent:!0}),[]);p(i=>{if(o){o.uniforms.time.value=i.clock.elapsedTime;const d=(i.pointer.x+1)/2,u=(i.pointer.y+1)/2;o.uniforms.uMouse.value.x+=(d-o.uniforms.uMouse.value.x)*.1,o.uniforms.uMouse.value.y+=(u-o.uniforms.uMouse.value.y)*.1}}),n.useEffect(()=>{o.uniforms.resolution.value.set(t.width*r.dpr,t.height*r.dpr)},[t,r,o]);const s=Math.max(r.width,r.height)/2;return e.jsxs("mesh",{scale:[s,s,1],children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("primitive",{object:o,attach:"material"})]})}function j(){return e.jsx(f,{flat:!0,style:{width:"100%",height:"100%"},children:e.jsx(b,{})})}const k=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"})]}),w=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]});function M(){const[t,r]=n.useState(!1);return e.jsx("div",{style:{minHeight:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"system-ui, -apple-system, sans-serif"},children:e.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:"24rem",overflow:"hidden",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.1)",background:"#171717",transition:"all 0.3s ease",boxShadow:t?"0 25px 50px -12px rgba(168, 85, 247, 0.25)":"none"},onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),children:[e.jsxs("div",{style:{position:"absolute",inset:0,zIndex:0,height:"400px"},children:[e.jsx(j,{}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(23,23,23,0.9) 100%)",pointerEvents:"none"}})]}),e.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"space-between",height:"400px",padding:"1.5rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsx("div",{style:{padding:"0.5rem",borderRadius:"0.5rem",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.2)",transition:"transform 0.5s ease",transform:t?"scale(1.1) rotate(3deg)":"none",color:"#c084fc"},children:e.jsx(k,{})}),e.jsx("span",{style:{fontSize:"0.75rem",fontFamily:"monospace",color:"rgba(192, 132, 252, 0.8)",background:"rgba(147, 51, 234, 0.2)",padding:"0.25rem 0.5rem",borderRadius:"0.25rem",border:"1px solid rgba(147, 51, 234, 0.3)"},children:"SYS.02"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("h2",{style:{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.025em",color:"white",marginBottom:"0.5rem",textShadow:"0 2px 4px rgba(0,0,0,0.5)"},children:"Dot Matrix Field"}),e.jsx("p",{style:{fontSize:"0.875rem",color:"#d4d4d4",lineHeight:1.6,fontWeight:300},children:"Reactive particle grid with mouse-tracking interpolation. Each node pulses in harmonic resonance. Field density: 80×80."})]}),e.jsx("div",{style:{paddingTop:"1rem"},children:e.jsx("button",{style:{position:"relative",width:"100%",overflow:"hidden",borderRadius:"0.75rem",background:t?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.05)",padding:"1px",border:"none",cursor:"pointer",transition:"all 0.3s ease"},children:e.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",borderRadius:"0.75rem",background:"rgba(23,23,23,0.5)",padding:"0.75rem 1rem",fontSize:"0.875rem",fontWeight:500,color:"white",backdropFilter:"blur(4px)"},children:[e.jsx("span",{children:"Activate Grid"}),e.jsx("span",{style:{transition:"transform 0.3s ease",transform:t?"translateX(4px)":"none"},children:e.jsx(w,{})})]})})})]})]}),e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",border:`2px solid ${t?"rgba(168, 85, 247, 0.3)":"transparent"}`,borderRadius:"1rem",transition:"all 0.5s ease"}})]})})}m.createRoot(document.getElementById("root")).render(e.jsxs(h.StrictMode,{children:[e.jsx(x,{}),e.jsx(M,{})]}));
