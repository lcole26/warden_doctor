"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const udp_listener_port = 10000;
const osc_server_port = 10001;
const dgram = require("node:dgram");
const espruino_base_addr = '/espruino';
const node_osc_1 = require("node-osc");
const node_process_1 = require("node:process");
// const host = '0.0.0.0';
const host = '127.0.0.1';
const controller = new AbortController();
const { signal } = controller;
const udp_server = dgram.createSocket({ type: 'udp4', signal, reuseAddr: true });
const osc_server = new node_osc_1.Server(osc_server_port, host, () => { });
// closes the server so
function shutdownNetworking() {
    controller.abort();
    osc_server.close();
}
// -----------------------------------------------------------------------
// osc stuff
osc_server.on('message', (msg) => {
    console.log(`message: ${msg}`);
});
// -----------------------------------------------------------------------
// udp packet receiving things
// -----------------------------------------------------------------------
udp_server.on('message', (message, rinfo) => {
    console.log(`from: ${rinfo.address}: ${message}`);
    // const processed_msg = parse_udp_message(espruino_base_addr, message);
});
udp_server.on('listening', () => {
    const addr = udp_server.address();
    console.log(`server now listening on: ${addr.address}:${addr.port}`);
});
udp_server.on('error', err => {
    console.log(`error: ${err}`);
});
udp_server.bind({
    address: 'localhost',
    port: udp_listener_port,
    exclusive: true,
});
// process trapping stuff
process.on('SIGINT', () => {
    console.log('shutting down');
    shutdownNetworking();
    (0, node_process_1.exit)();
});
//# sourceMappingURL=noi.js.map