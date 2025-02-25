var p="/eminusapi/api/Cursos/getAllCourses",u="/eminusapi/api/Actividad/getActividadesEstudiante/";var g=async(r,e)=>{try{let t=await fetch("https://eminus-homeworks-api.rafabeltrans17.workers.dev/api/description",{method:"POST",body:JSON.stringify({description:e})});if(console.log("API called"),!t.ok)throw new Error("Failed to fetch summary");let o=await t.text();return chrome.storage.local.set({[String(r)]:o}),t.text()}catch{return"No se tiene descripci\xF3n"}};var f=async(r,e)=>{try{let t=await chrome.storage.local.get([String(r)]);return t[String(r)]?t[String(r)]:await g(r,e)}catch{return"Error obteniendo la descripci\xF3n"}};var h=async r=>Promise.all(r.map(async e=>{let t=await f(e.idActividad,e.descripcion);return{idCurso:e.idCurso,idActividad:e.idActividad,fechaEntrega:e.fechaEntrega,descripcion:t,titulo:e.titulo,fechaInicio:e.fechaInicio,fechaTermino:e.fechaTermino}}));var y=async r=>{let e=await chrome.storage.local.get(),t=Object.keys(e),o=r.map(s=>String(s.idActividad)),i=t.filter(s=>!o.includes(s));console.log(`acts to remove: ${i.length}`),i.length>0&&await chrome.storage.local.remove(i)};var v=async(r,e)=>{try{let o=await(await fetch(`https://eminus.uv.mx/${e}`,{headers:{authorization:`Bearer ${r}`},method:"GET"})).text();if(!o.trim())throw new Error("Empty response");return JSON.parse(o)}catch{return[]}},T=async r=>{try{let e=await v(r,p);if(!e||e.length==0)throw new Error("No courses found");return e.filter(o=>new Date(o.curso.fechaTermino)>new Date&&o.curso.archivado==0)}catch(e){return console.error(e),[]}},b=async(r,e)=>{try{let t=await v(r,`${u}/${e}`);if(!t||t.length==0)throw new Error("No activities found");let o=t.filter(i=>new Date(i.fechaTermino)>new Date);return h(o)}catch{return[]}},x=async r=>{try{let e=await T(r),t=[];for(let o of e){let s=(await b(r,o.curso.idCurso)).map(n=>({...n,course:o.curso.nombre}));t.push(...s)}return y(t),t.sort((o,i)=>new Date(o.fechaTermino).getTime()-new Date(i.fechaTermino).getTime())}catch{return[]}};var A=(r,e)=>{let t={config:{demo:"default",navegation:{course:{id:r,permission:2,unit:0,activity:e,forum:0,exam:0,view_student:!1,type:1},forum:{comment:0},member:{user:""},tracing:{user:""},exam:{id:"",ending:""}}}};return localStorage.setItem("layoutConfigNavegation",JSON.stringify(t)),localStorage.setItem("courseId",String(r)),localStorage.setItem("changeActivityId",String(e)),window.location.assign("https://eminus.uv.mx/eminus4/page/course/activity/delivery"),t};var w=(r,e,t,o)=>{x(r).then(i=>{let s=document.createElement("p");s.textContent=i.length,s.style.fontSize="1.4rem",s.style.fontWeight="500",e.appendChild(s);let n=document.createElement("ul");if(n.style.display="flex",n.style.flexDirection="column",n.style.gap="20px",i.length===0){let a=document.createElement("p");a.textContent="No tienes pendientes",o.remove(),n.remove(),t.appendChild(a)}else t.remove(),n.classList.add("acts-list"),n.style.overflowX="hidden",n.style.overflowY="auto",n.style.maxHeight="53rem",n.style.width="100%",e.appendChild(n);i.forEach(a=>{let l=document.createElement("li");l.style.decoration="none";let c=document.createElement("div");c.className="act-item",c.style.borderRadius="5px",c.style.cursor="pointer",c.addEventListener("click",()=>{A(a.idCurso,a.idActividad)});let m=document.createElement("p");m.textContent=a.titulo,m.style.fontWeight="bold",m.style.fontSize="1.1rem";let d=document.createElement("div");d.innerHTML=`
<p>${a.course||""}</p>
<p><strong>Entrega:</strong> ${new Date(a.fechaTermino).toLocaleString("es-MX")}<p>
    <span><p><strong>Descripcion:</strong></p> ${a.descripcion}</span>
`,l.appendChild(c),d.insertBefore(m,d.firstChild),c.appendChild(d),n.appendChild(c)})})};var C=(r,e)=>{let t=document.createElement("p");t.style.fontSize="1.2 rem",t.style.color="red",e.remove(),r.appendChild(t)};var E=()=>{if(document.querySelector(".wrapper"))return;let r=document.querySelector(".d-flex.flex-column.align-items-center.mt-3");if(r){let e=document.createElement("div");e.classList.add("wrapper"),r.parentNode.insertBefore(e,r),e.appendChild(r);let t=document.createElement("div");t.classList.add("dues-container");let o=document.createElement("h1");o.textContent="Tareas pendientes:",o.style.fontSize="1.8rem",o.style.fontWeight="600";let i=document.createElement("div");i.classList.add("loader-div"),i.style.width="100%";let s=document.createElement("div");s.classList.add("loader"),t.appendChild(o),t.appendChild(i),i.appendChild(s),e.appendChild(t);let n=localStorage.getItem("accessToken");if(!n)C(i,s);else{w(n,t,i,s);let a=document.createElement("style");a.innerHTML=`
.wrapper {
display: flex;
flex-direction: row;
gap: 5px;
}

.loader-div {
color: black;
display: flex;
justify-content: center; 
align-items: center;
flex-direction: column;
padding: 15px;
}

.loader {
width: 50px;
padding: 8px;
aspect-ratio: 1;
border-radius: 50%;
background: rgb(13, 71, 161);
--_m: 
conic-gradient(#0000 10%,#000),
linear-gradient(#000 0 0) content-box;
-webkit-mask: var(--_m);
mask: var(--_m);
-webkit-mask-composite: source-out;
mask-composite: subtract;
animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}



.d-flex.flex-column.align-items-center.mt-3 {
flex: 2;

}

.acts-list {
padding:5px;
}

.dues-container {
flex: 0.72;
margin-top: 12px;
background: #f8f9fa;
padding: 15px;
border-radius: 8px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.act-item {
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
padding: 2rem;
}
}
`,document.head.appendChild(a)}}};chrome.runtime.onMessage.addListener((r,e,t)=>{r.action==="urlChange"&&E()});
