import{j as t,r as u}from"./client-jcPAbkVI.js";import{S as x,O as y,W as g,a as w,V as T,P as R,M as E}from"./three.module-DXxcgxC0.js";function S(){const n=u.useRef(null);return u.useEffect(()=>{const i=n.current;if(!i)return;const r=new x,h=new y(-1,1,1,-1,0,1),e=new g({antialias:!0,alpha:!0}),s=i.clientWidth,a=i.clientHeight;e.setSize(s,a),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.domElement.style.position="absolute",e.domElement.style.top="0",e.domElement.style.left="0",e.domElement.style.width="100%",e.domElement.style.height="100%",i.appendChild(e.domElement);const o=new w({uniforms:{iTime:{value:0},iResolution:{value:new T(s,a)}},vertexShader:`
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
      `}),l=new R(2,2),p=new E(l,o);r.add(p);let c;const m=()=>{o.uniforms.iTime.value+=.02,e.render(r,h),c=requestAnimationFrame(m)};m();const d=()=>{if(!i)return;const v=i.clientWidth,f=i.clientHeight;e.setSize(v,f),o.uniforms.iResolution.value.set(v,f)};return window.addEventListener("resize",d),()=>{cancelAnimationFrame(c),window.removeEventListener("resize",d),i&&e.domElement&&i.removeChild(e.domElement),l.dispose(),o.dispose(),e.dispose()}},[]),t.jsx("div",{ref:n,style:{position:"absolute",inset:0,width:"100%",height:"100%",background:"#000"}})}function C(){return t.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#000"},children:[t.jsx(S,{}),t.jsx("div",{style:{position:"relative",zIndex:10,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"},children:t.jsx("span",{style:{color:"#94a3b8",fontFamily:"system-ui, sans-serif",fontWeight:300,letterSpacing:"0.2em",textTransform:"uppercase",fontSize:"0.875rem"},children:"Aurora Borealis"})})]})}export{S as AuroraShader,C as default};
