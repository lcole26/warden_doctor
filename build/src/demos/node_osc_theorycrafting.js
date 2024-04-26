/* eslint-disable no-console */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const ip = require("ip");
const local_ip = ip.address();
console.log(local_ip);
const node_osc_1 = require("node-osc");
const cables_port = 9000;
const client = new node_osc_1.Client(local_ip, cables_port);
const message = new node_osc_1.Message('/address');
message.append('testing');
message.append('testing');
message.append(123);
setInterval(sendTestOscMsg, 3000);
function sendTestOscMsg() {
    client.send(message, err => {
        if (err) {
            console.error(err);
        }
        console.log('successfully sent test osc msg');
        // client.close();
    });
}
//# sourceMappingURL=node_osc_theorycrafting.js.map