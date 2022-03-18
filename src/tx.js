/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
export const protobufPackage = "cytruslabs.zestchain.zestchain";
const baseMsgCreatePromo = {
    creator: "",
    title: "",
    pot: 0,
    url: "",
    message: "",
    tags: "",
    prefs: "",
};
export const MsgCreatePromo = {
    encode(message, writer = Writer.create()) {
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
        if (message.message !== "") {
            writer.uint32(42).string(message.message);
        }
        if (message.tags !== "") {
            writer.uint32(50).string(message.tags);
        }
        if (message.prefs !== "") {
            writer.uint32(58).string(message.prefs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreatePromo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.pot = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.url = reader.string();
                    break;
                case 5:
                    message.message = reader.string();
                    break;
                case 6:
                    message.tags = reader.string();
                    break;
                case 7:
                    message.prefs = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreatePromo };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        }
        else {
            message.title = "";
        }
        if (object.pot !== undefined && object.pot !== null) {
            message.pot = Number(object.pot);
        }
        else {
            message.pot = 0;
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = "";
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = String(object.message);
        }
        else {
            message.message = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            message.tags = String(object.tags);
        }
        else {
            message.tags = "";
        }
        if (object.prefs !== undefined && object.prefs !== null) {
            message.prefs = String(object.prefs);
        }
        else {
            message.prefs = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.title !== undefined && (obj.title = message.title);
        message.pot !== undefined && (obj.pot = message.pot);
        message.url !== undefined && (obj.url = message.url);
        message.message !== undefined && (obj.message = message.message);
        message.tags !== undefined && (obj.tags = message.tags);
        message.prefs !== undefined && (obj.prefs = message.prefs);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreatePromo };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        }
        else {
            message.title = "";
        }
        if (object.pot !== undefined && object.pot !== null) {
            message.pot = object.pot;
        }
        else {
            message.pot = 0;
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = "";
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        else {
            message.message = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            message.tags = object.tags;
        }
        else {
            message.tags = "";
        }
        if (object.prefs !== undefined && object.prefs !== null) {
            message.prefs = object.prefs;
        }
        else {
            message.prefs = "";
        }
        return message;
    },
};
const baseMsgCreatePromoResponse = { total: "" };
export const MsgCreatePromoResponse = {
    encode(message, writer = Writer.create()) {
        if (message.total !== "") {
            writer.uint32(10).string(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreatePromoResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.total = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreatePromoResponse };
        if (object.total !== undefined && object.total !== null) {
            message.total = String(object.total);
        }
        else {
            message.total = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.total !== undefined && (obj.total = message.total);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreatePromoResponse };
        if (object.total !== undefined && object.total !== null) {
            message.total = object.total;
        }
        else {
            message.total = "";
        }
        return message;
    },
};
const baseMsgPromoViewed = { creator: "", id: "", addr: "" };
export const MsgPromoViewed = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.addr !== "") {
            writer.uint32(26).string(message.addr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPromoViewed };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.addr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgPromoViewed };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.addr !== undefined && object.addr !== null) {
            message.addr = String(object.addr);
        }
        else {
            message.addr = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.addr !== undefined && (obj.addr = message.addr);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgPromoViewed };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.addr !== undefined && object.addr !== null) {
            message.addr = object.addr;
        }
        else {
            message.addr = "";
        }
        return message;
    },
};
const baseMsgPromoViewedResponse = {};
export const MsgPromoViewedResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPromoViewedResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgPromoViewedResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgPromoViewedResponse };
        return message;
    },
};
const baseMsgPromoClicked = { creator: "", id: "", addr: "" };
export const MsgPromoClicked = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.addr !== "") {
            writer.uint32(26).string(message.addr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPromoClicked };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.addr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgPromoClicked };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.addr !== undefined && object.addr !== null) {
            message.addr = String(object.addr);
        }
        else {
            message.addr = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.addr !== undefined && (obj.addr = message.addr);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgPromoClicked };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.addr !== undefined && object.addr !== null) {
            message.addr = object.addr;
        }
        else {
            message.addr = "";
        }
        return message;
    },
};
const baseMsgPromoClickedResponse = {};
export const MsgPromoClickedResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgPromoClickedResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgPromoClickedResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgPromoClickedResponse,
        };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CreatePromo(request) {
        const data = MsgCreatePromo.encode(request).finish();
        const promise = this.rpc.request("cytruslabs.zestchain.zestchain.Msg", "CreatePromo", data);
        return promise.then((data) => MsgCreatePromoResponse.decode(new Reader(data)));
    }
    PromoViewed(request) {
        const data = MsgPromoViewed.encode(request).finish();
        const promise = this.rpc.request("cytruslabs.zestchain.zestchain.Msg", "PromoViewed", data);
        return promise.then((data) => MsgPromoViewedResponse.decode(new Reader(data)));
    }
    PromoClicked(request) {
        const data = MsgPromoClicked.encode(request).finish();
        const promise = this.rpc.request("cytruslabs.zestchain.zestchain.Msg", "PromoClicked", data);
        return promise.then((data) => MsgPromoClickedResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}