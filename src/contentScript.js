chrome.storage.local.get({pagesOpened: 0}, function(result) {
  chrome.storage.local.set({pagesOpened: result.pagesOpened + 1});
});

window.addEventListener("message", (event) => {
  if (event.source != window) {
    return;
  }
  if (event.data.type && (event.data.type == "cytrus_sk")) {
    if (event.data.sk == "disconnect") {
      chrome.storage.local.set({cytrus_sk: ""})
    } else {
      chrome.storage.local.set({cytrus_sk: event.data.sk})
    }
  }
}, false);

