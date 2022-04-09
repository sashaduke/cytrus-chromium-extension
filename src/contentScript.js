chrome.storage.local.get({pagesOpened: 0}, function(result) {
    chrome.storage.local.set({pagesOpened: result.pagesOpened + 1});
});

window.addEventListener("message", (event) => {
  if (event.source != window) {
    return;
  }
  if (event.data.type && (event.data.type == "mnemonic")) {
    if (event.data.mnemonic == "disconnect") {
        chrome.storage.local.set({mnemonic: ""})
    } else {
        chrome.storage.local.set({mnemonic: event.data.mnemonic})
        chrome.storage.local.get({mnemonic: ""}, function(result) {console.log(result.mnemonic)});
    }
    console.log("Content script received: " + event.data.mnemonic);
  }
}, false);

