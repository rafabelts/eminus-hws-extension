export type Course = {
  curso: {
    idCurso: number;
    nombre: string;
    fechaTermino: string;
    archivado: number;
  };
};

export type Activity = {
  idCurso: number;
  idActividad: number;
  fechaEntrega: string;
  descripcion: string;
  titulo: string;
  fechaInicio: string;
  fechaTermino: string;
  course?: string;
};
