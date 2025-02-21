import { getAllActivities } from "../fetch";
import { generateActivityNavigation } from "../navigation";
import { Activity } from "../types";

export const renderActivities = (
  token: string,
  duesContainer: HTMLDivElement,
  loadingDiv: HTMLDivElement,
  loader: HTMLDivElement
) => {
  getAllActivities(token).then((activities: Array<Activity>) => {
    // lista de actividades
    const activitiesList = document.createElement("ul");

    if (activities.length === 0) {
      const congratulationMessage = document.createElement("p");
      congratulationMessage.textContent =
        "Felicitaciones! No tienes pendientes";

      loader.remove();
      activitiesList.remove();
      loadingDiv.appendChild(congratulationMessage);
    } else {
      loadingDiv.remove();
      activitiesList.classList.add("acts-list");

      activitiesList.style.overflowX = "hidden";
      activitiesList.style.overflowY = "auto";
      activitiesList.style.maxHeight = "53rem";
      activitiesList.style.width = "100%";

      duesContainer.appendChild(activitiesList);
    }

    activities.forEach((activity: Activity) => {
      const actListItem = document.createElement("li");
      actListItem.style.decoration = "none";

      // contenedor de la info de la act
      const actDiv = document.createElement("div");
      actDiv.className = "act-item";
      actDiv.style.borderRadius = "5px";
      actDiv.style.cursor = "pointer";

      actDiv.addEventListener("click", () => {
        generateActivityNavigation(activity.idCurso, activity.idActividad);
      });

      const activityTitle = document.createElement("p");
      activityTitle.textContent = activity.titulo;
      activityTitle.style.fontWeight = "bold";
      activityTitle.style.fontSize = "1.1rem";

      const actInfo = document.createElement("div");

      actInfo.innerHTML = `
<p>${activity.course || ""}</p>
<p><strong>Entrega el:</strong> ${new Date(activity.fechaTermino).toLocaleString("es-MX")}<p>
    <span><p><strong>Descripcion:</strong></p> ${activity.descripcion}</span>
`;

      actListItem.appendChild(actDiv);
      actInfo.insertBefore(activityTitle, actInfo.firstChild); // merges act title with the act info
      actDiv.appendChild(actInfo);
      activitiesList.appendChild(actDiv);
    });
  });
};
