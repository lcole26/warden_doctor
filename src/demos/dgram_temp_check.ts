import dgram = require('node:dgram');
const server = dgram.createSocket({type: 'udp4', reuseAddr: true});
import {networkInterfaces} from 'os';
import ip = require('ip');
const local_ip = ip.address();
const listening_port = 3000;
const host = '0.0.0.0';

// const socket = dgram.createSocket('udp4');
const multicast_address = '230.1.2.3';
const multicastPort = 5554;
// socket.on('listening', (this: dgram.Socket) => {
//   this.setMulticastTTL(64);
//   this.addMembership(multicastAddress);
// });

// console.log(ip.address());
// server.on('error', err => {
//   console.log('server error:', err);
//   server.close();
// });

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  // Echo message back to client
  server.send('I got a message from you: ' + msg, rinfo.port, rinfo.address);
});

// server.on('listening', (this: dgram.Socket) => {
//   this.setBroadcast(true);
//   this.setMulticastTTL(128);
//   this.addMembership(multicast_address);
//   console.log('Multicast listening . . . ');

//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
//   //server.send('ip addr: 192.168.50.110', address.port);
// });

server.on('listening', function (this: dgram.Socket) {
  this.setBroadcast(true);
  this.setMulticastTTL(128);
  this.addMembership(multicast_address);
  console.log('Multicast listening . . . ');

  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// server.on('listening', (this: dgram.Socket) => {
//   this.setBroadcast(true);
//   this.setMulticastTTL(128);
//   this.addMembership(multicast_address);
//   console.log('Multicast listening . . . ');
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
//   //server.send('ip addr: 192.168.50.110', address.port);
// });

server.bind(multicastPort);
// server.bind(listening_port, host);
