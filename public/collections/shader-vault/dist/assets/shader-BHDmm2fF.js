import{j as t,r as i}from"./client-jcPAbkVI.js";function s({number:r=20,color:a="#64748b"}){const o=i.useMemo(()=>Array.from({length:r},(e,n)=>({id:n,left:Math.floor(Math.random()*800-400),delay:Math.random()*.6+.2,duration:Math.floor(Math.random()*8+2)})),[r]);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        @keyframes meteor {
          0% { 
            transform: rotate(215deg) translateX(0); 
            opacity: 1; 
          }
          70% { 
            opacity: 1; 
          }
          100% { 
            transform: rotate(215deg) translateX(-500px); 
            opacity: 0; 
          }
        }
      `}),o.map(e=>t.jsx("span",{style:{position:"absolute",top:0,left:`${e.left}px`,width:"2px",height:"2px",borderRadius:"9999px",backgroundColor:a,boxShadow:"0 0 0 1px rgba(255,255,255,0.1)",transform:"rotate(215deg)",animation:`meteor ${e.duration}s linear infinite`,animationDelay:`${e.delay}s`},children:t.jsx("span",{style:{content:'""',position:"absolute",top:"50%",transform:"translateY(-50%)",width:"50px",height:"1px",background:`linear-gradient(to right, ${a}, transparent)`}})},`meteor-${e.id}`))]})}function d(){return t.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#020617",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:[t.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top right, #0f172a, #020617)"}}),t.jsx(s,{number:40}),t.jsx("div",{style:{position:"relative",zIndex:10,color:"#94a3b8",fontFamily:"system-ui, sans-serif",fontWeight:300,letterSpacing:"0.2em",textTransform:"uppercase",fontSize:"0.875rem"},children:"Meteor Shower Effect"})]})}export{s as MeteorEffect,s as Meteors,d as default};
