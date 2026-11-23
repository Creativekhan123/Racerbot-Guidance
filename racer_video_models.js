/* ==========================================================================
   Autonomous Racer Robot — Three.js 3D Robot, CAD Loader & Wiring Engine
   Scale: 1 Three.js unit = 1 cm (Robot: 13.4 cm W x 5.2 cm H x 18.0 cm L)
   Forward = +Z, Up = +Y, Robot Left = +X, Robot Right = -X
   ========================================================================== */

(function (global) {
  'use strict';

  function createCanvasTexture(width, height, drawFn) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    drawFn(ctx, width, height);
    var tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }

  /* ---------- Procedural Textures for Crisp Hardware Fidelity ---------- */

  function makeArduinoTexture() {
    return createCanvasTexture(512, 384, function (ctx, w, h) {
      // Iconic Arduino Teal PCB
      ctx.fillStyle = '#007b82';
      ctx.fillRect(0, 0, w, h);

      // Subtle copper traces
      ctx.strokeStyle = 'rgba(0, 168, 178, 0.35)';
      ctx.lineWidth = 2;
      for (var i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.moveTo(90 + i * 22, 34);
        ctx.lineTo(130 + i * 16, 175);
        ctx.lineTo(180 + i * 14, 340);
        ctx.stroke();
      }

      // White silkscreen border
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Header silkscreen labels (Top row: Digital D13..D2)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      var dLabels = ['GND', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
      for (var d = 0; d < dLabels.length; d++) {
        ctx.fillText(dLabels[d], 112 + d * 25.5, 58);
      }
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('DIGITAL (PWM~)', 295, 76);

      // Bottom row: Power & Analog
      var pLabels = ['3V3', '5V', 'GND', 'GND', 'VIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
      ctx.font = 'bold 14px monospace';
      for (var p = 0; p < pLabels.length; p++) {
        ctx.fillText(pLabels[p], 165 + p * 27, h - 46);
      }
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('POWER          ANALOG IN', 300, h - 66);

      // Arduino Infinity Emblem + Branding
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(215, 165, 22, 0, Math.PI * 2);
      ctx.arc(255, 165, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#007b82';
      ctx.beginPath();
      ctx.arc(215, 165, 14, 0, Math.PI * 2);
      ctx.arc(255, 165, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('-', 215, 171);
      ctx.fillText('+', 255, 172);

      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ARDUINO', 292, 165);
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#d1fae5';
      ctx.fillText('UNO R3', 295, 194);
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText('ATmega328P  16MHz', 180, 232);
    });
  }

  function makeL298NTexture() {
    return createCanvasTexture(384, 384, function (ctx, w, h) {
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Silkscreen Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('L298N', w / 2, 236);
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#fecaca';
      ctx.fillText('DUAL H-BRIDGE', w / 2, 258);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('OUT1  OUT2', 52, 200);
      ctx.fillText('OUT3  OUT4', w - 52, 200);
      ctx.fillText('12V  GND  5V', 105, 345);
      ctx.font = 'bold 13px monospace';
      ctx.fillText('ENA IN1 IN2 IN3 IN4 ENB', 274, 345);
    });
  }

  function makeBatteryTexture() {
    return createCanvasTexture(512, 256, function (ctx, w, h) {
      var grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#f97316');
      grad.addColorStop(0.55, '#ea580c');
      grad.addColorStop(1, '#c2410c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Metallic silver racing stripe
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 22, w, 46);
      ctx.fillStyle = '#0f172a';
      ctx.font = '900 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ORANGE LiPo', w / 2, 57);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 54px monospace';
      ctx.fillText('7.4V 850mAh', w / 2, 144);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('2S  30C / 60C HIGH-DISCHARGE', w / 2, 192);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(24, 212, w - 48, 28);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('⚠ VERIFY POLARITY (+ RED / - BLACK)', w / 2, 231);
    });
  }

  function makeUltrasonicMeshTexture() {
    return createCanvasTexture(128, 128, function (ctx, w, h) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#64748b';
      for (var y = 6; y < h; y += 8) {
        for (var x = 6; x < w; x += 8) {
          ctx.beginPath();
          ctx.arc(x + ((y / 8) % 2 ? 4 : 0), y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2 - 4, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  function makeBatGripBumpTexture() {
    return createCanvasTexture(256, 128, function (ctx, w, h) {
      ctx.fillStyle = '#404040';
      ctx.fillRect(0, 0, w, h);
      // Raised octopus suction dots
      for (var y = 8; y < h; y += 16) {
        for (var x = 8; x < w; x += 16) {
          var ox = x + (((y / 16) % 2) * 8);
          var grd = ctx.createRadialGradient(ox, y, 1, ox, y, 6);
          grd.addColorStop(0, '#ffffff');
          grd.addColorStop(0.7, '#b0b0b0');
          grd.addColorStop(1, '#404040');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(ox, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }

  function makeGridFloorTexture() {
    return createCanvasTexture(512, 512, function (ctx, w, h) {
      ctx.fillStyle = '#070e1d';
      ctx.fillRect(0, 0, w, h);
      // Sub-grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= w; i += 32) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }
      // Major grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 2;
      for (var j = 0; j <= w; j += 128) {
        ctx.beginPath(); ctx.moveTo(j, 0); ctx.lineTo(j, h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }
    });
  }

  /* ---------- Fallback Procedural CAD Meshes (exact mm -> cm dimensions) ---------- */

  function buildProceduralChassis() {
    var grp = new THREE.Group();
    var mat = new THREE.MeshStandardMaterial({
      color: 0xf5c518, // Vibrant Racing Yellow chassis — pops cleanly against dark blue grid & all mounted modules
      roughness: 0.48,
      metalness: 0.08
    });

    // Main base deck
    var deck = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.45, 16.4), mat);
    deck.position.set(0, 0.22, -0.4);
    deck.castShadow = true;
    deck.receiveShadow = true;
    grp.add(deck);

    // Rear widening deck for Arduino UNO
    var rearDeck = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.5, 4.4), mat);
    rearDeck.position.set(0, 0.25, -6.8);
    rearDeck.castShadow = true;
    grp.add(rearDeck);

    // Arduino elevated standoff cradle
    var cradle = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.5, 5.6), mat);
    cradle.position.set(0, 1.0, -5.6);
    cradle.castShadow = true;
    grp.add(cradle);

    // Central battery bay walls
    var wallL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.7, 5.2), mat);
    wallL.position.set(3.9, 1.0, -0.3);
    var wallR = wallL.clone();
    wallR.position.x = -3.9;
    grp.add(wallL, wallR);

    // Front 3-facet Angled Bumper (matches AutonomousRacerBot.glb contour!)
    var centerBumper = new THREE.Mesh(new THREE.BoxGeometry(4.9, 5.1, 0.45), mat);
    centerBumper.position.set(0, 2.55, 8.85);
    centerBumper.castShadow = true;
    grp.add(centerBumper);

    var leftBumper = new THREE.Mesh(new THREE.BoxGeometry(5.1, 5.1, 0.45), mat);
    leftBumper.position.set(4.45, 2.55, 7.38);
    leftBumper.rotation.y = 0.61; // +35 deg
    leftBumper.castShadow = true;
    grp.add(leftBumper);

    var rightBumper = new THREE.Mesh(new THREE.BoxGeometry(5.1, 5.1, 0.45), mat);
    rightBumper.position.set(-4.45, 2.55, 7.38);
    rightBumper.rotation.y = -0.61; // -35 deg
    rightBumper.castShadow = true;
    grp.add(rightBumper);

    // Front floor fill under bumper
    var frontFloor = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.45, 3.2), mat);
    frontFloor.position.set(0, 0.22, 6.8);
    grp.add(frontFloor);

    return grp;
  }

  function buildProceduralClamp() {
    var grp = new THREE.Group();
    var mat = new THREE.MeshStandardMaterial({
      color: 0x2e80f5, // Electric Cobalt Blue motor clamps — clearly distinct from yellow chassis & brass motors
      roughness: 0.45,
      metalness: 0.08
    });
    // Bridge arch over N20 motor + two screw ears
    var arch = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 1.35), mat);
    arch.position.set(0, 0.6, 0);
    arch.castShadow = true;
    var ear1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 1.35), mat);
    ear1.position.set(1.15, 0.18, 0);
    var ear2 = ear1.clone();
    ear2.position.x = -1.15;
    grp.add(arch, ear1, ear2);
    return grp;
  }

  function buildProceduralWheelRim() {
    var grp = new THREE.Group();
    var mat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.42,
      metalness: 0.08
    });
    var outer = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 1.85, 28, 1, true), mat);
    outer.rotation.x = Math.PI / 2;
    var disc = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.28, 28), mat);
    disc.rotation.x = Math.PI / 2;
    var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.6, 16), mat);
    hub.rotation.x = Math.PI / 2;
    grp.add(outer, disc, hub);
    return grp;
  }

  /* ---------- Hardware Component Builders ---------- */

  function buildN20Motor(sideSign) {
    // sideSign: +1 for Left (+X), -1 for Right (-X)
    // Built with shaft pointing along +X * sideSign
    var grp = new THREE.Group();
    var brassMat = new THREE.MeshStandardMaterial({ color: 0xd4a029, roughness: 0.32, metalness: 0.85 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.28, metalness: 0.88 });
    var capMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65, metalness: 0.15 });
    var copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.35, metalness: 0.9 });

    // Metal gearbox
    var gearbox = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 1.2), brassMat);
    gearbox.position.set(sideSign * 0.55, 0, 0);
    gearbox.castShadow = true;
    grp.add(gearbox);

    // Cylindrical DC motor housing
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.54, 1.55, 18), steelMat);
    body.rotation.z = Math.PI / 2;
    body.position.set(-sideSign * 0.72, 0, 0);
    body.castShadow = true;
    grp.add(body);

    // Rear black plastic cap
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.25, 18), capMat);
    cap.rotation.z = Math.PI / 2;
    cap.position.set(-sideSign * 1.58, 0, 0);
    grp.add(cap);

    // Copper solder terminals
    var t1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.12), copperMat);
    t1.position.set(-sideSign * 1.78, 0.18, 0.22);
    var t2 = t1.clone();
    t2.position.z = -0.22;
    grp.add(t1, t2);

    // Steel D-shaft
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.1, 12), steelMat);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(sideSign * 1.5, 0, 0);
    grp.add(shaft);

    return grp;
  }

  function buildM2BoltAndNut() {
    var steelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25, metalness: 0.92 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.7 });

    var bolt = new THREE.Group();
    var head = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.24, 14), steelMat);
    head.position.y = 0.62;
    var socket = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 6), darkMat);
    socket.position.y = 0.74;
    var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.0, 10), steelMat);
    stem.position.y = 0.05;
    bolt.add(head, socket, stem);

    var nut = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.18, 6), steelMat);
    return { bolt: bolt, nut: nut };
  }

  function buildM3CSKScrew() {
    var blackOxide = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.85 });
    var grp = new THREE.Group();
    // Conical CSK head
    var head = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.16, 0.2, 16), blackOxide);
    head.position.y = 0.5;
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.9, 12), blackOxide);
    shaft.position.y = -0.02;
    grp.add(head, shaft);
    return grp;
  }

  function buildArduinoUno() {
    var grp = new THREE.Group();
    var visualHolder = new THREE.Group();
    grp.add(visualHolder);

    var fallback = new THREE.Group();
    var pcbTex = makeArduinoTexture();
    var topMat = new THREE.MeshStandardMaterial({ map: pcbTex, roughness: 0.42, metalness: 0.12 });
    var sideMat = new THREE.MeshStandardMaterial({ color: 0x00656b, roughness: 0.5 });

    // PCB (6.86 cm along X, 5.33 cm along Z, bottom at Y = 0)
    // Oriented to match real CAD standoffs: USB-B at (+X, +Z), Digital header at +Z, Power/Analog at -Z
    var pcb = new THREE.Mesh(
      new THREE.BoxGeometry(6.86, 0.16, 5.33),
      [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]
    );
    pcb.position.y = 0.08;
    pcb.castShadow = true;
    pcb.receiveShadow = true;
    fallback.add(pcb);

    // Brushed aluminum USB-B connector (+X, +Z corner)
    var metalMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.24, metalness: 0.9 });
    var usb = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.08, 1.2), metalMat);
    usb.position.set(3.25, 0.70, 1.15);
    usb.castShadow = true;
    fallback.add(usb);

    // Black DC barrel jack (+X, -Z corner)
    var blackPlastic = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.55, metalness: 0.15 });
    var barrel = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.08, 0.9), blackPlastic);
    barrel.position.set(2.95, 0.70, -1.82);
    fallback.add(barrel);

    // ATmega328P IC
    var chip = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.36, 0.8), blackPlastic);
    chip.position.set(-0.9, 0.34, -0.95);
    fallback.add(chip);

    // Female Digital Header Strip (+Z front edge: SCL..D0 from +X to -X)
    var headerDig = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.88, 0.28), blackPlastic);
    headerDig.position.set(-0.58, 0.60, 2.38);
    fallback.add(headerDig);

    // Female Power & Analog Header Strip (-Z rear edge: NC..A5 from +X to -X)
    var headerPwr = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.88, 0.28), blackPlastic);
    headerPwr.position.set(-1.14, 0.60, -2.38);
    fallback.add(headerPwr);

    // Reset Tactile Button
    var resetBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.25, 12), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }));
    resetBtn.position.set(2.8, 0.28, 2.15);
    fallback.add(resetBtn);

    visualHolder.add(fallback);

    // Live Status LEDs (mounted on grp so they stay glowing on top of the real GLB PCB!)
    var onLedMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.1, roughness: 0.2
    });
    var onLed = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.16), onLedMat);
    onLed.position.set(-2.15, 0.26, 0.75);
    grp.add(onLed);

    var txLedMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.0, roughness: 0.2
    });
    var txLed = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.16), txLedMat);
    txLed.position.set(1.35, 0.26, 0.55);
    grp.add(txLed);

    // Exact Pin Map in Arduino local coordinates (matches real Elegoo/UNO R3 GLB @ rotY=+90deg, 2.54mm pitch!)
    // Digital header along Z = +2.38 (front edge facing L298N/sensors), D12..D2 going from +X toward -X
    // Power header along Z = -2.38 (rear edge), 5V/GND/GND/VIN going from +X toward -X
    var localPins = {
      D12: new THREE.Vector3( 0.47, 1.08,  2.38),
      D11: new THREE.Vector3( 0.22, 1.08,  2.38),
      D9:  new THREE.Vector3(-0.29, 1.08,  2.38),
      D8:  new THREE.Vector3(-0.55, 1.08,  2.38),
      D7:  new THREE.Vector3(-0.95, 1.08,  2.38),
      D6:  new THREE.Vector3(-1.21, 1.08,  2.38),
      D5:  new THREE.Vector3(-1.46, 1.08,  2.38),
      D4:  new THREE.Vector3(-1.71, 1.08,  2.38),
      D3:  new THREE.Vector3(-1.97, 1.08,  2.38),
      D2:  new THREE.Vector3(-2.22, 1.08,  2.38),
      '5V':  new THREE.Vector3(-0.38, 1.08, -2.38),
      GND:   new THREE.Vector3(-0.63, 1.08, -2.38),
      GND2:  new THREE.Vector3(-0.88, 1.08, -2.38),
      VIN:   new THREE.Vector3(-1.14, 1.08, -2.38)
    };

    return {
      group: grp,
      visualHolder: visualHolder,
      fallback: fallback,
      onLedMat: onLedMat,
      txLedMat: txLedMat,
      localPins: localPins
    };
  }

  function buildL298N() {
    var grp = new THREE.Group();
    var visualHolder = new THREE.Group();
    grp.add(visualHolder);

    var fallback = new THREE.Group();
    var pcbTex = makeL298NTexture();
    var topMat = new THREE.MeshStandardMaterial({ map: pcbTex, roughness: 0.42, metalness: 0.14 });
    var sideMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 });

    // PCB (4.30 cm x 4.37 cm, bottom at Y = 0)
    // Oriented to match real CAD & robot photo: Heatsink at +Z (front), Power block (+X, -Z) & Logic pins (-X, -Z)
    var pcb = new THREE.Mesh(
      new THREE.BoxGeometry(4.30, 0.16, 4.37),
      [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]
    );
    pcb.position.y = 0.08;
    pcb.castShadow = true;
    pcb.receiveShadow = true;
    fallback.add(pcb);

    // Finned black heatsink (+Z front edge)
    var hsMat = new THREE.MeshStandardMaterial({ color: 0x1a1f2b, roughness: 0.36, metalness: 0.68 });
    var hsBase = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.4, 0.45), hsMat);
    hsBase.position.set(0, 1.36, 1.25);
    hsBase.castShadow = true;
    fallback.add(hsBase);
    for (var f = -2; f <= 2; f++) {
      var fin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.4, 1.05), hsMat);
      fin.position.set(f * 0.48, 1.36, 1.65);
      fin.castShadow = true;
      fallback.add(fin);
    }

    // Screw terminal blocks (Blue plastic + silver screws)
    var blueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.40 });
    var screwMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25, metalness: 0.9 });

    function makeTermBlock(w, h, d, count) {
      var g = new THREE.Group();
      var box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), blueMat);
      box.castShadow = true;
      g.add(box);
      for (var i = 0; i < count; i++) {
        var frac = (i - (count - 1) / 2);
        var sc = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 10), screwMat);
        sc.position.y = h / 2 + 0.04;
        if (w >= d) sc.position.x = frac * (w / count);
        else sc.position.z = frac * (d / count);
        g.add(sc);
      }
      return g;
    }

    // Left motor outputs OUT1/OUT2 (+X edge)
    var outL = makeTermBlock(0.75, 0.98, 1.05, 2);
    outL.position.set(1.68, 0.65, -0.70);
    fallback.add(outL);

    // Right motor outputs OUT3/OUT4 (-X edge)
    var outR = makeTermBlock(0.75, 0.98, 1.05, 2);
    outR.position.set(-1.68, 0.65, -0.70);
    fallback.add(outR);

    // Power block (12V, GND, 5V) facing rear (-Z edge, +X half)
    var pwrBlock = makeTermBlock(1.55, 0.98, 0.72, 3);
    pwrBlock.position.set(0.73, 0.65, -1.69);
    fallback.add(pwrBlock);

    // Electrolytic Capacitors
    var capMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.6 });
    var capTopMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25, metalness: 0.9 });
    [[-0.85, 0.25], [0.85, 0.25]].forEach(function (pos) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.95, 16), capMat);
      c.position.set(pos[0], 0.64, pos[1]);
      var ct = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 16), capTopMat);
      ct.position.set(pos[0], 1.12, pos[1]);
      fallback.add(c, ct);
    });

    // Pin Header Strip (ENA, IN1, IN2, IN3, IN4, ENB) along -Z (-X half)
    var pinStrip = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 0.25, 0.48),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 })
    );
    pinStrip.position.set(-0.83, 0.28, -1.78);
    fallback.add(pinStrip);

    // Removable Yellow 5V Jumper Caps on ENA and ENB (highlighted in Chapter 5!)
    var jumperMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.15, roughness: 0.35
    });
    var enaJumper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.60, 0.48), jumperMat);
    enaJumper.position.set(-0.20, 0.70, -1.78);
    var enbJumper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.60, 0.48), jumperMat);
    enbJumper.position.set(-1.46, 0.70, -1.78);
    fallback.add(enaJumper, enbJumper);

    visualHolder.add(fallback);

    // Live Red Power LED (mounted on grp right above real GLB SMD LED so it lights up live!)
    var pwrLedMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.05, roughness: 0.2
    });
    var pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.12, 0.24), pwrLedMat);
    pwrLed.position.set(0.10, 0.32, -1.10);
    grp.add(pwrLed);

    // Exact Pin Map matching real L298N GLB (centered, PCB bottom Y=0, rotY=180deg)
    var localPins = {
      V12:  new THREE.Vector3( 1.23, 1.16, -1.69),
      GND:  new THREE.Vector3( 0.73, 1.16, -1.69),
      V5:   new THREE.Vector3( 0.23, 1.16, -1.69),
      ENA:  new THREE.Vector3(-0.20, 1.05, -1.78),
      IN1:  new THREE.Vector3(-0.45, 1.05, -1.78),
      IN2:  new THREE.Vector3(-0.71, 1.05, -1.78),
      IN3:  new THREE.Vector3(-0.96, 1.05, -1.78),
      IN4:  new THREE.Vector3(-1.21, 1.05, -1.78),
      ENB:  new THREE.Vector3(-1.46, 1.05, -1.78),
      OUT1: new THREE.Vector3( 1.65, 1.16, -0.45),
      OUT2: new THREE.Vector3( 1.65, 1.16, -0.95),
      OUT3: new THREE.Vector3(-1.65, 1.16, -0.45),
      OUT4: new THREE.Vector3(-1.65, 1.16, -0.95)
    };

    return {
      group: grp,
      visualHolder: visualHolder,
      fallback: fallback,
      pwrLedMat: pwrLedMat,
      jumperMat: jumperMat,
      localPins: localPins
    };
  }

  function buildBatteryAndTape() {
    var grp = new THREE.Group();
    var tex = makeBatteryTexture();
    var topMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, metalness: 0.2 });
    var sideMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.4, metalness: 0.25 });

    var pack = new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 1.45, 2.95),
      [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]
    );
    pack.position.y = 0.78;
    pack.castShadow = true;
    grp.add(pack);

    // Yellow XT60 Plug on +X side (Robot Left — matches real robot build & aligns cleanly with L298N 12V/GND!)
    var xtMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 });
    var xt60 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.55), xtMat);
    xt60.position.set(3.15, 0.72, 0.45);
    grp.add(xt60);

    // White JST-XH Balance Plug
    var jst = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.38, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
    );
    jst.position.set(-3.0, 0.62, -0.5);
    grp.add(jst);

    var localPins = {
      POS: new THREE.Vector3(3.2, 0.85, 0.62),
      NEG: new THREE.Vector3(3.2, 0.85, 0.26)
    };

    // Double-sided heavy-duty foam tape strip (separately animated!)
    var tape = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 0.14, 2.3),
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.08,
        roughness: 0.7
      })
    );

    return { batteryGroup: grp, tapeMesh: tape, localPins: localPins };
  }

  function buildUltrasonicSensor(tagName) {
    var grp = new THREE.Group();
    // Blue PCB (4.4 cm wide, 2.0 cm tall, 0.16 cm thick) facing +Z
    var pcbMat = new THREE.MeshStandardMaterial({ color: 0x1456a8, roughness: 0.42, metalness: 0.14 });
    var pcb = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 0.18), pcbMat);
    pcb.castShadow = true;
    grp.add(pcb);

    // Twin metallic chrome cylinders with acoustic mesh faces
    var chromeMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.22, metalness: 0.92 });
    var meshTex = makeUltrasonicMeshTexture();
    var faceMat = new THREE.MeshStandardMaterial({ map: meshTex, roughness: 0.4, metalness: 0.6 });

    [-1.25, 1.25].forEach(function (xOff) {
      var cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 1.15, 22), chromeMat);
      cyl.rotation.x = Math.PI / 2;
      cyl.position.set(xOff, 0, 0.62);
      cyl.castShadow = true;
      grp.add(cyl);

      var face = new THREE.Mesh(new THREE.CircleGeometry(0.72, 22), faceMat);
      face.position.set(xOff, 0, 1.21);
      grp.add(face);
    });

    // Metallic Crystal between transducers
    var xtal = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.35, 0.28), chromeMat);
    xtal.position.set(0, 0.65, 0.22);
    grp.add(xtal);

    // 4-pin bottom header (VCC, TRIG, ECHO, GND) pointing inward (-Z)
    var pinMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.9 });
    var pinOffsets = [-0.42, -0.14, 0.14, 0.42];
    pinOffsets.forEach(function (px) {
      var pin = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.75, 8), pinMat);
      pin.rotation.x = Math.PI / 2;
      pin.position.set(px, -0.78, -0.42);
      grp.add(pin);
    });

    // Volumetric Sonar Cone + 3 Expanding Acoustic Rings (animated in scenes!)
    var coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    // Cone tip at sensor (Z=1.25), opening outward along +Z
    var coneGeo = new THREE.ConeGeometry(4.2, 16.0, 24, 1, true);
    coneGeo.translate(0, -8.0, 0);
    coneGeo.rotateX(-Math.PI / 2);
    var cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(0, 0, 1.25);
    grp.add(cone);

    var rings = [];
    for (var r = 0; r < 3; r++) {
      var rMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      var ring = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.92, 28), rMat);
      ring.position.set(0, 0, 1.3);
      grp.add(ring);
      rings.push({ mesh: ring, mat: rMat, phase: r / 3 });
    }

    var localPins = {
      VCC:  new THREE.Vector3(-0.42, -0.78, -0.75),
      TRIG: new THREE.Vector3(-0.14, -0.78, -0.75),
      ECHO: new THREE.Vector3(0.14,  -0.78, -0.75),
      GND:  new THREE.Vector3(0.42,  -0.78, -0.75)
    };

    return {
      name: tagName,
      group: grp,
      cone: cone,
      coneMat: coneMat,
      rings: rings,
      localPins: localPins
    };
  }

  /* ---------- Complete 4WD Autonomous Racer Robot Assembly ---------- */

  function createRobotAssembly(scene, onCadLoaded) {
    var root = new THREE.Group();
    scene.add(root);

    // 1. Chassis Container (loads real AutonomousRacerBot.glb, falls back to procedural)
    var chassisHolder = new THREE.Group();
    var fallbackChassis = buildProceduralChassis();
    chassisHolder.add(fallbackChassis);
    root.add(chassisHolder);

    // 2. Four N20 Motors + Clamps + M2 Bolts/Nuts + Wheels + Orange Bat-Grip Sleeves
    // Positions matched to AutonomousRacerBot.glb wheel cutouts!
    var wheelConfigs = [
      { id: 'FL', side:  1, z:  3.6, label: 'Front-Left' },
      { id: 'RL', side:  1, z: -6.7, label: 'Rear-Left' },
      { id: 'FR', side: -1, z:  3.6, label: 'Front-Right' },
      { id: 'RR', side: -1, z: -6.7, label: 'Rear-Right' }
    ];

    var batGripBump = makeBatGripBumpTexture();
    var batGripMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      roughness: 0.72,
      metalness: 0.04,
      bumpMap: batGripBump,
      bumpScale: 0.14
    });

    var motors = [];
    var clamps = [];
    var m2Fasteners = [];
    var wheels = [];
    var wheelRimHolders = [];

    wheelConfigs.forEach(function (cfg) {
      // N20 Motor
      var motor = buildN20Motor(cfg.side);
      var mTarget = new THREE.Vector3(cfg.side * 4.15, 1.05, cfg.z);
      motor.position.copy(mTarget);
      motor.userData = { target: mTarget.clone(), side: cfg.side, id: cfg.id };
      root.add(motor);
      motors.push(motor);

      // 3D-Printed Orange Motor Clamp
      var clampHolder = new THREE.Group();
      var procClamp = buildProceduralClamp();
      clampHolder.add(procClamp);
      var cTarget = new THREE.Vector3(cfg.side * 4.35, 0.45, cfg.z);
      clampHolder.position.copy(cTarget);
      clampHolder.rotation.y = Math.PI / 2;
      clampHolder.userData = { target: cTarget.clone(), side: cfg.side, id: cfg.id, fallback: procClamp };
      root.add(clampHolder);
      clamps.push(clampHolder);

      // 2x M2x10mm Socket Bolts + 2x M2 Hex Nuts per clamp
      [-1.08, 1.08].forEach(function (zOff) {
        var pair = buildM2BoltAndNut();
        var bTarget = new THREE.Vector3(cfg.side * 4.35, 0.52, cfg.z + zOff);
        var nTarget = new THREE.Vector3(cfg.side * 4.35, -0.05, cfg.z + zOff);
        pair.bolt.position.copy(bTarget);
        pair.nut.position.copy(nTarget);
        root.add(pair.bolt, pair.nut);
        m2Fasteners.push({
          bolt: pair.bolt,
          nut: pair.nut,
          boltTarget: bTarget.clone(),
          nutTarget: nTarget.clone(),
          side: cfg.side
        });
      });

      // Wheel Assembly (Rotates around X axle!)
      var wheelPivot = new THREE.Group();
      var wTarget = new THREE.Vector3(cfg.side * 6.05, 1.05, cfg.z);
      wheelPivot.position.copy(wTarget);

      // Rim holder (loads Original_Robojunkies_wheel.glb or procedural white 3-spoke rim)
      var rimHolder = new THREE.Group();
      var procRim = buildProceduralWheelRim();
      rimHolder.add(procRim);
      rimHolder.rotation.y = Math.PI / 2; // Align GLB Z-axle to robot X-axle
      rimHolder.userData = { fallback: procRim };
      wheelPivot.add(rimHolder);
      wheelRimHolders.push(rimHolder);

      // Vibrant Orange Octopus Cricket Bat-Grip Tire Sleeve
      var tireShellGeo = new THREE.CylinderGeometry(1.70, 1.70, 1.86, 30, 1, true);
      var tireShell = new THREE.Mesh(tireShellGeo, batGripMat);
      tireShell.rotation.z = Math.PI / 2;
      tireShell.castShadow = true;
      var tireLipOut = new THREE.Mesh(new THREE.RingGeometry(1.42, 1.70, 30), batGripMat);
      tireLipOut.rotation.y = Math.PI / 2;
      tireLipOut.position.x = 0.93;
      var tireLipIn = new THREE.Mesh(new THREE.RingGeometry(1.42, 1.70, 30), batGripMat);
      tireLipIn.rotation.y = -Math.PI / 2;
      tireLipIn.position.x = -0.93;

      var gripGroup = new THREE.Group();
      gripGroup.add(tireShell, tireLipOut, tireLipIn);
      wheelPivot.add(gripGroup);

      wheelPivot.userData = {
        target: wTarget.clone(),
        side: cfg.side,
        id: cfg.id,
        gripGroup: gripGroup,
        rimHolder: rimHolder
      };
      root.add(wheelPivot);
      wheels.push(wheelPivot);
    });

    // 3. Double-Sided Foam Tape & Orange 7.4V LiPo Battery (Center Bay)
    var batParts = buildBatteryAndTape();
    var tapeTarget = new THREE.Vector3(0, 0.48, -0.3);
    batParts.tapeMesh.position.copy(tapeTarget);
    batParts.tapeMesh.userData = { target: tapeTarget.clone() };
    root.add(batParts.tapeMesh);

    var batTarget = new THREE.Vector3(0, 0.56, -0.3);
    batParts.batteryGroup.position.copy(batTarget);
    batParts.batteryGroup.userData = { target: batTarget.clone() };
    root.add(batParts.batteryGroup);

    // 4. L298N Dual H-Bridge Motor Driver (Rests flush on 4 front CAD standoffs @ Y=1.80 cm!)
    var l298n = buildL298N();
    var l298Target = new THREE.Vector3(-0.28, 1.80, 4.12);
    l298n.group.position.copy(l298Target);
    l298n.group.userData = { target: l298Target.clone() };
    root.add(l298n.group);

    // 5. Arduino UNO (Rests flush on 4 rear CAD standoffs @ Y=2.00 cm!) + M3x10mm Black CSK Screws
    var arduino = buildArduinoUno();
    var ardTarget = new THREE.Vector3(0.68, 2.00, -5.835);
    arduino.group.position.copy(ardTarget);
    arduino.group.userData = { target: ardTarget.clone() };
    root.add(arduino.group);

    // Exact CAD standoff hole centers for Arduino UNO R3 (matched to AutonomousRacerBot.glb to 0.2mm!)
    var m3Screws = [];
    [
      new THREE.Vector3(-2.49, 2.20, -7.74),
      new THREE.Vector3(-2.49, 2.20, -5.01),
      new THREE.Vector3( 2.59, 2.20, -3.44),
      new THREE.Vector3( 2.71, 2.20, -8.25)
    ].forEach(function (pos) {
      var sc = buildM3CSKScrew();
      sc.position.copy(pos);
      sc.userData = { target: pos.clone() };
      root.add(sc);
      m3Screws.push(sc);
    });

    // 6. Three HC-SR04 Ultrasonic Sensors on Front 3-Facet Angled Bumper (CAD hole center Y=38.3mm)
    var sensorConfigs = [
      { key: 'left',   pos: new THREE.Vector3( 4.38, 3.83, 7.22), yaw:  0.61 },
      { key: 'center', pos: new THREE.Vector3( 0.0,  3.83, 8.68), yaw:  0.0  },
      { key: 'right',  pos: new THREE.Vector3(-4.38, 3.83, 7.22), yaw: -0.61 }
    ];
    var sensors = {};
    sensorConfigs.forEach(function (sc) {
      var s = buildUltrasonicSensor(sc.key);
      s.group.position.copy(sc.pos);
      s.group.rotation.y = sc.yaw;
      s.group.userData = {
        target: sc.pos.clone(),
        yaw: sc.yaw,
        outward: new THREE.Vector3(Math.sin(sc.yaw), 0, Math.cos(sc.yaw))
      };
      root.add(s.group);
      sensors[sc.key] = s;
    });

    // Compute World/Robot-Local Pin Positions (in assembled robot frame!)
    function pinInRobot(objGroup, localVec) {
      objGroup.updateMatrix();
      return localVec.clone().applyMatrix4(objGroup.matrix);
    }

    var pinMap = {
      ard: {},
      l298: {},
      bat: {},
      usLeft: {},
      usCenter: {},
      usRight: {},
      motors: {}
    };

    Object.keys(arduino.localPins).forEach(function (k) {
      pinMap.ard[k] = pinInRobot(arduino.group, arduino.localPins[k]);
    });
    Object.keys(l298n.localPins).forEach(function (k) {
      pinMap.l298[k] = pinInRobot(l298n.group, l298n.localPins[k]);
    });
    Object.keys(batParts.localPins).forEach(function (k) {
      pinMap.bat[k] = pinInRobot(batParts.batteryGroup, batParts.localPins[k]);
    });
    Object.keys(sensors.left.localPins).forEach(function (k) {
      pinMap.usLeft[k] = pinInRobot(sensors.left.group, sensors.left.localPins[k]);
      pinMap.usCenter[k] = pinInRobot(sensors.center.group, sensors.center.localPins[k]);
      pinMap.usRight[k] = pinInRobot(sensors.right.group, sensors.right.localPins[k]);
    });
    motors.forEach(function (m) {
      var side = m.userData.side;
      pinMap.motors[m.userData.id + '_A'] = m.userData.target.clone().add(new THREE.Vector3(-side * 1.75, 0.2, 0.22));
      pinMap.motors[m.userData.id + '_B'] = m.userData.target.clone().add(new THREE.Vector3(-side * 1.75, 0.2, -0.22));
    });

    /* ---------- 24 Animated 3D Wires with Flowing Signal Orbs ---------- */
    var wireGroup = new THREE.Group();
    root.add(wireGroup);
    var wires = [];

    function addWire(id, groupTag, points, colorHex, radius) {
      var curve = new THREE.CatmullRomCurve3(points);
      var tubularSegs = 40;
      var radialSegs = 7;
      var geo = new THREE.TubeGeometry(curve, tubularSegs, radius || 0.085, radialSegs, false);
      var totalIndices = geo.index ? geo.index.count : geo.attributes.position.count;
      var mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.22,
        roughness: 0.35,
        metalness: 0.15
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = false;
      wireGroup.add(mesh);

      // Glowing signal pulse orb traveling along the wire
      var orbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var orb = new THREE.Mesh(new THREE.SphereGeometry((radius || 0.085) * 1.95, 10, 10), orbMat);
      orb.visible = false;
      wireGroup.add(orb);

      var wObj = {
        id: id,
        groupTag: groupTag,
        curve: curve,
        geo: geo,
        mat: mat,
        mesh: mesh,
        orb: orb,
        orbMat: orbMat,
        totalIndices: totalIndices,
        baseColor: colorHex
      };
      wires.push(wObj);
      return wObj;
    }

    function arch(a, b, liftY, midXShift, midZShift) {
      var mid1 = a.clone().lerp(b, 0.33);
      var mid2 = a.clone().lerp(b, 0.67);
      var peak = Math.max(a.y, b.y) + (liftY || 2.8);
      mid1.y = peak;
      mid2.y = peak;
      if (midXShift) { mid1.x += midXShift; mid2.x += midXShift; }
      if (midZShift) { mid1.z += midZShift; mid2.z += midZShift; }
      return [a.clone(), mid1, mid2, b.clone()];
    }

    // Group: 'us_pwr' (Shared 5V & GND rails to all 3 HC-SR04 sensors)
    addWire('us_vcc_l', 'us_pwr', arch(pinMap.ard['5V'], pinMap.usLeft.VCC,   3.3,  2.4, 0), 0xef4444, 0.075);
    addWire('us_vcc_c', 'us_pwr', arch(pinMap.ard['5V'], pinMap.usCenter.VCC, 3.6,  0.6, 0), 0xef4444, 0.075);
    addWire('us_vcc_r', 'us_pwr', arch(pinMap.ard['5V'], pinMap.usRight.VCC,  3.3, -2.0, 0), 0xef4444, 0.075);
    addWire('us_gnd_l', 'us_pwr', arch(pinMap.ard.GND,   pinMap.usLeft.GND,   3.0,  2.6, 0), 0x334155, 0.075);
    addWire('us_gnd_c', 'us_pwr', arch(pinMap.ard.GND,   pinMap.usCenter.GND, 3.3,  0.8, 0), 0x334155, 0.075);
    addWire('us_gnd_r', 'us_pwr', arch(pinMap.ard.GND,   pinMap.usRight.GND,  3.0, -1.8, 0), 0x334155, 0.075);

    // Group: 'us_left' (Left TRIG D2, ECHO D3)
    addWire('us_l_trig', 'us_left', arch(pinMap.ard.D2, pinMap.usLeft.TRIG, 3.3, 1.8, 0), 0x3b82f6, 0.09);
    addWire('us_l_echo', 'us_left', arch(pinMap.ard.D3, pinMap.usLeft.ECHO, 3.6, 1.6, 0), 0x06b6d4, 0.09);

    // Group: 'us_center' (Center TRIG D4, ECHO D5)
    addWire('us_c_trig', 'us_center', arch(pinMap.ard.D4, pinMap.usCenter.TRIG, 3.8,  0.2, 0), 0x22c55e, 0.09);
    addWire('us_c_echo', 'us_center', arch(pinMap.ard.D5, pinMap.usCenter.ECHO, 4.1, -0.1, 0), 0xeab308, 0.09);

    // Group: 'us_right' (Right TRIG D6, ECHO D7)
    addWire('us_r_trig', 'us_right', arch(pinMap.ard.D6, pinMap.usRight.TRIG, 3.4, -1.6, 0), 0xf97316, 0.09);
    addWire('us_r_echo', 'us_right', arch(pinMap.ard.D7, pinMap.usRight.ECHO, 3.7, -1.8, 0), 0xa855f7, 0.09);

    // Group: 'l298_logic' (IN1->D9, IN2->D8, IN3->D11, IN4->D12)
    addWire('in1_d9',  'l298_logic', arch(pinMap.ard.D9,  pinMap.l298.IN1, 1.9, -0.2, 0), 0xfacc15, 0.095);
    addWire('in2_d8',  'l298_logic', arch(pinMap.ard.D8,  pinMap.l298.IN2, 2.2, -0.4, 0), 0x38bdf8, 0.095);
    addWire('in3_d11', 'l298_logic', arch(pinMap.ard.D11, pinMap.l298.IN3, 2.5, -0.5, 0), 0xec4899, 0.095);
    addWire('in4_d12', 'l298_logic', arch(pinMap.ard.D12, pinMap.l298.IN4, 2.8, -0.7, 0), 0xc084fc, 0.095);

    // Group: 'motors_left' (OUT1 & OUT2 -> Front-Left & Rear-Left in parallel)
    addWire('m_fl_a', 'motors_left', arch(pinMap.l298.OUT1, pinMap.motors.FL_A, 0.8, 0.5, 0), 0xf43f5e, 0.09);
    addWire('m_fl_b', 'motors_left', arch(pinMap.l298.OUT2, pinMap.motors.FL_B, 0.6, 0.5, 0), 0xfb7185, 0.09);
    addWire('m_rl_a', 'motors_left', arch(pinMap.l298.OUT1, pinMap.motors.RL_A, 1.2, 1.6, 0), 0xf43f5e, 0.09);
    addWire('m_rl_b', 'motors_left', arch(pinMap.l298.OUT2, pinMap.motors.RL_B, 1.0, 1.4, 0), 0xfb7185, 0.09);

    // Group: 'motors_right' (OUT3 & OUT4 -> Front-Right & Rear-Right in parallel)
    addWire('m_fr_a', 'motors_right', arch(pinMap.l298.OUT3, pinMap.motors.FR_A, 0.8, -0.5, 0), 0x10b981, 0.09);
    addWire('m_fr_b', 'motors_right', arch(pinMap.l298.OUT4, pinMap.motors.FR_B, 0.6, -0.5, 0), 0x2dd4bf, 0.09);
    addWire('m_rr_a', 'motors_right', arch(pinMap.l298.OUT3, pinMap.motors.RR_A, 1.2, -1.4, 0), 0x10b981, 0.09);
    addWire('m_rr_b', 'motors_right', arch(pinMap.l298.OUT4, pinMap.motors.RR_B, 1.0, -1.2, 0), 0x2dd4bf, 0.09);

    // Group: 'pwr_lipo' (7.4V Battery XT60 on +X -> L298N 12V & GND)
    addWire('bat_pos', 'pwr_lipo', arch(pinMap.bat.POS, pinMap.l298.V12, 1.1, 0.8, 0), 0xdc2626, 0.13);
    addWire('bat_neg', 'pwr_lipo', arch(pinMap.bat.NEG, pinMap.l298.GND, 0.9, 0.5, 0), 0x1e293b, 0.13);

    // Group: 'pwr_gnd' (CRITICAL Common Ground: L298N GND <-> Arduino GND)
    addWire('common_gnd', 'pwr_gnd', arch(pinMap.l298.GND, pinMap.ard.GND2, 2.3, 1.5, 0), 0x10b981, 0.125);

    // Group: 'pwr_5v' (Regulated 5V Out: L298N 5V -> Arduino 5V/VIN)
    addWire('reg_5v', 'pwr_5v', arch(pinMap.l298.V5, pinMap.ard.VIN, 2.6, 1.1, 0), 0xf97316, 0.115);

    /* ---------- Try Loading Real 3D CAD (.glb) Models Seamlessly ---------- */
    if (typeof THREE.GLTFLoader === 'function' && window.location.protocol !== 'file:') {
      var loader = new THREE.GLTFLoader();

      // Load Real Chassis CAD — Vibrant Racing Yellow (distinct from blue grid, blue clamps, orange tires, red L298N, teal Arduino)
      loader.load('3D_Models/AutonomousRacerBot.glb?v=4', function (gltf) {
        var mesh = gltf.scene;
        mesh.scale.set(0.1, 0.1, 0.1);
        var chassisMat = new THREE.MeshStandardMaterial({
          color: 0xf5c518,
          roughness: 0.48,
          metalness: 0.08,
          flatShading: true,
          side: THREE.DoubleSide
        });
        mesh.traverse(function (c) {
          if (c.isMesh) {
            if (c.geometry && !c.geometry.attributes.normal) {
              c.geometry.computeVertexNormals();
            }
            c.castShadow = true;
            c.receiveShadow = true;
            c.material = chassisMat;
          }
        });
        chassisHolder.remove(fallbackChassis);
        chassisHolder.add(mesh);
        if (onCadLoaded) onCadLoaded('chassis');
      }, undefined, function () { /* Keep procedural chassis cleanly */ });

      // Load Real 3D-Printed Wheel CAD — Crisp Pearl White Spokes inside Orange Bat-Grip Tires
      loader.load('3D_Models/Original_Robojunkies_wheel.glb?v=4', function (gltf) {
        var template = gltf.scene;
        template.scale.set(0.1, 0.1, 0.1);
        var wheelMat = new THREE.MeshStandardMaterial({
          color: 0xf4f7fb,
          roughness: 0.40,
          metalness: 0.06,
          side: THREE.DoubleSide
        });
        template.traverse(function (c) {
          if (c.isMesh) {
            if (c.geometry && !c.geometry.attributes.normal) {
              c.geometry.computeVertexNormals();
            }
            c.castShadow = true;
            c.receiveShadow = true;
            c.material = wheelMat;
          }
        });
        wheelRimHolders.forEach(function (holder) {
          if (holder.userData.fallback) holder.remove(holder.userData.fallback);
          holder.add(template.clone(true));
        });
        if (onCadLoaded) onCadLoaded('wheels');
      }, undefined, function () { /* Keep procedural wheels cleanly */ });

      // Load Real 3D-Printed Motor Clamp CAD — Electric Cobalt Blue (distinct from yellow chassis & brass N20 motors!)
      loader.load('3D_Models/motor_clamp.glb?v=4', function (gltf) {
        var template = gltf.scene;
        template.scale.set(0.1, 0.1, 0.1);
        var clampMat = new THREE.MeshStandardMaterial({
          color: 0x2e80f5,
          roughness: 0.45,
          metalness: 0.08,
          flatShading: true,
          side: THREE.DoubleSide
        });
        template.traverse(function (c) {
          if (c.isMesh) {
            if (c.geometry && !c.geometry.attributes.normal) {
              c.geometry.computeVertexNormals();
            }
            c.castShadow = true;
            c.receiveShadow = true;
            c.material = clampMat;
          }
        });
        clamps.forEach(function (holder) {
          if (holder.userData.fallback) holder.remove(holder.userData.fallback);
          holder.add(template.clone(true));
        });
        if (onCadLoaded) onCadLoaded('clamps');
      }, undefined, function () { /* Keep procedural clamps cleanly */ });

      // Load Real Arduino UNO R3 Photorealistic 3D Model (exact 6.86cm x 5.33cm PCB, aligned to all 4 CAD standoffs!)
      loader.load('3D_Models/arduino_uno.glb?v=1', function (gltf) {
        var mesh = gltf.scene;
        // Exact PCB calibration: raw PCB W=1.1423 (5.33cm), L=1.4724 (6.86cm) => scale = 4.6626
        // Center pure PCB at (0, 0) and place PCB bottom flush at Y = 0
        var sc = 4.6626;
        mesh.scale.set(sc, sc, sc);
        mesh.position.set(-0.02305 * sc, -0.0363 * sc, 0.15685 * sc);
        mesh.traverse(function (c) {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            if (c.material) {
              c.material.side = THREE.DoubleSide;
              c.material.needsUpdate = true;
            }
          }
        });
        var wrapper = new THREE.Group();
        wrapper.add(mesh);
        wrapper.rotation.y = Math.PI / 2; // USB-B at (+X, +Z), Digital header at +Z, Power/Analog at -Z
        arduino.visualHolder.remove(arduino.fallback);
        arduino.visualHolder.add(wrapper);
        if (onCadLoaded) onCadLoaded('arduino');
      }, undefined, function () { /* Keep procedural Arduino cleanly */ });

      // Load Real L298N Dual H-Bridge 3D Model (exact 4.30cm x 4.37cm PCB, flush on 4 front CAD standoffs!)
      loader.load('3D_Models/l298n.glb?v=1', function (gltf) {
        var mesh = gltf.scene;
        // Raw model is in real-world meters (0.0430m x 0.0437m) => scale 100 -> cm
        // Center PCB at (0, 0) and place PCB bottom flush at Y = 0
        mesh.scale.set(100, 100, 100);
        mesh.position.set(0.076, 0.418, 0.673);
        mesh.traverse(function (c) {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            if (c.material) {
              c.material.side = THREE.DoubleSide;
              // Bind real yellow jumper cap material (Amarelo.001) to live Chapter 5 highlight pulse!
              if (c.material.name === 'Amarelo.001') {
                c.material.emissive = new THREE.Color(0xf59e0b);
                c.material.emissiveIntensity = 0.15;
                l298n.jumperMat = c.material;
              }
              c.material.needsUpdate = true;
            }
          }
        });
        var wrapper = new THREE.Group();
        wrapper.add(mesh);
        wrapper.rotation.y = Math.PI; // Heatsink faces +Z (front bumper), Power & Logic pins face -Z (rear)
        l298n.visualHolder.remove(l298n.fallback);
        l298n.visualHolder.add(wrapper);
        if (onCadLoaded) onCadLoaded('l298n');
      }, undefined, function () { /* Keep procedural L298N cleanly */ });
    }

    /* ---------- Helper to Control Wires, Sonar, Explode & Assembly ---------- */

    function setWireProgress(groupFilter, progress, pulsePhase, highlightActive) {
      wires.forEach(function (w) {
        if (groupFilter === 'all' || w.groupTag === groupFilter || (Array.isArray(groupFilter) && groupFilter.indexOf(w.groupTag) !== -1)) {
          var p = Math.max(0, Math.min(1, progress));
          w.mesh.visible = p > 0.005;
          w.geo.setDrawRange(0, Math.floor(w.totalIndices * p));
          w.mat.emissiveIntensity = highlightActive ? 0.65 : 0.14;
          w.mat.opacity = highlightActive ? 1.0 : 0.42;
          w.mat.transparent = !highlightActive;
          if (highlightActive && p > 0.2) {
            w.orb.visible = true;
            var t = (pulsePhase % 1) * p;
            w.orb.position.copy(w.curve.getPointAt(Math.max(0, Math.min(1, t))));
            w.orbMat.color.setHex(w.baseColor).offsetHSL(0, 0, 0.35);
          } else {
            w.orb.visible = false;
          }
        }
      });
    }

    function setSonarVisual(key, enabled, distCm, animTime, colorHex) {
      var s = sensors[key];
      if (!s) return;
      if (!enabled) {
        s.coneMat.opacity = 0;
        s.rings.forEach(function (r) { r.mat.opacity = 0; });
        return;
      }
      var col = colorHex || 0x38bdf8;
      var reach = Math.max(4, Math.min(26, distCm || 18));
      s.cone.scale.set(reach / 16, reach / 16, reach / 16);
      s.coneMat.color.setHex(col);
      s.coneMat.opacity = 0.22 + 0.06 * Math.sin(animTime * 5);

      s.rings.forEach(function (r) {
        var cyc = (animTime * 0.95 + r.phase) % 1;
        r.mesh.position.z = 1.3 + cyc * reach;
        var sc = 0.7 + cyc * (reach * 0.24);
        r.mesh.scale.set(sc, sc, 1);
        r.mat.color.setHex(col);
        r.mat.opacity = (1 - cyc) * 0.72;
      });
    }

    return {
      root: root,
      chassis: chassisHolder,
      motors: motors,
      clamps: clamps,
      m2Fasteners: m2Fasteners,
      wheels: wheels,
      tape: batParts.tapeMesh,
      battery: batParts.batteryGroup,
      l298n: l298n,
      arduino: arduino,
      m3Screws: m3Screws,
      sensors: sensors,
      wires: wires,
      pinMap: pinMap,
      setWireProgress: setWireProgress,
      setSonarVisual: setSonarVisual
    };
  }

  /* ---------- 3D Robotics Lab Studio & Autonomous Obstacle Arena ---------- */

  function createLabArena(scene) {
    var floorTex = makeGridFloorTexture();
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(22, 22);

    // Ground plane aligns with bottom of 3.4cm bat-grip wheels (wheel center Y=1.05, radius=1.70 => Y=-0.65)
    var floorY = -0.65;
    var floor = new THREE.Mesh(
      new THREE.PlaneGeometry(240, 240),
      new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.78,
        metalness: 0.12
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = floorY;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle illuminated workbench turntable ring under origin
    var ring = new THREE.Mesh(
      new THREE.RingGeometry(12.5, 13.0, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.32, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = floorY + 0.03;
    scene.add(ring);

    // Obstacle Course Group (Rises smoothly during Ch 1 Intro & Ch 8 Live Autonomous Run!)
    var trackGroup = new THREE.Group();
    trackGroup.visible = false;
    scene.add(trackGroup);

    function makeObstacleBox(x, z, w, h, d, colorHex, label) {
      var g = new THREE.Group();
      var body = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          emissive: colorHex,
          emissiveIntensity: 0.16,
          roughness: 0.4,
          metalness: 0.5
        })
      );
      body.position.y = h / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      g.add(body);

      // Glowing neon top stripe
      var stripe = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.12, 0.35, d + 0.12),
        new THREE.MeshBasicMaterial({ color: colorHex })
      );
      stripe.position.y = h - 0.55;
      g.add(stripe);

      g.position.set(x, floorY, z);
      g.userData = { halfW: w / 2, halfD: d / 2, label: label, colorHex: colorHex };
      trackGroup.add(g);
      return g;
    }

    // Obstacles positioned along robot's Ch 8 autonomous demo track:
    // 1. Left-side barrier (triggers Left < 17cm -> Turn Right!)
    // 2. Right-side barrier (triggers Right < 17cm -> Turn Left!)
    // 3. Front dead-end corner wall with open left lane (triggers Center < 15cm -> Compare Left > Right -> Turn Left!)
    var obsLeft   = makeObstacleBox( 13.5, 28,  5.5, 7.5, 11.0, 0xf59e0b, 'LEFT OBSTACLE');
    var obsRight  = makeObstacleBox(-14.5, 56,  5.5, 7.5, 11.0, 0x38bdf8, 'RIGHT OBSTACLE');
    var obsFront  = makeObstacleBox( -4.0, 86, 22.0, 8.0,  4.5, 0xef4444, 'FRONT WALL');
    var obsCorner = makeObstacleBox(-18.0, 74,  4.5, 8.0, 22.0, 0xef4444, 'RIGHT CORNER');

    // Glowing Finish Arch on the open left escape lane!
    var archGroup = new THREE.Group();
    var archMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.55 });
    var post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 14, 12), archMat);
    post1.position.set(0, 7, -10);
    var post2 = post1.clone();
    post2.position.set(0, 7, 10);
    var bar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.3, 21), archMat);
    bar.position.set(0, 14, 0);
    archGroup.add(post1, post2, bar);
    archGroup.position.set(36, floorY, 74);
    trackGroup.add(archGroup);

    // Intro Hologram Obstacle (Ch 1 only)
    var introObs = new THREE.Mesh(
      new THREE.BoxGeometry(12, 6.5, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2
      })
    );
    introObs.position.set(0, floorY + 3.25, 22);
    introObs.visible = false;
    scene.add(introObs);

    return {
      floor: floor,
      floorY: floorY,
      ring: ring,
      trackGroup: trackGroup,
      obstacles: [obsLeft, obsRight, obsFront, obsCorner],
      archGroup: archGroup,
      introObs: introObs
    };
  }

  global.Racer3DModels = {
    createRobotAssembly: createRobotAssembly,
    createLabArena: createLabArena
  };
})(window);
