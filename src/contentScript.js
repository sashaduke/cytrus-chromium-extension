chrome.storage.local.get({pagesOpened: 0}, function(result) {
    chrome.storage.local.set({pagesOpened: result.pagesOpened + 1});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'mnemonic') {
        chrome.storage.local.set({mnemonic: window.store['common/wallet/getMnemonic']});
    }
    sendResponse({});
    return true;
});