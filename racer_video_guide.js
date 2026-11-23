/* ==========================================================================
   Autonomous Racer Robot — 4:20 Interactive 3D Video Guide Engine
   8 Chapters (260s) | Voice Narration | Web Audio SFX | Code Sync | WebM Export
   ========================================================================== */

(function (global) {
  'use strict';

  var TOTAL_DURATION = 260.0; // 4 minutes 20 seconds (under 5 min!)

  /* ---------- 8 Chapters Definition ---------- */
  var CHAPTERS = [
    { id: 0, start: 0,   end: 25,  short: 'Meet the Bot',    title: 'Meet the 4WD Fork Robot' },
    { id: 1, start: 25,  end: 65,  short: '14 Components',   title: 'Required Components Roll-Call' },
    { id: 2, start: 65,  end: 115, short: '3D Assembly',     title: 'Step-by-Step Mechanical Assembly' },
    { id: 3, start: 115, end: 145, short: 'Sensor Wiring',   title: 'Ultrasonic Sensor Wiring (D2–D7)' },
    { id: 4, start: 145, end: 175, short: 'Motor Wiring',    title: 'L298N Driver & 4WD Parallel Motors' },
    { id: 5, start: 175, end: 198, short: 'Power & Safety',  title: '7.4V LiPo Power & Golden Safety Rules' },
    { id: 6, start: 198, end: 230, short: 'Arduino Code',    title: 'Arduino Code Walkthrough' },
    { id: 7, start: 230, end: 260, short: 'Live Race Demo',  title: 'Live Autonomous Obstacle Run' }
  ];

  /* ---------- Fine-Grained Narration, Caption & SFX Beats ---------- */
  var BEATS = [
    // CH 1: Meet the Fork Robot (0 - 25)
    {
      s: 0, e: 9, ch: 0, sfx: 'chime',
      caption: 'Meet the <strong>Autonomous Racer Robot</strong> — also known as the <strong>4WD Fork Robot</strong>!',
      voice: 'Meet the Autonomous Racer Robot, also called the 4WD Fork Robot! No remote control, no camera — pure Arduino intelligence.',
      panel: { type: 'intro', stage: 0 }
    },
    {
      s: 9, e: 18, ch: 0, sfx: 'sonar',
      caption: 'Three <strong>HC-SR04 ultrasonic sensors</strong> fire 40 kHz sound pulses to spot obstacles in milliseconds and steer smoothly around them.',
      voice: 'Three ultrasonic sensors on its angled front bumper fire forty kilohertz sound waves, detecting obstacles and steering automatically.',
      panel: { type: 'intro', stage: 1 }
    },
    {
      s: 18, e: 25, ch: 0, sfx: 'spark',
      caption: 'In under 5 minutes, you will learn <strong>all 14 parts</strong>, <strong>3D assembly</strong>, <strong>every wire</strong>, and the <strong>Arduino code</strong>.',
      voice: 'In just over four minutes, we will cover every component, full mechanical assembly, exact wiring connections, and the Arduino code.',
      panel: { type: 'intro', stage: 2 }
    },

    // CH 2: All 14 Required Components (25 - 65)
    {
      s: 25, e: 33, ch: 1, sfx: 'chime',
      caption: '<strong>Part 1 — The Brain:</strong> Arduino UNO (ATmega328P, 5V, 16 MHz) reads all 3 sensors and commands the motors every 50 ms.',
      voice: 'Let us inspect all fourteen parts. First, the brain: an Arduino Uno running at sixteen megahertz with fourteen digital pins.',
      panel: {
        type: 'component', count: '1 / 14', name: 'Arduino UNO', qty: 'Qty: 1',
        img: 'arduino_Uno.png',
        desc: 'ATmega328P 5V microcontroller. Reads Left, Center & Right distances and drives PWM speed signals to the L298N.',
        chips: [['Clock', '16 MHz'], ['Digital I/O', '14 (6 PWM)'], ['Power', '5V Logic'], ['Role', 'Central Brain']]
      }
    },
    {
      s: 33, e: 41, ch: 1, sfx: 'sonar',
      caption: '<strong>Part 2 — 3-Way Radar Eyes:</strong> Three HC-SR04 ultrasonic sensors measure distances from 2 cm to 400 cm with 3 mm precision.',
      voice: 'Next are three HC SR zero four ultrasonic sensors arranged left, center, and right for wide one-hundred-eighty-degree forward vision.',
      panel: {
        type: 'component', count: '2 / 14', name: 'HC-SR04 Ultrasonic Sensors', qty: 'Qty: 3',
        img: 'ultrasonic_sensor.png',
        desc: 'Emits 40 kHz acoustic bursts from TRIG and measures echo return time on ECHO — zero moving parts!',
        chips: [['Range', '2–400 cm'], ['Precision', '3 mm'], ['Frequency', '40 kHz'], ['Pins Used', 'D2 to D7']]
      }
    },
    {
      s: 41, e: 49, ch: 1, sfx: 'snap',
      caption: '<strong>Parts 3–5 — Power & Propulsion:</strong> L298N Dual H-Bridge driver, 4× N20 300 RPM micro metal gear motors, and a 7.4V 850mAh 2S LiPo battery.',
      voice: 'For muscle and power: an L298N dual H-bridge driver, four 300 RPM N20 metal gear motors, and a high-discharge 7.4 volt 2S LiPo battery.',
      panel: {
        type: 'component', count: '3–5 / 14', name: 'L298N + 4× N20 Motors + 7.4V LiPo', qty: 'Driver, 4 Motors, 1 Battery',
        img: 'L298_Motor_Driver.jpg',
        desc: 'Arduino pins cannot power motors directly. The L298N switches high 7.4V LiPo current safely across all 4 all-metal N20 gear motors.',
        chips: [['L298N', '2A / Channel'], ['N20 Motors', '4× 300 RPM'], ['LiPo Pack', '7.4V 850mAh'], ['Drive', '4WD Diff-Steer']]
      }
    },
    {
      s: 49, e: 57, ch: 1, sfx: 'snap',
      caption: '<strong>Parts 6–8 — 3D-Printed CAD Parts:</strong> Custom 4WD Chassis, 4× custom D-shaft drive wheels, and 4× orange N20 motor clamps.',
      voice: 'Next are our custom 3D printed parts: the angled-bumper chassis, four precision D-shaft wheels, and four rigid motor mounting clamps.',
      panel: {
        type: 'component', count: '6–8 / 14', name: '3D-Printed Chassis, Wheels & Clamps', qty: '1 Chassis, 4 Wheels, 4 Clamps',
        img: 'wheel_3d_render.png',
        desc: 'Print in PLA or PETG from the downloadable STL & STEP CAD files right below on this webpage!',
        chips: [['Chassis', 'AutonomousRacerBot.stl'], ['Wheels ×4', 'Robojunkies.step'], ['Clamps ×4', 'motor clamp.stl'], ['Infill', '60–100% Rigid']]
      }
    },
    {
      s: 57, e: 65, ch: 1, sfx: 'spark',
      caption: '<strong>Parts 9–14 — Grip, Fasteners & Wiring:</strong> Octopus cricket bat grip tires, M2 bolts & hex nuts, M3 CSK screws, double-sided tape, and DuPont jumpers!',
      voice: 'Finally, octopus cricket bat grip for high-traction tires, M2 bolts and nuts, flush M3 screws, heavy double-sided tape, and multi-color jumper wires.',
      panel: {
        type: 'component', count: '9–14 / 14', name: 'Grip, Fasteners, Tape & Jumpers', qty: 'Complete Hardware Kit',
        img: 'bat_grip.jpg',
        desc: 'Rubber octopus bat grip stops wheel slip on smooth floors; M2/M3 stainless & Grade 10.9 screws lock everything against vibration.',
        chips: [['Tire Wrap', 'Cricket Bat Grip'], ['Clamp Bolts', 'M2×10mm + Nuts'], ['Board Screws', 'M3×10mm CSK ×3'], ['Wiring', '~20 DuPont + Tape']]
      }
    },

    // CH 3: Step-by-Step 3D Mechanical Assembly (65 - 115)
    {
      s: 65, e: 78, ch: 2, sfx: 'snap',
      caption: '<strong>Assembly Step 1:</strong> Slide all <strong>4× N20 motors</strong> into the chassis slots, cap with <strong>3D motor clamps</strong>, and lock with <strong>M2×10mm bolts &amp; hex nuts</strong>.',
      voice: 'Time to build! Step one: place two N20 motors on each side of the chassis, snap on the four orange clamps, and lock them down with M2 bolts and hex nuts.',
      panel: { type: 'assembly', step: 0 }
    },
    {
      s: 78, e: 90, ch: 2, sfx: 'snap',
      caption: '<strong>Assembly Step 2:</strong> Cut 4 rings from the <strong>orange octopus cricket bat grip</strong>, stretch over the 3D wheels, and press onto each N20 D-shaft.',
      voice: 'Step two: cut four rubber rings from the cricket bat grip, stretch them tightly over the white 3D printed rims for unbeatable floor traction, and press onto the shafts.',
      panel: { type: 'assembly', step: 1 }
    },
    {
      s: 90, e: 103, ch: 2, sfx: 'snap',
      caption: '<strong>Assembly Step 3:</strong> Stick <strong>double-sided tape</strong> in the center bay for the <strong>7.4V LiPo</strong>; mount the <strong>L298N</strong> up front and <strong>Arduino UNO</strong> at rear with <strong>M3 CSK screws</strong>.',
      voice: 'Step three: apply vibration-damping double-sided tape in the center bay for the 7.4 volt battery. Mount the L298N behind the bumper and fasten the Arduino Uno at the rear using M3 countersunk screws.',
      panel: { type: 'assembly', step: 2 }
    },
    {
      s: 103, e: 115, ch: 2, sfx: 'chime',
      caption: '<strong>Assembly Step 4:</strong> Insert the <strong>3× HC-SR04 sensors</strong> into the front angled bumper — Left (+35°), Center (0°), Right (-35°). Chassis complete!',
      voice: 'Step four: slide the three ultrasonic sensors into the angled front bumper facing left, center, and right. Your mechanical chassis is now rock solid!',
      panel: { type: 'assembly', step: 3 }
    },

    // CH 4: Ultrasonic Sensor Wiring (115 - 145)
    {
      s: 115, e: 123, ch: 3, sfx: 'spark',
      caption: '<strong>Sensor Power Rails:</strong> Connect <strong>VCC → Arduino 5V</strong> (Red) and <strong>GND → Arduino GND</strong> (Black) across all three HC-SR04 sensors.',
      voice: 'Now for clean, mistake-free wiring! Start by sharing five volts and ground from the Arduino to the VCC and GND pins on all three ultrasonic sensors.',
      panel: { type: 'wiring_us', activeIdx: 0 }
    },
    {
      s: 123, e: 130, ch: 3, sfx: 'sonar',
      caption: '<strong>Left Sensor:</strong> Wire <strong>TRIG → D2</strong> (Blue) and <strong>ECHO → D3</strong> (Cyan). Arduino triggers a 10 µs pulse and times the echo!',
      voice: 'Next, wire the left sensor: trigger goes to digital pin D2, and echo goes to pin D3.',
      panel: { type: 'wiring_us', activeIdx: 1 }
    },
    {
      s: 130, e: 137, ch: 3, sfx: 'sonar',
      caption: '<strong>Center Sensor:</strong> Wire <strong>TRIG → D4</strong> (Green) and <strong>ECHO → D5</strong> (Yellow) for straight-ahead front obstacle radar.',
      voice: 'Wire the center front sensor: trigger to pin D4 and echo to pin D5.',
      panel: { type: 'wiring_us', activeIdx: 2 }
    },
    {
      s: 137, e: 145, ch: 3, sfx: 'sonar',
      caption: '<strong>Right Sensor:</strong> Wire <strong>TRIG → D6</strong> (Orange) and <strong>ECHO → D7</strong> (Purple). Formula: <strong>Distance = (Time × 0.0343) / 2</strong>.',
      voice: 'Finally, the right sensor connects trigger to D6 and echo to D7. Distance equals echo time times point zero three four three divided by two!',
      panel: { type: 'wiring_us', activeIdx: 3 }
    },

    // CH 5: Motor Driver & Parallel 4WD Wiring (145 - 175)
    {
      s: 145, e: 156, ch: 4, sfx: 'spark',
      caption: '<strong>L298N Logic Signals:</strong> <strong>IN1 → D9</strong> (Left PWM), <strong>IN2 → D8</strong> (Left Dir), <strong>IN3 → D11</strong> (Right PWM), <strong>IN4 → D12</strong> (Right Dir).',
      voice: 'Now connect the L298N control pins: IN1 to D9 and IN2 to D8 for left motors; IN3 to D11 and IN4 to D12 for right motors.',
      panel: { type: 'wiring_motor', activeIdx: 0 }
    },
    {
      s: 156, e: 162, ch: 4, sfx: 'chime',
      caption: '<strong>Pro Tip — Enable Jumpers:</strong> Keep both yellow <strong>ENA &amp; ENB 5V jumper caps FITTED</strong> so both H-bridge channels stay enabled!',
      voice: 'Important classroom tip: keep both 5 volt jumper caps firmly fitted on ENA and ENB so both motor channels stay enabled.',
      panel: { type: 'wiring_motor', activeIdx: 1 }
    },
    {
      s: 162, e: 175, ch: 4, sfx: 'spark',
      caption: '<strong>4WD Parallel Motors:</strong> Wire BOTH Left N20 motors in parallel to <strong>OUT1 &amp; OUT2</strong>, and BOTH Right N20 motors in parallel to <strong>OUT3 &amp; OUT4</strong>!',
      voice: 'For true four-wheel drive, wire both left motors in parallel to OUT1 and OUT2, and both right motors in parallel to OUT3 and OUT4. Both wheels on each side now spin in sync!',
      panel: { type: 'wiring_motor', activeIdx: 2 }
    },

    // CH 6: Power Supply & Safety Rules (175 - 198)
    {
      s: 175, e: 183, ch: 5, sfx: 'powerup',
      caption: '<strong>7.4V LiPo Input:</strong> Connect Red <strong>(+) → L298N 12V/VMS</strong> and Black <strong>(-) → L298N GND</strong>. Always verify polarity first!',
      voice: 'Power time! Connect the 7.4 volt LiPo red positive lead to the L298N 12 volt terminal and black negative to ground. Always double-check polarity first!',
      panel: { type: 'wiring_power', activeIdx: 0 }
    },
    {
      s: 183, e: 191, ch: 5, sfx: 'alert',
      caption: '<strong>CRITICAL — Common Ground:</strong> Link <strong>L298N GND ↔ Arduino GND</strong>! Without a shared ground reference, motor signals will fail.',
      voice: 'This is the number one mistake students make: always connect a wire from L298N ground to Arduino ground. Common ground gives both boards the same voltage reference!',
      panel: { type: 'wiring_power', activeIdx: 1 }
    },
    {
      s: 191, e: 198, ch: 5, sfx: 'powerup',
      caption: '<strong>Regulated 5V Logic:</strong> Route <strong>L298N 5V Out → Arduino 5V / VIN</strong>. Never connect 7.4V directly to Arduino 5V or digital pins!',
      voice: 'Route the L298N regulated 5 volt output to power the Arduino cleanly. Never plug 7.4 volts directly into Arduino 5 volt or signal pins!',
      panel: { type: 'wiring_power', activeIdx: 2 }
    },

    // CH 7: Arduino Code Walkthrough (198 - 230)
    {
      s: 198, e: 206, ch: 6, sfx: 'chime',
      caption: '<strong>Code Part 1 — Setup &amp; Thresholds:</strong> Front trigger at <strong>15 cm</strong>, side triggers at <strong>17 cm</strong>, scanning every <strong>50 ms</strong> (20 times/sec!).',
      voice: 'Let us inspect the Arduino sketch. Zero external libraries needed! We define pins D2 to D12, a fifteen centimeter front threshold, seventeen centimeter side threshold, and a fast fifty millisecond scan loop.',
      panel: { type: 'code', section: 0 }
    },
    {
      s: 206, e: 214, ch: 6, sfx: 'sonar',
      caption: '<strong>Code Part 2 — getDistance():</strong> Sends a 10 µs pulse on <code>trigPin</code>, times <code>pulseIn(echoPin)</code>, and converts microseconds to centimeters.',
      voice: 'The getDistance function fires a ten microsecond trigger pulse, measures the returning echo using pulseIn, and multiplies by half the speed of sound to get distance in centimeters.',
      panel: { type: 'code', section: 1 }
    },
    {
      s: 214, e: 222, ch: 6, sfx: 'spark',
      caption: '<strong>Code Part 3 — motorControl(L, R):</strong> <code>(255, 255)</code> cruises straight; <code>(200, 0)</code> pivots right; <code>(0, 255)</code> pivots left!',
      voice: 'MotorControl takes left and right speeds from zero to two hundred fifty five. Full speed on both drives straight; stopping one side makes a razor-sharp pivot turn!',
      panel: { type: 'code', section: 2 }
    },
    {
      s: 222, e: 230, ch: 6, sfx: 'spark',
      caption: '<strong>Code Part 4 — Smart Decision Loop:</strong> Checks Center (&lt;15 cm) first to compare Left vs Right clearance, then checks Left (&lt;17) &amp; Right (&lt;17)!',
      voice: 'In the loop, if the center sensor sees a wall closer than fifteen centimeters, it compares left versus right clearance and turns toward the wider open space!',
      panel: { type: 'code', section: 3 }
    },

    // CH 8: Live Autonomous Obstacle Course Demo (230 - 260)
    {
      s: 230, e: 236, ch: 7, sfx: 'powerup',
      caption: '<strong>LIVE DEMO — Clear Path:</strong> All 3 sensors read clear (&ge;17 cm). Robot launches forward at full speed <strong>motorControl(255, 255)</strong>!',
      voice: 'Upload the code, switch on the LiPo battery, and watch it race! Path ahead is clear, so all four wheels sprint at full PWM 255!',
      panel: { type: 'telemetry' }
    },
    {
      s: 236, e: 242, ch: 7, sfx: 'alert',
      caption: '<strong>LEFT OBSTACLE (&lt;17 cm):</strong> Left radar flashes amber! Arduino executes <strong>motorControl(200, 0)</strong> to pivot cleanly right.',
      voice: 'Left obstacle detected under seventeen centimeters! Left wheels drive while right wheels brake, pivoting smoothly right!',
      panel: { type: 'telemetry' }
    },
    {
      s: 242, e: 248, ch: 7, sfx: 'alert',
      caption: '<strong>RIGHT OBSTACLE (&lt;17 cm):</strong> Right radar flashes amber! Arduino executes <strong>motorControl(0, 255)</strong> to pivot cleanly left.',
      voice: 'Now a barrier on the right under seventeen centimeters! Right wheels surge to 255, carving a crisp left turn!',
      panel: { type: 'telemetry' }
    },
    {
      s: 248, e: 255, ch: 7, sfx: 'alert',
      caption: '<strong>FRONT WALL (&lt;15 cm):</strong> Center radar flashes RED! Compares Left (72 cm) &gt; Right (19 cm) → steers into the open left lane!',
      voice: 'Dead-end wall straight ahead under fifteen centimeters! The Arduino compares left and right space, finds wide clearance on the left, and turns straight into the escape lane!',
      panel: { type: 'telemetry' }
    },
    {
      s: 255, e: 260, ch: 7, sfx: 'fanfare',
      caption: '<strong>COURSE COMPLETE!</strong> You now know every part, wire, and line of code. Scroll below to download CAD files &amp; start building!',
      voice: 'Finish line crossed! You now know every part, connection, and line of code. Grab the STL files and Arduino sketch below and build your own Autonomous Racer Robot!',
      panel: { type: 'telemetry' }
    }
  ];

  /* ---------- Exact Arduino Code Snippets (from autoracerl298n.ino) ---------- */
  var CODE_SECTIONS = [
    {
      title: '1. Pins & Detection Thresholds',
      lines: [
        [3,  'const int IN1 = 9;  const int IN2 = 8;  // Left', true],
        [5,  'const int IN3 = 11; const int IN4 = 12; // Right', true],
        [9,  'const int trig1 = 2, echo1 = 3; // Left Sonar', false],
        [10, 'const int trig2 = 4, echo2 = 5; // Center Sonar', false],
        [11, 'const int trig3 = 6, echo3 = 7; // Right Sonar', false],
        [16, 'const float FRONT_OBSTACLE_THRESHOLD = 15.0;', true],
        [17, 'const float SIDE_OBSTACLE_THRESHOLD  = 17.0;', true],
        [18, 'const unsigned long SENSOR_INTERVAL  = 50;', true]
      ]
    },
    {
      title: '2. Ultrasonic Sonar Formula',
      lines: [
        [117, 'float getDistance(int trigPin, int echoPin) {', false],
        [120, '  digitalWrite(trigPin, HIGH);', true],
        [121, '  delayMicroseconds(10); // 10us burst', true],
        [122, '  digitalWrite(trigPin, LOW);', false],
        [125, '  long duration = pulseIn(echoPin, HIGH, t);', true],
        [127, '  if (duration == 0) return 200.0;', false],
        [129, '  return duration * 0.0343 / 2.0; // cm', true],
        [135, '}', false]
      ]
    },
    {
      title: '3. Differential 4WD Motor Control',
      lines: [
        [27, 'void motor1(int speed) { // Left 2x N20', false],
        [28, '  if (speed > 0) {', true],
        [29, '    digitalWrite(IN1, LOW);', true],
        [30, '    analogWrite(IN2, speed); // Forward', true],
        [34, '  } else {', false],
        [35, '    digitalWrite(IN1, HIGH); analogWrite(IN2, HIGH);', false],
        [53, 'void motorControl(int leftSpd, int rightSpd) {', true],
        [54, '  motor1(leftSpd); motor2(rightSpd); }', true]
      ]
    },
    {
      title: '4. Autonomous Decision Tree (50 ms Loop)',
      lines: [
        [95,  'if (centerDist < 15.0) { // Front Wall!', true],
        [98,  '  if (leftDist > rightDist) motorControl(0, 255);', true],
        [101, '  else if (rightDist > leftDist) motorControl(255,0);', true],
        [105, '} else if (leftDist < 17.0) {', false],
        [106, '  motorControl(200, 0);   // Pivot Right', true],
        [108, '} else if (rightDist < 17.0) {', false],
        [109, '  motorControl(0, 255);   // Pivot Left', true],
        [111, '} else { motorControl(255, 255); } // Race!', true]
      ]
    }
  ];

  /* ---------- Utilities ---------- */
  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function smoothstep(v) { v = clamp01(v); return v * v * (3 - 2 * v); }
  function easeOutCubic(v) { v = clamp01(v); return 1 - Math.pow(1 - v, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ---------- ElevenLabs Studio Foley SFX Engine (Zero harsh synth beeps!) ---------- */
  function createSoundEngine() {
    var ctx = null;
    var destNode = null; // Feeds WebM video recorder when on HTTP/GitHub Pages
    var enabled = true;
    var isFileProto = window.location.protocol === 'file:';
    var sfxManifest = global.RACER_SFX_MANIFEST || {};
    var sfxPool = {};

    function ensureCtx() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        destNode = ctx.createMediaStreamDestination ? ctx.createMediaStreamDestination() : null;
      }
      if (ctx.state === 'suspended') {
        ctx.resume().catch(function () {});
      }
      return ctx;
    }

    function attachAudioElement(audioEl) {
      if (!audioEl || isFileProto) return;
      try {
        var ac = ensureCtx();
        if (!ac || audioEl._rvgConnected) return;
        var srcNode = ac.createMediaElementSource(audioEl);
        srcNode.connect(ac.destination);
        if (destNode) srcNode.connect(destNode);
        audioEl._rvgConnected = true;
      } catch (e) {}
    }

    // Preload real ElevenLabs studio Foley MP3s
    if (typeof Audio !== 'undefined') {
      Object.keys(sfxManifest).forEach(function (key) {
        var a = new Audio();
        a.preload = 'auto';
        if (!isFileProto) a.crossOrigin = 'anonymous';
        a.volume = (key === 'chime' || key === 'fanfare') ? 0.34 : 0.28;
        a.src = sfxManifest[key];
        sfxPool[key] = a;
      });
    }

    function trigger(kind) {
      if (!enabled) return;
      var clip = sfxPool[kind] || sfxPool.chime;
      if (clip) {
        attachAudioElement(clip);
        try {
          clip.currentTime = 0;
          var p = clip.play();
          if (p && p.catch) p.catch(function () {});
        } catch (e) {}
      }
    }

    return {
      trigger: trigger,
      setEnabled: function (v) { enabled = !!v; },
      isEnabled: function () { return enabled; },
      unlock: ensureCtx,
      attachAudioElement: attachAudioElement,
      getStream: function () {
        ensureCtx();
        return destNode ? destNode.stream : null;
      }
    };
  }

  /* ---------- Studio ElevenLabs MP3 Teacher Voice Player (+ Fallback Only If Missing) ---------- */
  function createVoiceNarrator(sfxEngine, manifestBeats) {
    var synth = window.speechSynthesis || null;
    var isFileProto = window.location.protocol === 'file:';
    var hasStudioAudio = Array.isArray(manifestBeats) && manifestBeats.length > 0 && typeof Audio !== 'undefined';
    var audioEl = hasStudioAudio ? new Audio() : null;
    var preloadEl = hasStudioAudio ? new Audio() : null;
    if (audioEl) {
      audioEl.preload = 'auto';
      // IMPORTANT: Never set crossOrigin on file:// — Chrome blocks local audio if crossOrigin is set!
      if (!isFileProto) audioEl.crossOrigin = 'anonymous';
    }
    if (preloadEl) {
      preloadEl.preload = 'auto';
    }

    var enabled = true;
    var chosenVoice = null;
    var currentBeatIdx = -1;
    var currentSpeed = 1.0;
    // Pure 1.00x native studio ElevenLabs speed — zero metallic time-stretching artifacts!
    var STUDIO_BASE_PACE = 1.0;

    function pickFallbackVoice() {
      if (!synth) return;
      var voices = synth.getVoices() || [];
      var prefs = ['Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Guy', 'Samantha', 'Daniel', 'en-US', 'en-GB'];
      for (var p = 0; p < prefs.length; p++) {
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].name.indexOf(prefs[p]) !== -1 || voices[i].lang.indexOf(prefs[p]) !== -1) {
            chosenVoice = voices[i];
            return;
          }
        }
      }
      if (voices.length) chosenVoice = voices[0];
    }

    if (synth) {
      pickFallbackVoice();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = pickFallbackVoice;
      }
    }

    function stop() {
      if (audioEl) {
        try { audioEl.pause(); } catch (e) {}
      }
      if (synth) {
        try { synth.cancel(); } catch (e) {}
      }
      currentBeatIdx = -1;
    }

    function setRate(playbackSpeed) {
      currentSpeed = playbackSpeed || 1.0;
      if (audioEl) {
        try {
          audioEl.playbackRate = Math.min(1.6, Math.max(0.7, currentSpeed * STUDIO_BASE_PACE));
          if ('preservesPitch' in audioEl) audioEl.preservesPitch = true;
          if ('mozPreservesPitch' in audioEl) audioEl.mozPreservesPitch = true;
          if ('webkitPreservesPitch' in audioEl) audioEl.webkitPreservesPitch = true;
        } catch (e) {}
      }
    }

    function speakFallback(text, playbackSpeed) {
      if (!enabled || !synth || !text) return;
      try {
        synth.cancel();
        var u = new SpeechSynthesisUtterance(text);
        if (chosenVoice) u.voice = chosenVoice;
        u.rate = Math.min(1.5, Math.max(0.75, 0.98 * (playbackSpeed || 1)));
        u.pitch = 1.0;
        u.volume = 0.95;
        synth.speak(u);
      } catch (e) {}
    }

    function playBeat(beatIdx, offsetSec, playbackSpeed, fallbackText) {
      currentSpeed = playbackSpeed || 1.0;
      if (!enabled) {
        stop();
        return;
      }

      if (hasStudioAudio && manifestBeats[beatIdx] && manifestBeats[beatIdx].src) {
        var track = manifestBeats[beatIdx];
        var nextTrack = manifestBeats[beatIdx + 1];
        currentBeatIdx = beatIdx;

        if (sfxEngine && sfxEngine.attachAudioElement) {
          sfxEngine.attachAudioElement(audioEl);
        }

        // Preload upcoming beat silently for zero-gap transitions
        if (preloadEl && nextTrack && nextTrack.src) {
          if (preloadEl.getAttribute('data-src') !== nextTrack.src) {
            preloadEl.setAttribute('data-src', nextTrack.src);
            preloadEl.src = nextTrack.src;
          }
        }

        var startAt = Math.max(0, (offsetSec || 0) * STUDIO_BASE_PACE);
        // If user scrubbed into the natural breathing gap after the sentence finished, stay quiet until next beat
        if (track.duration && startAt >= Math.max(0.2, track.duration - 0.12)) {
          try { audioEl.pause(); } catch (e) {}
          return;
        }

        var needsLoad = audioEl.getAttribute('data-src') !== track.src;
        if (needsLoad) {
          audioEl.setAttribute('data-src', track.src);
          audioEl.src = track.src;
        }
        audioEl.muted = false;
        audioEl.volume = 1.0;
        setRate(currentSpeed);

        var startPlayback = function () {
          if (currentBeatIdx !== beatIdx || !enabled) return;
          try {
            if (startAt > 0.08 && (!audioEl.duration || startAt < audioEl.duration - 0.1)) {
              audioEl.currentTime = startAt;
            } else if (needsLoad || startAt <= 0.08) {
              audioEl.currentTime = 0;
            }
          } catch (e) {}
          setRate(currentSpeed);
          var p = audioEl.play();
          if (p && p.catch) {
            p.catch(function () {
              // Only fall back to browser speech if the actual audio file genuinely errored
              if (audioEl.error) speakFallback(fallbackText, currentSpeed);
            });
          }
        };

        if (needsLoad && audioEl.readyState < 1) {
          audioEl.onloadedmetadata = startPlayback;
          audioEl.onerror = function () { speakFallback(fallbackText, currentSpeed); };
          try { audioEl.load(); } catch (e) {}
        } else {
          startPlayback();
        }
        return;
      }

      speakFallback(fallbackText, currentSpeed);
    }

    return {
      playBeat: playBeat,
      speak: function (text, speed) { speakFallback(text, speed); },
      setRate: setRate,
      stop: stop,
      setEnabled: function (v) {
        enabled = !!v;
        if (audioEl) audioEl.muted = !enabled;
        if (!enabled) stop();
      },
      isEnabled: function () { return enabled; },
      isStudio: function () { return hasStudioAudio; },
      isSupported: function () { return hasStudioAudio || !!synth; }
    };
  }

  /* ---------- Sync Beat & Chapter Windows to Exact 1.0x ElevenLabs Durations + Natural Teacher Pauses ---------- */
  function syncTimelineWithManifest() {
    // Preserve original 0..260s choreography windows on every beat
    BEATS.forEach(function (b) {
      if (b.origS === undefined) {
        b.origS = b.s;
        b.origE = b.e;
      }
      b.voiceDelay = 0;
    });

    var manifest = global.RACER_NARRATION_MANIFEST;
    if (!manifest || !Array.isArray(manifest.beats) || manifest.beats.length !== BEATS.length) {
      return null;
    }

    var cursor = 0;
    for (var i = 0; i < BEATS.length; i++) {
      var rawDur = Number(manifest.beats[i].duration) || (BEATS[i].origE - BEATS[i].origS);
      var isChapterStart = (i === 0) || (BEATS[i].ch !== BEATS[i - 1].ch);
      var isChapterEnd   = (i === BEATS.length - 1) || (BEATS[i].ch !== BEATS[i + 1].ch);

      // Lead-in breath so chapter chimes / mechanical clicks land cleanly BEFORE the teacher speaks
      var leadIn = isChapterStart ? 0.55 : 0.18;
      // Natural human breathing gap after each sentence, slightly longer at the end of a chapter
      var tailPause = isChapterEnd ? 1.05 : 0.68;

      var slot = Number((leadIn + rawDur + tailPause).toFixed(2));
      BEATS[i].s = Number(cursor.toFixed(2));
      cursor += slot;
      BEATS[i].e = Number(cursor.toFixed(2));
      BEATS[i].voiceDelay = leadIn;
      BEATS[i].audioSrc = manifest.beats[i].src;
      BEATS[i].audioDur = rawDur;
    }
    TOTAL_DURATION = Number(cursor.toFixed(2));

    // Recompute exact chapter start/end timestamps from synced beats
    CHAPTERS.forEach(function (ch) {
      var first = null, last = null;
      for (var k = 0; k < BEATS.length; k++) {
        if (BEATS[k].ch === ch.id) {
          if (!first) first = BEATS[k];
          last = BEATS[k];
        }
      }
      if (first && last) {
        ch.start = first.s;
        ch.end = last.e;
      }
    });

    return manifest.beats;
  }

  function realToVirtualTime(realT) {
    if (!BEATS.length) return realT;
    var b = BEATS[BEATS.length - 1];
    for (var i = 0; i < BEATS.length; i++) {
      if (realT < BEATS[i].e) { b = BEATS[i]; break; }
    }
    var span = Math.max(0.01, b.e - b.s);
    var frac = clamp01((realT - b.s) / span);
    return lerp(b.origS, b.origE, frac);
  }

  /* ---------- Autonomous Track Kinematics (Chapter 8 Live Demo) ---------- */
  function evaluateRaceDemo(localT) {
    // localT: 0 .. 30 seconds
    // Computes smooth robot (x, z, yaw), wheel PWM speeds (leftPwm, rightPwm),
    // realistic sensor distances (L, C, R in cm), and active decision state!
    var x = 0, z = 0, yaw = 0;
    var leftPwm = 255, rightPwm = 255;
    var dL = 88, dC = 118, dR = 84;
    var stateText = 'CRUISE FORWARD  (255, 255)';
    var stateCls = '';

    if (localT < 6.0) {
      // 0..6s: Straight launch toward Left Barrier #1 (at X=+13.5, Z=28)
      var p = localT / 6.0;
      x = lerp(0, 1.5, smoothstep(p));
      z = lerp(0, 22.0, p);
      yaw = lerp(0, 0.05, p);
      dL = lerp(95, 18.2, p);
      dC = lerp(120, 62, p);
      dR = 86;
      leftPwm = 255; rightPwm = 255;
      stateText = 'CLEAR PATH → FORWARD (255, 255)';
    } else if (localT < 12.0) {
      // 6..12s: Left Obstacle (< 17 cm) -> Pivot RIGHT (200, 0), then straighten past Z=28
      var p2 = (localT - 6.0) / 6.0;
      if (p2 < 0.45) {
        var sub = p2 / 0.45;
        x = lerp(1.5, -2.5, smoothstep(sub));
        z = lerp(22.0, 31.0, sub);
        yaw = lerp(0.05, -0.44, smoothstep(sub));
        dL = lerp(13.8, 12.2, Math.sin(sub * Math.PI));
        dC = 54;
        dR = 62;
        leftPwm = 200; rightPwm = 0;
        stateText = 'LEFT < 17 cm → TURN RIGHT (200, 0)';
        stateCls = 'warn';
      } else {
        var sub2 = (p2 - 0.45) / 0.55;
        x = lerp(-2.5, -4.2, smoothstep(sub2));
        z = lerp(31.0, 48.0, sub2);
        yaw = lerp(-0.44, -0.05, smoothstep(sub2));
        dL = lerp(28, 76, sub2);
        dC = lerp(52, 37, sub2);
        dR = lerp(52, 18.5, sub2);
        leftPwm = 255; rightPwm = 255;
        stateText = 'CLEARED → FORWARD (255, 255)';
      }
    } else if (localT < 18.0) {
      // 12..18s: Right Obstacle (< 17 cm at X=-14.5, Z=56) -> Pivot LEFT (0, 255)
      var p3 = (localT - 12.0) / 6.0;
      if (p3 < 0.48) {
        var s1 = p3 / 0.48;
        x = lerp(-4.2, -1.0, smoothstep(s1));
        z = lerp(48.0, 58.5, s1);
        yaw = lerp(-0.05, 0.36, smoothstep(s1));
        dL = 68;
        dC = 32;
        dR = lerp(14.6, 11.9, Math.sin(s1 * Math.PI));
        leftPwm = 0; rightPwm = 255;
        stateText = 'RIGHT < 17 cm → TURN LEFT (0, 255)';
        stateCls = 'warn';
      } else {
        var s2 = (p3 - 0.48) / 0.52;
        x = lerp(-1.0, -2.0, smoothstep(s2));
        z = lerp(58.5, 72.5, s2);
        yaw = lerp(0.36, 0.0, smoothstep(s2));
        dL = 74;
        dC = lerp(29, 14.5, s2);
        dR = lerp(28, 19.5, s2);
        leftPwm = 255; rightPwm = 255;
        stateText = 'APPROACHING FRONT WALL...';
      }
    } else if (localT < 25.0) {
      // 18..25s: Front Wall (< 15 cm at Z=86) + Right Corner Wall -> Left (72) > Right (19) -> Sharp Turn LEFT (0, 255)!
      var p4 = (localT - 18.0) / 7.0;
      if (p4 < 0.58) {
        var k1 = p4 / 0.58;
        x = lerp(-2.0, 4.5, smoothstep(k1));
        z = lerp(72.5, 74.0, smoothstep(k1));
        yaw = lerp(0.0, Math.PI / 2, smoothstep(k1));
        dL = lerp(72, 95, k1);
        dC = lerp(11.6, 26, k1);
        dR = lerp(18.5, 42, k1);
        leftPwm = 0; rightPwm = 255;
        stateText = 'FRONT < 15 cm | L>R → TURN LEFT (0,255)';
        stateCls = 'danger';
      } else {
        var k2 = (p4 - 0.58) / 0.42;
        x = lerp(4.5, 19.5, k2);
        z = 74.0;
        yaw = Math.PI / 2;
        dL = 92; dC = 98; dR = 64;
        leftPwm = 255; rightPwm = 255;
        stateText = 'OPEN LANE FOUND → RACE (255, 255)';
      }
    } else {
      // 25..30s: Sprint through Finish Arch (X=36, Z=74)!
      var p5 = (localT - 25.0) / 5.0;
      x = lerp(19.5, 44.0, easeOutCubic(p5));
      z = 74.0;
      yaw = Math.PI / 2;
      dL = 110; dC = 140; dR = 95;
      leftPwm = p5 > 0.9 ? 0 : 255;
      rightPwm = p5 > 0.9 ? 0 : 255;
      stateText = p5 > 0.65 ? '🏁 FINISH LINE CROSSED! (100% AUTO)' : 'FINAL SPRINT → FORWARD (255, 255)';
    }

    return {
      x: x, z: z, yaw: yaw,
      leftPwm: leftPwm, rightPwm: rightPwm,
      dL: dL, dC: dC, dR: dR,
      stateText: stateText, stateCls: stateCls
    };
  }

  /* ---------- Main Player Initializer ---------- */
  function initRacerVideoGuide(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount || typeof THREE === 'undefined' || !global.Racer3DModels) {
      return null;
    }

    // Align beat/chapter timing to exact ElevenLabs studio MP3 durations if present
    var manifestBeats = syncTimelineWithManifest();
    var durShort = fmtTime(TOTAL_DURATION);
    var voiceLabel = manifestBeats ? 'Studio Human Teacher Voice' : 'Voiceover + Captions';

    // Update page-level duration pill & Hero CTA button if present
    var durPill = document.querySelector('.rvg-duration-pill');
    if (durPill) {
      durPill.innerHTML = '<span class="rvg-duration-dot"></span> ' + durShort + ' &bull; 8 Chapters &bull; ' + (manifestBeats ? 'Studio Teacher Voice' : 'Interactive 3D');
    }
    var heroCta = document.querySelector('.hero-video-cta');
    if (heroCta) {
      heroCta.innerHTML = '<span>&#9654;</span> Watch Interactive 3D Video Guide (' + durShort + ')';
    }

    // Build Player DOM
    mount.innerHTML = [
      '<div class="rvg-shell" id="rvgShell">',
      '  <div class="rvg-stage" id="rvgStage">',
      '    <div class="rvg-canvas-host" id="rvgCanvasHost"></div>',
      '    <div class="rvg-callouts-layer" id="rvgCallouts"></div>',
      '    <div class="rvg-top-hud">',
      '      <div class="rvg-chapter-tag">',
      '        <div class="rvg-chapter-eyebrow" id="rvgChapEyebrow">CH 1 / 8 &bull; 00:00 – ' + fmtTime(CHAPTERS[0].end) + '</div>',
      '        <div class="rvg-chapter-title" id="rvgChapTitle">Meet the 4WD Fork Robot</div>',
      '      </div>',
      '      <div class="rvg-top-badges">',
      '        <span class="rvg-rec-indicator" id="rvgRecInd">&#9679; REC WebM</span>',
      '        <button type="button" class="rvg-cam-pill" id="rvgCamBtn" title="Drag on 3D view anytime to orbit; click to reset camera">&#127909; Auto-Cam</button>',
      '      </div>',
      '    </div>',
      '    <div class="rvg-side-panel" id="rvgSidePanel"></div>',
      '    <div class="rvg-caption-wrap" id="rvgCaptionWrap">',
      '      <div class="rvg-caption-box" id="rvgCaptionBox">Press <strong>Play</strong> to launch the ' + durShort + ' interactive 3D Autonomous Racer Bot guide!</div>',
      '    </div>',
      '    <div class="rvg-poster-overlay" id="rvgPoster">',
      '      <span class="rvg-poster-badge">&#127916; Interactive 3D Guided Video &bull; ' + durShort + '</span>',
      '      <div class="rvg-poster-title">Build &amp; Master the Autonomous Racer Bot</div>',
      '      <div class="rvg-poster-sub">Watch all 14 parts, real 3D CAD assembly, color-coded pin wiring, Arduino code walkthrough &amp; live obstacle avoidance — pause and orbit the 3D robot anytime!</div>',
      '      <button type="button" class="rvg-big-play-btn" id="rvgBigPlay">&#9654; Play 3D Video Guide (' + durShort + ')</button>',
      '      <div class="rvg-poster-chips">',
      '        <span class="rvg-poster-chip">14 Components</span>',
      '        <span class="rvg-poster-chip">Real 3D CAD Assembly</span>',
      '        <span class="rvg-poster-chip">D2–D12 Pin-by-Pin Wiring</span>',
      '        <span class="rvg-poster-chip">Live Code Sync</span>',
      '        <span class="rvg-poster-chip">' + voiceLabel + '</span>',
      '      </div>',
      '    </div>',
      '    <div class="rvg-poster-overlay hidden" id="rvgEndOverlay">',
      '      <span class="rvg-poster-badge">&#127937; Tutorial Complete &bull; ' + durShort + '</span>',
      '      <div class="rvg-poster-title">You&apos;re Ready to Build &amp; Race!</div>',
      '      <div class="rvg-poster-sub">Orbit the 3D robot freely, replay any chapter, or jump straight to the CAD files, circuit diagram, and Arduino sketch below.</div>',
      '      <div class="rvg-end-actions">',
      '        <button type="button" class="rvg-big-play-btn" id="rvgReplayBtn">&#8635; Replay Full Guide</button>',
      '        <button type="button" class="rvg-secondary-btn" id="rvgExplore3dBtn">&#128269; Inspect 3D Robot</button>',
      '        <a class="rvg-secondary-btn" href="#assembly">&#128295; Jump to Assembly Steps</a>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="rvg-controls">',
      '    <div class="rvg-timeline-wrap" id="rvgTimeline">',
      '      <div class="rvg-timeline-tooltip" id="rvgTooltip">00:00</div>',
      '      <div class="rvg-timeline-track" id="rvgTrack">',
      '        <div class="rvg-timeline-fill" id="rvgFill"></div>',
      '        <div class="rvg-timeline-thumb" id="rvgThumb"></div>',
      '      </div>',
      '    </div>',
      '    <div class="rvg-ctrl-row">',
      '      <div class="rvg-ctrl-group">',
      '        <button type="button" class="rvg-btn primary" id="rvgPlayBtn" title="Play / Pause (Space)">&#9654; <span class="rvg-btn-txt">Play</span></button>',
      '        <button type="button" class="rvg-btn" id="rvgPrevBtn" title="Previous Chapter (Left Arrow)">&#9198;</button>',
      '        <button type="button" class="rvg-btn" id="rvgNextBtn" title="Next Chapter (Right Arrow)">&#9197;</button>',
      '        <span class="rvg-time-display" id="rvgTime">00:00 / ' + durShort + '</span>',
      '      </div>',
      '      <div class="rvg-ctrl-group">',
      '        <button type="button" class="rvg-btn active" id="rvgVoiceBtn" title="Toggle Spoken Teacher Narration">&#128266; <span class="rvg-btn-txt">' + (manifestBeats ? 'Teacher Voice' : 'Voice') + '</span></button>',
      '        <button type="button" class="rvg-btn active" id="rvgSfxBtn" title="Toggle Sound Effects">&#127925; <span class="rvg-btn-txt">SFX</span></button>',
      '        <button type="button" class="rvg-btn active" id="rvgCcBtn" title="Toggle Subtitles">CC</button>',
      '        <button type="button" class="rvg-btn" id="rvgSpeedBtn" title="Change Playback Speed">1&times;</button>',
      '        <button type="button" class="rvg-btn" id="rvgRecBtn" title="Record & Download WebM Video">&#9210; <span class="rvg-btn-txt">Save Video</span></button>',
      '        <button type="button" class="rvg-btn" id="rvgFsBtn" title="Toggle Fullscreen (F)">&#x26F6;</button>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      '<div class="rvg-chapter-strip" id="rvgChapterStrip"></div>',
      '<div class="rvg-shortcuts-note">',
      '  <span>&#128161; <strong>Interactive 3D:</strong> Drag anywhere on the video to orbit around screws &amp; wires, scroll to zoom.</span>',
      '  <span><span class="rvg-kbd">Space</span> Play/Pause &nbsp;<span class="rvg-kbd">&larr;</span><span class="rvg-kbd">&rarr;</span> Chapters &nbsp;<span class="rvg-kbd">F</span> Fullscreen</span>',
      '</div>'
    ].join('\n');

    /* ---------- DOM References ---------- */
    var shell       = document.getElementById('rvgShell');
    var stage       = document.getElementById('rvgStage');
    var canvasHost  = document.getElementById('rvgCanvasHost');
    var calloutsEl  = document.getElementById('rvgCallouts');
    var eyebrowEl   = document.getElementById('rvgChapEyebrow');
    var titleEl     = document.getElementById('rvgChapTitle');
    var camBtn      = document.getElementById('rvgCamBtn');
    var recInd      = document.getElementById('rvgRecInd');
    var sidePanel   = document.getElementById('rvgSidePanel');
    var captionWrap = document.getElementById('rvgCaptionWrap');
    var captionBox  = document.getElementById('rvgCaptionBox');
    var posterEl    = document.getElementById('rvgPoster');
    var endOverlay  = document.getElementById('rvgEndOverlay');
    var timelineEl  = document.getElementById('rvgTimeline');
    var trackEl     = document.getElementById('rvgTrack');
    var fillEl      = document.getElementById('rvgFill');
    var thumbEl     = document.getElementById('rvgThumb');
    var tooltipEl   = document.getElementById('rvgTooltip');
    var timeEl      = document.getElementById('rvgTime');
    var playBtn     = document.getElementById('rvgPlayBtn');
    var prevBtn     = document.getElementById('rvgPrevBtn');
    var nextBtn     = document.getElementById('rvgNextBtn');
    var voiceBtn    = document.getElementById('rvgVoiceBtn');
    var sfxBtn      = document.getElementById('rvgSfxBtn');
    var ccBtn       = document.getElementById('rvgCcBtn');
    var speedBtn    = document.getElementById('rvgSpeedBtn');
    var recBtn      = document.getElementById('rvgRecBtn');
    var fsBtn       = document.getElementById('rvgFsBtn');
    var chapStrip   = document.getElementById('rvgChapterStrip');

    // Add chapter tick markers on scrubber + quick chapter strip buttons
    CHAPTERS.forEach(function (ch, idx) {
      if (idx > 0) {
        var tick = document.createElement('div');
        tick.className = 'rvg-chapter-tick';
        tick.style.left = ((ch.start / TOTAL_DURATION) * 100) + '%';
        trackEl.appendChild(tick);
      }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rvg-chap-btn' + (idx === 0 ? ' active' : '');
      btn.setAttribute('data-ch', idx);
      btn.innerHTML =
        '<span class="rvg-chap-num">' + (idx + 1) + '</span>' +
        '<span class="rvg-chap-meta">' +
          '<span class="rvg-chap-name">' + ch.short + '</span>' +
          '<span class="rvg-chap-time">' + fmtTime(ch.start) + ' – ' + fmtTime(ch.end) + '</span>' +
        '</span>';
      btn.addEventListener('click', function () {
        jumpToTime(ch.start, true);
      });
      chapStrip.appendChild(btn);
    });

    /* ---------- Three.js Scene, Renderer & Studio Lighting ---------- */
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070d1a);
    scene.fog = new THREE.FogExp2(0x070d1a, 0.0052);

    var camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.4, 380);
    camera.position.set(17, 13, 21);

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true // Enables clean WebM composite recording
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    canvasHost.appendChild(renderer.domElement);

    // Original Three-point Robotics Lab Studio Lighting (clean crisp contrast)
    var hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.95);
    scene.add(hemiLight);

    var keyLight = new THREE.DirectionalLight(0xfff7ed, 1.35);
    keyLight.position.set(22, 34, 24);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 140;
    keyLight.shadow.camera.left = -28;
    keyLight.shadow.camera.right = 28;
    keyLight.shadow.camera.top = 28;
    keyLight.shadow.camera.bottom = -28;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    var rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(-22, 18, -20);
    scene.add(rimLight);

    var fillLight = new THREE.PointLight(0x60a5fa, 0.55, 80);
    fillLight.position.set(0, 14, 16);
    scene.add(fillLight);

    // Build Arena & 3D Robot
    var arena = global.Racer3DModels.createLabArena(scene);
    var robot = global.Racer3DModels.createRobotAssembly(scene);

    /* ---------- Audio & Voice ---------- */
    var sfx = createSoundEngine();
    var narrator = createVoiceNarrator(sfx, manifestBeats);
    if (!narrator.isSupported()) {
      voiceBtn.classList.remove('active');
      voiceBtn.title = 'Voice playback unavailable in this browser';
    }

    /* ---------- Playback & Camera State ---------- */
    var state = {
      t: 0,
      playing: false,
      started: false,
      speedIdx: 1,
      speeds: [0.85, 1.0, 1.15, 1.25],
      captionsOn: true,
      lastBeatIdx: -1,
      lastVoiceBeatIdx: -1,
      lastChapterIdx: -1,
      lastPanelKey: '',
      wheelAngleL: 0,
      wheelAngleR: 0,
      freeCam: false,
      orbitYaw: 0.72,
      orbitPitch: 0.48,
      orbitDist: 28,
      orbitTarget: new THREE.Vector3(0, 2.2, 0.5),
      camPosCur: new THREE.Vector3(17, 13, 21),
      camLookCur: new THREE.Vector3(0, 2.2, 0.5),
      camPosGoal: new THREE.Vector3(17, 13, 21),
      camLookGoal: new THREE.Vector3(0, 2.2, 0.5),
      activeCallouts: [],
      lastTelemetry: null
    };

    /* ---------- Free-Cam Drag Orbit & Wheel Zoom ---------- */
    var dragging = false, dragX = 0, dragY = 0;
    stage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || e.target.closest('.rvg-card') || e.target.closest('.rvg-poster-overlay')) return;
      dragging = true;
      dragX = e.clientX;
      dragY = e.clientY;
      if (!state.freeCam) {
        // Initialize spherical orbit from current camera position
        var rel = state.camPosCur.clone().sub(state.camLookCur);
        state.orbitDist = Math.max(10, Math.min(60, rel.length()));
        state.orbitYaw = Math.atan2(rel.x, rel.z);
        state.orbitPitch = Math.asin(Math.max(-0.92, Math.min(0.92, rel.y / state.orbitDist)));
        state.orbitTarget.copy(state.camLookCur);
        setFreeCam(true);
      }
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - dragX;
      var dy = e.clientY - dragY;
      dragX = e.clientX;
      dragY = e.clientY;
      state.orbitYaw -= dx * 0.008;
      state.orbitPitch = Math.max(0.08, Math.min(1.42, state.orbitPitch + dy * 0.007));
    });
    window.addEventListener('pointerup', function () { dragging = false; });

    stage.addEventListener('wheel', function (e) {
      if (!state.freeCam && !state.started) return;
      if (e.target.closest('.rvg-card')) return;
      e.preventDefault();
      if (!state.freeCam) {
        var rel = state.camPosCur.clone().sub(state.camLookCur);
        state.orbitDist = rel.length();
        state.orbitYaw = Math.atan2(rel.x, rel.z);
        state.orbitPitch = Math.asin(Math.max(-0.92, Math.min(0.92, rel.y / state.orbitDist)));
        state.orbitTarget.copy(state.camLookCur);
        setFreeCam(true);
      }
      state.orbitDist = Math.max(10, Math.min(58, state.orbitDist + e.deltaY * 0.02));
    }, { passive: false });

    function setFreeCam(on) {
      state.freeCam = !!on;
      camBtn.classList.toggle('active', state.freeCam);
      camBtn.innerHTML = state.freeCam ? '&#128269; Free-Cam (Reset)' : '&#127909; Auto-Cam';
    }

    camBtn.addEventListener('click', function () {
      setFreeCam(!state.freeCam);
    });

    /* ---------- Side Panel Dynamic Renderer ---------- */
    function renderSidePanel(panel, t, tele) {
      if (!panel) {
        sidePanel.classList.add('hidden');
        return;
      }
      sidePanel.classList.remove('hidden');

      // Telemetry updates every frame; other panels only re-render on key change
      if (panel.type === 'telemetry' && tele) {
        var pctL = Math.min(100, (tele.dL / 100) * 100);
        var pctC = Math.min(100, (tele.dC / 100) * 100);
        var pctR = Math.min(100, (tele.dR / 100) * 100);
        var colL = tele.dL < 17 ? '#f59e0b' : '#38bdf8';
        var colC = tele.dC < 15 ? '#ef4444' : '#10b981';
        var colR = tele.dR < 17 ? '#f59e0b' : '#38bdf8';

        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128225; LIVE AUTONOMOUS TELEMETRY</span><span>50 ms LOOP</span></div>' +
            '<div class="rvg-card-heading">3-Way Ultrasonic Radar</div>' +
            '<div class="rvg-tele-bars">' +
              '<div class="rvg-tele-row">' +
                '<div class="rvg-tele-head"><span>LEFT (D2/D3)</span><span style="color:' + colL + '">' + tele.dL.toFixed(1) + ' cm</span></div>' +
                '<div class="rvg-tele-track"><div class="rvg-tele-fill" style="width:' + pctL + '%;background:' + colL + '"></div><div class="rvg-tele-thresh" style="left:17%"></div></div>' +
              '</div>' +
              '<div class="rvg-tele-row">' +
                '<div class="rvg-tele-head"><span>CENTER (D4/D5)</span><span style="color:' + colC + '">' + tele.dC.toFixed(1) + ' cm</span></div>' +
                '<div class="rvg-tele-track"><div class="rvg-tele-fill" style="width:' + pctC + '%;background:' + colC + '"></div><div class="rvg-tele-thresh" style="left:15%"></div></div>' +
              '</div>' +
              '<div class="rvg-tele-row">' +
                '<div class="rvg-tele-head"><span>RIGHT (D6/D7)</span><span style="color:' + colR + '">' + tele.dR.toFixed(1) + ' cm</span></div>' +
                '<div class="rvg-tele-track"><div class="rvg-tele-fill" style="width:' + pctR + '%;background:' + colR + '"></div><div class="rvg-tele-thresh" style="left:17%"></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="rvg-motor-gauges">' +
              '<div class="rvg-motor-box"><span>Left Motors (OUT1/2)</span><strong>PWM ' + tele.leftPwm + '</strong></div>' +
              '<div class="rvg-motor-box"><span>Right Motors (OUT3/4)</span><strong>PWM ' + tele.rightPwm + '</strong></div>' +
            '</div>' +
            '<div class="rvg-decision-pill ' + tele.stateCls + '">' + tele.stateText + '</div>' +
          '</div>';
        return;
      }

      var key = JSON.stringify(panel);
      if (key === state.lastPanelKey) return;
      state.lastPanelKey = key;

      if (panel.type === 'intro') {
        var stepsHtml = [
          { t: '1. SENSE', d: '3× HC-SR04 Ultrasonic Radar (L/C/R)', on: panel.stage >= 1 },
          { t: '2. THINK', d: 'Arduino UNO 50 ms Avoidance Logic', on: panel.stage >= 1 },
          { t: '3. ACT',   d: 'L298N + 4× N20 300 RPM 4WD Drive', on: panel.stage >= 2 }
        ].map(function (it, i) {
          var cls = it.on ? 'active' : '';
          return '<li class="rvg-asm-item ' + cls + '"><span class="rvg-asm-badge">' + (i + 1) + '</span><span><strong>' + it.t + '</strong> — ' + it.d + '</span></li>';
        }).join('');
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#129302; FORK ROBOT 4WD</span><span>SENSE → THINK → ACT</span></div>' +
            '<div class="rvg-card-heading">Autonomous Obstacle Racer</div>' +
            '<p class="rvg-card-text">Zero remote controls. Zero external Arduino libraries. Pure real-time ultrasonic navigation!</p>' +
            '<ul class="rvg-asm-list">' + stepsHtml + '</ul>' +
          '</div>';
      } else if (panel.type === 'component') {
        var chips = panel.chips.map(function (c) {
          return '<div class="rvg-mini-chip"><strong>' + c[1] + '</strong><span>' + c[0] + '</span></div>';
        }).join('');
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128230; COMPONENT SPOTLIGHT</span><span>' + panel.count + '</span></div>' +
            '<div class="rvg-comp-thumb-wrap"><img src="' + panel.img + '" alt="' + panel.name + '"></div>' +
            '<div class="rvg-card-heading">' + panel.name + ' <span style="font-size:11px;color:#38bdf8;font-weight:700">(' + panel.qty + ')</span></div>' +
            '<p class="rvg-card-text">' + panel.desc + '</p>' +
            '<div class="rvg-comp-grid-mini">' + chips + '</div>' +
          '</div>';
      } else if (panel.type === 'assembly') {
        var asmSteps = [
          'Mount 4× N20 Motors + Clamps + M2 Bolts/Nuts',
          'Wrap Orange Bat Grip on 4× Wheels & Press Fit',
          'Tape + 7.4V LiPo + L298N + Arduino (M3 CSK)',
          'Snap 3× HC-SR04 Sensors into Angled Bumper'
        ];
        var html = asmSteps.map(function (txt, idx) {
          var cls = idx < panel.step ? 'done' : (idx === panel.step ? 'active' : '');
          var badge = idx < panel.step ? '&#10003;' : (idx + 1);
          return '<li class="rvg-asm-item ' + cls + '"><span class="rvg-asm-badge">' + badge + '</span><span>' + txt + '</span></li>';
        }).join('');
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128295; 3D MECHANICAL BUILD</span><span>STEP ' + (panel.step + 1) + ' / 4</span></div>' +
            '<div class="rvg-card-heading">Chassis Assembly Sequence</div>' +
            '<ul class="rvg-asm-list">' + html + '</ul>' +
          '</div>';
      } else if (panel.type === 'wiring_us') {
        var rows = [
          { lbl: 'All 3 Sensors Power', pin: 'VCC→5V | GND→GND', col: '#ef4444' },
          { lbl: 'Left Ultrasonic',     pin: 'TRIG D2 | ECHO D3', col: '#3b82f6' },
          { lbl: 'Center Ultrasonic',   pin: 'TRIG D4 | ECHO D5', col: '#22c55e' },
          { lbl: 'Right Ultrasonic',    pin: 'TRIG D6 | ECHO D7', col: '#f97316' }
        ];
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128268; ULTRASONIC PINOUT</span><span>D2 – D7</span></div>' +
            '<div class="rvg-card-heading">3× HC-SR04 Connections</div>' +
            '<div class="rvg-wire-list">' +
              rows.map(function (r, idx) {
                var cls = idx < panel.activeIdx ? 'done' : (idx === panel.activeIdx ? 'active' : '');
                return '<div class="rvg-wire-row ' + cls + '"><span class="rvg-wire-left"><span class="rvg-wire-swatch" style="background:' + r.col + ';color:' + r.col + '"></span>' + r.lbl + '</span><span class="rvg-wire-pin">' + r.pin + '</span></div>';
              }).join('') +
            '</div>' +
            '<div class="rvg-safety-alert" style="background:rgba(14,165,233,0.16);border-color:rgba(56,189,248,0.45);color:#bae6fd">&#128208; Formula: <strong>Distance (cm) = (Echo µs &times; 0.0343) / 2</strong></div>' +
          '</div>';
      } else if (panel.type === 'wiring_motor') {
        var mRows = [
          { lbl: 'IN1 (Left Speed)',  pin: 'D9 (PWM)', col: '#facc15', grp: 0 },
          { lbl: 'IN2 (Left Dir)',    pin: 'D8',       col: '#38bdf8', grp: 0 },
          { lbl: 'IN3 (Right Speed)', pin: 'D11 (PWM)',col: '#ec4899', grp: 0 },
          { lbl: 'IN4 (Right Dir)',   pin: 'D12',      col: '#c084fc', grp: 0 },
          { lbl: 'ENA & ENB Caps',    pin: '5V FITTED',col: '#f59e0b', grp: 1 },
          { lbl: '2× Left Motors',    pin: 'OUT1 / OUT2', col: '#f43f5e', grp: 2 },
          { lbl: '2× Right Motors',   pin: 'OUT3 / OUT4', col: '#10b981', grp: 2 }
        ];
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#9881;&#65039; L298N MOTOR DRIVER</span><span>4WD PARALLEL</span></div>' +
            '<div class="rvg-card-heading">Driver &amp; Motor Pinout</div>' +
            '<div class="rvg-wire-list">' +
              mRows.map(function (r) {
                var cls = r.grp < panel.activeIdx ? 'done' : (r.grp === panel.activeIdx ? 'active' : '');
                return '<div class="rvg-wire-row ' + cls + '"><span class="rvg-wire-left"><span class="rvg-wire-swatch" style="background:' + r.col + ';color:' + r.col + '"></span>' + r.lbl + '</span><span class="rvg-wire-pin">' + r.pin + '</span></div>';
              }).join('') +
            '</div>' +
          '</div>';
      } else if (panel.type === 'wiring_power') {
        var pRows = [
          { lbl: 'LiPo Red (+7.4V)',  pin: 'L298N 12V (+)', col: '#ef4444', grp: 0 },
          { lbl: 'LiPo Black (0V)',   pin: 'L298N GND (-)', col: '#64748b', grp: 0 },
          { lbl: 'COMMON GROUND',     pin: 'L298N ↔ UNO GND', col: '#10b981', grp: 1 },
          { lbl: 'Regulated 5V Out',  pin: 'L298N 5V → UNO', col: '#f97316', grp: 2 }
        ];
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128267; 7.4V 2S LiPo POWER</span><span>SAFETY FIRST</span></div>' +
            '<div class="rvg-card-heading">Power &amp; Ground Bus</div>' +
            '<div class="rvg-wire-list">' +
              pRows.map(function (r) {
                var cls = r.grp < panel.activeIdx ? 'done' : (r.grp === panel.activeIdx ? 'active' : '');
                return '<div class="rvg-wire-row ' + cls + '"><span class="rvg-wire-left"><span class="rvg-wire-swatch" style="background:' + r.col + ';color:' + r.col + '"></span>' + r.lbl + '</span><span class="rvg-wire-pin">' + r.pin + '</span></div>';
              }).join('') +
            '</div>' +
            '<div class="rvg-safety-alert">&#9888;&#65039; <strong>WARNING:</strong> Never reverse +/- polarity or feed 7.4V directly into Arduino 5V/IO pins!</div>' +
          '</div>';
      } else if (panel.type === 'code') {
        var sec = CODE_SECTIONS[panel.section] || CODE_SECTIONS[0];
        var linesHtml = sec.lines.map(function (ln) {
          return '<div class="rvg-code-line' + (ln[2] ? ' hl' : '') + '"><span class="rvg-code-ln">' + ln[0] + '</span><span>' + ln[1].replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</span></div>';
        }).join('');
        sidePanel.innerHTML =
          '<div class="rvg-card">' +
            '<div class="rvg-card-kicker"><span>&#128187; autoracerl298n.ino</span><span>NO LIBRARIES</span></div>' +
            '<div class="rvg-card-heading">' + sec.title + '</div>' +
            '<div class="rvg-code-panel">' + linesHtml + '</div>' +
          '</div>';
      }
    }

    /* ---------- Project 3D Callout Labels to Screen ---------- */
    var projVec = new THREE.Vector3();
    function updateCallouts(items) {
      if (!items || !items.length) {
        if (calloutsEl.childElementCount > 0) calloutsEl.innerHTML = '';
        return;
      }
      var rect = stage.getBoundingClientRect();
      var html = '';
      items.forEach(function (it) {
        projVec.copy(it.pos);
        // Apply robot root world transform so labels stay locked to moving parts
        robot.root.localToWorld(projVec);
        projVec.project(camera);
        if (projVec.z > 1 || projVec.z < -1) return;
        var sx = (projVec.x * 0.5 + 0.5) * rect.width;
        var sy = (-projVec.y * 0.5 + 0.5) * rect.height;
        if (sx < 24 || sx > rect.width - 24 || sy < 30 || sy > rect.height - 30) return;
        html +=
          '<div class="rvg-callout" style="left:' + sx.toFixed(1) + 'px;top:' + sy.toFixed(1) + 'px;border-color:' + it.color + ';color:#f8fafc">' +
            '<span class="rvg-callout-dot" style="background:' + it.color + '"></span>' +
            '<span>' + it.text + '</span>' +
          '</div>';
      });
      calloutsEl.innerHTML = html;
    }

    /* ---------- Reset Robot Parts to Assembled Pose Helper ---------- */
    function resetAssembledPose() {
      robot.root.position.set(0, 0, 0);
      robot.root.rotation.set(0, 0, 0);
      robot.chassis.visible = true;
      robot.chassis.position.set(0, 0, 0);
      robot.motors.forEach(function (m) { m.visible = true; m.position.copy(m.userData.target); });
      robot.clamps.forEach(function (c) { c.visible = true; c.position.copy(c.userData.target); });
      robot.m2Fasteners.forEach(function (f) {
        f.bolt.visible = true; f.bolt.position.copy(f.boltTarget); f.bolt.rotation.y = 0;
        f.nut.visible = true; f.nut.position.copy(f.nutTarget);
      });
      robot.wheels.forEach(function (w) {
        w.visible = true;
        w.position.copy(w.userData.target);
        w.userData.gripGroup.visible = true;
        w.userData.gripGroup.position.set(0, 0, 0);
        w.userData.gripGroup.scale.set(1, 1, 1);
      });
      robot.tape.visible = true; robot.tape.position.copy(robot.tape.userData.target);
      robot.battery.visible = true; robot.battery.position.copy(robot.battery.userData.target);
      robot.l298n.group.visible = true; robot.l298n.group.position.copy(robot.l298n.group.userData.target);
      robot.l298n.jumperMat.emissiveIntensity = 0.15;
      robot.arduino.group.visible = true; robot.arduino.group.position.copy(robot.arduino.group.userData.target);
      robot.m3Screws.forEach(function (s) { s.visible = true; s.position.copy(s.userData.target); s.rotation.y = 0; });
      ['left', 'center', 'right'].forEach(function (k) {
        var s = robot.sensors[k];
        s.group.visible = true;
        s.group.position.copy(s.group.userData.target);
        robot.setSonarVisual(k, false, 18, 0);
      });
      arena.trackGroup.visible = false;
      arena.introObs.visible = false;
      arena.ring.visible = true;
    }

    /* ---------- Master Scene Timeline Evaluator (t in [0, 260]) ---------- */
    function updateSceneForTime(t, dt) {
      resetAssembledPose();
      var callouts = [];
      var pulsePhase = (t * 0.72) % 1;
      var wheelSpinL = 0, wheelSpinR = 0;
      var powerOn = true;

      // ================================================================
      // CHAPTER 1 (0 - 25s): HERO REVEAL & INTRO SONAR AVOIDANCE
      // ================================================================
      if (t < 25) {
        robot.setWireProgress('all', 1, pulsePhase, true);
        if (t < 9) {
          // Cinematic 360 hero orbit
          var ang = 0.55 + (t / 9) * 1.45;
          state.camPosGoal.set(Math.sin(ang) * 23, 10.5 + Math.sin(t * 0.6) * 1.4, Math.cos(ang) * 23);
          state.camLookGoal.set(0, 2.4, 0.8);
          wheelSpinL = 5.5; wheelSpinR = 5.5;
          robot.setSonarVisual('left', true, 16, t, 0x38bdf8);
          robot.setSonarVisual('center', true, 18, t, 0x38bdf8);
          robot.setSonarVisual('right', true, 16, t, 0x38bdf8);
          callouts = [
            { pos: new THREE.Vector3(0, 4.8, 9.2), text: '3× HC-SR04 Radar', color: '#38bdf8' },
            { pos: new THREE.Vector3(0.68, 3.8, -5.8), text: 'Arduino UNO Brain', color: '#10b981' },
            { pos: new THREE.Vector3(6.2, 2.2, 3.6), text: '4WD Bat-Grip Wheels', color: '#f97316' }
          ];
        } else if (t < 18) {
          // Holographic Obstacle Rises Ahead & Robot Pivots Cleanly!
          var sub = (t - 9) / 9;
          arena.introObs.visible = true;
          arena.introObs.position.y = arena.floorY + 3.25 * easeOutCubic(Math.min(1, sub * 4));
          var turnP = smoothstep((sub - 0.32) / 0.48);
          robot.root.position.z = lerp(-4, 5.5, smoothstep(Math.min(1, sub * 2.2)));
          robot.root.rotation.y = lerp(0, 0.72, turnP);
          robot.root.position.x = lerp(0, 4.5, turnP);
          var alert = sub > 0.25 && sub < 0.75;
          robot.setSonarVisual('left', true, 18, t, 0x38bdf8);
          robot.setSonarVisual('center', true, alert ? 11.5 : 18, t, alert ? 0xef4444 : 0x38bdf8);
          robot.setSonarVisual('right', true, 16, t, 0x38bdf8);
          wheelSpinL = alert ? 0.5 : 6.0;
          wheelSpinR = 7.5;
          state.camPosGoal.set(-16, 13.5, 22);
          state.camLookGoal.set(1.5, 2.4, 9.0);
          callouts = [
            { pos: new THREE.Vector3(0, 5.2, 8.8), text: alert ? 'OBSTACLE < 15 cm!' : '40 kHz SONAR', color: alert ? '#ef4444' : '#38bdf8' }
          ];
        } else {
          // Sense -> Think -> Act clean hero angle
          var s3 = (t - 18) / 7;
          state.camPosGoal.set(lerp(-14, 16, smoothstep(s3)), 14, 17);
          state.camLookGoal.set(0, 2.4, 0.5);
          robot.setSonarVisual('left', true, 14, t, 0x38bdf8);
          robot.setSonarVisual('center', true, 16, t, 0x10b981);
          robot.setSonarVisual('right', true, 14, t, 0x38bdf8);
          wheelSpinL = 4.0; wheelSpinR = 4.0;
        }
      }

      // ================================================================
      // CHAPTER 2 (25 - 65s): ALL 14 COMPONENTS EXPLODED 3D SHOWCASE
      // ================================================================
      else if (t < 65) {
        var c2 = t - 25;
        var exp = smoothstep(Math.min(1, c2 / 3.0)) * (c2 > 37 ? smoothstep(1 - (c2 - 37) / 3.0) : 1);
        powerOn = false;
        robot.setWireProgress('all', c2 > 31 ? 1 : 0, pulsePhase, c2 > 31);

        // Explode every layer smoothly outward so all 14 parts are clearly visible!
        robot.arduino.group.position.y += 6.2 * exp;
        robot.m3Screws.forEach(function (s) { s.position.y += 8.2 * exp; });
        robot.l298n.group.position.y += 4.6 * exp;
        robot.battery.position.y += 3.2 * exp;
        robot.tape.position.y += 1.7 * exp;

        robot.sensors.left.group.position.addScaledVector(robot.sensors.left.group.userData.outward, 3.8 * exp);
        robot.sensors.center.group.position.addScaledVector(robot.sensors.center.group.userData.outward, 3.8 * exp);
        robot.sensors.right.group.position.addScaledVector(robot.sensors.right.group.userData.outward, 3.8 * exp);

        robot.motors.forEach(function (m) { m.position.x += m.userData.side * 2.2 * exp; });
        robot.clamps.forEach(function (c) { c.position.y += 3.2 * exp; c.position.x += c.userData.side * 2.2 * exp; });
        robot.m2Fasteners.forEach(function (f) {
          f.bolt.position.y += 5.0 * exp; f.bolt.position.x += f.side * 2.2 * exp;
          f.nut.position.y -= 1.2 * exp; f.nut.position.x += f.side * 2.2 * exp;
        });
        robot.wheels.forEach(function (w) {
          w.position.x += w.userData.side * 4.8 * exp;
          w.userData.gripGroup.position.x = w.userData.side * 1.9 * exp;
        });

        // Slow turntable spin around exploded robot
        var orbitAng = 0.65 + (c2 / 40) * Math.PI * 1.6;
        state.camPosGoal.set(Math.sin(orbitAng) * 28, 13.5, Math.cos(orbitAng) * 28);
        state.camLookGoal.set(2.2, 3.8, 0);

        if (c2 < 8) {
          callouts = [{ pos: robot.arduino.group.position.clone().add(new THREE.Vector3(0, 1.5, 0)), text: '1. Arduino UNO (Brain)', color: '#10b981' }];
        } else if (c2 < 16) {
          robot.setSonarVisual('left', true, 12, t, 0x38bdf8);
          robot.setSonarVisual('center', true, 14, t, 0x38bdf8);
          robot.setSonarVisual('right', true, 12, t, 0x38bdf8);
          callouts = [{ pos: robot.sensors.center.group.position.clone().add(new THREE.Vector3(0, 1.6, 0)), text: '2. 3× HC-SR04 Ultrasonic', color: '#38bdf8' }];
        } else if (c2 < 24) {
          callouts = [
            { pos: robot.l298n.group.position.clone().add(new THREE.Vector3(0, 2.4, 0)), text: 'L298N Motor Driver', color: '#ef4444' },
            { pos: robot.battery.position.clone().add(new THREE.Vector3(0, 2.0, 0)), text: '7.4V 850mAh LiPo', color: '#f97316' },
            { pos: robot.motors[0].position.clone().add(new THREE.Vector3(0, 1.4, 0)), text: '4× N20 300 RPM', color: '#eab308' }
          ];
        } else if (c2 < 32) {
          callouts = [
            { pos: new THREE.Vector3(0, 1.0, 0), text: '3D-Printed Chassis (.STL)', color: '#60a5fa' },
            { pos: robot.clamps[0].position.clone().add(new THREE.Vector3(0, 1.4, 0)), text: '4× Motor Clamps', color: '#f59e0b' },
            { pos: robot.wheels[0].position.clone().add(new THREE.Vector3(0, 2.1, 0)), text: '4× 3D Wheels (.STEP)', color: '#f8fafc' }
          ];
        } else {
          callouts = [
            { pos: robot.wheels[0].position.clone().add(new THREE.Vector3(2.2, 2.0, 0)), text: 'Octopus Bat Grip', color: '#ff5a1f' },
            { pos: robot.m2Fasteners[0].bolt.position.clone().add(new THREE.Vector3(0, 1.2, 0)), text: 'M2 Bolts & Hex Nuts', color: '#e2e8f0' },
            { pos: robot.m3Screws[0].position.clone().add(new THREE.Vector3(0, 1.1, 0)), text: 'M3 CSK Screws ×3', color: '#94a3b8' }
          ];
        }
      }

      // ================================================================
      // CHAPTER 3 (65 - 115s): STEP-BY-STEP 3D MECHANICAL ASSEMBLY
      // ================================================================
      else if (t < 115) {
        var c3 = t - 65;
        powerOn = false;
        robot.setWireProgress('all', 0, 0, false);

        // Hide everything not yet installed, then animate each group snapping into place!
        // Phase A (0..13s): 4x N20 Motors -> 4x Orange Clamps -> M2 Bolts & Hex Nuts
        var pMot   = easeOutCubic(c3 / 4.2);
        var pClamp = easeOutCubic((c3 - 4.0) / 4.0);
        var pBolt  = easeOutCubic((c3 - 7.8) / 4.2);

        robot.motors.forEach(function (m) {
          m.visible = c3 > 0.2;
          m.position.x = m.userData.target.x + m.userData.side * 7.5 * (1 - pMot);
        });
        robot.clamps.forEach(function (c) {
          c.visible = c3 > 3.8;
          c.position.y = c.userData.target.y + 8.5 * (1 - pClamp);
        });
        robot.m2Fasteners.forEach(function (f) {
          f.bolt.visible = c3 > 7.6;
          f.nut.visible = c3 > 7.6;
          f.bolt.position.y = f.boltTarget.y + 6.0 * (1 - pBolt);
          f.bolt.rotation.y = (1 - pBolt) * Math.PI * 6;
          f.nut.position.y = f.nutTarget.y - 2.5 * (1 - pBolt);
        });

        // Phase B (13..25s): White 3D Wheels + Orange Bat Grip Tire Wrap + Press onto Shafts
        var pRim  = easeOutCubic((c3 - 13.0) / 3.5);
        var pGrip = easeOutCubic((c3 - 16.5) / 3.8);
        var pFit  = easeOutCubic((c3 - 20.2) / 3.5);
        robot.wheels.forEach(function (w) {
          w.visible = c3 > 12.8;
          var extraOut = 6.5 * (1 - pRim) + 2.8 * (1 - pFit);
          w.position.x = w.userData.target.x + w.userData.side * extraOut;
          w.userData.gripGroup.visible = c3 > 16.2;
          w.userData.gripGroup.position.x = w.userData.side * 5.2 * (1 - pGrip);
          var stretch = 1 + 0.12 * (1 - pGrip);
          w.userData.gripGroup.scale.set(1, stretch, stretch);
        });
        if (c3 > 23.0 && c3 < 25.2) { wheelSpinL = 7; wheelSpinR = 7; }

        // Phase C (25..38s): Double-Sided Tape -> 7.4V LiPo -> L298N -> Arduino UNO + M3 CSK Screws
        var pTape = easeOutCubic((c3 - 25.0) / 2.5);
        var pBat  = easeOutCubic((c3 - 27.5) / 3.0);
        var pL298 = easeOutCubic((c3 - 30.5) / 3.0);
        var pArd  = easeOutCubic((c3 - 33.2) / 2.6);
        var pM3   = easeOutCubic((c3 - 35.4) / 2.4);

        robot.tape.visible = c3 > 24.8;
        robot.tape.position.y = robot.tape.userData.target.y + 7.0 * (1 - pTape);

        robot.battery.visible = c3 > 27.3;
        robot.battery.position.y = robot.battery.userData.target.y + 9.0 * (1 - pBat);

        robot.l298n.group.visible = c3 > 30.3;
        robot.l298n.group.position.y = robot.l298n.group.userData.target.y + 9.0 * (1 - pL298);

        robot.arduino.group.visible = c3 > 33.0;
        robot.arduino.group.position.y = robot.arduino.group.userData.target.y + 9.0 * (1 - pArd);

        robot.m3Screws.forEach(function (s) {
          s.visible = c3 > 35.2;
          s.position.y = s.userData.target.y + 5.5 * (1 - pM3);
          s.rotation.y = (1 - pM3) * Math.PI * 6;
        });

        // Phase D (38..50s): 3x HC-SR04 Ultrasonic Sensors snap into Front Bumper
        var pUsL = easeOutCubic((c3 - 38.2) / 3.2);
        var pUsC = easeOutCubic((c3 - 41.2) / 3.2);
        var pUsR = easeOutCubic((c3 - 44.2) / 3.2);
        [
          ['left', pUsL, 38.0],
          ['center', pUsC, 41.0],
          ['right', pUsR, 44.0]
        ].forEach(function (entry) {
          var s = robot.sensors[entry[0]];
          s.group.visible = c3 > entry[2];
          s.group.position.copy(s.group.userData.target).addScaledVector(s.group.userData.outward, 7.5 * (1 - entry[1]));
        });

        // Dynamic Camera Tracking Each Assembly Zone!
        if (c3 < 13) {
          state.camPosGoal.set(16.5, 9.5, 8.0);
          state.camLookGoal.set(3.8, 1.4, 1.5);
          callouts = [
            { pos: new THREE.Vector3(4.3, 2.3, 3.6), text: 'N20 + Blue Clamp + M2 Bolts', color: '#3b82f6' }
          ];
        } else if (c3 < 25) {
          state.camPosGoal.set(17.5, 6.5, 4.5);
          state.camLookGoal.set(5.5, 1.3, -1.0);
          callouts = [
            { pos: new THREE.Vector3(6.8, 3.0, 3.6), text: 'Octopus Bat-Grip Tire Sleeve', color: '#ff5a1f' }
          ];
        } else if (c3 < 38) {
          state.camPosGoal.set(-14.5, 15.5, -12.0);
          state.camLookGoal.set(0.5, 2.2, -1.2);
          callouts = c3 < 30.5
            ? [{ pos: new THREE.Vector3(0, 3.0, -0.3), text: 'Tape + 7.4V LiPo Bay', color: '#f97316' }]
            : (c3 < 33.2
              ? [{ pos: new THREE.Vector3(-0.28, 4.8, 4.12), text: 'L298N Dual H-Bridge', color: '#ef4444' }]
              : [{ pos: new THREE.Vector3(0.68, 3.8, -5.8), text: 'Arduino UNO + M3 CSK Screws', color: '#10b981' }]);
        } else {
          state.camPosGoal.set(10.5, 10.0, 22.0);
          state.camLookGoal.set(0.5, 3.2, 7.5);
          if (c3 > 47) {
            robot.setSonarVisual('left', true, 12, t, 0x38bdf8);
            robot.setSonarVisual('center', true, 14, t, 0x38bdf8);
            robot.setSonarVisual('right', true, 12, t, 0x38bdf8);
          }
          callouts = [
            { pos: new THREE.Vector3(4.4, 5.2, 7.3), text: 'Left (+35°)', color: '#38bdf8' },
            { pos: new THREE.Vector3(0, 5.2, 8.8), text: 'Center (0°)', color: '#10b981' },
            { pos: new THREE.Vector3(-4.4, 5.2, 7.3), text: 'Right (-35°)', color: '#f97316' }
          ];
        }
      }

      // ================================================================
      // CHAPTER 4 (115 - 145s): ULTRASONIC SENSOR WIRING (D2 - D7)
      // ================================================================
      else if (t < 145) {
        var c4 = t - 115;
        powerOn = false;
        robot.setWireProgress('all', 0, 0, false);

        var pPwr = smoothstep(c4 / 6.5);
        var pL   = smoothstep((c4 - 8.0) / 5.5);
        var pC   = smoothstep((c4 - 15.0) / 5.5);
        var pR   = smoothstep((c4 - 22.0) / 5.5);

        robot.setWireProgress('us_pwr',    pPwr, pulsePhase, c4 < 8.5);
        robot.setWireProgress('us_left',   pL,   pulsePhase, c4 >= 8.0 && c4 < 15.5);
        robot.setWireProgress('us_center', pC,   pulsePhase, c4 >= 15.0 && c4 < 22.5);
        robot.setWireProgress('us_right',  pR,   pulsePhase, c4 >= 22.0);

        if (c4 >= 11) robot.setSonarVisual('left', true, 13, t, 0x3b82f6);
        if (c4 >= 18) robot.setSonarVisual('center', true, 15, t, 0x22c55e);
        if (c4 >= 25) robot.setSonarVisual('right', true, 13, t, 0xf97316);

        // Overhead angled wiring blueprint camera
        state.camPosGoal.set(9.5, 22.5, 11.5);
        state.camLookGoal.set(1.5, 2.2, 1.0);

        if (c4 < 8) {
          callouts = [
            { pos: robot.pinMap.ard['5V'].clone().add(new THREE.Vector3(0, 0.8, 0)), text: '5V & GND Shared Rail', color: '#ef4444' }
          ];
        } else if (c4 < 15) {
          callouts = [
            { pos: robot.pinMap.ard.D2.clone().add(new THREE.Vector3(0, 1.0, 0)), text: 'D2 TRIG / D3 ECHO', color: '#3b82f6' },
            { pos: new THREE.Vector3(4.4, 5.2, 7.3), text: 'LEFT HC-SR04', color: '#06b6d4' }
          ];
        } else if (c4 < 22) {
          callouts = [
            { pos: robot.pinMap.ard.D4.clone().add(new THREE.Vector3(0, 1.0, 0)), text: 'D4 TRIG / D5 ECHO', color: '#22c55e' },
            { pos: new THREE.Vector3(0, 5.2, 8.8), text: 'CENTER HC-SR04', color: '#eab308' }
          ];
        } else {
          callouts = [
            { pos: robot.pinMap.ard.D6.clone().add(new THREE.Vector3(0, 1.0, 0)), text: 'D6 TRIG / D7 ECHO', color: '#f97316' },
            { pos: new THREE.Vector3(-4.4, 5.2, 7.3), text: 'RIGHT HC-SR04', color: '#a855f7' }
          ];
        }
      }

      // ================================================================
      // CHAPTER 5 (145 - 175s): L298N DRIVER & PARALLEL 4WD MOTORS
      // ================================================================
      else if (t < 175) {
        var c5 = t - 145;
        powerOn = false;
        robot.setWireProgress('all', 0, 0, false);
        // Keep previous ultrasonic wires softly visible in background
        robot.setWireProgress(['us_pwr', 'us_left', 'us_center', 'us_right'], 1, 0, false);

        var pLogic = smoothstep(c5 / 8.5);
        var pML    = smoothstep((c5 - 17.0) / 5.0);
        var pMR    = smoothstep((c5 - 22.0) / 5.0);

        robot.setWireProgress('l298_logic',   pLogic, pulsePhase, c5 < 11.5);
        robot.setWireProgress('motors_left',  pML,    pulsePhase, c5 >= 17.0 && c5 < 23.0);
        robot.setWireProgress('motors_right', pMR,    pulsePhase, c5 >= 22.0);

        if (c5 < 11) {
          state.camPosGoal.set(11.0, 16.5, -1.5);
          state.camLookGoal.set(1.2, 2.2, 0.2);
          callouts = [
            { pos: robot.pinMap.ard.D9.clone().add(new THREE.Vector3(0, 0.9, 0)), text: 'D8–D12 Logic Pins', color: '#facc15' },
            { pos: robot.pinMap.l298.IN2.clone().add(new THREE.Vector3(0, 1.1, 0)), text: 'L298N IN1–IN4', color: '#ec4899' }
          ];
        } else if (c5 < 17) {
          // Zoom right onto the yellow ENA & ENB 5V Jumper Caps!
          robot.l298n.jumperMat.emissiveIntensity = 0.65 + 0.35 * Math.sin(t * 10);
          state.camPosGoal.set(7.5, 11.5, -2.5);
          state.camLookGoal.set(1.2, 1.4, 2.4);
          callouts = [
            { pos: robot.pinMap.l298.ENA.clone().add(new THREE.Vector3(0, 1.0, 0)), text: 'KEEP ENA 5V JUMPER!', color: '#facc15' },
            { pos: robot.pinMap.l298.ENB.clone().add(new THREE.Vector3(0, 1.0, 0)), text: 'KEEP ENB 5V JUMPER!', color: '#facc15' }
          ];
        } else {
          // Overhead split view of Parallel 4WD Motor Pairs + spin check!
          state.camPosGoal.set(0.5, 22.0, 8.5);
          state.camLookGoal.set(1.2, 1.2, -0.5);
          if (c5 > 19.5 && c5 < 24.0) wheelSpinL = 8.0;
          if (c5 > 24.5) { wheelSpinL = 6.0; wheelSpinR = 8.0; }
          callouts = [
            { pos: robot.pinMap.l298.OUT1.clone().add(new THREE.Vector3(0.5, 1.0, 0)), text: 'OUT1/2 → 2× Left Parallel', color: '#f43f5e' },
            { pos: robot.pinMap.l298.OUT3.clone().add(new THREE.Vector3(-0.5, 1.0, 0)), text: 'OUT3/4 → 2× Right Parallel', color: '#10b981' }
          ];
        }
      }

      // ================================================================
      // CHAPTER 6 (175 - 198s): 7.4V LiPo POWER & COMMON GROUND SAFETY
      // ================================================================
      else if (t < 198) {
        var c6 = t - 175;
        robot.setWireProgress('all', 0, 0, false);
        robot.setWireProgress(['us_pwr', 'us_left', 'us_center', 'us_right', 'l298_logic', 'motors_left', 'motors_right'], 1, 0, false);

        var pLipo = smoothstep(c6 / 6.0);
        var pGnd  = smoothstep((c6 - 8.0) / 5.5);
        var p5v   = smoothstep((c6 - 16.0) / 5.0);

        robot.setWireProgress('pwr_lipo', pLipo, pulsePhase, c6 < 8.5);
        robot.setWireProgress('pwr_gnd',  pGnd,  pulsePhase, c6 >= 8.0 && c6 < 16.5);
        robot.setWireProgress('pwr_5v',   p5v,   pulsePhase, c6 >= 16.0);

        // Turn on LEDs sequentially right as power arrives!
        robot.l298n.pwrLedMat.emissiveIntensity = c6 > 5.0 ? 2.2 : 0.05;
        robot.arduino.onLedMat.emissiveIntensity = c6 > 19.0 ? 2.2 : 0.05;
        powerOn = false; // Handled manually above!

        state.camPosGoal.set(-14.5, 15.0, 1.5);
        state.camLookGoal.set(-0.6, 1.8, -0.4);

        if (c6 < 8) {
          callouts = [
            { pos: robot.pinMap.bat.POS.clone().add(new THREE.Vector3(0, 1.2, 0)), text: '7.4V LiPo (+ Red / - Black)', color: '#ef4444' },
            { pos: robot.pinMap.l298.V12.clone().add(new THREE.Vector3(0, 1.1, 0)), text: 'L298N 12V & GND', color: '#f97316' }
          ];
        } else if (c6 < 16) {
          callouts = [
            { pos: robot.pinMap.l298.GND.clone().add(new THREE.Vector3(0, 1.4, 0)), text: '★ COMMON GROUND (CRITICAL!)', color: '#10b981' },
            { pos: robot.pinMap.ard.GND2.clone().add(new THREE.Vector3(0, 1.2, 0)), text: 'Arduino GND', color: '#10b981' }
          ];
        } else {
          callouts = [
            { pos: robot.pinMap.l298.V5.clone().add(new THREE.Vector3(0, 1.2, 0)), text: 'Regulated 5V Out', color: '#f97316' },
            { pos: robot.pinMap.ard.VIN.clone().add(new THREE.Vector3(0, 1.2, 0)), text: 'Arduino 5V / VIN (LED ON!)', color: '#22c55e' }
          ];
        }
      }

      // ================================================================
      // CHAPTER 7 (198 - 230s): ARDUINO CODE WALKTHROUGH SYNCED WITH 3D
      // ================================================================
      else if (t < 230) {
        var c7 = t - 198;
        robot.setWireProgress('all', 1, pulsePhase, true);
        // Frame robot neatly on the left half so the right code panel never overlaps it!
        state.camPosGoal.set(16.0, 12.5, 16.5);
        state.camLookGoal.set(3.2, 2.2, 0.8);

        if (c7 < 8) {
          // Pins & thresholds
          robot.setSonarVisual('left', true, 17, t, 0x38bdf8);
          robot.setSonarVisual('center', true, 15, t, 0x10b981);
          robot.setSonarVisual('right', true, 17, t, 0x38bdf8);
          callouts = [
            { pos: new THREE.Vector3(0, 4.9, 9.0), text: 'Front < 15 cm | Sides < 17 cm', color: '#38bdf8' }
          ];
        } else if (c7 < 16) {
          // getDistance() sonar bursts
          robot.setSonarVisual('left', true, 18, t * 1.4, 0x38bdf8);
          robot.setSonarVisual('center', true, 20, t * 1.4, 0x38bdf8);
          robot.setSonarVisual('right', true, 18, t * 1.4, 0x38bdf8);
          callouts = [
            { pos: new THREE.Vector3(0, 5.2, 11.5), text: 'pulseIn() × 0.0343 / 2', color: '#38bdf8' }
          ];
        } else if (c7 < 24) {
          // motorControl(L, R) live wheel rotation demos!
          var phase = Math.floor((c7 - 16) / 2.66);
          if (phase === 0) {
            wheelSpinL = 8.5; wheelSpinR = 8.5;
            callouts = [{ pos: new THREE.Vector3(0, 4.5, 0), text: 'motorControl(255, 255) FORWARD', color: '#10b981' }];
          } else if (phase === 1) {
            wheelSpinL = 7.5; wheelSpinR = 0;
            callouts = [{ pos: new THREE.Vector3(5.5, 4.0, 1.0), text: 'motorControl(200, 0) TURN RIGHT', color: '#f59e0b' }];
          } else {
            wheelSpinL = 0; wheelSpinR = 8.5;
            callouts = [{ pos: new THREE.Vector3(-5.5, 4.0, 1.0), text: 'motorControl(0, 255) TURN LEFT', color: '#38bdf8' }];
          }
        } else {
          // Decision Tree cycling Left / Right / Front alerts
          var cyc = Math.floor((c7 - 24) / 2.0) % 3;
          robot.setSonarVisual('left', true, cyc === 0 ? 12 : 18, t, cyc === 0 ? 0xf59e0b : 0x38bdf8);
          robot.setSonarVisual('center', true, cyc === 2 ? 11 : 18, t, cyc === 2 ? 0xef4444 : 0x10b981);
          robot.setSonarVisual('right', true, cyc === 1 ? 12 : 18, t, cyc === 1 ? 0xf59e0b : 0x38bdf8);
          wheelSpinL = cyc === 0 ? 7.5 : 0;
          wheelSpinR = cyc !== 0 ? 8.5 : 0;
        }
      }

      // ================================================================
      // CHAPTER 8 (230 - 260s): LIVE AUTONOMOUS OBSTACLE COURSE DEMO!
      // ================================================================
      else {
        var c8 = t - 230;
        arena.trackGroup.visible = true;
        arena.ring.visible = false;
        robot.setWireProgress('all', 1, pulsePhase, false);

        // Obstacles smoothly rise during first 1.2s
        var rise = easeOutCubic(Math.min(1, c8 / 1.2));
        arena.trackGroup.position.y = -8 * (1 - rise);

        var tele = evaluateRaceDemo(c8);
        state.lastTelemetry = tele;

        robot.root.position.set(tele.x, 0, tele.z);
        robot.root.rotation.y = tele.yaw;

        // Live color-coded ultrasonic cones!
        robot.setSonarVisual('left',   true, Math.min(22, tele.dL), t * 1.3, tele.dL < 17 ? 0xf59e0b : 0x38bdf8);
        robot.setSonarVisual('center', true, Math.min(24, tele.dC), t * 1.3, tele.dC < 15 ? 0xef4444 : 0x10b981);
        robot.setSonarVisual('right',  true, Math.min(22, tele.dR), t * 1.3, tele.dR < 17 ? 0xf59e0b : 0x38bdf8);

        wheelSpinL = (tele.leftPwm / 255) * 10.5;
        wheelSpinR = (tele.rightPwm / 255) * 10.5;

        // Dynamic Third-Person Racer Follow-Cam!
        var fwdX = Math.sin(tele.yaw);
        var fwdZ = Math.cos(tele.yaw);
        state.camPosGoal.set(
          tele.x - fwdX * 22 + 9,
          17.5,
          tele.z - fwdZ * 22 - 4
        );
        state.camLookGoal.set(tele.x + fwdX * 6 + 3.5, 2.5, tele.z + fwdZ * 6);

        if (tele.dC < 15) {
          callouts = [{ pos: new THREE.Vector3(0, 5.5, 9.2), text: 'FRONT ' + tele.dC.toFixed(0) + 'cm → COMPARE L/R!', color: '#ef4444' }];
        } else if (tele.dL < 17) {
          callouts = [{ pos: new THREE.Vector3(4.5, 5.5, 7.5), text: 'LEFT ' + tele.dL.toFixed(0) + 'cm → TURN RIGHT', color: '#f59e0b' }];
        } else if (tele.dR < 17) {
          callouts = [{ pos: new THREE.Vector3(-4.5, 5.5, 7.5), text: 'RIGHT ' + tele.dR.toFixed(0) + 'cm → TURN LEFT', color: '#f59e0b' }];
        } else if (c8 > 25.5) {
          callouts = [{ pos: new THREE.Vector3(0, 6.2, 0), text: '🏁 100% AUTONOMOUS VICTORY!', color: '#10b981' }];
        }
      }

      // LEDs when powered
      if (powerOn) {
        robot.l298n.pwrLedMat.emissiveIntensity = 1.9;
        robot.arduino.onLedMat.emissiveIntensity = 1.9;
        robot.arduino.txLedMat.emissiveIntensity = Math.sin(t * 16) > 0.3 ? 1.8 : 0.05;
      } else if (t < 175) {
        robot.l298n.pwrLedMat.emissiveIntensity = 0.05;
        robot.arduino.onLedMat.emissiveIntensity = 0.05;
        robot.arduino.txLedMat.emissiveIntensity = 0.0;
      }

      // Spin 4WD wheels around X axle (Left pair vs Right pair)
      if (dt > 0) {
        state.wheelAngleL += wheelSpinL * dt;
        state.wheelAngleR += wheelSpinR * dt;
      }
      robot.wheels.forEach(function (w) {
        w.rotation.x = w.userData.side > 0 ? state.wheelAngleL : state.wheelAngleR;
      });

      // Keep shadow directional light tracking the robot smoothly
      keyLight.position.set(robot.root.position.x + 22, 34, robot.root.position.z + 24);
      keyLight.target.position.copy(robot.root.position);
      keyLight.target.updateMatrixWorld();

      state.activeCallouts = callouts;
    }

    /* ---------- Sync UI, Captions, Beats & Voice ---------- */
    function syncBeatAndUI(triggerAudio) {
      // Find active chapter
      var chIdx = CHAPTERS.length - 1;
      for (var i = 0; i < CHAPTERS.length; i++) {
        if (state.t < CHAPTERS[i].end) { chIdx = i; break; }
      }
      if (chIdx !== state.lastChapterIdx) {
        state.lastChapterIdx = chIdx;
        var ch = CHAPTERS[chIdx];
        eyebrowEl.innerHTML = 'CH ' + (chIdx + 1) + ' / ' + CHAPTERS.length + ' &bull; ' + fmtTime(ch.start) + ' – ' + fmtTime(ch.end);
        titleEl.textContent = ch.title;
        chapStrip.querySelectorAll('.rvg-chap-btn').forEach(function (btn, bIdx) {
          btn.classList.toggle('active', bIdx === chIdx);
        });
      }

      // Find active beat
      var bIdx = BEATS.length - 1;
      for (var j = 0; j < BEATS.length; j++) {
        if (state.t < BEATS[j].e) { bIdx = j; break; }
      }
      var beat = BEATS[bIdx];
      if (bIdx !== state.lastBeatIdx) {
        state.lastBeatIdx = bIdx;
        captionBox.innerHTML = beat.caption;
        if (triggerAudio && state.playing && beat.sfx) {
          sfx.trigger(beat.sfx);
        }
      }

      // Trigger human teacher voice AFTER the clean lead-in breath so SFX never talks over the teacher!
      var voiceOffset = (state.t - beat.s) - (beat.voiceDelay || 0);
      if (triggerAudio && state.playing && bIdx !== state.lastVoiceBeatIdx && voiceOffset >= 0) {
        state.lastVoiceBeatIdx = bIdx;
        narrator.playBeat(bIdx, voiceOffset, state.speeds[state.speedIdx], beat.voice);
      }

      renderSidePanel(beat.panel, state.t, state.lastTelemetry);

      // Update timeline bar
      var pct = Math.min(100, Math.max(0, (state.t / TOTAL_DURATION) * 100));
      fillEl.style.width = pct + '%';
      thumbEl.style.left = pct + '%';
      timeEl.textContent = fmtTime(state.t) + ' / ' + fmtTime(TOTAL_DURATION);
    }

    /* ---------- Transport Controls ---------- */
    function play() {
      sfx.unlock();
      if (state.t >= TOTAL_DURATION - 0.1) {
        state.t = 0;
        state.lastBeatIdx = -1;
        state.lastVoiceBeatIdx = -1;
      }
      state.playing = true;
      state.started = true;
      posterEl.classList.add('hidden');
      endOverlay.classList.add('hidden');
      playBtn.innerHTML = '&#10074;&#10074; <span class="rvg-btn-txt">Pause</span>';
      // Re-trigger current beat audio cleanly at current offset
      state.lastBeatIdx = -1;
      state.lastVoiceBeatIdx = -1;
      syncBeatAndUI(true);
    }

    function pause() {
      state.playing = false;
      narrator.stop();
      playBtn.innerHTML = '&#9654; <span class="rvg-btn-txt">Play</span>';
    }

    function togglePlay() {
      if (state.playing) pause();
      else play();
    }

    function jumpToTime(sec, autoPlay) {
      state.t = Math.max(0, Math.min(TOTAL_DURATION, sec));
      state.lastBeatIdx = -1;
      state.lastVoiceBeatIdx = -1;
      state.lastPanelKey = '';
      setFreeCam(false);
      endOverlay.classList.add('hidden');
      posterEl.classList.add('hidden');
      state.started = true;
      updateSceneForTime(realToVirtualTime(state.t), 0);
      // Snap camera cleanly on chapter jump
      state.camPosCur.copy(state.camPosGoal);
      state.camLookCur.copy(state.camLookGoal);
      if (autoPlay) {
        play();
      } else {
        narrator.stop();
        syncBeatAndUI(false);
      }
    }

    playBtn.addEventListener('click', togglePlay);
    document.getElementById('rvgBigPlay').addEventListener('click', function () { jumpToTime(0, true); });
    document.getElementById('rvgReplayBtn').addEventListener('click', function () { jumpToTime(0, true); });
    document.getElementById('rvgExplore3dBtn').addEventListener('click', function () {
      endOverlay.classList.add('hidden');
      jumpToTime(2, false);
      setFreeCam(true);
    });

    prevBtn.addEventListener('click', function () {
      var targetCh = Math.max(0, state.lastChapterIdx - 1);
      if (state.t - CHAPTERS[Math.max(0, state.lastChapterIdx)].start > 3.5) {
        targetCh = Math.max(0, state.lastChapterIdx);
      }
      jumpToTime(CHAPTERS[targetCh].start, state.playing);
    });

    nextBtn.addEventListener('click', function () {
      var targetCh = Math.min(CHAPTERS.length - 1, Math.max(0, state.lastChapterIdx) + 1);
      jumpToTime(CHAPTERS[targetCh].start, state.playing);
    });

    voiceBtn.addEventListener('click', function () {
      var next = !narrator.isEnabled();
      narrator.setEnabled(next);
      voiceBtn.classList.toggle('active', next);
      voiceBtn.innerHTML = (next ? '&#128266;' : '&#128263;') + ' <span class="rvg-btn-txt">' + (narrator.isStudio() ? 'Teacher Voice' : 'Voice') + '</span>';
      if (next && state.playing) {
        var idx = Math.max(0, state.lastBeatIdx);
        var b = BEATS[idx];
        var vOff = b ? (state.t - b.s) - (b.voiceDelay || 0) : 0;
        if (b && vOff >= 0) {
          state.lastVoiceBeatIdx = idx;
          narrator.playBeat(idx, vOff, state.speeds[state.speedIdx], b.voice);
        }
      }
    });

    sfxBtn.addEventListener('click', function () {
      var next = !sfx.isEnabled();
      sfx.setEnabled(next);
      sfxBtn.classList.toggle('active', next);
    });

    ccBtn.addEventListener('click', function () {
      state.captionsOn = !state.captionsOn;
      ccBtn.classList.toggle('active', state.captionsOn);
      captionWrap.classList.toggle('hidden', !state.captionsOn);
    });

    speedBtn.addEventListener('click', function () {
      state.speedIdx = (state.speedIdx + 1) % state.speeds.length;
      var spd = state.speeds[state.speedIdx];
      speedBtn.textContent = spd + '×';
      narrator.setRate(spd);
    });

    /* ---------- Scrubber Dragging & Hover Preview ---------- */
    function timeFromPointer(clientX) {
      var r = trackEl.getBoundingClientRect();
      var frac = clamp01((clientX - r.left) / r.width);
      return frac * TOTAL_DURATION;
    }

    var scrubbing = false;
    timelineEl.addEventListener('pointerdown', function (e) {
      scrubbing = true;
      timelineEl.setPointerCapture(e.pointerId);
      jumpToTime(timeFromPointer(e.clientX), state.playing);
    });
    timelineEl.addEventListener('pointermove', function (e) {
      var sec = timeFromPointer(e.clientX);
      var r = trackEl.getBoundingClientRect();
      var px = Math.max(24, Math.min(r.width - 24, e.clientX - r.left));
      var ch = CHAPTERS[CHAPTERS.length - 1];
      for (var i = 0; i < CHAPTERS.length; i++) {
        if (sec < CHAPTERS[i].end) { ch = CHAPTERS[i]; break; }
      }
      tooltipEl.style.left = px + 'px';
      tooltipEl.textContent = fmtTime(sec) + ' • ' + ch.short;
      if (scrubbing) {
        jumpToTime(sec, false);
      }
    });
    timelineEl.addEventListener('pointerup', function () { scrubbing = false; });

    /* ---------- Fullscreen Toggle ---------- */
    function toggleFullscreen() {
      var isFs = shell.classList.toggle('rvg-fullscreen');
      document.body.style.overflow = isFs ? 'hidden' : '';
      try {
        if (isFs && shell.requestFullscreen) shell.requestFullscreen().catch(function () {});
        else if (!isFs && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
      } catch (e) {}
      setTimeout(handleResize, 60);
    }
    fsBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', function () {
      if (!document.fullscreenElement && shell.classList.contains('rvg-fullscreen')) {
        shell.classList.remove('rvg-fullscreen');
        document.body.style.overflow = '';
        setTimeout(handleResize, 60);
      }
    });

    /* ---------- Keyboard Shortcuts (when user is not typing) ---------- */
    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (!state.started && !shell.classList.contains('rvg-fullscreen')) return;
      var rect = shell.getBoundingClientRect();
      var visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible && !shell.classList.contains('rvg-fullscreen')) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        nextBtn.click();
      } else if (e.code === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && shell.classList.contains('rvg-fullscreen')) {
        toggleFullscreen();
      }
    });

    /* ---------- 720p Composite WebM Video Exporter (3D + Baked HUD + SFX!) ---------- */
    var mediaRecorder = null;
    var recChunks = [];
    var recCanvas = null;
    var recCtx = null;

    function drawRecorderComposite() {
      if (!recCanvas || !recCtx) return;
      var w = recCanvas.width, h = recCanvas.height;
      // 1. Copy 3D WebGL Frame
      recCtx.drawImage(renderer.domElement, 0, 0, w, h);

      // 2. Bake Top Chapter Badge
      var ch = CHAPTERS[Math.max(0, state.lastChapterIdx)];
      recCtx.fillStyle = 'rgba(7, 13, 26, 0.80)';
      recCtx.fillRect(24, 22, 460, 62);
      recCtx.strokeStyle = '#38bdf8';
      recCtx.lineWidth = 2;
      recCtx.strokeRect(24, 22, 460, 62);
      recCtx.fillStyle = '#38bdf8';
      recCtx.font = 'bold 14px sans-serif';
      recCtx.fillText('CH ' + (ch.id + 1) + ' / 8  •  AUTONOMOUS RACER ROBOT 4WD', 40, 44);
      recCtx.fillStyle = '#ffffff';
      recCtx.font = 'bold 21px sans-serif';
      recCtx.fillText(ch.title, 40, 72);

      // 3. Bake Subtitle Caption Bar
      if (state.captionsOn) {
        var plain = captionBox.textContent || '';
        recCtx.fillStyle = 'rgba(3, 7, 18, 0.85)';
        recCtx.fillRect(100, h - 88, w - 200, 56);
        recCtx.fillStyle = '#f8fafc';
        recCtx.font = '600 18px sans-serif';
        recCtx.textAlign = 'center';
        recCtx.fillText(plain.slice(0, 96), w / 2, h - 54);
        recCtx.textAlign = 'left';
      }

      // 4. Bake Bottom Progress Bar
      recCtx.fillStyle = 'rgba(148,163,184,0.28)';
      recCtx.fillRect(0, h - 8, w, 8);
      recCtx.fillStyle = '#38bdf8';
      recCtx.fillRect(0, h - 8, w * (state.t / TOTAL_DURATION), 8);
    }

    function stopRecording() {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      recBtn.classList.remove('rec-active');
      recBtn.innerHTML = '&#9210; <span class="rvg-btn-txt">Save Video</span>';
      recInd.classList.remove('recording');
    }

    function startRecording() {
      if (typeof MediaRecorder === 'undefined') {
        if (typeof global.showToast === 'function') {
          global.showToast('⚠️ Video recording is not supported in this browser.');
        }
        return;
      }
      recCanvas = document.createElement('canvas');
      recCanvas.width = 1280;
      recCanvas.height = 720;
      recCtx = recCanvas.getContext('2d');
      drawRecorderComposite();

      var videoStream = recCanvas.captureStream(30);
      var audioStream = sfx.getStream();
      var tracks = videoStream.getVideoTracks();
      if (audioStream && audioStream.getAudioTracks().length) {
        tracks = tracks.concat(audioStream.getAudioTracks());
      }
      var combined = new MediaStream(tracks);
      var mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      recChunks = [];
      mediaRecorder = new MediaRecorder(combined, { mimeType: mime, videoBitsPerSecond: 4500000 });
      mediaRecorder.ondataavailable = function (e) {
        if (e.data && e.data.size > 0) recChunks.push(e.data);
      };
      mediaRecorder.onstop = function () {
        var blob = new Blob(recChunks, { type: 'video/webm' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Autonomous_Racer_Robot_3D_Guide.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        if (typeof global.showToast === 'function') {
          global.showToast('🎬 Saved Autonomous_Racer_Robot_3D_Guide.webm!');
        }
        recCanvas = null;
        recCtx = null;
      };

      mediaRecorder.start(250);
      recBtn.classList.add('rec-active');
      recBtn.innerHTML = '&#9632; <span class="rvg-btn-txt">Stop &amp; Save</span>';
      recInd.classList.add('recording');
      if (!state.playing) play();
      if (typeof global.showToast === 'function') {
        global.showToast('🔴 Recording 720p WebM video — click Stop & Save anytime to download!');
      }
    }

    recBtn.addEventListener('click', function () {
      if (mediaRecorder && mediaRecorder.state === 'recording') stopRecording();
      else startRecording();
    });

    /* ---------- Resize Observer ---------- */
    function handleResize() {
      var w = stage.clientWidth || 800;
      var h = stage.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', handleResize);
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(handleResize).observe(stage);
    }
    handleResize();

    /* ---------- Main 60 FPS Render Loop ---------- */
    var lastFrameTs = performance.now();
    function tick(now) {
      requestAnimationFrame(tick);
      var dt = Math.min(0.05, (now - lastFrameTs) / 1000);
      lastFrameTs = now;

      if (state.playing) {
        state.t += dt * state.speeds[state.speedIdx];
        if (state.t >= TOTAL_DURATION) {
          state.t = TOTAL_DURATION;
          pause();
          endOverlay.classList.remove('hidden');
          if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopRecording();
          }
        }
      }

      // Gentle idle hero orbit while poster overlay is shown before first play
      if (!state.started) {
        var idleT = (now * 0.00032);
        updateSceneForTime(2.5, dt);
        state.camPosCur.set(Math.sin(idleT) * 23, 11.5, Math.cos(idleT) * 23);
        state.camLookCur.set(0, 2.4, 0.8);
      } else {
        updateSceneForTime(realToVirtualTime(state.t), state.playing ? dt : 0);
        syncBeatAndUI(true);

        if (state.freeCam) {
          var ox = state.orbitTarget.x + Math.sin(state.orbitYaw) * Math.cos(state.orbitPitch) * state.orbitDist;
          var oy = state.orbitTarget.y + Math.sin(state.orbitPitch) * state.orbitDist;
          var oz = state.orbitTarget.z + Math.cos(state.orbitYaw) * Math.cos(state.orbitPitch) * state.orbitDist;
          state.camPosCur.lerp(new THREE.Vector3(ox, Math.max(1.2, oy), oz), 0.18);
          state.camLookCur.lerp(state.orbitTarget, 0.18);
        } else {
          var blend = Math.min(1, dt * 4.2 + 0.04);
          state.camPosCur.lerp(state.camPosGoal, blend);
          state.camLookCur.lerp(state.camLookGoal, blend);
        }
      }

      camera.position.copy(state.camPosCur);
      camera.lookAt(state.camLookCur);
      renderer.render(scene, camera);

      if (state.started) {
        updateCallouts(state.activeCallouts);
      }
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        drawRecorderComposite();
      }
    }

    // Initial render
    updateSceneForTime(0, 0);
    syncBeatAndUI(false);
    requestAnimationFrame(tick);

    // Expose clean API for Hero CTA button or console debugging
    var api = {
      play: play,
      pause: pause,
      jumpToChapter: function (idx) {
        var ch = CHAPTERS[Math.max(0, Math.min(CHAPTERS.length - 1, idx))];
        jumpToTime(ch.start, true);
      },
      jumpToTime: jumpToTime
    };
    global.RacerVideoGuideAPI = api;
    return api;
  }

  global.initRacerVideoGuide = initRacerVideoGuide;

  // Auto-init on DOM ready if container exists
  function autoBoot() {
    if (document.getElementById('racerVideoGuideMount')) {
      initRacerVideoGuide('racerVideoGuideMount');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoBoot);
  } else {
    autoBoot();
  }
})(window);
