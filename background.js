chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askChatGPT",
    title: "Ask ChatGPT about this",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "askChatGPT" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText);
    const prompt = encodeURIComponent(`Can you explain this: "${info.selectionText}" like I'm 5?`);
    chrome.tabs.create({
      url: `https://chat.openai.com/?prompt=${prompt}`
    });
  }
});