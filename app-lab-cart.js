(function () {
  'use strict';
  window.RP_LC = {
    initLab: function (ctx) {
      const q = ctx.q, qq = ctx.qq, drinks = ctx.drinks, sfx = ctx.sfx, addToCart = ctx.addToCart, showToast = ctx.showToast;
      const sel = q('#labBaseDrink');
      sel.innerHTML = drinks.map((d) => '<option value="' + d.id + '">' + (d.brand === 'starbucks' ? '星巴克' : '瑞幸') + ' · ' + d.name + ' (¥' + d.price + ')</option>').join('');
      const st = { baseId: drinks[1].id, shots: { label: '标准双份 (2 Shots)', price: 0, caf: 150, kcal: 10 }, milk: { label: '全脂鲜牛乳', price: 0, kcal: 110 }, ice: '标准冰', sweet: { label: '半糖', kcal: 45 }, topping: { label: '无顶料', price: 0, kcal: 0 }, cust: 'VIP 咖啡鉴赏家' };
      sel.value = st.baseId;
      const upd = (anim) => {
        const b = drinks.find((x) => x.id === st.baseId) || drinks[0];
        const pr = Math.max(9.9, b.price + st.shots.price + st.milk.price + st.topping.price);
        const caf = st.shots.caf + (b.highcaf ? 35 : 0);
        const kcal = Math.max(15, st.shots.kcal + st.milk.kcal + st.sweet.kcal + st.topping.kcal);
        q('#recBrand').textContent = b.brand === 'starbucks' ? 'STARBUCKS LAB' : 'LUCKIN CRAFT LAB';
        q('#recCustomer').textContent = st.cust.trim() || 'VIP 咖啡鉴赏家';
        q('#recDrinkName').textContent = b.name;
        q('#recPrice').textContent = '¥' + pr.toFixed(2);
        q('#recCaf').textContent = caf + ' mg';
        q('#recKcal').textContent = kcal + ' kcal';
        q('#recCoupon').textContent = b.brand === 'luckin' ? '¥' + (b.couponPrice + Math.max(0, st.shots.price + st.topping.price)).toFixed(1) : '¥' + Math.max(24, pr - 6).toFixed(0);
        q('#recTime').textContent = new Date().toTimeString().slice(0, 8);
        q('#recSpecs').innerHTML = ['浓缩: ' + st.shots.label, '基底: ' + st.milk.label, '冰糖: ' + st.ice + ' / ' + st.sweet.label, '顶料: ' + st.topping.label].map((s) => '<li>' + s + '</li>').join('');
        if (anim) { const r = q('#thermalReceipt'); q('#recOrderNo').textContent = '#RP-2026-' + Math.floor(1000 + Math.random() * 8999); r.classList.remove('printing'); void r.offsetWidth; r.classList.add('printing'); sfx.playPrinterSound(); }
      };
      sel.addEventListener('change', (e) => { st.baseId = e.target.value; sfx.playChime(560); upd(); });
      qq('.lab-chips').forEach((g) => g.addEventListener('click', (e) => { const c = e.target.closest('.lab-chip'); if (!c) return; qq('.lab-chip', g).forEach((x) => x.classList.remove('active')); c.classList.add('active'); const k = g.dataset.lab; if (k === 'ice') st.ice = c.dataset.val; else st[k] = { label: c.textContent, price: Number(c.dataset.price || 0), caf: Number(c.dataset.caf || 0), kcal: Number(c.dataset.kcal || 0) }; sfx.playChime(620); upd(); }));
      q('#labCustomerName').addEventListener('input', (e) => { st.cust = e.target.value; upd(); });
      q('#printReceiptBtn').addEventListener('click', () => { upd(true); showToast('热敏处方小票已打印 🧾'); });
      q('#labAddToCartBtn').addEventListener('click', () => { const b = drinks.find((x) => x.id === st.baseId) || drinks[0], pr = Math.max(9.9, b.price + st.shots.price + st.milk.price + st.topping.price), caf = st.shots.caf + (b.highcaf ? 35 : 0); addToCart({ name: b.name + ' (特调)', brand: b.brand, price: pr, couponPrice: b.brand === 'luckin' ? Math.max(9.9, pr - 9) : Math.max(24, pr - 6), caffeine: caf, spec: st.shots.label + ' / ' + st.milk.label + ' / ' + st.ice }); });
      upd();
      return { setBase: (id) => { st.baseId = id; sel.value = id; upd(true); } };
    },
    initCart: function (ctx) {
      const q = ctx.q, sfx = ctx.sfx, showToast = ctx.showToast;
      let cart = [], coupon = false;
      const render = () => {
        q('#cartCount').textContent = cart.length;
        const el = q('#cartItems');
        if (!cart.length) { el.innerHTML = '<div class="cart-empty">点单袋还是空的，快去挑一杯吧 ☕</div>'; q('#cartTotalCaf').textContent = '0 mg'; q('#cartTotalPrice').textContent = '¥0'; return; }
        let caf = 0, sum = 0;
        el.innerHTML = cart.map((it) => { const p = coupon ? it.couponPrice : it.price; caf += it.caffeine; sum += p; return '<div class="cart-item"><div><div class="cart-item-title">' + it.name + '</div><div class="cart-item-meta">' + it.spec + '</div></div><div class="cart-item-right"><strong style="color:#d8ad7a;font-family:var(--font-mono)">¥' + p.toFixed(1) + '</strong><button class="cart-remove" data-uid="' + it.uid + '">移除</button></div></div>'; }).join('');
        q('#cartTotalCaf').textContent = caf + ' mg'; q('#cartTotalPrice').textContent = '¥' + sum.toFixed(1);
      };
      const add = (it) => { cart.push(Object.assign({}, it, { uid: Date.now() + Math.random() })); render(); sfx.playChime(760); showToast('已加入点单袋：「' + it.name + '」☕'); };
      const toggle = (o) => { q('#cartDrawer').classList.toggle('open', o); q('#cartBackdrop').classList.toggle('open', o); };
      q('#cartTrigger').addEventListener('click', () => toggle(true));
      q('#cartCloseBtn').addEventListener('click', () => toggle(false));
      q('#cartBackdrop').addEventListener('click', () => toggle(false));
      q('#cartItems').addEventListener('click', (e) => { const rm = e.target.closest('.cart-remove'); if (!rm) return; cart = cart.filter((x) => String(x.uid) !== rm.dataset.uid); render(); });
      q('#toggleLuckinCoupon').addEventListener('click', (e) => { coupon = !coupon; e.currentTarget.classList.toggle('applied', coupon); e.currentTarget.textContent = coupon ? '✅ 已激活模拟优惠券' : '🎫 应用模拟优惠券（瑞幸 9.9 / 星巴克满减）'; sfx.playChime(740); render(); });
      q('#checkoutBtn').addEventListener('click', () => { if (!cart.length) { showToast('点单袋还是空的'); return; } sfx.playChime(880); showToast('下单成功！共 ' + cart.length + ' 杯已进入现萃队列 🎉'); cart = []; render(); toggle(false); });
      return { add: add };
    }
  };
})();
