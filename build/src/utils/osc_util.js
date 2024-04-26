"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessageAndSendOSCMessage = exports.constructAndSendOSCMessage = exports.sendOSCMessage = exports.constructOSCMessage = exports.newOscClient = exports.newCablesClient = exports.cables_port = void 0;
const node_osc_1 = require("node-osc");
const util_1 = require("./util");
exports.cables_port = 9000;
function newCablesClient(ip) {
    return new node_osc_1.Client(ip, exports.cables_port);
}
exports.newCablesClient = newCablesClient;
function newOscClient(ip, port) {
    return new node_osc_1.Client(ip, port);
}
exports.newOscClient = newOscClient;
function constructOSCMessage(parsed_msg) {
    const message = new node_osc_1.Message(parsed_msg[0]);
    // console.log(`lolol: ${parsed_msg[0]}`);
    parsed_msg[1].forEach(arg => {
        console.log(`consturct: ${arg}`);
        message.append(arg);
    });
    return message;
}
exports.constructOSCMessage = constructOSCMessage;
function sendOSCMessage(msg, client) {
    let send_error = false;
    client.send(msg, err => {
        if (err) {
            console.error(err);
            send_error = true;
        }
    }); //end of msg sending
    if (send_error) {
        return false;
    }
    console.log('message successfully sent from node server');
    return true;
}
exports.sendOSCMessage = sendOSCMessage;
function constructAndSendOSCMessage(parsed_msg, client) {
    let send_error = false;
    const msg = constructOSCMessage(parsed_msg);
    client.send(msg, err => {
        if (err) {
            console.error(err);
            send_error = true;
        }
    }); //end of msg sending
    if (send_error) {
        return false;
    }
    console.log('message successfully sent from node server');
    return true;
}
exports.constructAndSendOSCMessage = constructAndSendOSCMessage;
function parseMessageAndSendOSCMessage(msg, client) {
    let send_error = false;
    const parsed_msg = (0, util_1.ParseSerialMessage)(msg);
    const new_osc_msg = constructOSCMessage(parsed_msg);
    client.send(new_osc_msg, err => {
        if (err) {
            console.error(err);
            send_error = true;
        }
    }); //end of msg sending
    if (send_error) {
        return false;
    }
    console.log(`message ${msg} successfully sent from node server`);
    return true;
}
exports.parseMessageAndSendOSCMessage = parseMessageAndSendOSCMessage;
module.exports = {
    newOscClient,
    newCablesClient,
    constructOSCMessage,
    sendOSCMessage,
    constructAndSendOSCMessage,
    parseMessageAndSendOSCMessage,
};
//# sourceMappingURL=osc_util.js.map