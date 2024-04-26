import {Client, Message} from 'node-osc';
import {ParseSerialMessage, ParsedSerialMessage} from './util';

export const cables_port = 9000;

export function newCablesClient(ip: string): Client {
  return new Client(ip, cables_port);
}

export function newOscClient(ip: string, port: number) {
  return new Client(ip, port);
}

export function constructOSCMessage(parsed_msg: ParsedSerialMessage): Message {
  const message = new Message(parsed_msg[0]);
  // console.log(`lolol: ${parsed_msg[0]}`);
  parsed_msg[1].forEach(arg => {
    console.log(`consturct: ${arg}`);
    message.append(arg);
  });

  return message;
}

export function sendOSCMessage(msg: Message, client: Client): boolean {
  let send_error = false;

  client.send(msg, err => {
    if (err) {
      console.error(err);
      send_error = true;
    }
  }); //end of msg sending

  if (send_error) {
    return false;
  }

  console.log('message successfully sent from node server');
  return true;
}

export function constructAndSendOSCMessage(
  parsed_msg: ParsedSerialMessage,
  client: Client
): boolean {
  let send_error = false;
  const msg = constructOSCMessage(parsed_msg);

  client.send(msg, err => {
    if (err) {
      console.error(err);
      send_error = true;
    }
  }); //end of msg sending

  if (send_error) {
    return false;
  }

  console.log('message successfully sent from node server');
  return true;
}

export function parseMessageAndSendOSCMessage(
  msg: string,
  client: Client
): boolean {
  let send_error = false;
  const parsed_msg = ParseSerialMessage(msg);
  const new_osc_msg = constructOSCMessage(parsed_msg);

  client.send(new_osc_msg, err => {
    if (err) {
      console.error(err);
      send_error = true;
    }
  }); //end of msg sending

  if (send_error) {
    return false;
  }

  console.log(`message ${msg} successfully sent from node server`);
  return true;
}

module.exports = {
  newOscClient,
  newCablesClient,
  constructOSCMessage,
  sendOSCMessage,
  constructAndSendOSCMessage,
  parseMessageAndSendOSCMessage,
};
