const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 20 + 30
      });
    }
    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196, 146, 42, ${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // ── Navbar scroll
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));

    // ── Counter animation — slot machine style
    function animateCounter(el, target) {
      const duration = 1800;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';
      el.classList.add('scrambling');
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (progress < 1) {
          const display = progress < 0.7
            ? Math.floor(Math.random() * Math.max(target * 2, 99))
            : Math.floor(eased * target);
          el.textContent = display + suffix;
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
          el.classList.remove('scrambling');
        }
      }
      requestAnimationFrame(tick);
    }
    const statNums = document.querySelectorAll('[data-target]');
    const statsIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target, +e.target.dataset.target); statsIO.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statsIO.observe(el));

    // ── Menu data
    const menuData = {
      coffee: [
        { name: 'House Espresso', price: '£3.20', desc: 'Our signature blend — rich, chocolatey with a clarity that cuts through. A double shot of thirty-seven years of craft.', origin: 'Colombia · Ethiopia blend', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=75' },
        { name: 'Flat White', price: '£4.00', desc: 'Velvety microfoam poured with intention over our single-origin espresso. The purist\'s choice.', origin: 'Brazil · Single Origin', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=75' },
        { name: 'The Morning Long', price: '£4.50', desc: 'A long black with a whisper of cardamom — an old-world inflection on the morning ritual.', origin: 'Yemen · Aged Harvest', img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&q=75' },
        { name: 'Pour Over', price: '£5.80', desc: 'Patience as practice. Brewed to order through a V60, each cup reveals the terroir of its single origin bean.', origin: 'Ethiopia Yirgacheffe', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=75' },
        { name: 'Cold Brew Tonic', price: '£6.50', desc: 'Eighteen-hour cold brew married with house-made tonic water and a slice of dried orange. Transcendently refreshing.', origin: 'Guatemala Huehuetenango', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=75' },
        { name: 'Ceremonial Latte', price: '£5.20', desc: 'A three-layer affair: espresso base, brown butter steamed oat milk, a crown of vanilla-smoked foam.', origin: 'Peru Chanchamayo', img: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?w=500&q=75' },
      ],
      tea: [
        { name: 'Darjeeling First Flush', price: '£5.50', desc: 'Spring harvest only — a golden cup of honey, apricot and the faintest green note. Served without milk, always.', origin: 'Darjeeling, India', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=75' },
        { name: 'House Earl Grey', price: '£4.20', desc: 'Our own blend of Assam and Keemun with true bergamot oil — none of the artificial citrus that ruins lesser versions.', origin: 'Assam · Keemun blend', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=75' },
        { name: 'Roasted Hojicha', price: '£5.00', desc: 'Japanese green tea roasted over charcoal at high heat. Warm, woody, and meditative — better than any sedative.', origin: 'Uji, Kyoto Japan', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=75' },
        { name: 'Wildflower Tisane', price: '£4.80', desc: 'House-blended from lavender, chamomile, lemon verbena and dried elderflower. A meadow in a cup.', origin: 'Seasonal · Local Harvest', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&q=75' },
      ],
      food: [
        { name: 'Cardamom Toast', price: '£5.50', desc: 'Thick sourdough, house-churned cardamom butter, orange blossom honey and a scatter of toasted pistachios.', origin: 'Baked in house, daily', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=75' },
        { name: 'The Archivist\'s Plate', price: '£12.00', desc: 'A changing arrangement of aged cheeses, walnut rye crackers, quince paste and seasonal pickles. Named for those who linger longest.', origin: 'Borough Market sourced', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&q=75' },
        { name: 'Almond & Rose Tart', price: '£6.80', desc: 'Frangipane in a butter-dark shell, crowned with rose-poached pear and edible petals. Eaten in silence.', origin: 'Pastry Chef Rachel Liu', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=75' },
        { name: 'Afternoon Set', price: '£18.50', desc: 'Two of anything from our kitchen, a pot of your chosen tea, and one of the house scones with clotted cream. Served daily 2–5 pm.', origin: 'For two · Reservations advised', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=75' },
      ]
    };

    function renderMenu(tab) {
      const grid = document.getElementById('menuContent');
      grid.innerHTML = '';
      menuData[tab].forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'menu-item reveal';
        el.style.animationDelay = (i * 0.08) + 's';
        el.innerHTML = `
      <div class="item-img-wrap">
        <img
          src="${item.img}"
          alt="${item.name}"
          class="item-img"
          onerror="this.parentElement.classList.add('img-fallback')"
        />
        <div class="item-img-overlay"></div>
        <span class="item-img-label">${item.origin}</span>
      </div>
      <div class="item-body">
        <div class="item-header">
          <span class="item-name">${item.name}</span>
          <span class="item-price">${item.price}</span>
        </div>
        <p class="item-desc">${item.desc}</p>
      </div>
    `;
        grid.appendChild(el);
        setTimeout(() => io.observe(el), 50);
      });
    }
    renderMenu('coffee');

    document.getElementById('menuTabs').addEventListener('click', e => {
      if (!e.target.matches('.tab-btn')) return;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderMenu(e.target.dataset.tab);
    });

    // ── Testimonials
    const testimonials = [
      { quote: "I've been coming here for fifteen years. The coffee changes with the seasons, but the feeling never does — it always feels like coming home.", author: "James Whitmore · Regular since 2009" },
      { quote: "In a city of a million coffee shops, Grounds & Grace still manages to feel like it was made just for you. That is a rare and precious thing.", author: "The Guardian · 2023 Review" },
      { quote: "The pour over is, without exaggeration, the finest coffee I have tasted outside of a competition setting. Whatever they're doing, I want more of it.", author: "Sarah Chen · Coffee Writer" },
      { quote: "My Sunday morning ritual for seven years: the window seat, the Darjeeling, and the almond tart. I arrange my week around it.", author: "Dr. Oliver Marsh · Marylebone" },
    ];
    let currentT = 0;
    const wrap = document.getElementById('testimonialsWrap');
    const dotsEl = document.getElementById('testimonialDots');
    testimonials.forEach((t, i) => {
      const el = document.createElement('div');
      el.className = 'testimonial' + (i === 0 ? ' active' : '');
      el.innerHTML = `<blockquote>${t.quote}</blockquote><cite>${t.author}</cite>`;
      wrap.appendChild(el);
      const dot = document.createElement('button');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => setTestimonial(i));
      dotsEl.appendChild(dot);
    });
    function setTestimonial(n) {
      document.querySelectorAll('.testimonial')[currentT].classList.remove('active');
      document.querySelectorAll('.t-dot')[currentT].classList.remove('active');
      currentT = n;
      document.querySelectorAll('.testimonial')[currentT].classList.add('active');
      document.querySelectorAll('.t-dot')[currentT].classList.add('active');
    }
    setInterval(() => setTestimonial((currentT + 1) % testimonials.length), 5000);