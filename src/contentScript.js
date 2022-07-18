chrome.storage.local.get({pagesOpened: 0}, function(result) {
    chrome.storage.local.set({pagesOpened: result.pagesOpened + 1});
});