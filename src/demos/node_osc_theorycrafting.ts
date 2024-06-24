/* eslint-disable no-console */

'use strict';
import ip = require('ip');

const local_ip = ip.address();
console.log(local_ip);
import {Client, Message} from 'node-osc';
const cables_port = 9000;

const client = new Client(local_ip, cables_port);

const message = new Message('/address');
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
// or
// client.send('/address', 'testing', 'testing', 123);

// or
// const msg = new Message('/address', 1, 2, 3);
// client.send(msg);
