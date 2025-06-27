const DEFAULT_PROMPT = "Explain briefly";
const originalText = "Submit";

// Restore settings on popup load
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["inter", "customPrompt"], (data) => {
    document.getElementById("inter").checked = data.inter ?? false;
    document.getElementById("promptInput").value = data.customPrompt || DEFAULT_PROMPT;
  });

  document.getElementById("submitBtn").addEventListener("click", () => {
    submitBtn.disabled = true;
    //submitBtn.textContent = "Submitting"
    const toggleValue = document.getElementById("inter").checked;
    const promptValue = document.getElementById("promptInput").value || DEFAULT_PROMPT;

    chrome.storage.sync.set({
      inter: toggleValue,
      customPrompt: promptValue
    }, () => {
      submitBtn.textContent = "Saved!"
      console.log("Settings saved.");

      setTimeout(()=>{
        window.close();
      },800)
    });
  });
});