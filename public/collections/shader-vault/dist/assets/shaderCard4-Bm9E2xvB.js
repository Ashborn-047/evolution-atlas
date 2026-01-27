import{r as n,j as e,a as f,R as g}from"./client-jcPAbkVI.js";import{S as b,O as y,W as j,a as w,V as k,P as R,M as S}from"./three.module-DXxcgxC0.js";import{B as E}from"./BackButton-CBV6DpJJ.js";function C(){const o=n.useRef(null);return n.useEffect(()=>{const t=o.current;if(!t)return;const s=new b,v=new y(-1,1,1,-1,0,1),i=new j({antialias:!0,alpha:!0}),a=t.clientWidth,l=t.clientHeight;i.setSize(a,l),i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.domElement.style.position="absolute",i.domElement.style.top="0",i.domElement.style.left="0",i.domElement.style.width="100%",i.domElement.style.height="100%",t.appendChild(i.domElement);const r=new w({uniforms:{iTime:{value:0},iResolution:{value:new k(a,l)}},vertexShader:`
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 2

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.4;
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = x * 2.0 + vec2(50.0);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          // --- STAR FIELD (simplified - 2 layers) ---
          vec2 starUV = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
          vec3 starLayer = vec3(0.0);
          
          for(float k=1.0; k<=2.0; k++){
              vec2 s = starUV * (12.0 * k + 10.0);
              vec2 id = floor(s);
              vec2 q = fract(s) - 0.5;
              float r = rand(id + k * 50.0);
              
              if(r > 0.97){
                  vec2 pos = vec2(r - 0.5, fract(r * 34.0) - 0.5) * 0.7;
                  float d = length(q - pos);
                  float b = smoothstep(0.04 / k, 0.0, d); 
                  float t = 0.6 + 0.4 * sin(iTime * 2.0 * k + r * 50.0);
                  starLayer += vec3(b * t);
              }
          }

          // --- AURORA (optimized) ---
          vec2 shake = vec2(sin(iTime * 1.8) * 0.008, cos(iTime * 2.3) * 0.008);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec4 o = vec4(0.0);

          float f = 2.0 + noise(p + vec2(iTime * 3.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 20.0; i++) {
            float wave = sin(iTime * 1.5 + i * 0.4) * 0.3;
            vec2 v = p + cos(i * i + (iTime * 0.8 + p.x * 0.1) * 0.1 + i * vec2(13.0, 11.0)) * (3.2 + wave);
            v += vec2(sin(iTime * 2.5 + i * 0.2) * 0.015, cos(iTime * 3.0 - i * 0.15) * 0.015);
            
            vec4 auroraColors = vec4(
              0.15 + 0.35 * sin(i * 0.3 + iTime * 0.8),
              0.35 + 0.45 * cos(i * 0.4 + iTime * 1.0),
              0.7 + 0.25 * sin(i * 0.5 + iTime * 0.7),
              1.0
            );
            
            vec4 contrib = auroraColors * exp(sin(i * i + iTime * 1.2)) / length(max(v, vec2(v.x * f * 0.02, v.y * 1.4)));
            float thin = smoothstep(0.0, 1.0, i / 20.0) * 0.7;
            o += contrib * thin;
          }

          o = tanh(pow(o / 60.0, vec4(1.5)));
          
          gl_FragColor = (o * 1.6) + vec4(starLayer * 0.7, 1.0);
        }
      `}),d=new R(2,2),x=new S(d,r);s.add(x);let c;const m=()=>{r.uniforms.iTime.value+=.02,i.render(s,v),c=requestAnimationFrame(m)};m();const p=()=>{if(!t)return;const h=t.clientWidth,u=t.clientHeight;i.setSize(h,u),r.uniforms.iResolution.value.set(h,u)};return window.addEventListener("resize",p),()=>{cancelAnimationFrame(c),window.removeEventListener("resize",p),t&&i.domElement&&t.removeChild(i.domElement),d.dispose(),r.dispose(),i.dispose()}},[]),e.jsx("div",{ref:o,style:{position:"absolute",inset:0,width:"100%",height:"100%",background:"#000"}})}const T=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}),e.jsx("path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}),e.jsx("path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"})]}),M=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]});function z(){const[o,t]=n.useState(!1);return e.jsx("div",{style:{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"system-ui, -apple-system, sans-serif"},children:e.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:"24rem"},children:[e.jsx("div",{style:{position:"absolute",inset:0,height:"100%",width:"100%",background:"linear-gradient(to right, #10b981, #06b6d4, #8b5cf6)",transform:"scale(0.85)",borderRadius:"9999px",filter:"blur(60px)",opacity:.4,pointerEvents:"none"}}),e.jsxs("div",{style:{position:"relative",width:"100%",overflow:"hidden",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.1)",background:"#0a0a0a",transition:"all 0.3s ease",boxShadow:o?"0 25px 50px -12px rgba(16, 185, 129, 0.3)":"none"},onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),children:[e.jsxs("div",{style:{position:"absolute",inset:0,zIndex:0,height:"400px"},children:[e.jsx(C,{}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(10,10,10,0.95) 100%)",pointerEvents:"none"}})]}),e.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"space-between",height:"400px",padding:"1.5rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsx("div",{style:{padding:"0.5rem",borderRadius:"0.5rem",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.2)",transition:"transform 0.5s ease",transform:o?"scale(1.1) rotate(3deg)":"none",color:"#34d399"},children:e.jsx(T,{})}),e.jsx("span",{style:{fontSize:"0.75rem",fontFamily:"monospace",color:"rgba(52, 211, 153, 0.8)",background:"rgba(16, 185, 129, 0.2)",padding:"0.25rem 0.5rem",borderRadius:"0.25rem",border:"1px solid rgba(16, 185, 129, 0.3)"},children:"SYS.04"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("h2",{style:{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.025em",color:"white",marginBottom:"0.5rem",textShadow:"0 2px 4px rgba(0,0,0,0.5)"},children:"Aurora Borealis"}),e.jsx("p",{style:{fontSize:"0.875rem",color:"#d1d5db",lineHeight:1.6,fontWeight:300},children:"Solar winds collide with magnetosphere. Charged particles dance across the polar sky. Nature's light show in motion."})]}),e.jsx("div",{style:{paddingTop:"1rem"},children:e.jsx("button",{style:{position:"relative",width:"100%",overflow:"hidden",borderRadius:"0.75rem",background:o?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.05)",padding:"1px",border:"none",cursor:"pointer",transition:"all 0.3s ease"},children:e.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",borderRadius:"0.75rem",background:"rgba(10,10,10,0.5)",padding:"0.75rem 1rem",fontSize:"0.875rem",fontWeight:500,color:"white",backdropFilter:"blur(4px)"},children:[e.jsx("span",{children:"Enter the Sky"}),e.jsx("span",{style:{transition:"transform 0.3s ease",transform:o?"translateX(4px)":"none"},children:e.jsx(M,{})})]})})})]})]}),e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",border:`2px solid ${o?"rgba(52, 211, 153, 0.3)":"transparent"}`,borderRadius:"1rem",transition:"all 0.5s ease"}})]})]})})}f.createRoot(document.getElementById("root")).render(e.jsxs(g.StrictMode,{children:[e.jsx(E,{}),e.jsx(z,{})]}));
