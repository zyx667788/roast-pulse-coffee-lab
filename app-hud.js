(function () {
  'use strict';
  const LABELS = ['浓醇度', '丝滑奶感', '甜润度', '果酸花香', '提神指数', '性价比'];
  function radarSVG(el, list, size) {
    if (!el) return;
    const s = size || 260, cx = s / 2, cy = s / 2, r0 = s * 0.35, n = 6;
    let h = '';
    for (let l = 1; l <= 4; l++) {
      const r = (r0 / 4) * l, pts = [];
      for (let i = 0; i < n; i++) { const a = (Math.PI * 2 * i) / n - Math.PI / 2; pts.push((cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1)); }
      h += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="rgba(255,245,230,0.12)" stroke-width="1"/>';
    }
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a) * r0).toFixed(1) + '" y2="' + (cy + Math.sin(a) * r0).toFixed(1) + '" stroke="rgba(255,245,230,0.1)" stroke-width="1"/>';
      h += '<text x="' + (cx + Math.cos(a) * (r0 + 22)).toFixed(1) + '" y="' + (cy + Math.sin(a) * (r0 + 18)).toFixed(1) + '" fill="#a69c92" font-size="10.5" text-anchor="middle" dominant-baseline="middle">' + LABELS[i] + '</text>';
    }
    list.forEach((sr) => {
      const pts = [], dots = [];
      sr.values.forEach((v, i) => { const a = (Math.PI * 2 * i) / n - Math.PI / 2, r = (v / 10) * r0, px = (cx + Math.cos(a) * r).toFixed(1), py = (cy + Math.sin(a) * r).toFixed(1); pts.push(px + ',' + py); dots.push('<circle cx="' + px + '" cy="' + py + '" r="3.2" fill="' + sr.stroke + '"/>'); });
      h += '<polygon points="' + pts.join(' ') + '" fill="' + sr.fill + '" stroke="' + sr.stroke + '" stroke-width="2"/>' + dots.join('');
    });
    el.innerHTML = h;
  }
  window.RP_HUD = {
    radarSVG: radarSVG,
    updateAnatomy: function (d) {
      const q = (s) => document.querySelector(s), isS = d.brand === 'starbucks';
      q('#anatomyBrand').textContent = d.brandLabel;
      q('#anatomyBrand').className = 'anatomy-badge' + (isS ? '' : ' luckin');
      q('#anatomyTitle').textContent = d.name + ' · ' + d.enName;
      q('#anatomyStory').textContent = d.story;
      q('#anatomyCaf').textContent = d.caffeine + ' mg';
      q('#anatomyKcal').textContent = d.kcal + ' kcal';
      q('#anatomyPrice').textContent = '¥' + d.price + ' (券约¥' + d.couponPrice + ')';
      q('#anatomyRoast').textContent = d.roast;
      q('#anatomyHack').textContent = d.hack;
      q('#xrayLayers').innerHTML = d.layers.map((l) => '<div class="xray-layer" style="height:' + l.pct + '%;background:' + l.color + ';">' + (l.pct >= 12 ? l.label + ' ' + l.pct + '%' : '') + '</div>').join('');
      q('#xrayLegend').innerHTML = d.layers.map((l) => '<span class="xray-leg-item"><i class="xray-swatch" style="background:' + l.color + '"></i>' + l.label + ' ' + l.pct + '%</span>').join('');
      radarSVG(q('#anatomyRadar'), [{ values: d.radar, stroke: isS ? '#1ea874' : '#3b82f6', fill: isS ? 'rgba(30,168,116,0.28)' : 'rgba(59,130,246,0.28)' }], 260);
      q('#anatomyNotes').innerHTML = d.notes.map((n) => '<span class="note-pill">' + n + '</span>').join('');
    },
    initCollapse: function (playChime) {
      const wrap = document.querySelector('#heroHud'), card = document.querySelector('#hudCard'), btn = document.querySelector('#hudCollapseBtn'), txt = document.querySelector('#hudCollapseText');
      if (!wrap || !card || !btn) return;
      const setC = (c) => { card.classList.toggle('collapsed', c); wrap.classList.toggle('is-collapsed', c); btn.setAttribute('aria-expanded', String(!c)); if (txt) txt.textContent = c ? '展开' : '收起'; };
      btn.addEventListener('click', (e) => { e.stopPropagation(); const n = !card.classList.contains('collapsed'); setC(n); if (playChime) playChime(n ? 460 : 680); });
      const hdr = card.querySelector('.hud-header');
      if (hdr) hdr.addEventListener('click', (e) => { if (!e.target.closest('#hudCollapseBtn') && card.classList.contains('collapsed')) { setC(false); if (playChime) playChime(680); } });
    }
  };
})();
