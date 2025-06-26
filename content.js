async function getPendingPrompt() {
  const { pendingPrompt } = await chrome.storage.local.get("pendingPrompt");
  const { inter } = await chrome.storage.sync.get("inter");

  console.log("Result from storage:", pendingPrompt);

  if (pendingPrompt){
    const inputBox = document.querySelector('textarea');

    if (inputBox) {
      inputBox.value = pendingPrompt;
      inputBox.dispatchEvent(new Event('input', { bubbles: true }));
      chrome.storage.local.remove("pendingPrompt");

      if (inter) {

        const sendButton = document.querySelector('#composer-submit-button') ||
          document.querySelector('[data-testid="send-button"]');

        if (sendButton) {
          sendButton.click();
        } else {
          console.warn("Send button not found");
        }
      }
    }
  }
}

getPendingPrompt();
