import * as tx from './tx.js'

let notif = {
    type: 'basic',
    iconUrl: './icons/notifIcon.png',
    priority: 2,
    requireInteraction: true,
};
//TO DO: Load promo details from http://zestcha.in:1317/cytruslabs/zestchain/zestchain/promo

notif.title = 'Buy Crypto on Binance.com';
notif.message = 'Zero trading fees for 3 months when you sign up today!';
let notifURL = 'https://binance.com';
let id = Math.random().toString();

function notifClicked() {
    chrome.tabs.create({url: notifURL});
    chrome.notifications.clear(id);
};
chrome.notifications.onClicked.addListener(notifClicked);

function submitForm(event) {
    
    let creator = document.getElementById('addr').value;
    let title = document.getElementById('title').value;
    let pot = document.getElementById('pot').value;
    let url = document.getElementById('url').value;
    let msg = document.getElementById('msg').value;
    let tags = document.getElementById('tags').value;
    let prefs = document.getElementById('prefs').value;
   
    let promoMsg = {
        creator: creator,
        title: title,
        pot: pot,
        url: url,
        msg: msg,
        tags: tags,
        prefs: prefs,
    };

    console.log(promoMsg);
    event.preventDefault();
    let encoded = tx.MsgCreatePromo.encode(promoMsg);
    console.log(encoded);
};

chrome.notifications.create(id, notif);
let form = document.getElementById('form');
form.addEventListener('submit', submitForm);

