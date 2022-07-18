//import { Writer } from "protobufjs/minimal";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { MsgPromoClicked } from "./tx.js";
import { MsgPromoViewed } from "./tx.js";
import { MsgCreatePromo } from "./tx.js";

const types = [
    ["/cytruslabs.zestchain.zestchain.MsgPromoClicked", MsgPromoClicked],
    ["/cytruslabs.zestchain.zestchain.MsgPromoViewed", MsgPromoViewed],
    ["/cytruslabs.zestchain.zestchain.MsgCreatePromo", MsgCreatePromo],
];
const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgPromoClicked: (data) => ({ typeUrl: "/cytruslabs.zestchain.zestchain.MsgPromoClicked", value: data}),//MsgPromoClicked.fromPartial(data) }),
        msgPromoViewed: (data) => ({ typeUrl: "/cytruslabs.zestchain.zestchain.MsgPromoViewed", value: data}),//MsgPromoViewed.fromPartial(data) }),
        msgCreatePromo: (data) => ({ typeUrl: "/cytruslabs.zestchain.zestchain.MsgCreatePromo", value: data})//MsgCreatePromo.fromPartial(data) }),
    };
};

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

/*
let encode = function(message, writer = Writer.create()) {
    if (message.creator !== "") {
        writer.uint32(10).string(message.creator);
    }
    if (message.title !== "") {
        writer.uint32(18).string(message.title);
    }
    if (message.pot !== 0) {
        writer.uint32(24).uint64(message.pot);
    }
    if (message.url !== "") {
        writer.uint32(34).string(message.url);
    }
    if (message.msg !== "") {
        writer.uint32(42).string(message.msg);
    }
    if (message.tags !== "") {
        writer.uint32(50).string(message.tags);
    }
    if (message.prefs !== "") {
        writer.uint32(58).string(message.prefs);
    }
    return writer.finish();
};*/

function notifClicked() {
    chrome.tabs.create({url: notifURL});
    chrome.notifications.clear(id);
};
chrome.notifications.onClicked.addListener(notifClicked);

async function sendMsgPromoViewed(data) {
    const message = await txClient.msgCreatePromo(data);
    const memo = '';
    const result = await txClient.signAndBroadcast([message], {fee: {amount: [], gas: "200000"}, memo});
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
   
    let promoMsg = {
        creator: creator,
        title: title,
        pot: pot,
        url: url,
        msg: msg,
        tags: tags,
        prefs: prefs,
    };

    event.preventDefault();
    let data = MsgCreatePromo.encode(promoMsg).finish();
    console.log(data.toString());
    sendMsgPromoViewed(data);
    sendMsgPromoViewed(promoMsg);
    //const promise = this.rpc.request("cytruslabs.zestchain.zestchain.Msg", "CreatePromo", data);
    //console.log(promise.then((data) => MsgCreatePromoResponse.decode(new Reader(data))));
};

chrome.notifications.create(id, notif);
let form = document.getElementById('form');
form.addEventListener('submit', submitForm);

