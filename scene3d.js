/* ==========================================================================
   ROAST & PULSE — Procedural Three.js 3D Coffee Experience Engine
   Features: Multi-layer PBR Cup, Dynamic Canvas Sleeve Emblem, Ice & Steam,
   Sculpted Floating Coffee Beans, 9-Bar Espresso Pour FX, Exploded View
   ========================================================================== */

(function (window) {
  'use strict';

  class CoffeeStage3D {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas || typeof THREE === 'undefined') {
        console.warn('Three.js or canvas unavailable.');
        return;
      }

      this.isExploded = false;
      this.tempMode = 'iced';
      this.pourProgress = 0;
      this.isPouring = false;

      this.isDragging = false;
      this.prevX = 0;
      this.prevY = 0;
      this.targetRotY = -0.35;
      this.targetRotX = 0.12;
      this.currentRotY = -0.35;
      this.currentRotX = 0.12;
      this.mouseNDC = { x: 0, y: 0 };

      this.targetColors = {
        bottom: new THREE.Color('#d8be9e'),
        mid: new THREE.Color('#8e5a34'),
        top: new THREE.Color('#3b1d0e'),
        foam: new THREE.Color('#f7f1e8'),
        brand: new THREE.Color('#1ea874'),
        straw: new THREE.Color('#00704a')
      };

      this.initScene();
      this.initLights();
      this.buildCoffeeAssembly();
      this.buildFloatingBeans();
      this.buildAromaParticles();
      this.buildPourStream();
      this.buildStageRings();
      this.bindEvents();
      this.animate();
    }

    initScene() {
      this.scene = new THREE.Scene();
      const w = this.canvas.parentElement.clientWidth || window.innerWidth;
      const h = this.canvas.parentElement.clientHeight || window.innerHeight;

      this.camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
      this.camera.position.set(0, 0.45, 7.6);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.24;
      if (THREE.SRGBColorSpace) {
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if (THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }
    }

    initLights() {
      const ambient = new THREE.AmbientLight(0xfff4e6, 0.82);
      this.scene.add(ambient);

      const hemi = new THREE.HemisphereLight(0xfff6ea, 0x1c140e, 0.65);
      this.scene.add(hemi);

      this.keyLight = new THREE.DirectionalLight(0xffe7c7, 2.35);
      this.keyLight.position.set(4.5, 6.2, 5.5);
      this.scene.add(this.keyLight);

      this.brandLight = new THREE.PointLight(0x1ea874, 5.4, 18);
      this.brandLight.position.set(-4.2, 2.2, 2.6);
      this.scene.add(this.brandLight);

      this.rimLight = new THREE.PointLight(0x3b82f6, 4.0, 18);
      this.rimLight.position.set(4.6, -1.2, -2.5);
      this.scene.add(this.rimLight);

      const bounce = new THREE.PointLight(0xd4a373, 2.0, 12);
      bounce.position.set(0.8, -3.5, 2.2);
      this.scene.add(bounce);
    }

    createSleeveTexture(brand, title, subtitle) {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 512;
      const ctx = c.getContext('2d');
      const isSbx = brand === 'starbucks';

      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      if (isSbx) {
        grad.addColorStop(0, '#0a261b');
        grad.addColorStop(0.5, '#07462f');
        grad.addColorStop(1, '#09241a');
      } else {
        grad.addColorStop(0, '#091540');
        grad.addColorStop(0.5, '#0022ab');
        grad.addColorStop(1, '#0b1e5e');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      ctx.strokeStyle = isSbx ? 'rgba(216, 173, 122, 0.14)' : 'rgba(147, 197, 253, 0.16)';
      ctx.lineWidth = 2;
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      ctx.fillStyle = isSbx ? '#d8ad7a' : '#93c5fd';
      ctx.fillRect(0, 16, 1024, 6);
      ctx.fillRect(0, 490, 1024, 6);

      ctx.save();
      ctx.translate(512, 224);

      ctx.beginPath();
      ctx.arc(0, 0, 118, 0, Math.PI * 2);
      ctx.fillStyle = isSbx ? '#00704a' : '#0022ab';
      ctx.fill();
      ctx.lineWidth = 7;
      ctx.strokeStyle = isSbx ? '#f5e6d3' : '#e0f2fe';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 96, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isSbx ? 'rgba(216,173,122,0.88)' : 'rgba(147,197,253,0.9)';
      ctx.stroke();

      if (isSbx) {
        ctx.fillStyle = '#f8f0e5';
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? 54 : 23;
          const a = (i * Math.PI) / 5 - Math.PI / 2;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        ctx.font = '700 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#d8ad7a';
        ctx.fillText('RESERVE', 0, 82);
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 48);
        ctx.lineTo(-22, 8);
        ctx.lineTo(0, -14);
        ctx.lineTo(22, 8);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-14, -8);
        ctx.lineTo(-42, -48);
        ctx.moveTo(-28, -28);
        ctx.lineTo(-14, -52);
        ctx.moveTo(-34, -36);
        ctx.lineTo(-54, -26);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(14, -8);
        ctx.lineTo(42, -48);
        ctx.moveTo(28, -28);
        ctx.lineTo(14, -52);
        ctx.moveTo(34, -36);
        ctx.lineTo(54, -26);
        ctx.stroke();

        ctx.font = '700 21px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#93c5fd';
        ctx.fillText('LUCKIN', 0, 82);
      }
      ctx.restore();

      ctx.fillStyle = '#f6efe6';
      ctx.font = '700 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title || 'SIGNATURE BREW', 512, 412);

      ctx.fillStyle = isSbx ? '#d8ad7a' : '#93c5fd';
      ctx.font = '600 20px monospace';
      ctx.fillText((subtitle || 'ROAST & PULSE EDITION').toUpperCase(), 512, 448);

      ctx.fillStyle = 'rgba(255,255,255,0.48)';
      ctx.font = '600 18px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('9 BAR · 93°C · CRAFT', 70, 260);
      ctx.textAlign = 'right';
      ctx.fillText('BATCH 2026 // LAB', 954, 260);

      const tex = new THREE.CanvasTexture(c);
      if (THREE.SRGBColorSpace) {
        tex.colorSpace = THREE.SRGBColorSpace;
      } else if (THREE.sRGBEncoding) {
        tex.encoding = THREE.sRGBEncoding;
      }
      tex.anisotropy = 8;
      return tex;
    }

    buildCoffeeAssembly() {
      this.cupRoot = new THREE.Group();
      this.cupRoot.position.set(1.25, -0.05, 0);
      this.scene.add(this.cupRoot);
      this.cupParts = {};

      const outerGeo = new THREE.CylinderGeometry(1.06, 0.72, 2.75, 64, 1, true);
      const outerMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.08,
        metalness: 0.05,
        transmission: 0.65,
        transparent: true,
        opacity: 0.38,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        side: THREE.DoubleSide
      });
      const outerCup = new THREE.Mesh(outerGeo, outerMat);
      this.cupParts.outerCup = outerCup;
      this.cupRoot.add(outerCup);

      const baseGeo = new THREE.CylinderGeometry(0.72, 0.70, 0.08, 48);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xeae2d6,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.65
      });
      const cupBase = new THREE.Mesh(baseGeo, baseMat);
      cupBase.position.y = -1.36;
      this.cupParts.cupBase = cupBase;
      this.cupRoot.add(cupBase);

      const rimGeo = new THREE.TorusGeometry(1.065, 0.036, 20, 64);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xf4eee6, roughness: 0.2, metalness: 0.15 });
      const cupRim = new THREE.Mesh(rimGeo, rimMat);
      cupRim.rotation.x = Math.PI / 2;
      cupRim.position.y = 1.375;
      this.cupParts.cupRim = cupRim;
      this.cupRoot.add(cupRim);

      this.liquidGroup = new THREE.Group();
      this.cupRoot.add(this.liquidGroup);

      const bGeo = new THREE.CylinderGeometry(0.84, 0.68, 0.88, 48);
      this.bottomMat = new THREE.MeshStandardMaterial({
        color: this.targetColors.bottom.clone(),
        roughness: 0.28,
        metalness: 0.02
      });
      this.bottomLiquid = new THREE.Mesh(bGeo, this.bottomMat);
      this.bottomLiquid.position.y = -0.86;
      this.liquidGroup.add(this.bottomLiquid);

      const mGeo = new THREE.CylinderGeometry(0.94, 0.84, 0.84, 48);
      this.midMat = new THREE.MeshStandardMaterial({
        color: this.targetColors.mid.clone(),
        roughness: 0.24,
        metalness: 0.04
      });
      this.midLiquid = new THREE.Mesh(mGeo, this.midMat);
      this.midLiquid.position.y = -0.01;
      this.liquidGroup.add(this.midLiquid);

      const tGeo = new THREE.CylinderGeometry(1.01, 0.94, 0.62, 48);
      this.topMat = new THREE.MeshStandardMaterial({
        color: this.targetColors.top.clone(),
        roughness: 0.18,
        metalness: 0.08
      });
      this.topLiquid = new THREE.Mesh(tGeo, this.topMat);
      this.topLiquid.position.y = 0.71;
      this.liquidGroup.add(this.topLiquid);

      const foamGeo = new THREE.CylinderGeometry(1.02, 1.00, 0.22, 48);
      this.foamMat = new THREE.MeshStandardMaterial({
        color: this.targetColors.foam.clone(),
        roughness: 0.65,
        metalness: 0.0
      });
      this.foamLayer = new THREE.Mesh(foamGeo, this.foamMat);
      this.foamLayer.position.y = 1.12;
      this.cupParts.foam = this.foamLayer;
      this.cupRoot.add(this.foamLayer);

      const swirlGeo = new THREE.TorusGeometry(0.45, 0.032, 12, 48);
      this.swirlMat = new THREE.MeshStandardMaterial({
        color: 0xc57d32,
        roughness: 0.22,
        metalness: 0.15
      });
      this.swirlRing = new THREE.Mesh(swirlGeo, this.swirlMat);
      this.swirlRing.rotation.x = Math.PI / 2;
      this.swirlRing.position.y = 1.24;
      this.cupRoot.add(this.swirlRing);

      const sleeveGeo = new THREE.CylinderGeometry(1.015, 0.875, 1.22, 64, 1, true);
      const initTex = this.createSleeveTexture('starbucks', '馥芮白', 'FLAT WHITE');
      this.sleeveMat = new THREE.MeshStandardMaterial({
        map: initTex,
        roughness: 0.52,
        metalness: 0.12,
        side: THREE.DoubleSide
      });
      this.sleeveMesh = new THREE.Mesh(sleeveGeo, this.sleeveMat);
      this.sleeveMesh.position.y = 0.06;
      this.sleeveMesh.rotation.y = -Math.PI / 2;
      this.cupParts.sleeve = this.sleeveMesh;
      this.cupRoot.add(this.sleeveMesh);

      this.iceGroup = new THREE.Group();
      const iceGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
      const iceMat = new THREE.MeshPhysicalMaterial({
        color: 0xe6f7ff,
        roughness: 0.05,
        metalness: 0.0,
        transmission: 0.8,
        transparent: true,
        opacity: 0.72,
        clearcoat: 1.0
      });
      this.iceCubes = [];
      const icePositions = [
        [-0.36, 0.96, 0.22], [0.34, 1.02, -0.18], [0.02, 1.06, 0.35],
        [-0.22, 0.88, -0.34], [0.42, 0.90, 0.24], [-0.04, 0.95, -0.05]
      ];
      icePositions.forEach((pos, idx) => {
        const cube = new THREE.Mesh(iceGeo, iceMat);
        cube.position.set(pos[0], pos[1], pos[2]);
        cube.rotation.set(idx * 0.6, idx * 0.9, idx * 0.4);
        cube.userData = { baseY: pos[1], phase: idx * 1.1 };
        this.iceCubes.push(cube);
        this.iceGroup.add(cube);
      });
      this.cupParts.iceGroup = this.iceGroup;
      this.cupRoot.add(this.iceGroup);

      this.dropletsGroup = new THREE.Group();
      const dropGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const dropMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.55
      });
      for (let i = 0; i < 42; i++) {
        const t = Math.random();
        const y = -1.2 + t * 2.35;
        const radius = 0.73 + ((y + 1.375) / 2.75) * 0.35;
        const angle = Math.random() * Math.PI * 2;
        const drop = new THREE.Mesh(dropGeo, dropMat);
        drop.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        drop.scale.set(0.8, 1.35, 0.8);
        this.dropletsGroup.add(drop);
      }
      this.cupRoot.add(this.dropletsGroup);

      this.icedLidGroup = new THREE.Group();
      const domeGeo = new THREE.SphereGeometry(1.06, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
      const domeMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.06,
        metalness: 0.05,
        transmission: 0.7,
        transparent: true,
        opacity: 0.42,
        clearcoat: 1.0
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = 1.38;
      this.icedLidGroup.add(dome);

      const lidRimGeo = new THREE.CylinderGeometry(1.11, 1.11, 0.1, 48);
      const lidRim = new THREE.Mesh(lidRimGeo, domeMat);
      lidRim.position.y = 1.40;
      this.icedLidGroup.add(lidRim);

      const strawGeo = new THREE.CylinderGeometry(0.068, 0.068, 3.65, 24);
      this.strawMat = new THREE.MeshStandardMaterial({
        color: this.targetColors.straw.clone(),
        roughness: 0.22,
        metalness: 0.18
      });
      this.strawMesh = new THREE.Mesh(strawGeo, this.strawMat);
      this.strawMesh.position.set(0.18, 1.42, 0.08);
      this.strawMesh.rotation.z = -0.11;
      this.cupParts.straw = this.strawMesh;
      this.icedLidGroup.add(this.strawMesh);
      this.cupParts.icedLid = this.icedLidGroup;
      this.cupRoot.add(this.icedLidGroup);

      this.hotLidGroup = new THREE.Group();
      const hBaseGeo = new THREE.CylinderGeometry(1.08, 1.11, 0.22, 48);
      const hMat = new THREE.MeshStandardMaterial({ color: 0x1b1917, roughness: 0.38, metalness: 0.12 });
      const hBase = new THREE.Mesh(hBaseGeo, hMat);
      hBase.position.y = 1.47;
      this.hotLidGroup.add(hBase);
      const hTopGeo = new THREE.CylinderGeometry(0.95, 1.04, 0.16, 48);
      const hTop = new THREE.Mesh(hTopGeo, hMat);
      hTop.position.y = 1.64;
      this.hotLidGroup.add(hTop);
      this.hotLidGroup.visible = false;
      this.cupParts.hotLid = this.hotLidGroup;
      this.cupRoot.add(this.hotLidGroup);

      this.steamGroup = new THREE.Group();
      this.steamPuffs = [];
      const steamGeo = new THREE.SphereGeometry(0.24, 14, 14);
      for (let i = 0; i < 16; i++) {
        const sMat = new THREE.MeshBasicMaterial({
          color: 0xfff5e8,
          transparent: true,
          opacity: 0.0,
          depthWrite: false
        });
        const puff = new THREE.Mesh(steamGeo, sMat);
        puff.userData = {
          progress: i / 16,
          driftX: (Math.random() - 0.5) * 0.45,
          driftZ: (Math.random() - 0.5) * 0.45,
          speed: 0.22 + Math.random() * 0.14
        };
        this.steamPuffs.push(puff);
        this.steamGroup.add(puff);
      }
      this.steamGroup.visible = false;
      this.cupRoot.add(this.steamGroup);
    }

    buildFloatingBeans() {
      this.beansGroup = new THREE.Group();
      this.beansGroup.position.copy(this.cupRoot.position);
      this.scene.add(this.beansGroup);
      this.beans = [];

      const beanMat = new THREE.MeshStandardMaterial({
        color: 0x3b1e0f,
        roughness: 0.42,
        metalness: 0.12
      });
      const creaseMat = new THREE.MeshStandardMaterial({
        color: 0x160904,
        roughness: 0.85
      });

      for (let i = 0; i < 14; i++) {
        const beanHolder = new THREE.Group();
        const bodyGeo = new THREE.SphereGeometry(0.16, 16, 12);
        bodyGeo.scale(0.85, 1.28, 0.62);
        const body = new THREE.Mesh(bodyGeo, beanMat);
        beanHolder.add(body);

        const creaseGeo = new THREE.BoxGeometry(0.025, 0.34, 0.04);
        const crease = new THREE.Mesh(creaseGeo, creaseMat);
        crease.position.z = 0.095;
        beanHolder.add(crease);

        const angle = (i / 14) * Math.PI * 2;
        const radius = 1.95 + (i % 3) * 0.42;
        const y = ((i % 5) - 2) * 0.68;
        beanHolder.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        beanHolder.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        beanHolder.userData = {
          angle: angle,
          radius: radius,
          baseY: y,
          orbitSpeed: 0.16 + (i % 4) * 0.05,
          spinSpeed: 0.008 + (i % 3) * 0.004
        };
        this.beans.push(beanHolder);
        this.beansGroup.add(beanHolder);
      }
    }

    buildAromaParticles() {
      const count = 180;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 1.6 + Math.random() * 3.8;
        const theta = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * r + 1.2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
        positions[i * 3 + 2] = Math.sin(theta) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xd8ad7a,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      this.aromaPoints = new THREE.Points(geo, mat);
      this.scene.add(this.aromaPoints);
    }

    buildPourStream() {
      const streamGeo = new THREE.CylinderGeometry(0.05, 0.09, 3.2, 20);
      const streamMat = new THREE.MeshStandardMaterial({
        color: 0x6f3512,
        emissive: 0x3b1605,
        emissiveIntensity: 0.6,
        roughness: 0.12,
        metalness: 0.25,
        transparent: true,
        opacity: 0
      });
      this.pourStream = new THREE.Mesh(streamGeo, streamMat);
      this.pourStream.position.set(0, 2.7, 0);
      this.cupRoot.add(this.pourStream);

      const splashGeo = new THREE.TorusGeometry(0.35, 0.035, 12, 40);
      const splashMat = new THREE.MeshBasicMaterial({
        color: 0xd8ad7a,
        transparent: true,
        opacity: 0
      });
      this.pourSplash = new THREE.Mesh(splashGeo, splashMat);
      this.pourSplash.rotation.x = Math.PI / 2;
      this.pourSplash.position.y = 1.25;
      this.cupRoot.add(this.pourSplash);
    }

    buildStageRings() {
      this.haloGroup = new THREE.Group();
      this.haloGroup.position.set(1.25, -1.65, 0);
      const r1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.012, 12, 80),
        new THREE.MeshBasicMaterial({ color: 0xd8ad7a, transparent: true, opacity: 0.28 })
      );
      r1.rotation.x = Math.PI / 2;
      this.haloGroup.add(r1);

      const r2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.05, 0.008, 12, 80),
        new THREE.MeshBasicMaterial({ color: 0x1ea874, transparent: true, opacity: 0.22 })
      );
      r2.rotation.x = Math.PI / 2;
      this.haloRingBrand = r2;
      this.haloGroup.add(r2);
      this.scene.add(this.haloGroup);
    }

    setDrink(drink) {
      if (!this.scene || !drink) return;
      const c = drink.colors3d;
      this.targetColors.bottom.set(c.bottom);
      this.targetColors.mid.set(c.mid);
      this.targetColors.top.set(c.top);
      this.targetColors.foam.set(c.foam);
      this.targetColors.brand.set(drink.brand === 'starbucks' ? '#1ea874' : '#3b82f6');
      this.targetColors.straw.set(drink.brand === 'starbucks' ? '#00704a' : '#0022ab');

      const newTex = this.createSleeveTexture(drink.brand, drink.name, drink.enName);
      if (this.sleeveMat.map) this.sleeveMat.map.dispose();
      this.sleeveMat.map = newTex;
      this.sleeveMat.needsUpdate = true;

      this.targetRotY += Math.PI * 0.65;
    }

    setTemperature(mode) {
      this.tempMode = mode;
      const isIced = mode === 'iced';
      this.icedLidGroup.visible = isIced;
      this.iceGroup.visible = isIced;
      this.dropletsGroup.visible = isIced;
      this.hotLidGroup.visible = !isIced;
      this.steamGroup.visible = !isIced;
    }

    toggleExplode() {
      this.isExploded = !this.isExploded;
      return this.isExploded;
    }

    triggerPour() {
      this.isPouring = true;
      this.pourProgress = 0;
      this.targetRotY += 0.9;
    }

    bindEvents() {
      const wrap = this.canvas.parentElement;

      const onDown = (clientX, clientY) => {
        this.isDragging = true;
        this.prevX = clientX;
        this.prevY = clientY;
      };
      const onMove = (clientX, clientY) => {
        this.mouseNDC.x = (clientX / window.innerWidth) * 2 - 1;
        this.mouseNDC.y = -(clientY / window.innerHeight) * 2 + 1;
        if (!this.isDragging) return;
        const dx = clientX - this.prevX;
        const dy = clientY - this.prevY;
        this.targetRotY += dx * 0.0085;
        this.targetRotX = Math.max(-0.45, Math.min(0.65, this.targetRotX + dy * 0.006));
        this.prevX = clientX;
        this.prevY = clientY;
      };
      const onUp = () => { this.isDragging = false; };

      wrap.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
      wrap.addEventListener('dblclick', () => this.triggerPour());
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onUp);

      wrap.addEventListener('touchstart', (e) => {
        if (e.touches[0]) onDown(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchend', onUp);

      window.addEventListener('resize', () => this.onResize());
      this.onResize();
    }

    onResize() {
      if (!this.renderer || !this.canvas.parentElement) return;
      const w = this.canvas.parentElement.clientWidth || window.innerWidth;
      const h = this.canvas.parentElement.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);

      const isCompact = w < 1080;
      const xPos = isCompact ? 0.0 : 1.15;
      const yPos = isCompact ? 0.55 : -0.05;
      const scale = isCompact ? 0.78 : 1.0;
      this.cupRoot.position.set(xPos, yPos, 0);
      this.cupRoot.scale.setScalar(scale);
      this.beansGroup.position.set(xPos, yPos, 0);
      this.beansGroup.scale.setScalar(scale);
      this.haloGroup.position.set(xPos, yPos - 1.6, 0);
      this.haloGroup.scale.setScalar(scale);
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      const t = performance.now() * 0.001;

      if (!this.isDragging) {
        this.targetRotY += 0.0038;
      }
      this.currentRotY += (this.targetRotY - this.currentRotY) * 0.075;
      this.currentRotX += (this.targetRotX - this.currentRotX) * 0.075;

      this.cupRoot.rotation.y = this.currentRotY;
      this.cupRoot.rotation.x = this.currentRotX;
      const baseY = window.innerWidth < 1080 ? 0.55 : -0.05;
      this.cupRoot.position.y += ((baseY + Math.sin(t * 1.45) * 0.08) - this.cupRoot.position.y) * 0.05;

      this.bottomMat.color.lerp(this.targetColors.bottom, 0.07);
      this.midMat.color.lerp(this.targetColors.mid, 0.07);
      this.topMat.color.lerp(this.targetColors.top, 0.07);
      this.foamMat.color.lerp(this.targetColors.foam, 0.07);
      this.strawMat.color.lerp(this.targetColors.straw, 0.08);
      this.brandLight.color.lerp(this.targetColors.brand, 0.06);
      this.haloRingBrand.material.color.lerp(this.targetColors.brand, 0.06);

      this.keyLight.position.x = 4.2 + this.mouseNDC.x * 2.2;
      this.keyLight.position.y = 5.8 + this.mouseNDC.y * 1.8;

      const e = this.isExploded ? 1 : 0;
      this.cupParts.icedLid.position.y += (e * 1.15 - this.cupParts.icedLid.position.y) * 0.09;
      this.cupParts.hotLid.position.y += (e * 1.0 - this.cupParts.hotLid.position.y) * 0.09;
      this.cupParts.foam.position.y += ((1.12 + e * 0.62) - this.cupParts.foam.position.y) * 0.09;
      this.swirlRing.position.y = this.cupParts.foam.position.y + 0.12;
      this.cupParts.iceGroup.position.y += (e * 0.35 - this.cupParts.iceGroup.position.y) * 0.09;
      this.cupParts.sleeve.position.z += (e * 0.58 - this.cupParts.sleeve.position.z) * 0.09;
      this.cupParts.cupBase.position.y += ((-1.36 - e * 0.55) - this.cupParts.cupBase.position.y) * 0.09;

      if (this.iceGroup.visible) {
        this.iceCubes.forEach((cube) => {
          cube.position.y = cube.userData.baseY + Math.sin(t * 2.1 + cube.userData.phase) * 0.04;
          cube.rotation.y += 0.004;
        });
      }

      if (this.steamGroup.visible) {
        this.steamPuffs.forEach((puff) => {
          puff.userData.progress += 0.0055 * puff.userData.speed * 4.5;
          if (puff.userData.progress > 1) puff.userData.progress = 0;
          const p = puff.userData.progress;
          puff.position.set(
            puff.userData.driftX * p * 1.8 + Math.sin(t * 2 + p * 5) * 0.1,
            1.75 + p * 2.1,
            puff.userData.driftZ * p * 1.8
          );
          const sc = 0.4 + p * 1.6;
          puff.scale.setScalar(sc);
          puff.material.opacity = Math.sin(p * Math.PI) * 0.22;
        });
      }

      this.beans.forEach((b) => {
        b.userData.angle += b.userData.orbitSpeed * 0.009;
        const a = b.userData.angle;
        const r = b.userData.radius + (this.isExploded ? 0.55 : 0);
        b.position.x = Math.cos(a) * r;
        b.position.z = Math.sin(a) * r;
        b.position.y = b.userData.baseY + Math.sin(t * 1.5 + a) * 0.16;
        b.rotation.x += b.userData.spinSpeed;
        b.rotation.y += b.userData.spinSpeed * 1.3;
      });

      this.aromaPoints.rotation.y = t * 0.045;
      this.haloGroup.rotation.z = t * 0.12;

      if (this.isPouring) {
        this.pourProgress += 0.018;
        if (this.pourProgress >= 1) {
          this.isPouring = false;
          this.pourStream.material.opacity = 0;
          this.pourSplash.material.opacity = 0;
        } else {
          const env = Math.sin(this.pourProgress * Math.PI);
          this.pourStream.material.opacity = env * 0.92;
          this.pourStream.scale.set(0.85 + Math.sin(t * 35) * 0.12, 1, 0.85 + Math.cos(t * 35) * 0.12);
          this.pourSplash.material.opacity = env * 0.85;
          const spScale = 0.6 + this.pourProgress * 2.2;
          this.pourSplash.scale.set(spScale, spScale, 1);
        }
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  window.CoffeeStage3D = CoffeeStage3D;
})(window);
