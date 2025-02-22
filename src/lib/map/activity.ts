import { Activity } from "../types";
import { fetchSummaryDescription } from "../utils/fetch-summary-description";

export const mapActivities = async (activities: Array<Activity>) => {
  return Promise.all(
    activities.map(async (act: Activity) => {
      const summaryDescription = await fetchSummaryDescription(
        act.idActividad,
        act.descripcion
      );

      return {
        idCurso: act.idCurso,
        idActividad: act.idActividad,
        fechaEntrega: act.fechaEntrega,
        descripcion: summaryDescription,
        titulo: act.titulo,
        fechaInicio: act.fechaInicio,
        fechaTermino: act.fechaTermino,
      };
    })
  );
};
