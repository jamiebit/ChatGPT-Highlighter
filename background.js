chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askChatGPT",
    title: "Ask ChatGPT about this",
    contexts: ["selection"]
  });

  chrome.storage.sync.get(["inter"], (data) => {
    if (data.inter === undefined) {
      chrome.storage.sync.set({ inter: true });
    }
  })
}
);


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "askChatGPT" && info.selectionText) {

    const { customPrompt } = await chrome.storage.sync.get("customPrompt");
    const promptText = (customPrompt || "Explain briefly") + ' : ' + info.selectionText
    await chrome.storage.local.set({ pendingPrompt: promptText });

    // Set a failsafe timeout to remove the prompt after 2 minute
    setTimeout(() => {
      chrome.storage.local.remove("pendingPrompt");
    }, 120000);

    // if user is already logged in, it automatically redirects to chatgpt page
    chrome.tabs.create({ url: "https://chatgpt.com/auth/login" });
  }
});
