# osc2ws
OSC to Websocket proxy

Sadly, browsers can not receive OSC data. This little tool receives OSC messages and serves them via websockets.
You can then use your browsers websocket API to connect to it and receive the data.


## installation

Install node.js for your operating system. <br>
Download or clone the repo into a folder. <br>
Open a terminal in the osc2ws directory and type:

`npm i`

## start

`node main.js`

After starting up, it should look like this:

```
Local IP: 192.168.1.169
Starting websocket server on port 8000
Starting OSC receiver on port 9000
```

Now connect your websocket to `ws://localhost:8000`<br>
Send OSC data to your local IP address and use port 9000<br>
eg : `192.168.1.169:9000`

This [video tutorial](https://www.youtube.com/watch?v=1cIhDfrHM74&feature=youtu.be) shows the whole process<br>
Check the wiki for instructions on how to make it work with cables.gl
