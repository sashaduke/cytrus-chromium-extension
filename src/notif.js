import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgPromoClicked, MsgPromoViewed, MsgCreatePromo } from "./tx.js";

const types = [
    ["/cytruslabs.zestchain.zestchain.MsgPromoClicked", MsgPromoClicked],
    ["/cytruslabs.zestchain.zestchain.MsgPromoViewed", MsgPromoViewed],
    ["/cytruslabs.zestchain.zestchain.MsgCreatePromo", MsgCreatePromo],
];
const registry = new Registry(types);
const fee = {
    amount: [],
    gas: "200000",
};
const mnemonic = "choose crack spoon large rally divide eagle cube magnet dial common angle welcome enact shadow hand hockey cost stem sunny fabric thank grief region";
const rpcEndpoint = "http://zestcha.in:26657";

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

async function sendMsgCreatePromo(promo) {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [shulgin] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet,
        { registry: registry }
    );
    const msg = {
        typeUrl: types[2][0],
        value: promo
    };
    const result = await client.signAndBroadcast(shulgin.address, [msg], fee);
    console.log(result);
};

function submitForm(event) {
    let creator = document.getElementById('addr').value;
    let title = document.getElementById('title').value;
    let pot = parseInt(document.getElementById('pot').value);
    let url = document.getElementById('url').value;
    let msg = document.getElementById('msg').value;
    let tags = document.getElementById('tags').value;
    let prefs = document.getElementById('prefs').value;
   
    let promo = {
        creator: creator,
        title: title,
        pot: pot,
        url: url,
        msg: msg,
        tags: tags,
        prefs: prefs,
    };

    event.preventDefault();
    sendMsgCreatePromo(promo);
};

chrome.notifications.create(id, notif);
let form = document.getElementById('form');
form.addEventListener('submit', submitForm);

