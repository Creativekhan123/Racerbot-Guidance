

// Motor Driver Pins (PWM pins on Uno: 3,5,6,9,10,11)
const int IN1 = 9;   // Left motor speed
const int IN2 = 8;   // Left motor direction
const int IN3 = 11;  // Right motor speed
const int IN4 = 12;  // Right motor direction (D12)

// Ultrasonic Sensor Pins
const int trig1 = 2;  const int echo1 = 3;   // Left sensor
const int trig2 = 4;  const int echo2 = 5;   // Center sensor
const int trig3 = 6;  const int echo3 = 7;   // Right sensor



const float MAX_SENSOR_DISTANCE       = 200.0;  // cm
const float FRONT_OBSTACLE_THRESHOLD  = 15.0;   // cm - center sensor triggers backup + turn
const float SIDE_OBSTACLE_THRESHOLD   = 12.0;   // cm - left/right sensors trigger turn
const unsigned long SENSOR_INTERVAL   = 50;     // ms between sensor reads
const unsigned long BACKUP_DURATION   = 220;    // ms to reverse when front obstacle detected

unsigned long lastSensorReadTime = 0;

// ==========================================
// MOTOR CONTROL
// ==========================================

void motor1(int speed) {       //Left Motor speed
  if (speed > 0) {
    digitalWrite(IN1, LOW);
    analogWrite(IN2, speed);       // Forward
  } else if (speed < 0) {
    digitalWrite(IN1, HIGH);
    analogWrite(IN2, speed);      // Backward 
  } else {
    digitalWrite(IN1, HIGH);
    analogWrite(IN2, HIGH);           // Stop
  }
}

void motor2(int speed) {      //Right Motor speed 
  if (speed > 0) {
    digitalWrite(IN3, LOW);
    analogWrite(IN4, speed);       // Forward
  } else if (speed < 0) {
    digitalWrite(IN3, HIGH);
    analogWrite(IN4, speed);      // Backward (negate to get positive PWM value)
  } else {
    digitalWrite(IN3, HIGH);
    analogWrite(IN4, HIGH);           // Stop
  }
}

void motorControl(int leftSpeed, int rightSpeed) {
  motor1(leftSpeed);
  motor2(rightSpeed);
}



void setup() {
  Serial.begin(9600);

  // Ultrasonic pins
  pinMode(trig1, OUTPUT); pinMode(echo1, INPUT);
  pinMode(trig2, OUTPUT); pinMode(echo2, INPUT);
  pinMode(trig3, OUTPUT); pinMode(echo3, INPUT);

  // Motor pins
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);

  motorControl(0, 0); // Start stopped
  Serial.println("Robot Ready!");
}


void loop() {
  unsigned long currentMillis = millis();


  if (currentMillis - lastSensorReadTime >= SENSOR_INTERVAL) {
    lastSensorReadTime = currentMillis;

    float leftDist   = getDistance(trig1, echo1);
    float centerDist = getDistance(trig2, echo2);
    float rightDist  = getDistance(trig3, echo3);

    Serial.print(leftDist);
    Serial.print("       ");
    Serial.print(centerDist);
    Serial.print("       ");
    Serial.println(rightDist);


    if (centerDist < FRONT_OBSTACLE_THRESHOLD) {
      // Back up briefly, then turn left for the same duration
      motorControl(-200, -200);
      delay(BACKUP_DURATION);
      motorControl(-200, 200);  // Turn Left in place
      delay(BACKUP_DURATION);
    }
    else if (leftDist < SIDE_OBSTACLE_THRESHOLD) {
      motorControl(200, -200);  // Turn Right in place
    }
    else if (rightDist < SIDE_OBSTACLE_THRESHOLD) {
      motorControl(-200, 200);  // Turn Left in place
    }
    else {
      motorControl(130, 130);   // Go Forward
    }
  }
}

float getDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
                                                                                                                                                                         
  long timeout = (MAX_SENSOR_DISTANCE * 2.0 / 0.0343) + 3000;
  long duration = pulseIn(echoPin, HIGH, timeout);

  if (duration == 0) return MAX_SENSOR_DISTANCE;

  float distance = duration * 0.0343 / 2.0;

  if (distance > MAX_SENSOR_DISTANCE) return MAX_SENSOR_DISTANCE;
  if (distance < 0) return 0.0;

  return distance;
  Serial.println(distance);

}
