#include <WiFi.h>
#include <HTTPClient.h>
#include  "OneWire.h"
#include  "DallasTemperature.h"

OneWire oneWire(23);
DallasTemperature tempSensor(&oneWire);

WiFiClient client; 

const char* NET_SSID = "asus_hotspot";//"HUAWEI-6EC2";
const char* NET_PWD = "1234567890";

const char* SERVER = "192.168.43.152";
const int PORT = 3000;

int sensorValue;

int LED_LIGHT = 19;
int LED_RADIATOR = 21;

int lightState = 0;
int radiatorState = 0;

float lightValue = 0;
float tempValue = 0;

unsigned long lastUpdateTime = 0;
unsigned long lastPostTime = 0;

const unsigned long postingInterval = 1L * 1000L;
const unsigned long updateInterval = 500L;

void print_ip_status(){
  Serial.print("WiFi connected \n");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.print("\n");
  Serial.print("MAC address: ");
  Serial.print(WiFi.macAddress());
  Serial.print("\n");
}

void connect_wifi(){
 Serial.println("Connecting Wifi...");
 WiFi.begin(NET_SSID, NET_PWD);
 while(WiFi.status() != WL_CONNECTED){
   Serial.print("Attempting to connect ..\n");
   delay(1000);
 }
 Serial.print("Connected to local Wifi\n");
}

int getRequest(char *url) {
  HTTPClient http;

  String tmp = "http://";
  tmp = tmp + SERVER;
  tmp = tmp + ":";
  tmp = tmp + PORT;
  tmp = tmp + "/";
  tmp = tmp + url;
  Serial.println("Getting form " + tmp + "...");
  
  http.begin(tmp);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.GET();
  
  String response = "";
  if(httpResponseCode > 0){
    response = http.getString();
    Serial.print(httpResponseCode);
    Serial.println(" : " + response);
  }
  else{
    Serial.println("Error on GET: " + httpResponseCode);
  }
  http.end();
  return atoi(response.c_str());
}

void postRequest(char *url, float value, int elmStatus){
  HTTPClient http;
  
  String postData = "{ \"value\" : ";
  postData = postData + value;
  postData = postData + " , \"mac_add\" : \"";
  postData = postData + WiFi.macAddress();
  postData = postData + "\", \"powered\" : ";
  postData = postData + elmStatus;
  postData = postData + "}";

  Serial.println("Sending" + postData + " to " + url + "...");
  
  String tmp = "http://";
  tmp = tmp + SERVER;
  tmp = tmp + ":";
  tmp = tmp + PORT;
  tmp = tmp + "/";
  tmp = tmp + url;
  
  http.begin(tmp);
  
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(postData);
 
  if(httpResponseCode > 0){
    String response = http.getString();
    Serial.print(httpResponseCode);
    Serial.println(" : " + response);
  }
  else{
    Serial.println("Error on sending POST: "  + httpResponseCode);
  }
  http.end();
}

int getLightState(){
  String url = "light/";
  url = url + WiFi.macAddress().c_str();
  url = url + "/state";
  return getRequest((char*)url.c_str());
}

int getRadiatorState(){
  String url = "temperature/";
  url = url + WiFi.macAddress().c_str();
  url = url + "/state";
  return getRequest((char*)url.c_str());
}

void postLightData(float sensorValue){
  postRequest("light", sensorValue, lightState);
}

void postTemperatureData(float sensorValue){
  postRequest("temperature", sensorValue, radiatorState);
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_LIGHT, OUTPUT);
  pinMode(LED_RADIATOR, OUTPUT);
  tempSensor.begin();
  if(WiFi.status() != WL_CONNECTED)
    connect_wifi();
  print_ip_status();
}

void postData(){
  lightValue = analogRead (A0);
  tempSensor.requestTemperaturesByIndex(0); 
  tempValue = tempSensor.getTempCByIndex(0);
  Serial.print("\nTemperature : ");
  Serial.println(tempValue);
  Serial.print("\nLight intensity : ");
  Serial.println(lightValue);
  Serial.print("\n");
  if(WiFi.status() != WL_CONNECTED)
    connect_wifi();
  postTemperatureData(tempValue);
  postLightData(lightValue);
  lastPostTime = millis();
}

void updateComponents(){
  int repL = getLightState();
  int repR = getRadiatorState();
  
  if(repL == 0 || repL == 1)
    lightState = repL;
    
  if(repR == 0 || repR == 1)
    radiatorState = repR;
    
  digitalWrite(LED_LIGHT, lightState);
  digitalWrite(LED_RADIATOR, radiatorState);
}

void loop() {
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }
  if (millis() - lastPostTime > postingInterval) {
    postData();
  }
  if (millis() - lastUpdateTime > updateInterval) {
    updateComponents();
  }
}
