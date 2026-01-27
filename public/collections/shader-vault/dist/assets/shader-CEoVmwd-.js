import{r as m,j as d}from"./client-jcPAbkVI.js";import{C as k,u as y,a as b}from"./react-three-fiber.esm-BmoVAfYe.js";import{a as w,V as M,b as x}from"./three.module-DXxcgxC0.js";var U=(t,a,n,c,l,s,f,i)=>{let e=document.documentElement,u=["light","dark"];function o(r){(Array.isArray(t)?t:[t]).forEach(v=>{let p=v==="class",S=p&&s?l.map(C=>s[C]||C):l;p?(e.classList.remove(...S),e.classList.add(s&&s[r]?s[r]:r)):e.setAttribute(v,r)}),h(r)}function h(r){i&&u.includes(r)&&(e.style.colorScheme=r)}function g(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(c)o(c);else try{let r=localStorage.getItem(a)||n,v=f&&r==="system"?g():r;o(v)}catch{}},T=m.createContext(void 0),F={setTheme:t=>{},themes:[]},z=()=>{var t;return(t=m.useContext(T))!=null?t:F};m.memo(({forcedTheme:t,storageKey:a,attribute:n,enableSystem:c,enableColorScheme:l,defaultTheme:s,value:f,themes:i,nonce:e,scriptProps:u})=>{let o=JSON.stringify([n,a,s,t,i,f,c,l]).slice(1,-1);return m.createElement("script",{...u,suppressHydrationWarning:!0,nonce:typeof window>"u"?e:"",dangerouslySetInnerHTML:{__html:`(${U.toString()})(${o})`}})});const E=`
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,D=`
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

    // Create a grid
    vec2 gridUv = fract(rotatedUv * gridSize);
    vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

    // Calculate distance from the center of each cell
    float baseDot = sdfCircle(gridUv, 0.25);

    // Screen mask
    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y); // 0 at the top, 1 at the bottom
    vec2 centerDisplace = vec2(0.7, 1.1);
    float circleMaskCenter = length(uv - centerDisplace);
    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
    
    float combinedMask = screenMask * circleMaskFromCenter;
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

    // Mouse influence (simple distance check instead of texture trail)
    // We calculate distance in the 'covered' UV space to match the grid distortion
    // This replaces the texture lookup from the 'drei' dependency
    float distToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse); // Larger radius
    
    float scaleInfluence = max(mouseInfluence * 1.5, circleAnimatedMask * 0.3); // Stronger scale

    // Create dots with animated scale, influenced by mouse
    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.35, 0.35); // Slightly larger base

    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 1.2)); // More growth

    float smoothDot = smoothstep(0.05, 0.0, sdfDot);

    float opacityInfluence = max(mouseInfluence * 3.0, circleAnimatedMask * 0.5); // Brighter near mouse

    // Mix background color with dot color, using animated opacity to increase visibility
    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

    gl_FragColor = vec4(composition, 1.0);
  }
`;function I(){const t=y(o=>o.size),a=y(o=>o.viewport),n=z(),c=(n==null?void 0:n.theme)||"dark",l=0,s=60,i=(()=>{switch(c){case"dark":return{dotColor:"#c084fc",bgColor:"#030303",dotOpacity:.6};case"light":return{dotColor:"#7c3aed",bgColor:"#fafafa",dotOpacity:.4};default:return{dotColor:"#c084fc",bgColor:"#030303",dotOpacity:.6}}})(),e=m.useMemo(()=>new w({uniforms:{time:{value:0},resolution:{value:new M},dotColor:{value:new x("#FFFFFF")},bgColor:{value:new x("#121212")},uMouse:{value:new M(.5,.5)},rotation:{value:l},gridSize:{value:s},dotOpacity:{value:.05}},vertexShader:E,fragmentShader:D,transparent:!0}),[]);b(o=>{if(e){e.uniforms.time.value=o.clock.elapsedTime;const h=(o.pointer.x+1)/2,g=(o.pointer.y+1)/2;e.uniforms.uMouse.value.x+=(h-e.uniforms.uMouse.value.x)*.1,e.uniforms.uMouse.value.y+=(g-e.uniforms.uMouse.value.y)*.1}}),m.useEffect(()=>{e.uniforms.dotColor.value.set(i.dotColor),e.uniforms.bgColor.value.set(i.bgColor),e.uniforms.dotOpacity.value=i.dotOpacity,e.uniforms.resolution.value.set(t.width*a.dpr,t.height*a.dpr)},[i,t,a,e]);const u=Math.max(a.width,a.height)/2;return d.jsxs("mesh",{scale:[u,u,1],children:[d.jsx("planeGeometry",{args:[2,2]}),d.jsx("primitive",{object:e,attach:"material"})]})}const _=()=>d.jsx(k,{flat:!0,style:{width:"100%",height:"100%"},children:d.jsx(I,{})});export{_ as DotScreenShader};
