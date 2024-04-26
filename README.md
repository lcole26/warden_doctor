# warden_doctor
```
an interoperational visual project between arduino, espruino, node, osc, mobile, cables.gl, and [tbd]. uses arduino-based + mobile sensors sent along the OSC protocol to cables.gl and various other places for further synthesis and chaos.
```
# prerequisites
  - Some sort of network access (i assume this isn't an issue if you're currently reading this)
    - note: at the moment, the cables.gf 
  - Node.js 
  - Arduino environment
    - Arduino IDE works, or something like PlatformIO + VS Code, Visual Studio, etc
  - [optional] Webcam or mobile device with wifi/ip webcam capability to connect to pc
    - I personally like the Droidcam + droidcam client for simple android/pc connectivitiy 
    - However, an ip webcam + rtsp stream can also work if your pc can pick up your mobile device's camera stream as a camera input
      - Not personally tested, but i assume off the top of my head something like ip webcam over an rtsp stream + vlc/obs would work well enough 

# prescreening
  - Arduino
    - The libraries currently necessary for this project are:
      - SoftwareSerial
      - HCSR04
    - By default, the Serial RX/TX pins used in the project are:
      - TX: D2
      - RX: D3
    - Pinout and schematic 
  - Espruino

# How to work the magic
  Cloning this repository will have everything you need to get the ball rolling, but you may need to build from the typescript files 
#### Note: this is a semi-intensive, multi-step, multi-program process
  1. Clone the repository to a directory of your choice
     1. git clone ____.git
  2. Nagivate to the root of the project, then run `npm i` in coneole to install dependencies
  3. Node->osc server things
  4. If the `output` folder has a file called `udp_serial_to_osc_server.js`, then you can just run `npm ./output/udp_serial_to_osc_server.js` and it should start up the espruino/arduino/osc networking stuff. otherwise:
     1. Run `npm run compile` to build the requisite files
  5. Node
  6. Arduino
     1. Open your Arduino environment of choice 
        1. Here, I will assume Arduino IDE for simplicity's sake. Replace as necessary
     2. Navigate to the `arduino_stuff folder` and open the `____.ino` file
     3. The required Arduino libraries to be installed are:
        1. +
     4. Upload thr sketch to the Arduino
  7. Espruino
  8. Cables
  9.  

# building
  a simple 