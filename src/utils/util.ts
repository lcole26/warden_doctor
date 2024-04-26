/* eslint-disable prettier/prettier */
/**
 * yes, a decent amount of this is likely stoken from stackoverflow. i don't use node/typescript much
 */

import {Client, Message} from 'node-osc';
export type ParsedSerialMessageArgTypes = string | number | boolean | [];
export type ParsedSerialMessage = [
  name: string,
  args: ParsedSerialMessageArgTypes[],
];
export const SerialMessageSeparator = '|';

// --------------------------------------------------------------

// stolen from: https://stackoverflow.com/a/58550111
export const isNumeric = (val: unknown) =>
  (typeof val === 'number' || (typeof val === 'string' && val.trim() !== '')) &&
  !isNaN(val as number);

// stolen from: https://stackoverflow.com/a/19907642
export const isBoolean = (val: unknown) =>
  (typeof val === 'boolean' ||
    (typeof val === 'string' && val.trim() !== '')) &&
  (val as boolean);

// --------------------------------------------------------------
/**
 * splits a string sent over UDP on a '|' character into its OSC
 * address/name and value components, parses 'values' part into a TS/JS type,
 * and returns the two in a simpler array tuple type
 * @param msg string received over a UDP packet
 * @param base_addr optional OSC address to prefix to the "sensor" name. e.g.: /cables/{sensor name}
 * @returns array tuple [OSC address, argument]
 */
export function ParseSerialMessage(
  _msg: string,
  base_addr?: string
): ParsedSerialMessage {
  // trim newlines and whatever other nastiness lies ahead
  const msg = _msg.trim();
  const split: string[] = msg.split(SerialMessageSeparator);
  // console.log(split);
  const sensor: string = split[0];
  const parsed_args: ParsedSerialMessageArgTypes[] = [];

  // run through post-address arguments, classifying them through simple typechecking
  for (
    let argument_index = 1;
    argument_index < split.length;
    argument_index++
  ) {
    const arg = split[argument_index];

    if (isNumeric(arg)) {
      // string converts to a number
      parsed_args.push(Number(arg));
    } else if (isBoolean(arg)) {
      // string converts to a boolean
      parsed_args.push(Boolean(arg));
    } else {
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
export function ParseSerialMessageToBundle(msg: string): ParsedSerialMessage {
  const split: string[] = msg.split(SerialMessageSeparator);
  // console.log(split);
  const sensor: string = split[0];
  const parsed_args: ParsedSerialMessageArgTypes[] = [];

  for (
    let argument_index = 1;
    argument_index < split.length;
    argument_index++
  ) {
    // string converts to a number
    if (isNumeric(split[argument_index])) {
      parsed_args.push(Number(split[argument_index]));
    }

    // string converts to a boolean
    if (isBoolean(split[argument_index])) {
      parsed_args.push(Boolean(split[argument_index]));
    }

    // everything else
    parsed_args.push(split[argument_index]);
  }

  return [sensor, parsed_args];
}

export function DisplayParsedSerialMessage(msg: ParsedSerialMessage) {}

export function castMessageToAllClients(msg: Message, clients: Client[]) {}

// --------------------------------------------------------------

module.exports = {ParseSerialMessage, ParseSerialMessageToBundle};
