import { addDescriptionToCache } from "./add-description-to-cache";

export const fetchSummaryDescription = async (
  idActividad: number,
  description: string
): Promise<string> => {
  try {
    const storedData = await chrome.storage.local.get([String(idActividad)]);

    if (!storedData[String(idActividad)]) {
      const generatedDescription = await addDescriptionToCache(
        idActividad,
        description
      );
      return generatedDescription;
    }

    return storedData[String(idActividad)];
  } catch (error) {
    return "Error obteniendo la descripción";
  }
};
