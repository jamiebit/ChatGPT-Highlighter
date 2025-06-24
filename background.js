chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askChatGPT",
    title: "Ask ChatGPT about this",
    contexts: ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "askChatGPT" && info.selectionText) {

    const promptText = `Explain "${info.selectionText}" simply and briefly.`;
    await chrome.storage.local.set({ pendingPrompt: promptText });

    // Set a failsafe timeout to remove the prompt after 2 minute
    setTimeout(() => {
      chrome.storage.local.remove("pendingPrompt");
    }, 120000);


    // if user is already logged in, it automatically redirects to chatgpt page
    chrome.tabs.create({ url: "https://chatgpt.com/auth/login" });
  }
});
