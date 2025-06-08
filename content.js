// console.log("hi")
// const inputBox = document.querySelector('textarea');
// const { pendingPrompt } = chrome.storage.local.get("pendingPrompt");
// console.log("Result from storage:", pendingPrompt);
// inputBox.value = pendingPrompt;
// inputBox.dispatchEvent(new Event('input', { bubbles: true }));

async function getPendingPrompt() {
  const { pendingPrompt } = await chrome.storage.local.get("pendingPrompt");
  console.log("Result from storage:", pendingPrompt);

  if (pendingPrompt){
    const inputBox = document.querySelector('textarea');

    if (inputBox) {
      inputBox.value = pendingPrompt;
      inputBox.dispatchEvent(new Event('input', { bubbles: true }));

      clearInterval(checkInput);
      chrome.storage.local.remove("pendingPrompt");
    }
  }
}

getPendingPrompt();
