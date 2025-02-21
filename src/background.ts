let timeoutId: ReturnType<typeof setTimeout> | null = null;

function handleUrlChange(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
): void {
  const targetUrl = "https://eminus.uv.mx/eminus4/page/course/list";

  if (changeInfo.url && changeInfo.url.includes(targetUrl)) {
    console.log("URL detected (URL change):", changeInfo.url);
    scheduleAction(tabId);
  } else if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes(targetUrl)
  ) {
    console.log("URL detected (page reload):", tab.url);
    scheduleAction(tabId);
  }
}

function scheduleAction(tabId: number): void {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    performAction(tabId);
    timeoutId = null;
  }, 200);
}

/**
 * Sends a message to the content script when the URL change is detected.
 */
function performAction(tabId: number): void {
  chrome.tabs.sendMessage(tabId, { action: "urlChange" });
}

// Add listener for tab updates (URL changes and reloads)
chrome.tabs.onUpdated.addListener(handleUrlChange);
