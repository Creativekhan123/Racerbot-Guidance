/*
   Obstacle Avoidance Robot - Arduino Uno
   - 3 Ultrasonic sensors (Left, Center, Right)
   - All motor movement controlled via motorControl(leftSpeed, rightSpeed)
*/

// ==========================================
// PIN DEFINITIONS
// ==========================================

// Motor Driver Pins (PWM pins on Uno: 3,5,6,9,10,11)
const int PWM1 = 9;   // Left motor speed
const int DIR1 = 8;   // Left motor direction
const int PWM2 = 11;  // Right motor speed
const int DIR2 = 12;  // Right motor direction (D12)

// Ultrasonic Sensor Pins
const int trig1 = 2;  const int echo1 = 3;   // Left sensor
const int trig2 = 4;  const int echo2 = 5;   // Center sensor
const int trig3 = 6;  const int echo3 = 7;   // Right sensor

// ==========================================
// SETTINGS
// ==========================================

const float MAX_SENSOR_DISTANCE       = 200.0;  // cm
const float FRONT_OBSTACLE_THRESHOLD  = 20.0;   // cm - center sensor triggers backup + turn
const float SIDE_OBSTACLE_THRESHOLD   = 10.0;   // cm - left/right sensors trigger turn
const unsigned long SENSOR_INTERVAL   = 50;     // ms between sensor reads
const unsigned long BACKUP_DURATION   = 50;    // ms to reverse when front obstacle detected

unsigned long lastSensorReadTime = 0;

// ==========================================
// MOTOR CONTROL
// ==========================================

void motor1(int speed) {
  if (speed > 0) {
    digitalWrite(DIR1, HIGH);
    analogWrite(PWM1, speed);       // Forward
  } else if (speed < 0) {
    digitalWrite(DIR1, LOW);
    analogWrite(PWM1, -speed);      // Backward (negate to get positive PWM value)
  } else {
    digitalWrite(DIR1, LOW);
    analogWrite(PWM1, 0);           // Stop
  }
}

void motor2(int speed) {
  if (speed > 0) {
    digitalWrite(DIR2, HIGH);
    analogWrite(PWM2, speed);       // Forward
  } else if (speed < 0) {
    digitalWrite(DIR2, LOW);
    analogWrite(PWM2, -speed);      // Backward (negate to get positive PWM value)
  } else {
    digitalWrite(DIR2, LOW);
    analogWrite(PWM2, 0);           // Stop
  }
}

void motorControl(int leftSpeed, int rightSpeed) {
  motor1(leftSpeed);
  motor2(rightSpeed);
}

// ==========================================
// SETUP
// ==========================================

void setup() {
  Serial.begin(9600);

  // Ultrasonic pins
  pinMode(trig1, OUTPUT); pinMode(echo1, INPUT);
  pinMode(trig2, OUTPUT); pinMode(echo2, INPUT);
  pinMode(trig3, OUTPUT); pinMode(echo3, INPUT);

  // Motor pins
  pinMode(PWM1, OUTPUT); pinMode(DIR1, OUTPUT);
  pinMode(PWM2, OUTPUT); pinMode(DIR2, OUTPUT);

  motorControl(0, 0); // Start stopped
  Serial.println("Robot Ready!");
}

// ==========================================
// MAIN LOOP
// ==========================================

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
      motorControl(-255, -255);
      delay(BACKUP_DURATION);
      motorControl(-255, 255);  // Turn Left in place
      delay(BACKUP_DURATION);
    }
    else if (leftDist < SIDE_OBSTACLE_THRESHOLD) {
      motorControl(255, -255);  // Turn Right in place
    }
    else if (rightDist < SIDE_OBSTACLE_THRESHOLD) {
      motorControl(-255, 255);  // Turn Left in place
    }
    else {
      motorControl(255, 255);   // Go Forward
    }
  }
}

// ==========================================
// ULTRASONIC DISTANCE FUNCTION
// ==========================================

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

}
