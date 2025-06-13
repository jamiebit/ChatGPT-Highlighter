chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askChatGPT",
    title: "Ask ChatGPT about this",
    contexts: ["selection"]
  });
});

// Function to check if user is logged into ChatGPT
async function isUserLoggedIn() {
  try {
    const response = await fetch("https://chat.openai.com/api/auth/session", {
      credentials: "include"
    });

    if (response.status === 200) {
      const data = await response.json();
      return !!data.user;
    }
  } catch (error) {
    console.error("Failed to check ChatGPT login:", error);
  }
  return false;
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "askChatGPT" && info.selectionText) {
    const loggedIn = await isUserLoggedIn();

    const promptText = `Explain "${info.selectionText}" simply and briefly.`;
    await chrome.storage.local.set({ pendingPrompt: promptText });

    // Set a failsafe timeout to remove the prompt after 2 minute
    setTimeout(() => {
      chrome.storage.local.remove("pendingPrompt");
    }, 120000);

    if (!loggedIn) {
      chrome.tabs.create({ url: "https://chatgpt.com/auth/login" });
      return;
    }

    chrome.tabs.create({
      url: `https://chat.openai.com/?prompt=${encodeURIComponent(promptText)}`
    });
  }
});
