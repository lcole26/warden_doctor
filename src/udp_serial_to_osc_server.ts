/**
 * this the majority of this was pilfered from here: https://stackoverflow.com/questions/14130560/nodejs-udp-multicast-how-to
 */

import dgram = require('node:dgram');
import ip = require('ip');

import * as osc_utils from './utils/osc_util';

const multicast_address = '239.1.2.3';
const multicast_port = 5554;
const osc_router_port = 10006;
const local_ip = ip.address();
console.log(`local_ip: ${local_ip}`);

const serial_server = dgram.createSocket({
  type: 'udp4',
  reuseAddr: true, // for testing multiple instances on localhost
});

// const serial_to_cables_client = osc_utils.newCablesClient(local_ip);
const serial_to_osc_router_client = osc_utils.newOscClient(
  local_ip,
  osc_router_port
);
// ----------------------------------------------------------------------------------
// all other osc related stuff

// ----------------------------------------------------------------------------------
// serial-to-udp server stuff
serial_server.bind(multicast_port);

export function newUDPServer(): dgram.Socket {
  return dgram.createSocket({
    type: 'udp4',
    reuseAddr: true, // for testing multiple instances on localhost
  });
}

serial_server.on('message', (msg, rinfo) => {
  // console.log(msg.toString().trim());
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  // const parsed_msg =
  // Echo message back to client
  serial_server.send(
    'I got a message from you: ' + msg,
    rinfo.port,
    rinfo.address
  );

  // parse and send off serial msg
  // osc_utils.parseMessageAndSendOSCMessage(
  //   msg.toString(),
  //   serial_to_cables_client
  //   );

  // parse and send off serial msg to osc router
  osc_utils.parseMessageAndSendOSCMessage(
    msg.toString(),
    serial_to_osc_router_client
  );
});

serial_server.on('listening', function (this: dgram.Socket) {
  this.setBroadcast(true);
  this.setMulticastTTL(128);
  this.addMembership(multicast_address);
  console.log('Multicast listening . . . ');
});
// ----------------------------------------------------------------------------------
// osc sending stuff

// ----------------------------------------------------------------------------------
module.exports = [newUDPServer];
