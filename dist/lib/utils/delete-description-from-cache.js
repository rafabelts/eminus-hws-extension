var s=async o=>{let c=await chrome.storage.local.get(),a=Object.keys(c),r=o.map(e=>String(e.idActividad)),t=a.filter(e=>!r.includes(e));console.log(`acts to remove: ${t.length}`),t.length>0&&await chrome.storage.local.remove(t)};export{s as deleteDescriptionFromCache};
