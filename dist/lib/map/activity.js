var i=async(o,r)=>{try{let e=await fetch("https://eminus-homeworks-api.rafabeltrans17.workers.dev/api/description",{method:"POST",body:JSON.stringify({description:r})});if(console.log(e),!e.ok)throw new Error("Failed to fetch summary");let t=await e.text();return chrome.storage.local.set({[String(o)]:t}),t}catch{return"No se tiene descripci\xF3n"}};var n=async(o,r)=>{try{let e=await chrome.storage.local.get([String(o)]);if(console.log("ya busque"),!e[String(o)]){let t=await i(o,r);return console.log("llame la api"),console.log(t),t}return e[String(o)]}catch{return"Error obteniendo la descripci\xF3n"}};var p=async o=>Promise.all(o.map(async r=>{let e=await n(r.idActividad,r.descripcion);return{idCurso:r.idCurso,idActividad:r.idActividad,fechaEntrega:r.fechaEntrega,descripcion:e,titulo:r.titulo,fechaInicio:r.fechaInicio,fechaTermino:r.fechaTermino}}));export{p as mapActivities};
