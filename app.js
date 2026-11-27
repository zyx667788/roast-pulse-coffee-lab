(function () {
  'use strict';
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => Array.from((p || document).querySelectorAll(s));
  const toast = (m) => {
    const c = $('#toastContainer'); if (!c) return;
    const e = document.createElement('div'); e.className = 'toast'; e.textContent = m; c.appendChild(e);
    setTimeout(() => { e.style.opacity = '0'; setTimeout(() => e.remove(), 300); }, 2500);
  };
  const sfx = {
    ctx: null, on: false, nodes: [],
    ensure() {
      if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx;
    },
    toggleAmbient() {
      const ctx = this.ensure(); if (!ctx) return false;
      if (this.on) { this.nodes.forEach((n) => { try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) {} }); this.nodes = []; this.on = false; return false; }
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), ch = buf.getChannelData(0);
      for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * 0.05;
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 360;
      const g = ctx.createGain(); g.gain.value = 0.06;
      src.connect(lp); lp.connect(g); g.connect(ctx.destination); src.start();
      this.nodes = [src, lp, g]; this.on = true; return true;
    },
    playChime(f = 600) {
      const ctx = this.ensure(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'triangle';
      o.frequency.setValueAtTime(f, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(f * 1.25, ctx.currentTime + 0.09);
      g.gain.setValueAtTime(0.05, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.15);
    },
    playPourSound() { this.playChime(440); setTimeout(() => this.playChime(554), 80); },
    playPrinterSound() { for (let i = 0; i < 6; i++) setTimeout(() => this.playChime(240 + (i % 2) * 80), i * 50); }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const pre = $('#preloader'), fill = $('#preloaderFill');
    if (fill) fill.style.width = '100%';
    if (pre) setTimeout(() => { pre.classList.add('done'); pre.style.pointerEvents = 'none'; }, 220);

    const drinks = window.ROAST_DRINKS_ALL || window.ROAST_DRINKS_PART1 || [];
    if (!drinks.length) return;
    let stage = null, selId = drinks[0].id, filter = 'all', cartApi = null, labApi = null;
    try { if (typeof window.CoffeeStage3D === 'function') stage = new window.CoffeeStage3D('heroCanvas'); } catch (err) { console.error('3D init error:', err); }
    const byId = (id) => drinks.find((d) => d.id === id) || drinks[0];
    const selectDrink = (id, goTop) => {
      const d = byId(id); selId = d.id;
      try { if (stage) { stage.setDrink(d); stage.setTemperature(d.defaultTemp); } } catch (e) {}
      const pill = $('#hudBrandPill'); if (pill) { pill.textContent = d.brandLabel; pill.className = 'hud-brand-pill' + (d.brand === 'luckin' ? ' luckin' : ''); }
      if ($('#hudMiniTitle')) $('#hudMiniTitle').textContent = d.name;
      if ($('#hudDrinkName')) $('#hudDrinkName').textContent = d.name + ' · ' + d.enName;
      if ($('#hudDrinkSub')) $('#hudDrinkSub').textContent = d.tagline;
      $$('.hud-mini-btn').forEach((b) => b.classList.toggle('active', b.dataset.id === d.id));
      $$('.coffee-card').forEach((c) => c.classList.toggle('selected', c.dataset.id === d.id));
      if (window.RP_HUD) window.RP_HUD.updateAnatomy(d);
      if (goTop && $('#hero')) $('#hero').scrollIntoView({ behavior: 'smooth' });
    };
    const renderGrid = () => {
      const grid = $('#productGrid'); if (!grid) return;
      const list = drinks.filter((d) => filter === 'all' || (filter === 'lowcal' ? d.lowcal : filter === 'highcaf' ? d.highcaf : d.brand === filter));
      grid.innerHTML = list.map((d) => {
        const s = d.brand === 'starbucks';
        return '<article class="coffee-card ' + (s ? 'brand-sbx' : 'brand-lkn') + (d.id === selId ? ' selected' : '') + '" data-id="' + d.id + '"><div><div class="card-top"><span class="card-brand ' + (s ? 'sbx' : 'lkn') + '">' + (s ? 'STARBUCKS' : 'LUCKIN') + '</span><span class="card-price">¥' + d.price + '</span></div><div class="card-swatch-cup">' + d.layers.map((l) => '<div style="height:' + l.pct + '%;background:' + l.color + ';width:100%"></div>').join('') + '</div><h3 class="card-name">' + d.name + '</h3><div class="card-en">' + d.enName + '</div><p class="card-tagline">' + d.tagline + '</p></div><div class="card-tags">' + d.tags.map((t) => '<span class="card-tag">' + t + '</span>').join('') + '</div></article>';
      }).join('');
      $$('.coffee-card', grid).forEach((c) => c.addEventListener('click', () => { sfx.playChime(540); selectDrink(c.dataset.id); }));
    };
    const qs = $('#hudQuickSwitcher');
    if (qs) {
      qs.innerHTML = drinks.map((d) => '<button class="hud-mini-btn' + (d.id === selId ? ' active' : '') + '" data-id="' + d.id + '">' + d.name + '</button>').join('');
      qs.addEventListener('click', (e) => { const b = e.target.closest('.hud-mini-btn'); if (b) { sfx.playChime(620); selectDrink(b.dataset.id); } });
    }
    if (window.RP_HUD) window.RP_HUD.initCollapse((f) => sfx.playChime(f));
    renderGrid(); selectDrink(drinks[0].id);
    const ctx = { q: $, qq: $$, drinks, sfx, radarSVG: window.RP_HUD && window.RP_HUD.radarSVG, selectDrink, addToCart: (it) => cartApi && cartApi.add(it), showToast: toast, getStage: () => stage };
    if (window.RP_SA) { window.RP_SA.initSommelier(ctx); window.RP_SA.initArena(ctx); }
    if (window.RP_LC) { labApi = window.RP_LC.initLab(ctx); cartApi = window.RP_LC.initCart(ctx); }
    $$('.reveal').forEach((el) => el.classList.add('visible'));
    $('#heroPourBtn') && $('#heroPourBtn').addEventListener('click', () => { sfx.playPourSound(); stage && stage.triggerPour(); toast('9 Bar 浓缩萃取已触发'); });
    $('#toggleIceMode') && $('#toggleIceMode').addEventListener('click', () => { $('#toggleIceMode').classList.add('active'); $('#toggleHotMode').classList.remove('active'); stage && stage.setTemperature('iced'); sfx.playChime(780); });
    $('#toggleHotMode') && $('#toggleHotMode').addEventListener('click', () => { $('#toggleHotMode').classList.add('active'); $('#toggleIceMode').classList.remove('active'); stage && stage.setTemperature('hot'); sfx.playChime(460); });
    $('#toggleExplodeMode') && $('#toggleExplodeMode').addEventListener('click', (e) => { if (!stage) return; const ex = stage.toggleExplode(); e.currentTarget.classList.toggle('active', ex); sfx.playChime(ex ? 700 : 480); });
    $$('.filter-pill').forEach((p) => p.addEventListener('click', () => { $$('.filter-pill').forEach((x) => x.classList.remove('active')); p.classList.add('active'); filter = p.dataset.filter; sfx.playChime(580); renderGrid(); }));
    $('#copyHackBtn') && $('#copyHackBtn').addEventListener('click', () => { navigator.clipboard && navigator.clipboard.writeText($('#anatomyHack').textContent).catch(() => {}); sfx.playChime(820); toast('隐藏点单暗号已复制'); });
    $('#anatomyAddCart') && $('#anatomyAddCart').addEventListener('click', () => { const d = byId(selId); cartApi && cartApi.add({ name: d.name, brand: d.brand, price: d.price, couponPrice: d.couponPrice, caffeine: d.caffeine, spec: d.defaultTemp === 'iced' ? '冰饮' : '热饮' }); });
    $('#anatomyToLab') && $('#anatomyToLab').addEventListener('click', () => { labApi && labApi.setBase(selId); $('#lab') && $('#lab').scrollIntoView({ behavior: 'smooth' }); });
    $('#soundToggle') && $('#soundToggle').addEventListener('click', (e) => { const on = sfx.toggleAmbient(); e.currentTarget.classList.toggle('playing', on); $('.sound-label', e.currentTarget).textContent = on ? '声景 ON' : '声景 OFF'; toast(on ? '氛围声景已开启' : '氛围声景已关闭'); });
    $$('.theme-btn').forEach((b) => b.addEventListener('click', () => { const t = b.dataset.setTheme; document.documentElement.setAttribute('data-theme', t); $$('.theme-btn').forEach((x) => x.classList.toggle('active', x === b)); sfx.playChime(600); if (t === 'starbucks') selectDrink('sbx-flatwhite'); if (t === 'luckin') selectDrink('lkn-coconut'); }));
  });
})();
