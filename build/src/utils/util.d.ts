/**
 * yes, a decent amount of this is likely stoken from stackoverflow. i don't use node/typescript much
 */
import { Client, Message } from 'node-osc';
export type ParsedSerialMessageArgTypes = string | number | boolean | [];
export type ParsedSerialMessage = [
    name: string,
    args: ParsedSerialMessageArgTypes[]
];
export declare const SerialMessageSeparator = "|";
export declare const isNumeric: (val: unknown) => boolean;
export declare const isBoolean: (val: unknown) => boolean;
/**
 * splits a string sent over UDP on a '|' character into its OSC
 * address/name and value components, parses 'values' part into a TS/JS type,
 * and returns the two in a simpler array tuple type
 * @param msg string received over a UDP packet
 * @param base_addr optional OSC address to prefix to the "sensor" name. e.g.: /cables/{sensor name}
 * @returns array tuple [OSC address, argument]
 */
export declare function ParseSerialMessage(_msg: string, base_addr?: string): ParsedSerialMessage;
export declare function ParseSerialMessageToBundle(msg: string): ParsedSerialMessage;
export declare function DisplayParsedSerialMessage(msg: ParsedSerialMessage): void;
export declare function castMessageToAllClients(msg: Message, clients: Client[]): void;
