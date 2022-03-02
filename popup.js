notif = {
  type: "basic",
  iconUrl: "./icon.png",
};

//TO DO: Load promo from promoList

notif.title = "Buy Crypto on Binance.com"
notif.message = "Zero trading fees for 3 months when you sign up today!"

chrome.notifications.create(notif);