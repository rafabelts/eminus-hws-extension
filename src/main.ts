import { injectable } from "./lib";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "urlChange") {
    injectable();
  }
});
