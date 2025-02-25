import { Activity } from "../types";

export const deleteDescriptionFromCache = async (
  activities: Array<Activity>
) => {
  const storedData = await chrome.storage.local.get();
  const cachedIds = Object.keys(storedData);

  const currentActIds = activities.map((act) => String(act.idActividad));

  const actsToRemove = cachedIds.filter((id) => !currentActIds.includes(id));

  if (actsToRemove.length > 0) {
    await chrome.storage.local.remove(actsToRemove);
  }
};
