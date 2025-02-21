import { renderActivities } from "./render-activities";
import { renderErrorMessage } from "./render-error-message";

export const injectable = () => {
  const mainDiv = document.querySelector(
    ".d-flex.flex-column.align-items-center.mt-3"
  );

  if (mainDiv) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    //  se inserta el div dentro del wrapper
    mainDiv.parentNode.insertBefore(wrapper, mainDiv);
    wrapper.appendChild(mainDiv);

    // div donde se renderizaran las tareas pendientes
    let duesContainer = document.createElement("div");
    duesContainer.classList.add("dues-container");

    const title = document.createElement("h1");
    title.textContent = "Tareas pendientes";
    title.style.fontSize = "1.8rem";
    title.style.fontWeight = "600";
    title.style.padding = "15px";
    title.style.marginBottom = "5px";

    // div for loader
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loader-div");
    loadingDiv.style.width = "100%";

    const loader = document.createElement("div");
    loader.classList.add("loader");

    duesContainer.appendChild(title);
    duesContainer.appendChild(loadingDiv);
    loadingDiv.appendChild(loader);

    wrapper.appendChild(duesContainer); // agrega el contenedor de pendientes al padre

    const token = localStorage.getItem("accessToken");

    if (!token) {
      renderErrorMessage(loadingDiv, loader);
    } else {
      renderActivities(token, duesContainer, loadingDiv, loader);

      const style = document.createElement("style");

      style.innerHTML = `
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
`;
      document.head.appendChild(style);
    }
  }
};
