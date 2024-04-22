#include<WiFi.h>
#include<ESPAsyncWebServer.h>
#include<ESP32Servo.h>

/* Define Constants */
#define SSID "Galaxy M12 FCAE"
#define PWD "ajpo1340"
#define SERVO_PIN 26


/* Initializations */
AsyncWebServer server(8082);
Servo wasteSegregationServo;


/* Function to connect WiFi 
  * Params: void
  * Output: void
*/
void connectToWifi() {
    Serial.println(SSID);
    WiFi.begin(SSID, PWD);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nWiFi Connected!!!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}


/* Rotate Servo Motor 
  * Params: 
    - lspeed
    - rspeed
    - delay_in_ms
  * Output: void
*/
void rotateServo(int lspeed, int rspeed, int delay_in_ms) {
    wasteSegregationServo.write(lspeed);
    delay(delay_in_ms);
    wasteSegregationServo.write(rspeed);
    delay(delay_in_ms);
    wasteSegregationServo.write(90);
}


void setup() {
    // put your setup code here, to run once:
    Serial.begin(115200);
    Serial.println("******************************************************");
    Serial.println("Waste Segregation Using Deep Learning");
    Serial.println("******************************************************");

    // Connect to WiFi
    connectToWifi();
    
    // Attach Servo motor to pin
    wasteSegregationServo.attach(SERVO_PIN);

    // Routes
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("ESP32 Server Testing Route");
        request->send(200, "application/json", "{\"status\": \"ESP32 Server Working Good\"}");
    });

    server.on("/wetWaste", HTTP_POST, [](AsyncWebServerRequest *request) {
        Serial.println("Wet Waste Route");
        rotateServo(180, 0, 1000);
        request->send(200, "application/json", "{\"status\": \"Successfull\"}");
    });

    server.on("/dryWaste", HTTP_POST, [](AsyncWebServerRequest *request) {
        Serial.println("Dry Waste Route");
        rotateServo(0, 180, 1000);
        request->send(200, "application/json", "{\"status\": \"Successfull\"}");
    });

    // Start the server
    server.begin();
}

void loop() {
    // put your main code here, to run repeatedly:
    
}
