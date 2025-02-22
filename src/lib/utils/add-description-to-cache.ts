export const addDescriptionToCache = async (
  idActividad: number,
  description: string
) => {
  try {
    const response = await fetch(
      "https://eminus-homeworks-api.rafabeltrans17.workers.dev/api/description",
      {
        method: "POST",
        body: JSON.stringify({ description }),
      }
    );

    console.log("API called");

    if (!response.ok) throw new Error("Failed to fetch summary");

    const summaryDescription = await response.text();

    chrome.storage.local.set({ [String(idActividad)]: summaryDescription });

    return response.text();
  } catch (error) {
    return "No se tiene descripción";
  }
};
