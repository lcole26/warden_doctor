/**
 * this the majority of this was pilfered from here: https://stackoverflow.com/questions/14130560/nodejs-udp-multicast-how-to
 */
/// <reference types="node" />
import dgram = require('node:dgram');
export declare function newUDPServer(): dgram.Socket;
