import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgPromoClicked, MsgPromoViewed } from "./tx.js";
import { Api } from "./rest.js"


const notif = {
  type: "basic",
  iconUrl: "./icons/notifIcon.png",
  priority: 2,
  requireInteraction: true,
};
const fee = {
  amount: [],
  gas: "200000"
};
const types = [
  ["/cytruslabs.zestchain.zestchain.MsgPromoClicked", MsgPromoClicked],
  ["/cytruslabs.zestchain.zestchain.MsgPromoViewed", MsgPromoViewed],
];
const registry = new Registry(types);
const rpcEndpoint = "http://zestcha.in:26657";
const apiEndpoint = "http://zestcha.in";
const api = new Api({baseUrl: apiEndpoint});


const displayPromo = async function() {
  chrome.storage.local.get({cytrus_sk: ""}, async function(resp) {
    const wallet = await DirectSecp256k1HdWallet.deserialize(
      resp.cytrus_sk,
      "cytrus_sk"
    );
    const [user] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      rpcEndpoint,
      wallet,
      {registry: registry}
    );
    const promos = await api.queryPromoAll("");
    const rand = Math.floor(Math.random() * promos.data.promo.length);
    const promo = promos.data.promo[rand];
    const id = promo.index;
    notif.title = promo.title;
    notif.message = promo.msg;
    chrome.notifications.create(id.toString(), notif);
    const val = {
      creator: user.address,
      id: id
    };
    const msg = {
      typeUrl: types[1][0],
      value: val
    };
    const result = await client.signAndBroadcast(user.address, [msg], fee);
    console.log(result);
  });
};

const promoClicked = async function(id) {
  chrome.storage.local.get({cytrus_sk: ""}, async function(resp) {
    const wallet = await DirectSecp256k1HdWallet.deserialize(
      resp.cytrus_sk,
      "cytrus_sk"
    );
    const [user] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      rpcEndpoint,
      wallet,
      {registry: registry}
    );
    const promo = await api.queryPromo(id);
    let url = promo.data.promo.url;
    if (url.substring(0, 4) != "http") {
      url = "http://" + url;
    }
    chrome.tabs.create({url: url});
    chrome.notifications.clear(id);
    const val = {
      creator: user.address,
      id: id
    };
    const msg = {
      typeUrl: types[0][0],
      value: val
    };
    const result = await client.signAndBroadcast(user.address, [msg], fee);
    console.log(result);
  });
};
chrome.notifications.onClicked.addListener(promoClicked);


const checkTimestamp = function() {
  chrome.storage.local.get({nextPromo: Date.now() + 1000000}, function(a) {
    chrome.storage.local.set({nextPromo: a.nextPromo});
    if (Date.now() >= a.nextPromo) {
      chrome.storage.local.get({pagesOpenedLast: 0}, function(b) {
        chrome.storage.local.get({pagesOpened: 0}, function(c) {
          chrome.storage.local.set({nextPromo: Date.now() + 1000000});
          if (b.pagesOpenedLast < c.pagesOpened) {
            chrome.storage.local.set({pagesOpenedLast: c.pagesOpened});
            try {
              displayPromo();
            } catch {
              return;
            }
          }
        }); 
      });
    }
  });
}

checkTimestamp();
chrome.alarms.create({periodInMinutes: 5});
chrome.alarms.onAlarm.addListener(function() {
  checkTimestamp();
});