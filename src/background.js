import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgPromoClicked, MsgPromoViewed, MsgCreatePromo } from "./tx.js";
import { Api } from "./rest.js"

const types = [
    ["/cytruslabs.zestchain.zestchain.MsgPromoClicked", MsgPromoClicked],
    ["/cytruslabs.zestchain.zestchain.MsgPromoViewed", MsgPromoViewed],
    ["/cytruslabs.zestchain.zestchain.MsgCreatePromo", MsgCreatePromo],
];
const registry = new Registry(types);
const fee = {
    amount: [],
    gas: "200000"
};
const mnemonic = "six dog stable much drop wonder broccoli child slight ancient stick reunion trophy nut evoke ecology brass razor uncover robust unlock dial correct deny";
const rpcEndpoint = "http://zestcha.in:26657";
const apiEndpoint = "http://zestcha.in:1317";
const api = new Api({ baseUrl: apiEndpoint });

const notif = {
    type: 'basic',
    iconUrl: './icons/notifIcon.png',
    priority: 2,
    requireInteraction: true,
};

const initClient = async function() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [user] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet,
        { registry: registry }
    );
    return {user: user, client: client};
};


const createPromo = async function(promo) {
    const c = await initClient();
    const msg = {
        typeUrl: types[2][0],
        value: promo
    };
    const result = await c.client.signAndBroadcast(c.user.address, [msg], fee);
    console.log(result);
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

/*
const submitForm = function(event) {
    const creator = document.getElementById('addr').value;
    const title = document.getElementById('title').value;
    const pot = parseInt(document.getElementById('pot').value);
    const url = document.getElementById('url').value;
    const msg = document.getElementById('msg').value;
    const tags = document.getElementById('tags').value;
    const prefs = document.getElementById('prefs').value;
   
    const promo = {
        creator: creator,
        title: title,
        pot: pot,
        url: url,
        msg: msg,
        tags: tags,
        prefs: prefs,
    };

    event.preventDefault();
    createPromo(promo);
};
const form = document.getElementById('form');
form.addEventListener('submit', submitForm);
*/

function display() {
    const next = Date.now() + 600000;
    chrome.storage.sync.set({'nextPromo': next});
    displayPromo();
}

function checkTimestamp() {
    chrome.storage.sync.get('nextPromo', function(result){
        if (Date.now() >= result.nextPromo) {
            display();
        }
    });
}
display();
setInterval(checkTimestamp, 60000);