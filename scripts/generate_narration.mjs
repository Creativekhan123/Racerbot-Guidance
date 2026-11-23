/**
 * Autonomous Racer Robot — ElevenLabs Human Teacher Narration Generator
 * Uses @elevenlabs/elevenlabs-js with Eleven v4 & Request Stitching
 * Run with: npm run generate:narration  (uses `node --env-file=.env.local`)
 */

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import path from 'path';

// Pre-made ultra-natural conversational mentor voice (Chris — Charming, Down-to-Earth)
// Alternatives: JBFqnCBsd6RMkjVDRZzb (George), Xb7hH8MSUJpSbSDYk0k2 (Alice), TX3LPaxmHKxFdv7VOQHJ (Liam)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'iP95p4xoKVk53GoZ742B';
const MODEL_ID = 'eleven_v4';
const OUTPUT_FORMAT = 'mp3_44100_128';
const AUDIO_DIR = path.resolve('audio');

// Natural, warm classroom teacher script (~3,300 chars -> lands naturally ~4:20 at pure 1.0x speed!)
// Uses ellipses (...) and em-dashes (—) for genuine human breathing gaps and thoughtful emphasis.
export const NARRATION_BEATS = [
  // CH 1: Meet the Fork Robot
  {
    id: 'beat_00', ch: 0,
    text: "Hey everyone! Meet the Autonomous Racer Robot... our students love calling it the Fork Robot. No remote control, no phone app — just pure Arduino brains."
  },
  {
    id: 'beat_01', ch: 0,
    text: "See those three ultrasonic eyes up front? They fire sound waves... measure distance in milliseconds... and steer all four wheels right around obstacles."
  },
  {
    id: 'beat_02', ch: 0,
    text: "Give me four minutes, and I'll walk you through every part, the full 3D build, each wire, and the code. Ready? Let's jump in!"
  },

  // CH 2: All 14 Required Components
  {
    id: 'beat_03', ch: 1,
    text: "First up — the brain. Our Arduino Uno runs at sixteen megahertz, reading all three sensors and making smart steering calls every fifty milliseconds."
  },
  {
    id: 'beat_04', ch: 1,
    text: "Next, its eyes... three H-C-S-R-zero-four ultrasonic sensors — left, center, and right — giving wide forward vision down to three millimeters."
  },
  {
    id: 'beat_05', ch: 1,
    text: "Now for muscle and power. An L-two-ninety-eight-N motor driver safely switches seven-point-four volts from our Lie-Poe battery into four N-twenty metal gear motors."
  },
  {
    id: 'beat_06', ch: 1,
    text: "For the body, we 3D-print three custom parts: the angled-bumper chassis, four D-shaft wheels, and four orange motor clamps. Every CAD file is downloadable below."
  },
  {
    id: 'beat_07', ch: 1,
    text: "And the secret sauce? Cricket bat grip for crazy tire traction... plus M-two bolts, hex nuts, flush M-three screws, double-sided tape, and jumper wires."
  },

  // CH 3: Step-by-Step 3D Mechanical Assembly
  {
    id: 'beat_08', ch: 2,
    text: "Alright, let's build! Slide all four N-twenty motors into the chassis slots... snap the orange clamps on top... and lock them tight with M-two bolts and hex nuts."
  },
  {
    id: 'beat_09', ch: 2,
    text: "Step two — a classic robotics trick! Cut four rings of cricket bat grip, stretch them over your 3D-printed wheels for zero slip, and press them onto the shafts."
  },
  {
    id: 'beat_10', ch: 2,
    text: "Step three: stick double-sided tape in the center bay for the battery... mount the red motor driver up front... and fasten the Arduino at the back with flush M-three screws."
  },
  {
    id: 'beat_11', ch: 2,
    text: "Step four: slide all three ultrasonic sensors into the angled bumper — left, center, and right. Look how clean that chassis is!"
  },

  // CH 4: Ultrasonic Sensor Wiring
  {
    id: 'beat_12', ch: 3,
    text: "Now let's wire this cleanly. First, share five volts and ground from the Arduino to V-C-C and G-N-D on all three sensors."
  },
  {
    id: 'beat_13', ch: 3,
    text: "Left sensor... trigger goes to pin D-two, and echo goes to D-three."
  },
  {
    id: 'beat_14', ch: 3,
    text: "Center sensor — our straight-ahead lookout — trigger to D-four, echo to D-five."
  },
  {
    id: 'beat_15', ch: 3,
    text: "And the right sensor: trigger to D-six, echo to D-seven. Remember the physics — distance equals echo time times zero point zero three four three, divided by two!"
  },

  // CH 5: L298N Motor Driver & Parallel 4WD Motors
  {
    id: 'beat_16', ch: 4,
    text: "Next, wire the motor driver signals: I-N-one to D-nine and I-N-two to D-eight for the left... then I-N-three to D-eleven and I-N-four to D-twelve for the right."
  },
  {
    id: 'beat_17', ch: 4,
    text: "Quick tip! Don't pull off those two yellow five-volt jumpers on E-N-A and E-N-B — leave them on so both motor channels stay enabled."
  },
  {
    id: 'beat_18', ch: 4,
    text: "For true four-wheel drive, wire both left motors together to out-one and out-two... and both right motors together to out-three and out-four."
  },

  // CH 6: 7.4V LiPo Power & Golden Safety Rules
  {
    id: 'beat_19', ch: 5,
    text: "Time to power up! Connect battery red positive to L-two-ninety-eight-N twelve-volt, and black negative to ground... and always double-check polarity first!"
  },
  {
    id: 'beat_20', ch: 5,
    text: "Pause right here — this is the number one mistake students make. Always connect L-two-ninety-eight-N ground to Arduino ground! Without common ground, nothing responds."
  },
  {
    id: 'beat_21', ch: 5,
    text: "Then route the regulated five-volt output to power the Arduino safely. Never feed seven-point-four volts straight into Arduino five-volt or signal pins!"
  },

  // CH 7: Arduino Code Walkthrough
  {
    id: 'beat_22', ch: 6,
    text: "Now the code — and zero external libraries needed! Up top, we set pins D-two through D-twelve, a fifteen-centimeter front limit, seventeen on the sides, and a fifty-millisecond loop."
  },
  {
    id: 'beat_23', ch: 6,
    text: "The getDistance function fires a quick ten-microsecond pulse... measures the echo with pulseIn... and turns that time straight into centimeters."
  },
  {
    id: 'beat_24', ch: 6,
    text: "MotorControl sets left and right speed. Two fifty-five on both drives straight ahead... stop one side, and it pivots on a dime!"
  },
  {
    id: 'beat_25', ch: 6,
    text: "In the main loop, center gets checked first. If a wall is under fifteen centimeters, it compares left versus right and steers toward the wider open lane."
  },

  // CH 8: Live Autonomous Obstacle Course Demo
  {
    id: 'beat_26', ch: 7,
    text: "Upload the code, switch on the battery, and watch it fly! Clear track ahead — all four wheels launch at full power."
  },
  {
    id: 'beat_27', ch: 7,
    text: "Heads up — obstacle on the left under seventeen centimeters! Right wheels brake, left wheels drive, pivoting smoothly right."
  },
  {
    id: 'beat_28', ch: 7,
    text: "Now a barrier on the right! Right motors surge to two fifty-five, carving a crisp left turn right around it."
  },
  {
    id: 'beat_29', ch: 7,
    text: "Dead-end wall straight ahead under fifteen centimeters... it checks both sides, sees wide open space on the left, and swings straight into the escape lane!"
  },
  {
    id: 'beat_30', ch: 7,
    text: "Across the finish line — one hundred percent autonomous! You've got every part, every wire, and every line of code. Scroll down, grab the CAD files, and go build yours!"
  }
];

/**
 * Pure-JS MPEG-1 Layer III (MP3 44.1 kHz CBR/VBR) duration calculator.
 * Accurate to ~0.02s with zero external dependencies.
 */
function getMp3DurationSeconds(filePath) {
  const buf = readFileSync(filePath);
  const bitratesV1L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
  const sampleRatesV1 = [44100, 48000, 32000, 0];
  let offset = 0;

  // Skip ID3v2 header if present
  if (buf.length > 10 && buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
    offset = 10 + size;
  }

  let totalSec = 0;
  while (offset + 4 < buf.length) {
    if (buf[offset] === 0xff && (buf[offset + 1] & 0xe0) === 0xe0) {
      const versionBits = (buf[offset + 1] >> 3) & 0x03;
      const layerBits = (buf[offset + 1] >> 1) & 0x03;
      const brIdx = (buf[offset + 2] >> 4) & 0x0f;
      const srIdx = (buf[offset + 2] >> 2) & 0x03;
      const pad = (buf[offset + 2] >> 1) & 0x01;

      if (versionBits === 3 && layerBits === 1 && brIdx > 0 && brIdx < 15 && srIdx < 3) {
        const br = bitratesV1L3[brIdx] * 1000;
        const sr = sampleRatesV1[srIdx];
        const frameLen = Math.floor((144 * br) / sr) + pad;
        if (frameLen > 4 && offset + frameLen <= buf.length) {
          totalSec += 1152 / sr;
          offset += frameLen;
          continue;
        }
      }
    }
    offset++;
  }
  // Fallback estimate for 128kbps if sync scan found 0
  return totalSec > 0.2 ? Number(totalSec.toFixed(2)) : Number((buf.length / 16000).toFixed(2));
}

async function generateAll() {
  mkdirSync(AUDIO_DIR, { recursive: true });
  const client = new ElevenLabsClient(); // Reads ELEVENLABS_API_KEY from .env.local
  const forceRegen = process.argv.includes('--force');

  const totalChars = NARRATION_BEATS.reduce((sum, b) => sum + b.text.length, 0);
  console.log(`ElevenLabs Teacher Narration Generator (${MODEL_ID}, voice=${VOICE_ID})`);
  console.log(`Total beats: ${NARRATION_BEATS.length} | Total script characters: ${totalChars}`);

  const manifest = [];

  for (let i = 0; i < NARRATION_BEATS.length; i++) {
    const beat = NARRATION_BEATS[i];
    const outFile = path.join(AUDIO_DIR, `${beat.id}.mp3`);
    const relSrc = `audio/${beat.id}.mp3`;

    if (!forceRegen && existsSync(outFile)) {
      const dur = getMp3DurationSeconds(outFile);
      console.log(`  [cached] ${beat.id}.mp3 (${dur}s)`);
      manifest.push({ id: beat.id, ch: beat.ch, src: relSrc, duration: dur });
      continue;
    }

    const prevText = i > 0 ? NARRATION_BEATS[i - 1].text : undefined;
    const nextText = i < NARRATION_BEATS.length - 1 ? NARRATION_BEATS[i + 1].text : undefined;

    process.stdout.write(`  [synth ${String(i + 1).padStart(2, '0')}/${NARRATION_BEATS.length}] ${beat.id}.mp3 ... `);
    const audioStream = await client.textToSpeech.convert(VOICE_ID, {
      text: beat.text,
      modelId: MODEL_ID,
      outputFormat: OUTPUT_FORMAT,
      previousText: prevText,
      nextText: nextText,
      voiceSettings: {
        stability: 0.35,
        similarityBoost: 0.70
      }
    });

    await pipeline(Readable.fromWeb(audioStream), createWriteStream(outFile));
    const dur = getMp3DurationSeconds(outFile);
    console.log(`OK (${dur}s)`);
    manifest.push({ id: beat.id, ch: beat.ch, src: relSrc, duration: dur });
  }

  // Write JSON manifest + classic script manifest (works seamlessly offline on file:// too!)
  const totalAudioSec = Number(manifest.reduce((s, m) => s + m.duration, 0).toFixed(2));
  const payload = {
    voiceId: VOICE_ID,
    modelId: MODEL_ID,
    totalAudioSec,
    beats: manifest
  };
  writeFileSync(path.join(AUDIO_DIR, 'manifest.json'), JSON.stringify(payload, null, 2));
  writeFileSync(
    path.join(AUDIO_DIR, 'narration_manifest.js'),
    `/* Auto-generated by scripts/generate_narration.mjs */\nwindow.RACER_NARRATION_MANIFEST = ${JSON.stringify(payload, null, 2)};\n`
  );
  console.log(`\nDone! Generated ${manifest.length} studio MP3 tracks (total spoken audio: ${totalAudioSec}s).`);
}

generateAll().catch((err) => {
  console.error('ElevenLabs narration generation failed:', err?.message || err);
  process.exit(1);
});
