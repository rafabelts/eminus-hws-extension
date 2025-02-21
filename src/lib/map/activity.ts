import { Activity } from "../types";

export const mapActivities = async (activities: Array<Activity>) => {

    return Promise.all(
        activities.map(async (act: Activity) => {
            const getSummary = await fetch("http://localhost:53730/api/description", {
                method: "POST",
                body: JSON.stringify({
                    description: act.descripcion
                })
            })

            const summaryDescription = await getSummary.text();

            console.log(summaryDescription);

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
