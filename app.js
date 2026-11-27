/* ==========================================================================
   ROAST & PULSE — Core Application Engine
   Catalog · Radar SVG · AI Sommelier · VS Arena · Barista Lab · WebAudio SFX
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------- 1. SIGNATURE COFFEE CATALOG -------------------- */
  const DRINKS = [
    {
      id: 'sbx-flatwhite',
      brand: 'starbucks',
      brandLabel: 'STARBUCKS RESERVE',
      name: '馥芮白',
      enName: 'Flat White',
      tagline: '精萃浓缩遇上丝绒微奶泡，每一口都是坚果与焦糖的丝滑重击。',
      story: '采用星巴克标志性精萃浓缩咖啡（Ristretto），仅截取前段最醇厚甘甜的咖啡油脂，融合细致绵密的微奶泡，咖啡浓度显著高于普通拿铁，却丝毫不显尖锐苦涩。',
      price: 38,
      couponPrice: 32,
      caffeine: 195,
      kcal: 170,
      roast: '中深烘 · 精萃',
      defaultTemp: 'hot',
      tags: ['精萃双份', '丝绒奶泡', '强效续命'],
      moods: ['wake', 'chill'],
      milkType: 'creamy',
      lowcal: false,
      highcaf: true,
      notes: ['烘烤榛果', '黑巧余韵', '焦糖奶香', '丝绒口感'],
      radar: [9, 8, 3, 2, 9, 5],
      layers: [
        { label: '精萃浓缩 Ristretto', pct: 34, color: '#3b1d0e' },
        { label: '丝绒全脂鲜奶', pct: 52, color: '#e6d4be' },
        { label: '超微绵密奶泡', pct: 14, color: '#f8f2ea' }
      ],
      colors3d: { bottom: '#d8be9e', mid: '#8e5a34', top: '#3b1d0e', foam: '#f7f1e8' },
      hack: '点单暗号：「大杯馥芮白 + 换燕麦奶 + 换金烘浓缩 + 加一份浓缩（四份精萃）」—— 坚果香气直接拉满，丝滑度翻倍，且完全不腻！'
    },
    {
      id: 'lkn-coconut',
      brand: 'luckin',
      brandLabel: 'LUCKIN CRAFT',
      name: '生椰拿铁',
      enName: 'Raw Coconut Latte',
      tagline: '冷榨厚椰乳与 IIAC 金奖浓缩的世纪联姻，一口坠入热带海岸。',
      story: '瑞幸现象级国民爆款。甄选优质冷榨生椰乳，保留新鲜椰肉的自然清甜与饱满脂香，与意式浓缩碰撞出极易入口的顺滑风味，乳糖不耐受星人的终极救星。',
      price: 19,
      couponPrice: 9.9,
      caffeine: 145,
      kcal: 215,
      roast: '中深烘 · 拼配',
      defaultTemp: 'iced',
      tags: ['冷榨生椰', '零乳糖', '国民顶流'],
      moods: ['chill', 'sweet', 'wake'],
      milkType: 'plant',
      lowcal: false,
      highcaf: false,
      notes: ['鲜榨椰香', '烤坚果', '清甜顺滑', '冰爽分层'],
      radar: [6, 9, 7, 2, 7, 10],
      layers: [
        { label: '冷榨厚椰乳', pct: 56, color: '#f4efe6' },
        { label: '冰块过渡层', pct: 16, color: '#c49a6c' },
        { label: 'IIAC 金奖浓缩', pct: 24, color: '#3d1f0d' },
        { label: '绵密椰香油脂', pct: 4, color: '#efe3d1' }
      ],
      colors3d: { bottom: '#f5f0e6', mid: '#c69967', top: '#44220f', foam: '#f7efe3' },
      hack: '点单暗号：「大杯生椰拿铁 + 冰 + 不另外加糖 + 换 SOE 耶加雪菲」—— 生椰乳本身自带自然清甜，不加糖才能喝出花果调与椰香的高级平衡！'
    },
    {
      id: 'sbx-shaken',
      brand: 'starbucks',
      brandLabel: 'STARBUCKS RESERVE',
      name: '冰震浓缩 · 燕麦',
      enName: 'Iced Shaken Espresso',
      tagline: '手工摇晃激发丰盈绵密咖啡沫，谷物燕麦与红糖肉桂的层次暴击。',
      story: '将现萃浓缩咖啡与冰块、风味糖浆放入摇杯中剧烈手摇，瞬间降温锁住芳香并打出绵密泡沫，最后注入冰镇燕麦奶形成梦幻大理石云雾分层。',
      price: 36,
      couponPrice: 30,
      caffeine: 225,
      kcal: 148,
      roast: '浅中烘 · 金烘',
      defaultTemp: 'iced',
      tags: ['三份浓缩', '轻卡植物基', '强效续命'],
      moods: ['wake', 'fresh'],
      milkType: 'plant',
      lowcal: true,
      highcaf: true,
      notes: ['焦糖红糖', '烤燕麦', '绵密咖啡沫', '干净利落'],
      radar: [9, 5, 5, 5, 10, 6],
      layers: [
        { label: '黑糖风味基底', pct: 14, color: '#703814' },
        { label: '手摇三份浓缩', pct: 42, color: '#3a1b0a' },
        { label: 'OATLY 燕麦奶云层', pct: 32, color: '#e5d8c5' },
        { label: '手摇丰盈咖啡沫', pct: 12, color: '#b58458' }
      ],
      colors3d: { bottom: '#58290f', mid: '#9e6b40', top: '#e2d3bd', foam: '#c89b6e' },
      hack: '点单暗号：「大杯冰震浓缩 + 少冰 + 半糖 + 换金烘豆」—— 提神效率天花板，热量不到常规甜拿铁的一半！'
    },
    {
      id: 'lkn-orange',
      brand: 'luckin',
      brandLabel: 'LUCKIN CRAFT',
      name: '橙C美式',
      enName: 'Orange Americano',
      tagline: 'NFC 鲜榨橙汁直撞冰美式，零脂低卡、酸甜气泡感瞬间唤醒神经。',
      story: '彻底打破黑咖啡劝退魔咒。大杯鲜爽 NFC 橙汁作为明亮果酸基底，顶部悬浮深邃意式浓缩，搅拌前呈现日落渐变，入口清爽解腻，堪称夏日与午后救星。',
      price: 18,
      couponPrice: 9.9,
      caffeine: 155,
      kcal: 112,
      roast: '中烘 · 果调',
      defaultTemp: 'iced',
      tags: ['NFC鲜橙', '0脂低卡', '清爽解腻'],
      moods: ['fresh', 'wake'],
      milkType: 'clean',
      lowcal: true,
      highcaf: true,
      notes: ['阳光甜橙', '明亮柑橘酸', '清爽黑咖', '零乳脂负担'],
      radar: [6, 1, 6, 10, 8, 10],
      layers: [
        { label: 'NFC 鲜榨橙汁', pct: 60, color: '#f58216' },
        { label: '沁爽果咖交界', pct: 14, color: '#a84710' },
        { label: '意式双份浓缩', pct: 22, color: '#2b1307' },
        { label: '微泡柑橘油脂', pct: 4, color: '#d48232' }
      ],
      colors3d: { bottom: '#f58216', mid: '#bf4f12', top: '#2d1408', foam: '#e39642' },
      hack: '点单暗号：「橙C美式 + 少冰 + 不另外加糖 + 额外加1份浓缩」—— 去掉多余糖分后橙香与咖啡酸度更锐利，健身减脂期狂喜！'
    },
    {
      id: 'sbx-caramel',
      brand: 'starbucks',
      brandLabel: 'STARBUCKS RESERVE',
      name: '焦糖玛奇朵',
      enName: 'Caramel Macchiato',
      tagline: '香草鲜奶之上缓缓倾倒浓缩，以交叉焦糖酱网印下甜蜜仪式感。',
      story: '星巴克殿堂级经典。不同于直接混合的拿铁，玛奇朵强调烙印感——香草风味牛乳托起浓郁浓缩，顶层覆以厚重奶泡与焦糖酱网格，第一口与最后一口风味截然不同。',
      price: 39,
      couponPrice: 33,
      caffeine: 150,
      kcal: 250,
      roast: '深烘 · 经典',
      defaultTemp: 'iced',
      tags: ['香草焦糖', '甜品治愈', '百年经典'],
      moods: ['sweet', 'chill'],
      milkType: 'creamy',
      lowcal: false,
      highcaf: false,
      notes: ['黄油焦糖', '马达加斯加香草', '醇厚奶盖', '焦香微苦'],
      radar: [7, 9, 9, 1, 6, 5],
      layers: [
        { label: '香草风味鲜牛乳', pct: 58, color: '#f2e8da' },
        { label: '浓缩咖啡烙印层', pct: 24, color: '#5b2e14' },
        { label: '绵密蒸奶泡', pct: 12, color: '#fbf7f0' },
        { label: '黄金焦糖淋酱网', pct: 6, color: '#c4711d' }
      ],
      colors3d: { bottom: '#f3eadc', mid: '#c08750', top: '#4a230e', foam: '#e6a553' },
      hack: '点单暗号：「焦糖玛奇朵 + 换全脂奶 + 香草糖浆减半 + 焦糖酱双倍挂壁」—— 既保留焦糖灵魂香气，又告别甜到齁嗓子！'
    },
    {
      id: 'lkn-butter',
      brand: 'luckin',
      brandLabel: 'LUCKIN CRAFT',
      name: '小黄油拿铁',
      enName: 'Butter Latte',
      tagline: '新西兰安佳黄油香气融入冰博克质感奶咖，咸甜奶香像在喝可颂。',
      story: '瑞幸年度黑马爆款。甄选进口动物黄油风味基底，带来烘焙曲奇与现烤牛角包般的浓郁脂香，搭配一抹微咸尾调，完美化解甜腻，秋冬与冷气房里的情绪充电宝。',
      price: 21,
      couponPrice: 9.9,
      caffeine: 140,
      kcal: 265,
      roast: '中深烘 · 坚果',
      defaultTemp: 'hot',
      tags: ['曲奇奶香', '微咸不腻', '冬日爆款'],
      moods: ['sweet', 'chill'],
      milkType: 'creamy',
      lowcal: false,
      highcaf: false,
      notes: ['烤黄油曲奇', '海盐微咸', '太妃糖', '丰腴奶感'],
      radar: [6, 10, 8, 1, 6, 9],
      layers: [
        { label: '黄油风味厚乳', pct: 54, color: '#f7dfa8' },
        { label: '意式醇香浓缩', pct: 26, color: '#5c3015' },
        { label: '咸香黄油奶泡', pct: 20, color: '#fff3d6' }
      ],
      colors3d: { bottom: '#f6dba0', mid: '#c48d4a', top: '#5a2e14', foam: '#fff1cf' },
      hack: '点单暗号：「热·小黄油拿铁 + 少少甜 + 加浓」—— 温度能彻底激发黄油曲奇的烘焙香气，加浓后咖啡焦香与奶香达成黄金平衡！'
    },
    {
      id: 'sbx-coldfoam',
      brand: 'starbucks',
      brandLabel: 'STARBUCKS RESERVE',
      name: '绵云冷萃',
      enName: 'Cold Foam Cold Brew',
      tagline: '14小时低温慢萃冷萃黑咖，盖上零脂云朵冷奶沫，顺滑无酸涩。',
      story: '选用冷萃专属综合咖啡豆，经长达 14 小时冷水慢速浸泡萃取，大幅降低苦涩杂味与尖锐果酸，呈现天然巧克力甘甜；顶层现打脱脂绵云奶沫如瀑布般缓缓沉降。',
      price: 40,
      couponPrice: 34,
      caffeine: 205,
      kcal: 75,
      roast: '中深烘 · 慢萃',
      defaultTemp: 'iced',
      tags: ['14h慢萃', '超低卡75kcal', '强效续命'],
      moods: ['wake', 'fresh', 'chill'],
      milkType: 'clean',
      lowcal: true,
      highcaf: true,
      notes: ['黑巧克力', '冷萃甘甜', '云朵轻奶沫', '超顺滑'],
      radar: [9, 3, 2, 4, 10, 5],
      layers: [
        { label: '14h 低温慢萃黑咖', pct: 74, color: '#1c0e07' },
        { label: '咖啡奶沫交融带', pct: 8, color: '#6b4730' },
        { label: '脱脂绵云冷奶沫', pct: 18, color: '#faf6f0' }
      ],
      colors3d: { bottom: '#170b05', mid: '#2c1509', top: '#52301b', foam: '#fbf7f1' },
      hack: '点单暗号：「大杯绵云冷萃 + 少冰 + 奶沫加一份海盐焦糖糖浆」—— 咖啡本体保持纯粹低卡，只在绵云层带一点咸甜奶盖的幸福感！'
    },
    {
      id: 'lkn-jasmine',
      brand: 'luckin',
      brandLabel: 'LUCKIN CRAFT',
      name: '轻轻茉莉 · 轻乳茶咖',
      enName: 'Jasmine Tea Latte',
      tagline: '横州七窨双瓣茉莉茶底撞上轻盈拿铁，东方茶韵与咖啡香清雅共生。',
      story: '将中式高香茉莉花茶与低负担轻乳、精萃咖啡巧妙融合，入口先是扑面而来的鲜灵花香，中段转为轻盈奶润，尾调回甘悠长，是下午茶零负担的东方美学之选。',
      price: 18,
      couponPrice: 9.9,
      caffeine: 110,
      kcal: 135,
      roast: '浅烘 · 花香',
      defaultTemp: 'iced',
      tags: ['七窨茉莉', '轻盈低卡', '东方茶咖'],
      moods: ['chill', 'fresh'],
      milkType: 'plant',
      lowcal: true,
      highcaf: false,
      notes: ['鲜灵茉莉', '清雅绿茶', '轻盈奶香', '微甜回甘'],
      radar: [4, 6, 5, 7, 5, 10],
      layers: [
        { label: '七窨茉莉鲜萃茶底', pct: 46, color: '#d8c57c' },
        { label: '轻盈生牛乳', pct: 34, color: '#f5efe2' },
        { label: '浅烘花香浓缩', pct: 14, color: '#6c4120' },
        { label: '清雅茶香沫', pct: 6, color: '#faf5e8' }
      ],
      colors3d: { bottom: '#d8c47a', mid: '#e8dec5', top: '#80522b', foam: '#faf5e6' },
      hack: '点单暗号：「冰·微糖 + 少冰 + 加一份浓缩（鸳鸯升级版）」—— 原版偏清淡茶饮，补一份浓缩秒变超高级精品茶咖！'
    }
  ];

  /* -------------------- 2. WEB AUDIO SYNTH ENGINE -------------------- */
  class CafeAudioEngine {
    constructor() {
      this.ctx = null;
      this.ambientOn = false;
      this.ambientNodes = [];
    }

    ensureCtx() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    }

    toggleAmbient() {
      const ctx = this.ensureCtx();
      if (!ctx) return false;
      if (this.ambientOn) {
        this.ambientNodes.forEach((n) => {
          try { if (n.stop) n.stop(); if (n.disconnect) n.disconnect(); } catch (e) {}
        });
        this.ambientNodes = [];
        this.ambientOn = false;
        return false;
      }

      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 2.2;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;

      const gain = ctx.createGain();
      gain.gain.value = 0.065;

      const freqs = [130.81, 164.81, 196.0, 246.94, 293.66];
      const padGain = ctx.createGain();
      padGain.gain.value = 0.012;
      padGain.connect(ctx.destination);

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        osc.connect(padGain);
        osc.start();
        this.ambientNodes.push(osc);
      });

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();

      this.ambientNodes.push(whiteNoise, filter, gain, padGain);
      this.ambientOn = true;
      return true;
    }

    playChime(freq) {
      const f = freq || 580;
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f * 1.25, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.055, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }

    playPourSound() {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const dur = 1.4;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / data.length) * Math.PI);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1100, ctx.currentTime);
      bp.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + dur);
      bp.Q.value = 1.4;
      const gain = ctx.createGain();
      gain.gain.value = 0.12;
      src.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    }

    playPrinterSound() {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      for (let i = 0; i < 8; i++) {
        const t = ctx.currentTime + i * 0.055;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(220 + (i % 2) * 90, t);
        g.gain.setValueAtTime(0.03, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.045);
      }
    }
  }

  const sfx = new CafeAudioEngine();

  /* -------------------- 3. APP STATE -------------------- */
  let stage3D = null;
  let selectedDrinkId = DRINKS[0].id;
  let currentFilter = 'all';
  let cart = [];
  let couponApplied = false;
  let votes = { starbucks: 1428, luckin: 1564 };

  const sommelierState = {
    mood: 'wake',
    milk: 'creamy',
    intensity: 6,
    sweetness: 5,
    budget: 'any'
  };

  const labState = {
    baseId: DRINKS[1].id,
    shots: { val: '2', label: '标准双份 (2 Shots)', price: 0, caf: 150, kcal: 10 },
    milk: { val: 'whole', label: '全脂鲜牛乳', price: 0, kcal: 110 },
    ice: '标准冰',
    sweet: { val: '50', label: '半糖', kcal: 45 },
    topping: { val: 'none', label: '无顶料', price: 0, kcal: 0 },
    customer: 'VIP 咖啡鉴赏家'
  };

  /* -------------------- 4. HELPERS & TOAST -------------------- */
  const $ = (sel, parent) => (parent || document).querySelector(sel);
  const $$ = (sel, parent) => Array.from((parent || document).querySelectorAll(sel));

  function showToast(msg) {
    const container = $('#toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 320);
    }, 2600);
  }

  function getDrinkById(id) {
    return DRINKS.find((d) => d.id === id) || DRINKS[0];
  }

  /* -------------------- 5. SVG 6-AXIS RADAR CHART -------------------- */
  const RADAR_LABELS = ['浓醇度', '丝滑奶感', '甜润度', '果酸花香', '提神指数', '性价比'];

  function renderRadarSVG(svgEl, seriesList, size) {
    if (!svgEl) return;
    const s = size || 260;
    const cx = s / 2;
    const cy = s / 2;
    const maxR = s * 0.35;
    const levels = 4;
    const axes = RADAR_LABELS.length;
    let html = '';

    for (let l = 1; l <= levels; l++) {
      const r = (maxR / levels) * l;
      const pts = [];
      for (let i = 0; i < axes; i++) {
        const a = (Math.PI * 2 * i) / axes - Math.PI / 2;
        pts.push((cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1));
      }
      html += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="rgba(255,245,230,0.12)" stroke-width="1" />';
    }

    for (let i = 0; i < axes; i++) {
      const a = (Math.PI * 2 * i) / axes - Math.PI / 2;
      const x2 = cx + Math.cos(a) * maxR;
      const y2 = cy + Math.sin(a) * maxR;
      const lx = cx + Math.cos(a) * (maxR + 22);
      const ly = cy + Math.sin(a) * (maxR + 18);
      html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="rgba(255,245,230,0.1)" stroke-width="1" />';
      html += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" fill="#a69c92" font-size="10.5" text-anchor="middle" dominant-baseline="middle" font-family="Noto Sans SC, sans-serif">' + RADAR_LABELS[i] + '</text>';
    }

    seriesList.forEach((series) => {
      const pts = [];
      const dots = [];
      series.values.forEach((v, i) => {
        const a = (Math.PI * 2 * i) / axes - Math.PI / 2;
        const r = (v / 10) * maxR;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        pts.push(px.toFixed(1) + ',' + py.toFixed(1));
        dots.push('<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3.2" fill="' + series.stroke + '" />');
      });
      html += '<polygon points="' + pts.join(' ') + '" fill="' + series.fill + '" stroke="' + series.stroke + '" stroke-width="2" />';
      html += dots.join('');
    });

    svgEl.innerHTML = html;
  }

  /* -------------------- 6. HERO 3D & HUD SYNC -------------------- */
  function selectDrink(id, scrollHero) {
    const drink = getDrinkById(id);
    selectedDrinkId = drink.id;

    if (stage3D) {
      stage3D.setDrink(drink);
      stage3D.setTemperature(drink.defaultTemp);
    }

    const pill = $('#hudBrandPill');
    pill.textContent = drink.brandLabel;
    pill.className = 'hud-brand-pill' + (drink.brand === 'luckin' ? ' luckin' : '');
    $('#hudDrinkName').textContent = drink.name + ' · ' + drink.enName;
    $('#hudDrinkSub').textContent = drink.tagline;

    $('#toggleIceMode').classList.toggle('active', drink.defaultTemp === 'iced');
    $('#toggleHotMode').classList.toggle('active', drink.defaultTemp === 'hot');

    $$('.hud-mini-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.id === drink.id);
    });

    $$('.coffee-card').forEach((card) => {
      card.classList.toggle('selected', card.dataset.id === drink.id);
    });

    updateAnatomyPanel(drink);

    if (scrollHero) {
      $('#hero').scrollIntoView({ behavior: 'smooth' });
    }
  }

  function buildHudQuickSwitcher() {
    const wrap = $('#hudQuickSwitcher');
    wrap.innerHTML = DRINKS.map((d) => (
      '<button class="hud-mini-btn ' + (d.id === selectedDrinkId ? 'active' : '') + '" data-id="' + d.id + '" title="' + d.name + '">' + d.name + '</button>'
    )).join('');

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.hud-mini-btn');
      if (!btn) return;
      sfx.playChime(620);
      selectDrink(btn.dataset.id);
    });
  }

  /* -------------------- 7. SHOWCASE GRID & ANATOMY PANEL -------------------- */
  function renderProductGrid() {
    const grid = $('#productGrid');
    const filtered = DRINKS.filter((d) => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'starbucks') return d.brand === 'starbucks';
      if (currentFilter === 'luckin') return d.brand === 'luckin';
      if (currentFilter === 'lowcal') return d.lowcal;
      if (currentFilter === 'highcaf') return d.highcaf;
      return true;
    });

    grid.innerHTML = filtered.map((d) => {
      const swatchLayers = d.layers.map((l) => '<div style="height:' + l.pct + '%;background:' + l.color + ';width:100%;"></div>').join('');
      const isSbx = d.brand === 'starbucks';
      return (
        '<article class="coffee-card ' + (isSbx ? 'brand-sbx' : 'brand-lkn') + ' ' + (d.id === selectedDrinkId ? 'selected' : '') + '" data-id="' + d.id + '">' +
          '<div>' +
            '<div class="card-top">' +
              '<span class="card-brand ' + (isSbx ? 'sbx' : 'lkn') + '">' + (isSbx ? 'STARBUCKS' : 'LUCKIN') + '</span>' +
              '<span class="card-price">¥' + d.price + '</span>' +
            '</div>' +
            '<div class="card-swatch-cup">' + swatchLayers + '</div>' +
            '<h3 class="card-name">' + d.name + '</h3>' +
            '<div class="card-en">' + d.enName + '</div>' +
            '<p class="card-tagline">' + d.tagline + '</p>' +
          '</div>' +
          '<div class="card-tags">' +
            d.tags.map((t) => '<span class="card-tag">' + t + '</span>').join('') +
          '</div>' +
        '</article>'
      );
    }).join('');

    $$('.coffee-card', grid).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        const rx = ((y / r.height) - 0.5) * -9;
        const ry = ((x / r.width) - 0.5) * 9;
        card.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
      card.addEventListener('click', () => {
        sfx.playChime(540);
        selectDrink(card.dataset.id);
      });
    });
  }

  function updateAnatomyPanel(drink) {
    const isSbx = drink.brand === 'starbucks';
    const badge = $('#anatomyBrand');
    badge.textContent = drink.brandLabel;
    badge.className = 'anatomy-badge' + (isSbx ? '' : ' luckin');

    $('#anatomyTitle').textContent = drink.name + ' · ' + drink.enName;
    $('#anatomyStory').textContent = drink.story;
    $('#anatomyCaf').textContent = drink.caffeine + ' mg';
    $('#anatomyKcal').textContent = drink.kcal + ' kcal';
    $('#anatomyPrice').textContent = '¥' + drink.price + ' (券约¥' + drink.couponPrice + ')';
    $('#anatomyRoast').textContent = drink.roast;
    $('#anatomyHack').textContent = drink.hack;

    $('#xrayLayers').innerHTML = drink.layers.map((l) => (
      '<div class="xray-layer" style="height:' + l.pct + '%;background:' + l.color + ';">' + (l.pct >= 12 ? l.label + ' ' + l.pct + '%' : '') + '</div>'
    )).join('');

    $('#xrayLegend').innerHTML = drink.layers.map((l) => (
      '<span class="xray-leg-item"><i class="xray-swatch" style="background:' + l.color + '"></i>' + l.label + ' ' + l.pct + '%</span>'
    )).join('');

    const stroke = isSbx ? '#1ea874' : '#3b82f6';
    const fill = isSbx ? 'rgba(30, 168, 116, 0.28)' : 'rgba(59, 130, 246, 0.28)';
    renderRadarSVG($('#anatomyRadar'), [{ values: drink.radar, stroke: stroke, fill: fill }], 260);

    $('#anatomyNotes').innerHTML = drink.notes.map((n) => '<span class="note-pill">' + n + '</span>').join('');
  }

  /* -------------------- 8. AI FLAVOR SOMMELIER ENGINE -------------------- */
  let currentRecommendedDrink = DRINKS[1];

  function evaluateSommelier() {
    const scored = DRINKS.map((d) => {
      let score = 55;
      if (d.moods.includes(sommelierState.mood)) score += 20;
      if (d.milkType === sommelierState.milk) score += 16;

      const intDiff = Math.abs(d.radar[0] - sommelierState.intensity);
      const swtDiff = Math.abs(d.radar[2] - sommelierState.sweetness);
      score += Math.max(0, 12 - intDiff * 2);
      score += Math.max(0, 10 - swtDiff * 1.8);

      if (sommelierState.budget === 'value' && d.brand === 'luckin') score += 14;
      if (sommelierState.budget === 'premium' && d.brand === 'starbucks') score += 14;

      return { drink: d, score: Math.min(99, Math.round(score)) };
    }).sort((a, b) => b.score - a.score);

    const best = scored[0];
    const runner = scored[1];
    currentRecommendedDrink = best.drink;

    const offset = 326.7 * (1 - best.score / 100);
    $('#matchRingFg').style.strokeDashoffset = offset.toFixed(1);
    $('#matchScoreNum').textContent = best.score;

    $('#resultBrand').textContent = best.drink.brandLabel;
    $('#resultName').textContent = best.drink.name + ' · ¥' + best.drink.price;
    $('#resultReason').textContent = '契合你偏好的「' + sommelierState.intensity + '/10 浓醇度」与「' + sommelierState.sweetness + '/10 甜度」区间：' + best.drink.tagline;
    $('#resultRunnerup').textContent = '备选方案：' + (runner.drink.brand === 'starbucks' ? '星巴克' : '瑞幸') + '「' + runner.drink.name + '」(匹配度 ' + runner.score + '%)';
  }

  function bindSommelierEvents() {
    $$('.quiz-options').forEach((group) => {
      group.addEventListener('click', (e) => {
        const chip = e.target.closest('.quiz-chip');
        if (!chip) return;
        $$('.quiz-chip', group).forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        sommelierState[group.dataset.quiz] = chip.dataset.val;
        sfx.playChime(660);
        evaluateSommelier();
      });
    });

    $('#prefIntensity').addEventListener('input', (e) => {
      sommelierState.intensity = Number(e.target.value);
      $('#prefIntensityVal').textContent = sommelierState.intensity + '/10';
      evaluateSommelier();
    });

    $('#prefSweetness').addEventListener('input', (e) => {
      sommelierState.sweetness = Number(e.target.value);
      $('#prefSweetnessVal').textContent = sommelierState.sweetness + '/10';
      evaluateSommelier();
    });

    $$('.budget-toggle .mini-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.budget-toggle .mini-chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        sommelierState.budget = btn.dataset.budget;
        sfx.playChime(600);
        evaluateSommelier();
      });
    });

    $('#resultView3D').addEventListener('click', () => {
      sfx.playPourSound();
      selectDrink(currentRecommendedDrink.id, true);
      if (stage3D) stage3D.triggerPour();
      showToast('已在 3D 舞台切换至「' + currentRecommendedDrink.name + '」');
    });

    $('#resultAddCart').addEventListener('click', () => {
      addToCart({
        name: currentRecommendedDrink.name,
        brand: currentRecommendedDrink.brand,
        price: currentRecommendedDrink.price,
        couponPrice: currentRecommendedDrink.couponPrice,
        caffeine: currentRecommendedDrink.caffeine,
        spec: 'AI 选杯罗盘推荐 · 标准配方'
      });
    });
  }

  /* -------------------- 9. HEAD-TO-HEAD VS ARENA -------------------- */
  function initArena() {
    const sbxDrinks = DRINKS.filter((d) => d.brand === 'starbucks');
    const lknDrinks = DRINKS.filter((d) => d.brand === 'luckin');

    const selSbx = $('#arenaSelectSbx');
    const selLkn = $('#arenaSelectLkn');

    selSbx.innerHTML = sbxDrinks.map((d) => '<option value="' + d.id + '">' + d.name + ' (' + d.enName + ')</option>').join('');
    selLkn.innerHTML = lknDrinks.map((d) => '<option value="' + d.id + '">' + d.name + ' (' + d.enName + ')</option>').join('');

    const renderArena = () => {
      const dA = getDrinkById(selSbx.value);
      const dB = getDrinkById(selLkn.value);

      const renderCard = (el, d, color) => {
        const cafPerYuan = (d.caffeine / d.couponPrice).toFixed(1);
        el.innerHTML =
          '<div class="fighter-head">' +
            '<div class="fighter-name">' + d.name + '</div>' +
            '<div class="fighter-price">¥' + d.price + ' <small style="color:#8f857b">(券¥' + d.couponPrice + ')</small></div>' +
          '</div>' +
          '<p style="font-size:0.82rem;color:#a69c92;">' + d.tagline + '</p>' +
          '<div class="fighter-metric-list">' +
            '<div>' +
              '<div class="f-metric"><span>咖啡因含量</span><strong>' + d.caffeine + ' mg</strong></div>' +
              '<div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, d.caffeine / 2.4) + '%;background:' + color + '"></div></div>' +
            '</div>' +
            '<div>' +
              '<div class="f-metric"><span>热量负担</span><strong>' + d.kcal + ' kcal</strong></div>' +
              '<div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, d.kcal / 2.8) + '%;background:' + color + '"></div></div>' +
            '</div>' +
            '<div>' +
              '<div class="f-metric"><span>每元咖啡因效率</span><strong>' + cafPerYuan + ' mg/¥</strong></div>' +
              '<div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, Number(cafPerYuan) * 5) + '%;background:' + color + '"></div></div>' +
            '</div>' +
            '<div class="f-metric"><span>核心风味</span><strong>' + d.notes.slice(0, 2).join(' · ') + '</strong></div>' +
          '</div>';
      };

      renderCard($('#arenaCardSbx'), dA, '#1ea874');
      renderCard($('#arenaCardLkn'), dB, '#3b82f6');

      renderRadarSVG($('#arenaRadar'), [
        { values: dA.radar, stroke: '#1ea874', fill: 'rgba(30, 168, 116, 0.25)' },
        { values: dB.radar, stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.26)' }
      ], 300);

      const winnerCaf = dA.caffeine >= dB.caffeine ? '星巴克「' + dA.name + '」' : '瑞幸「' + dB.name + '」';
      const winnerCal = dA.kcal <= dB.kcal ? '星巴克「' + dA.name + '」' : '瑞幸「' + dB.name + '」';
      $('#arenaVerdict').innerHTML = '<strong>裁判点评：</strong>重度提神与醇厚质感看 ' + winnerCaf + '；轻卡控制选 ' + winnerCal + '；日常高频性价比由瑞幸券后 ¥' + dB.couponPrice + ' 强势领跑。';
    };

    selSbx.addEventListener('change', () => { sfx.playChime(520); renderArena(); });
    selLkn.addEventListener('change', () => { sfx.playChime(580); renderArena(); });
    renderArena();

    const updateVoteUI = () => {
      const total = votes.starbucks + votes.luckin;
      const pS = Math.round((votes.starbucks / total) * 100);
      const pL = 100 - pS;
      $('#voteFillSbx').style.width = pS + '%';
      $('#voteFillSbx').textContent = pS + '%';
      $('#voteFillLkn').style.width = pL + '%';
      $('#voteFillLkn').textContent = pL + '%';
    };
    $('#voteSbxBtn').addEventListener('click', () => {
      votes.starbucks += 1;
      sfx.playChime(680);
      updateVoteUI();
      showToast('已为星巴克战队投出 +1 票！');
    });
    $('#voteLknBtn').addEventListener('click', () => {
      votes.luckin += 1;
      sfx.playChime(740);
      updateVoteUI();
      showToast('已为瑞幸战队投出 +1 票！');
    });
    updateVoteUI();
  }

  /* -------------------- 10. BARISTA LAB & THERMAL RECEIPT -------------------- */
  function initBaristaLab() {
    const baseSelect = $('#labBaseDrink');
    baseSelect.innerHTML = DRINKS.map((d) => '<option value="' + d.id + '">' + (d.brand === 'starbucks' ? '星巴克' : '瑞幸') + ' · ' + d.name + ' (¥' + d.price + ')</option>').join('');
    baseSelect.value = labState.baseId;

    const updateReceipt = (animatePrint) => {
      const base = getDrinkById(labState.baseId);
      const totalPrice = Math.max(9.9, base.price + labState.shots.price + labState.milk.price + labState.topping.price);
      const totalCaf = labState.shots.caf + (base.highcaf ? 35 : 0);
      const totalKcal = Math.max(15, labState.shots.kcal + labState.milk.kcal + labState.sweet.kcal + labState.topping.kcal);
      const couponEst = base.brand === 'luckin'
        ? '¥' + (base.couponPrice + Math.max(0, labState.shots.price + labState.topping.price)).toFixed(1)
        : '¥' + Math.max(24, totalPrice - 6).toFixed(0);

      $('#recBrand').textContent = base.brand === 'starbucks' ? 'STARBUCKS LAB' : 'LUCKIN CRAFT LAB';
      $('#recCustomer').textContent = labState.customer.trim() || 'VIP 咖啡鉴赏家';
      $('#recDrinkName').textContent = base.name;
      $('#recPrice').textContent = '¥' + totalPrice.toFixed(2);
      $('#recCaf').textContent = totalCaf + ' mg';
      $('#recKcal').textContent = totalKcal + ' kcal';
      $('#recCoupon').textContent = couponEst;

      const now = new Date();
      $('#recTime').textContent = now.toTimeString().slice(0, 8);

      $('#recSpecs').innerHTML = [
        '浓缩: ' + labState.shots.label,
        '基底: ' + labState.milk.label,
        '温度: ' + labState.ice + ' · 甜度: ' + labState.sweet.label,
        '顶料: ' + labState.topping.label
      ].map((s) => '<li>' + s + '</li>').join('');

      if (animatePrint) {
        const rec = $('#thermalReceipt');
        $('#recOrderNo').textContent = '#RP-2026-' + Math.floor(1000 + Math.random() * 8999);
        rec.classList.remove('printing');
        void rec.offsetWidth;
        rec.classList.add('printing');
        sfx.playPrinterSound();
      }
    };

    baseSelect.addEventListener('change', (e) => {
      labState.baseId = e.target.value;
      sfx.playChime(560);
      updateReceipt();
    });

    $$('.lab-chips').forEach((group) => {
      group.addEventListener('click', (e) => {
        const chip = e.target.closest('.lab-chip');
        if (!chip) return;
        $$('.lab-chip', group).forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const key = group.dataset.lab;
        if (key === 'ice') {
          labState.ice = chip.dataset.val;
        } else {
          labState[key] = {
            val: chip.dataset.val,
            label: chip.textContent,
            price: Number(chip.dataset.price || 0),
            caf: Number(chip.dataset.caf || 0),
            kcal: Number(chip.dataset.kcal || 0)
          };
        }
        sfx.playChime(620);
        updateReceipt();
      });
    });

    $('#labCustomerName').addEventListener('input', (e) => {
      labState.customer = e.target.value;
      updateReceipt();
    });

    $('#printReceiptBtn').addEventListener('click', () => {
      updateReceipt(true);
      showToast('热敏咖啡处方小票已打印出纸 🧾');
    });

    $('#labAddToCartBtn').addEventListener('click', () => {
      const base = getDrinkById(labState.baseId);
      const totalPrice = Math.max(9.9, base.price + labState.shots.price + labState.milk.price + labState.topping.price);
      const totalCaf = labState.shots.caf + (base.highcaf ? 35 : 0);
      addToCart({
        name: base.name + ' (特调)',
        brand: base.brand,
        price: totalPrice,
        couponPrice: base.brand === 'luckin' ? Math.max(9.9, totalPrice - 9) : Math.max(24, totalPrice - 6),
        caffeine: totalCaf,
        spec: labState.shots.label + ' / ' + labState.milk.label + ' / ' + labState.ice + ' / ' + labState.sweet.label
      });
    });

    updateReceipt();
    return { setBase: (id) => { labState.baseId = id; baseSelect.value = id; updateReceipt(true); } };
  }

  /* -------------------- 11. CART & CONFETTI CELEBRATION -------------------- */
  function addToCart(item) {
    cart.push(Object.assign({}, item, { uid: Date.now() + Math.random() }));
    renderCart();
    sfx.playChime(760);
    showToast('已将「' + item.name + '」加入今日点单袋 ☕');
  }

  function renderCart() {
    $('#cartCount').textContent = cart.length;
    const list = $('#cartItems');
    if (cart.length === 0) {
      list.innerHTML = '<div class="cart-empty">点单袋还是空的，快去挑一杯吧 ☕</div>';
      $('#cartTotalCaf').textContent = '0 mg';
      $('#cartTotalPrice').textContent = '¥0';
      return;
    }

    let totalCaf = 0;
    let totalPrice = 0;
    list.innerHTML = cart.map((item) => {
      const p = couponApplied ? item.couponPrice : item.price;
      totalCaf += item.caffeine;
      totalPrice += p;
      return (
        '<div class="cart-item">' +
          '<div>' +
            '<div class="cart-item-title">' + item.name + '</div>' +
            '<div class="cart-item-meta">' + item.spec + '</div>' +
            '<div class="cart-item-meta">' + (item.brand === 'starbucks' ? 'Starbucks' : 'Luckin') + ' · ' + item.caffeine + 'mg 咖啡因</div>' +
          '</div>' +
          '<div class="cart-item-right">' +
            '<strong style="color:#d8ad7a;font-family:var(--font-mono)">¥' + p.toFixed(1) + '</strong>' +
            '<button class="cart-remove" data-uid="' + item.uid + '">移除</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    $('#cartTotalCaf').textContent = totalCaf + ' mg';
    $('#cartTotalPrice').textContent = '¥' + totalPrice.toFixed(1);
  }

  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const colors = ['#1ea874', '#3b82f6', '#d8ad7a', '#f6efe6', '#60a5fa'];
    const particles = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.65,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 5,
      size: 5 + Math.random() * 6,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1
    }));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.rot += p.vrot;
        p.life -= 0.012;
        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });
      if (alive) requestAnimationFrame(frame);
      else canvas.remove();
    }
    frame();
  }

  /* -------------------- 12. UI POLISH: CURSOR, COUNTERS, REVEAL -------------------- */
  function initCursorAndMotion() {
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
      let rx = window.innerWidth / 2;
      let ry = window.innerHeight / 2;
      let mx = rx;
      let my = ry;

      window.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      });

      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(loop);
      };
      loop();

      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('button, a, .coffee-card, select, input')) {
          ring.classList.add('active');
        }
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('button, a, .coffee-card, select, input')) {
          ring.classList.remove('active');
        }
      });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el) => io.observe(el));

    window.addEventListener('scroll', () => {
      $('#navbar').classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    $$('.metric-val[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      let curr = 0;
      const step = () => {
        curr += Math.max(1, Math.ceil((target - curr) / 14));
        el.textContent = curr >= target ? target : curr;
        if (curr < target) requestAnimationFrame(step);
      };
      setTimeout(step, 950);
    });
  }

  /* -------------------- 13. BOOTSTRAP -------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const fill = $('#preloaderFill');
    const pre = $('#preloader');
    let p = 0;
    const timer = setInterval(() => {
      p += 18 + Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => pre.classList.add('done'), 260);
      }
      fill.style.width = p + '%';
    }, 110);

    if (typeof window.CoffeeStage3D === 'function') {
      stage3D = new window.CoffeeStage3D('heroCanvas');
    }

    buildHudQuickSwitcher();
    renderProductGrid();
    selectDrink(DRINKS[0].id);
    bindSommelierEvents();
    evaluateSommelier();
    initArena();
    const labCtrl = initBaristaLab();
    initCursorAndMotion();

    $$('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.setTheme;
        document.documentElement.setAttribute('data-theme', theme);
        $$('.theme-btn').forEach((b) => b.classList.toggle('active', b === btn));
        sfx.playChime(600);
        if (theme === 'starbucks') selectDrink('sbx-flatwhite');
        if (theme === 'luckin') selectDrink('lkn-coconut');
      });
    });

    $('#soundToggle').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const on = sfx.toggleAmbient();
      btn.classList.toggle('playing', on);
      $('.sound-label', btn).textContent = on ? '声景 ON' : '声景 OFF';
      showToast(on ? '已开启意式咖啡馆 Lo-Fi 氛围声景 🎵' : '已静音咖啡馆环境声景');
    });

    $('#heroPourBtn').addEventListener('click', () => {
      sfx.playPourSound();
      if (stage3D) stage3D.triggerPour();
      showToast('9 Bar · 93°C 黄金浓缩正在注入 3D 杯体！');
    });
    $('#toggleIceMode').addEventListener('click', () => {
      $('#toggleIceMode').classList.add('active');
      $('#toggleHotMode').classList.remove('active');
      if (stage3D) stage3D.setTemperature('iced');
      sfx.playChime(780);
    });
    $('#toggleHotMode').addEventListener('click', () => {
      $('#toggleHotMode').classList.add('active');
      $('#toggleIceMode').classList.remove('active');
      if (stage3D) stage3D.setTemperature('hot');
      sfx.playChime(460);
    });
    $('#toggleExplodeMode').addEventListener('click', (e) => {
      if (!stage3D) return;
      const exploded = stage3D.toggleExplode();
      e.currentTarget.classList.toggle('active', exploded);
      sfx.playChime(exploded ? 700 : 480);
    });

    $$('.filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        $$('.filter-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.filter;
        sfx.playChime(580);
        renderProductGrid();
      });
    });

    $('#copyHackBtn').addEventListener('click', () => {
      const text = $('#anatomyHack').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
      sfx.playChime(820);
      showToast('隐藏点单暗号已复制，门店/小程序可直接照着点！');
    });
    $('#anatomyAddCart').addEventListener('click', () => {
      const d = getDrinkById(selectedDrinkId);
      addToCart({
        name: d.name,
        brand: d.brand,
        price: d.price,
        couponPrice: d.couponPrice,
        caffeine: d.caffeine,
        spec: (d.defaultTemp === 'iced' ? '冰饮' : '热饮') + ' · 招牌标准配比'
      });
    });
    $('#anatomyToLab').addEventListener('click', () => {
      labCtrl.setBase(selectedDrinkId);
      $('#lab').scrollIntoView({ behavior: 'smooth' });
      showToast('已送入特调工坊，自由魔改配方吧！');
    });

    const toggleCart = (open) => {
      $('#cartDrawer').classList.toggle('open', open);
      $('#cartBackdrop').classList.toggle('open', open);
    };
    $('#cartTrigger').addEventListener('click', () => toggleCart(true));
    $('#cartCloseBtn').addEventListener('click', () => toggleCart(false));
    $('#cartBackdrop').addEventListener('click', () => toggleCart(false));

    $('#cartItems').addEventListener('click', (e) => {
      const rm = e.target.closest('.cart-remove');
      if (!rm) return;
      cart = cart.filter((item) => String(item.uid) !== rm.dataset.uid);
      renderCart();
    });

    $('#toggleLuckinCoupon').addEventListener('click', (e) => {
      couponApplied = !couponApplied;
      e.currentTarget.classList.toggle('applied', couponApplied);
      e.currentTarget.textContent = couponApplied
        ? '✅ 已激活模拟优惠券（瑞幸9.9 / 星巴克立减）'
        : '🎫 应用模拟优惠券（瑞幸 9.9 / 星巴克满减）';
      sfx.playChime(740);
      renderCart();
    });

    $('#checkoutBtn').addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('点单袋还是空的，先选一杯你心动的咖啡吧！');
        return;
      }
      launchConfetti();
      sfx.playChime(880);
      setTimeout(() => sfx.playChime(1046), 120);
      showToast('下单成功！共 ' + cart.length + ' 杯咖啡已进入 9 Bar 现萃队列 🎉');
      cart = [];
      renderCart();
      toggleCart(false);
    });
  });
})();
