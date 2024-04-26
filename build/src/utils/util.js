"use strict";
/* eslint-disable prettier/prettier */
/**
 * yes, a decent amount of this is likely stoken from stackoverflow. i don't use node/typescript much
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.castMessageToAllClients = exports.DisplayParsedSerialMessage = exports.ParseSerialMessageToBundle = exports.ParseSerialMessage = exports.isBoolean = exports.isNumeric = exports.SerialMessageSeparator = void 0;
exports.SerialMessageSeparator = '|';
// --------------------------------------------------------------
// stolen from: https://stackoverflow.com/a/58550111
const isNumeric = (val) => (typeof val === 'number' || (typeof val === 'string' && val.trim() !== '')) &&
    !isNaN(val);
exports.isNumeric = isNumeric;
// stolen from: https://stackoverflow.com/a/19907642
const isBoolean = (val) => (typeof val === 'boolean' ||
    (typeof val === 'string' && val.trim() !== '')) &&
    val;
exports.isBoolean = isBoolean;
// --------------------------------------------------------------
/**
 * splits a string sent over UDP on a '|' character into its OSC
 * address/name and value components, parses 'values' part into a TS/JS type,
 * and returns the two in a simpler array tuple type
 * @param msg string received over a UDP packet
 * @param base_addr optional OSC address to prefix to the "sensor" name. e.g.: /cables/{sensor name}
 * @returns array tuple [OSC address, argument]
 */
function ParseSerialMessage(_msg, base_addr) {
    // trim newlines and whatever other nastiness lies ahead
    const msg = _msg.trim();
    const split = msg.split(exports.SerialMessageSeparator);
    // console.log(split);
    const sensor = split[0];
    const parsed_args = [];
    // run through post-address arguments, classifying them through simple typechecking
    for (let argument_index = 1; argument_index < split.length; argument_index++) {
        const arg = split[argument_index];
        if ((0, exports.isNumeric)(arg)) {
            // string converts to a number
            parsed_args.push(Number(arg));
        }
        else if ((0, exports.isBoolean)(arg)) {
            // string converts to a boolean
            parsed_args.push(Boolean(arg));
        }
        else {
            // everything else
            parsed_args.push(arg);
        }
    }
    // switch (typeof base_addr === null) {
    //   case false:
    //     return [`${base_addr as string}/${sensor}`, parsed_args];
    //   case true:
    //     return [`${sensor}`, parsed_args];
    // }
    return [`${sensor}`, parsed_args];
    // if optional base_addr is defined, prefix it onto the original message name,
    // otherwise...don't do that
    // return [address, args];
}
exports.ParseSerialMessage = ParseSerialMessage;
function ParseSerialMessageToBundle(msg) {
    const split = msg.split(exports.SerialMessageSeparator);
    // console.log(split);
    const sensor = split[0];
    const parsed_args = [];
    for (let argument_index = 1; argument_index < split.length; argument_index++) {
        // string converts to a number
        if ((0, exports.isNumeric)(split[argument_index])) {
            parsed_args.push(Number(split[argument_index]));
        }
        // string converts to a boolean
        if ((0, exports.isBoolean)(split[argument_index])) {
            parsed_args.push(Boolean(split[argument_index]));
        }
        // everything else
        parsed_args.push(split[argument_index]);
    }
    return [sensor, parsed_args];
}
exports.ParseSerialMessageToBundle = ParseSerialMessageToBundle;
function DisplayParsedSerialMessage(msg) { }
exports.DisplayParsedSerialMessage = DisplayParsedSerialMessage;
function castMessageToAllClients(msg, clients) { }
exports.castMessageToAllClients = castMessageToAllClients;
// --------------------------------------------------------------
module.exports = { ParseSerialMessage, ParseSerialMessageToBundle };
//# sourceMappingURL=util.js.map