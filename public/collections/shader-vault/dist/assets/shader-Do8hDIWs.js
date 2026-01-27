import{r as c,j as E}from"./client-jcPAbkVI.js";import{C as _,S as R,P as j,a as S,V as h,M as W,W as C}from"./three.module-DXxcgxC0.js";function z(){const s=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{if(!s.current)return;const e=s.current,p=`
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `,g=`
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 u_mouse;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 mouse = (u_mouse.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01) * 5.0 - length(uv - mouse) + mod(uv.x + uv.y, 0.2));
          }
        }
        
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `,a=new _;a.position.z=1;const u=new R,m=new j(2,2),t={time:{type:"f",value:1},resolution:{type:"v2",value:new h},u_mouse:{type:"v2",value:new h}},d=new S({uniforms:t,vertexShader:p,fragmentShader:g}),w=new W(m,d);u.add(w);const o=new C({antialias:!0,alpha:!0});o.setPixelRatio(window.devicePixelRatio),e.appendChild(o.domElement);const l=()=>{if(!e)return;const i=e.clientWidth,r=e.clientHeight;o.setSize(i,r),t.resolution.value.x=o.domElement.width,t.resolution.value.y=o.domElement.height,t.u_mouse.value.x===0&&t.u_mouse.value.y===0&&(t.u_mouse.value.x=o.domElement.width/2,t.u_mouse.value.y=o.domElement.height/2)},v=i=>{const r=e.getBoundingClientRect(),x=i.clientX-r.left,y=r.height-(i.clientY-r.top);t.u_mouse.value.set(x,y)};l(),t.u_mouse.value.set(e.clientWidth/2,e.clientHeight/2),window.addEventListener("resize",l,!1),e.addEventListener("mousemove",v);const f=()=>{const i=requestAnimationFrame(f);t.time.value+=.05,o.render(u,a),n.current&&(n.current.animationId=i)};return n.current={camera:a,scene:u,renderer:o,uniforms:t,animationId:0},f(),()=>{window.removeEventListener("resize",l),e.removeEventListener("mousemove",v),n.current&&(cancelAnimationFrame(n.current.animationId),e&&n.current.renderer.domElement&&e.contains(n.current.renderer.domElement)&&e.removeChild(n.current.renderer.domElement),n.current.renderer.dispose(),m.dispose(),d.dispose())}},[]),E.jsx("div",{ref:s,style:{width:"100%",height:"100%",minHeight:"400px",background:"#000",overflow:"hidden"}})}export{z as NeuralRippleShader,z as default};
