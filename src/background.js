import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgPromoClicked, MsgPromoViewed } from "./tx.js";
import { Api } from "./rest.js"

const types = [
    ["/cytruslabs.zestchain.zestchain.MsgPromoClicked", MsgPromoClicked],
    ["/cytruslabs.zestchain.zestchain.MsgPromoViewed", MsgPromoViewed],
];
const registry = new Registry(types);
const fee = {
    amount: [],
    gas: "200000"
};
const rpcEndpoint = "http://zestcha.in:26657";
const apiEndpoint = "http://zestcha.in";
const api = new Api({ baseUrl: apiEndpoint });

const notif = {
    type: "basic",
    iconUrl: "./icons/notifIcon.png",
    priority: 2,
    requireInteraction: true,
};

const initClient = async function() {
    let mnemonic = "";
    chrome.storage.local.get({mnemonic: ""}, function(result) {
        mnemonic = result.mnemonic;
        console.log(mnemonic)
    });
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [user] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet,
        { registry: registry }
    );
    return {user: user, client: client};
};

const promoClicked = async function(id) {
    const c = await initClient();
    const promo = await api.queryPromo(id);
    let url = promo.data.promo.url;
    if (url.substring(0, 4) != "http") {
        url = "http://" + url;
    }
    chrome.tabs.create({url: url});
    chrome.notifications.clear(id);
    const val = {
        creator: c.user.address,
        id: id
    };
    const msg = {
        typeUrl: types[0][0],
        value: val
    };
    const result = await c.client.signAndBroadcast(c.user.address, [msg], fee);
    console.log(result);
};
chrome.notifications.onClicked.addListener(promoClicked);


const displayPromo = async function() {
    const c = await initClient();
    const promos = await api.queryPromoAll("");
    const rand = Math.floor(Math.random() * promos.data.promo.length);
    const promo = promos.data.promo[rand];
    const id = promo.index;
    notif.title = promo.title;
    notif.message = promo.msg;
    chrome.notifications.create(id.toString(), notif);
    const val = {
        creator: c.user.address,
        id: id
    };
    const msg = {
        typeUrl: types[1][0],
        value: val
    };
    const result = await c.client.signAndBroadcast(c.user.address, [msg], fee);
    console.log(result);
};

const checkTimestamp = function() {
    chrome.storage.local.get({nextPromo: Date.now() + 100000}, function(a) {
        chrome.storage.local.set({nextPromo: a.nextPromo});
        if (Date.now() >= a.nextPromo) {
            chrome.storage.local.get({pagesOpenedLast: 0}, function(b) {
                chrome.storage.local.get({pagesOpened: 0}, function(c) {
                    chrome.storage.local.set({nextPromo: Date.now() + 10000});
                    if (b.pagesOpenedLast < c.pagesOpened) {
                        chrome.storage.local.set({pagesOpenedLast: c.pagesOpened});
                        displayPromo();
                    }
                }); 
            });
        }
    });
}

checkTimestamp();
chrome.alarms.create({periodInMinutes: 0.2});
chrome.alarms.onAlarm.addListener(function() {
    checkTimestamp();
});