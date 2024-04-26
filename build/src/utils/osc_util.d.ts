import { Client, Message } from 'node-osc';
import { ParsedSerialMessage } from './util';
export declare const cables_port = 9000;
export declare function newCablesClient(ip: string): Client;
export declare function newOscClient(ip: string, port: number): Client;
export declare function constructOSCMessage(parsed_msg: ParsedSerialMessage): Message;
export declare function sendOSCMessage(msg: Message, client: Client): boolean;
export declare function constructAndSendOSCMessage(parsed_msg: ParsedSerialMessage, client: Client): boolean;
export declare function parseMessageAndSendOSCMessage(msg: string, client: Client): boolean;
