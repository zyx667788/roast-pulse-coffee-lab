(function () {
  'use strict';
  window.RP_SA = {
    initSommelier: function (ctx) {
      const q = ctx.q, qq = ctx.qq, drinks = ctx.drinks, sfx = ctx.sfx, selectDrink = ctx.selectDrink, addToCart = ctx.addToCart, showToast = ctx.showToast;
      const state = { mood: 'wake', milk: 'creamy', intensity: 6, sweetness: 5, budget: 'any' };
      let rec = drinks[1];
      const evalMatch = () => {
        const list = drinks.map((d) => {
          let sc = 55;
          if (d.moods.includes(state.mood)) sc += 20;
          if (d.milkType === state.milk) sc += 16;
          sc += Math.max(0, 12 - Math.abs(d.radar[0] - state.intensity) * 2);
          sc += Math.max(0, 10 - Math.abs(d.radar[2] - state.sweetness) * 1.8);
          if (state.budget === 'value' && d.brand === 'luckin') sc += 14;
          if (state.budget === 'premium' && d.brand === 'starbucks') sc += 14;
          return { drink: d, score: Math.min(99, Math.round(sc)) };
        }).sort((a, b) => b.score - a.score);
        rec = list[0].drink;
        const run = list[1].drink;
        q('#matchRingFg').style.strokeDashoffset = (326.7 * (1 - list[0].score / 100)).toFixed(1);
        q('#matchScoreNum').textContent = list[0].score;
        q('#resultBrand').textContent = rec.brandLabel;
        q('#resultName').textContent = rec.name + ' · ¥' + rec.price;
        q('#resultReason').textContent = '契合「' + state.intensity + '/10 浓醇」与「' + state.sweetness + '/10 甜度」：' + rec.tagline;
        q('#resultRunnerup').textContent = '备选：' + (run.brand === 'starbucks' ? '星巴克' : '瑞幸') + '「' + run.name + '」(' + list[1].score + '%)';
      };
      qq('.quiz-options').forEach((g) => g.addEventListener('click', (e) => { const c = e.target.closest('.quiz-chip'); if (!c) return; qq('.quiz-chip', g).forEach((x) => x.classList.remove('active')); c.classList.add('active'); state[g.dataset.quiz] = c.dataset.val; sfx.playChime(660); evalMatch(); }));
      q('#prefIntensity').addEventListener('input', (e) => { state.intensity = Number(e.target.value); q('#prefIntensityVal').textContent = state.intensity + '/10'; evalMatch(); });
      q('#prefSweetness').addEventListener('input', (e) => { state.sweetness = Number(e.target.value); q('#prefSweetnessVal').textContent = state.sweetness + '/10'; evalMatch(); });
      qq('.budget-toggle .mini-chip').forEach((b) => b.addEventListener('click', () => { qq('.budget-toggle .mini-chip').forEach((x) => x.classList.remove('active')); b.classList.add('active'); state.budget = b.dataset.budget; sfx.playChime(600); evalMatch(); }));
      q('#resultView3D').addEventListener('click', () => { sfx.playPourSound(); selectDrink(rec.id, true); if (ctx.getStage()) ctx.getStage().triggerPour(); showToast('3D 舞台已切换至「' + rec.name + '」'); });
      q('#resultAddCart').addEventListener('click', () => addToCart({ name: rec.name, brand: rec.brand, price: rec.price, couponPrice: rec.couponPrice, caffeine: rec.caffeine, spec: 'AI 选杯推荐' }));
      evalMatch();
    },
    initArena: function (ctx) {
      const q = ctx.q, drinks = ctx.drinks, sfx = ctx.sfx, radarSVG = ctx.radarSVG, showToast = ctx.showToast;
      const sbx = drinks.filter((d) => d.brand === 'starbucks'), lkn = drinks.filter((d) => d.brand === 'luckin');
      const selS = q('#arenaSelectSbx'), selL = q('#arenaSelectLkn');
      selS.innerHTML = sbx.map((d) => '<option value="' + d.id + '">' + d.name + '</option>').join('');
      selL.innerHTML = lkn.map((d) => '<option value="' + d.id + '">' + d.name + '</option>').join('');
      const votes = { starbucks: 1428, luckin: 1564 };
      const draw = () => {
        const a = drinks.find((x) => x.id === selS.value) || sbx[0], b = drinks.find((x) => x.id === selL.value) || lkn[0];
        const card = (el, d, col) => { const eff = (d.caffeine / d.couponPrice).toFixed(1); el.innerHTML = '<div class="fighter-head"><div class="fighter-name">' + d.name + '</div><div class="fighter-price">¥' + d.price + '</div></div><p style="font-size:0.82rem;color:#a69c92">' + d.tagline + '</p><div class="fighter-metric-list"><div><div class="f-metric"><span>咖啡因</span><strong>' + d.caffeine + ' mg</strong></div><div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, d.caffeine / 2.4) + '%;background:' + col + '"></div></div></div><div><div class="f-metric"><span>热量</span><strong>' + d.kcal + ' kcal</strong></div><div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, d.kcal / 2.8) + '%;background:' + col + '"></div></div></div><div><div class="f-metric"><span>咖啡因效率</span><strong>' + eff + ' mg/¥</strong></div><div class="f-bar-track"><div class="f-bar-fill" style="width:' + Math.min(100, Number(eff) * 5) + '%;background:' + col + '"></div></div></div></div>'; };
        card(q('#arenaCardSbx'), a, '#1ea874'); card(q('#arenaCardLkn'), b, '#3b82f6');
        radarSVG(q('#arenaRadar'), [{ values: a.radar, stroke: '#1ea874', fill: 'rgba(30,168,116,0.25)' }, { values: b.radar, stroke: '#3b82f6', fill: 'rgba(59,130,246,0.26)' }], 300);
        q('#arenaVerdict').innerHTML = '<strong>裁判：</strong>提神看 ' + (a.caffeine >= b.caffeine ? a.name : b.name) + '；低卡看 ' + (a.kcal <= b.kcal ? a.name : b.name) + '；性价比看瑞幸 ¥' + b.couponPrice + '。';
      };
      selS.addEventListener('change', () => { sfx.playChime(520); draw(); }); selL.addEventListener('change', () => { sfx.playChime(580); draw(); }); draw();
      const updV = () => { const tot = votes.starbucks + votes.luckin, pS = Math.round((votes.starbucks / tot) * 100), pL = 100 - pS; q('#voteFillSbx').style.width = pS + '%'; q('#voteFillSbx').textContent = pS + '%'; q('#voteFillLkn').style.width = pL + '%'; q('#voteFillLkn').textContent = pL + '%'; };
      q('#voteSbxBtn').addEventListener('click', () => { votes.starbucks++; sfx.playChime(680); updV(); showToast('已投星巴克 +1 票'); });
      q('#voteLknBtn').addEventListener('click', () => { votes.luckin++; sfx.playChime(740); updV(); showToast('已投瑞幸 +1 票'); }); updV();
    }
  };
})();
