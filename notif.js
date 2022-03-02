notif = {
    type: "basic",
    iconUrl: "./icon.png",
    priority: 2,
    requireInteraction: true,
};
//TO DO: Load promo details from http://zestcha.in:1317/cytruslabs/zestchain/zestchain/promo
  
notif.title = "Buy Crypto on Binance.com";
notif.message = "Zero trading fees for 3 months when you sign up today!";
url = "http://binance.com";
id = Math.random().toString();

function notifClicked() {
    chrome.tabs.create({url: url});
    chrome.notifications.clear(id);
};
chrome.notifications.onClicked.addListener(notifClicked);

chrome.notifications.create(id, notif);