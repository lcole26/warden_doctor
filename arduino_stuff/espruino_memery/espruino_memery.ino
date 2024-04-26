#include <NewPing.h>
#include <SoftwareSerial.h>

const byte rxPin = 2;
const byte txPin = 3;
const byte testPin = 7;
const int msg_send_rate = 500;

#define NEWPING_TRIGGER_PIN  12  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define NEWPING_ECHO_PIN     11  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define NEWPING_MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.
String serialDenoter = "/serial";
String testAddress = "/espruino";
String testSensorName = "HCSR04";
String testMsg = "";
// const char[2] testAnalogPin = "A0";

SoftwareSerial espruino_serial (rxPin, txPin);

NewPing sonar(NEWPING_TRIGGER_PIN, NEWPING_ECHO_PIN, NEWPING_MAX_DISTANCE);
unsigned long sonar_ping_current;

void setup() {
  // put your setup code here, to run once:
  // Serial.begin(9600);
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  Serial.begin(9600);
  espruino_serial.begin(9600);
  while (!espruino_serial) {
    ; // wait for serial port to connect. Needed for Native USB only
  }

  pinMode(testPin, OUTPUT);
  
  // testOscOverSerial();

}

void updatePinInfo(){

}

void loop() {
  // put your main code here, to run repeatedly:
  if (espruino_serial.available() > 0) {
        espruino_serial.read();
  }

    // Send a byte with the value 45
    // espruino_serial.write(67);
    // espruino_serial.print("//test//espruino 41");
    delay(msg_send_rate);
    sonar_ping_current = sonar.ping_cm();
    testMsg = serialDenoter+ testAddress + '/' + testSensorName + '|' + sonar_ping_current;
    espruino_serial.println(testMsg);
    Serial.println(testMsg);
    // testOscOverSerial();

    //Send the string “hello” and return the length of the string.
    // int bytesSent = espruino_serial.write(“hello”);
}
