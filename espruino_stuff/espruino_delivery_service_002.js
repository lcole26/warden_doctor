var WIFI_NAME = "_ASUS_2B02";
var WIFI_OPTIONS = { password : "InternetBox!" };
let wifi = require("Wifi");
let local_ip;
let is_connected = false;
const verbose = true;

const dgram = require("dgram");
const NODE_SERVER_PORT = 3000;
const NODE_HOST = '192.168.50.110';
const HOST2 = '0.0.0.0';

const multicast_address = '239.1.2.3';
const multicast_port = 5554;

const ssid_list = ['_ASUS_2B02', 'syncport', 'eduroam'];
const msg_send_rate = 500;
/*
E.on('init', function() {
  console.log("init stuff");
});
*/

//----------------------------------------------------------------
// 'home' for @home testing stuff, 
// 'hotspot' for mobile hotspot testing, 
// 'uni' for...uni testing
const connection_type = 'home';

//let srv = dgram.createSocket({type: 'udp4', reuseAddr: true});
const client = dgram.createSocket();

client.on("message", function (message, remote) {
    console.log(`UDP message received from: ${remote.address}:${remote.port} - ${message}`);
});

function relaySerialMessageToNode(){
  client.send(incomingData, multicast_port, multicast_address, function(err, bytes) {
    if (err) {
        console.error(`UDP message send error:`, err);
    }

    console.log('s');
    console.log(`UDP message sent to ${NODE_HOST}:${NODE_SERVER_PORT}`);
  });
}

//----------------------------------------------------------------
//serial stuff
Serial1.setup(9600, { tx:B6, rx:B7 });
var cmd="";
var incomingData = "";

Serial1.setup(9600, { tx:B6, rx:B7 });

Serial1.on('data', function (data) {
  if(verbose){
    Serial1.print(data);
  }

  cmd+=data;
  var idx = cmd.indexOf("\r");
  while (idx>=0) {
    var line = cmd.substr(0,idx);
    if(verbose){
      console.log("line: " + line);
    }
    incomingData = line;
    //relaySerialMessageToNode();
    cmd = cmd.substr(idx+1);
    //console.log("cmd: " + cmd);
    //var s = "'"+line+"' = "+eval(line);
    //print(s);
    //Serial1.println(s);
    idx = cmd.indexOf("\r");
  }
});

//----------------------------------------------------------------

//----------------------------------------------------------------
wifi.on('associated',function() { console.log("We're connected to an AP"); });
wifi.on('connected',function() { 
  console.log("We have an IP Address"); 
  is_connected = true;
  //get espruino ip address, prob will be useful later
  wifi.getIP(function(err, ipinfo){
    if(err){
      console.error(err);
    }
    console.log('IP info:');
    console.log(ipinfo);
    localip = ipinfo.ip;
  });
  
  client.bind(function () {
    client.setBroadcast(true);
    client.setMulticastTTL(128);
  });
});
wifi.on('disconnected',function() { 
  console.log("We disconnected"); 
});
//----------------------------------------------------------------
wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log("Connected!");
  //wifi.save();

  setInterval(function(){
    client.send(incomingData, multicast_port, multicast_address, function(err, bytes) {
      if (err) {
          console.error(`UDP message send error:`, err);
      }
    });
      console.log(`UDP message sent to ${NODE_HOST}:${NODE_SERVER_PORT}`);
  }, 500);
  
  
});