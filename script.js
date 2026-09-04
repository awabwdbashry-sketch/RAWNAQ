/* =============================================================
   RAWNAQ — رَونق  |  script.js
   ============================================================= */
(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- NAVBAR SCROLL TRANSITION ---------------- */
  const navbar = document.getElementById('navbar');
  function onScroll(){
    if(window.scrollY > 60){ navbar.classList.add('scrolled'); }
    else{ navbar.classList.remove('scrolled'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------------- MOBILE MENU ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', function(){
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ---------------- ACTIVE NAV LINK ON SCROLL ---------------- */
  const sections = ['home','collections','gold','diamond','story','gallery','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinkMap = {};
  document.querySelectorAll('.nav-link').forEach(link=>{
    navLinkMap[link.getAttribute('href').slice(1)] = link;
  });
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        Object.values(navLinkMap).forEach(l=>l.classList.remove('active'));
        const link = navLinkMap[entry.target.id];
        if(link) link.classList.add('active');
      }
    });
  }, {rootMargin: '-40% 0px -50% 0px'});
  sections.forEach(s=>navObserver.observe(s));

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-up');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.15});
  revealEls.forEach(el=>revealObserver.observe(el));

  /* ---------------- HERO GOLD PARTICLES ---------------- */
  (function particles(){
    const canvas = document.getElementById('particles');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w,h,parts=[];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function init(){
      resize();
      const count = w < 700 ? 22 : 46;
      parts = Array.from({length:count}, ()=>({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6 + .4,
        s: Math.random()*.35 + .08,
        o: Math.random()*.5 + .15
      }));
    }
    function tick(){
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#e0c07a';
      parts.forEach(p=>{
        p.y -= p.s;
        if(p.y < -4){ p.y = h + 4; p.x = Math.random()*w; }
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if(!reduceMotion) requestAnimationFrame(tick);
    }
    window.addEventListener('resize', resize);
    init();
    if(!reduceMotion){ requestAnimationFrame(tick); }
  })();

  /* ---------------- PRODUCT DATA ---------------- */
  const PRODUCTS = [
    {
      id: 'khatam-rawnaq',
      collection: 'أصالة',
      name: 'خاتم رَونق',
      desc: 'خاتم ذهبي بخطوط ناعمة، مصمم ليكون حضورًا يوميًا أنيقًا.',
      material: 'ذهب عيار 21',
      img: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'siwar-wahaj',
      collection: 'وهج',
      name: 'سوار وهج',
      desc: 'سوار مضفّر بلمسة ذهبية دافئة، يجمع بين الحداثة والتراث.',
      material: 'ذهب عيار 18',
      img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'qiladat-sumou',
      collection: 'سُمو',
      name: 'قلادة سُمو',
      desc: 'قلادة مهيبة بتصميم متدرج، تليق بأبهى المناسبات.',
      material: 'ذهب عيار 21',
      img: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'aqrat-layali',
      collection: 'ليالي',
      name: 'أقراط ليالي',
      desc: 'أقراط مرصّعة بلمعان هادئ، مستوحاة من سحر الليل.',
      material: 'ذهب مع تفاصيل مرصّعة',
      img: 'https://images.unsplash.com/photo-1705326453282-e4e1b78f5fea?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'khatam-naqaa',
      collection: 'نقاء',
      name: 'خاتم نقاء',
      desc: 'خاتم مرصّع بتصميم بسيط وناصع، لإطلالة راقية.',
      material: 'ذهب أبيض مع تفاصيل مرصّعة',
      img: 'https://images.unsplash.com/photo-1607703829739-c05b7beddf60?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'qiladat-asala',
      collection: 'أصالة',
      name: 'قلادة أصالة',
      desc: 'قلادة تحمل روح الحِرفية السودانية بلمسة عصرية.',
      material: 'ذهب عيار 21',
      img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'siwar-riqqa',
      collection: 'رِقّة',
      name: 'سوار رِقّة',
      desc: 'سوار خفيف الحضور بخطوط رفيعة، لإطلالة يومية عميقة الأثر.',
      material: 'ذهب عيار 18',
      img: 'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  /* ---------------- RENDER PRODUCT GRID ---------------- */
  const productGrid = document.getElementById('productGrid');
  PRODUCTS.forEach(function(p){
    const card = document.createElement('article');
    card.className = 'product-card reveal-up';
    card.innerHTML =
      '<div class="pc-media"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy" decoding="async"></div>' +
      '<div class="pc-info">' +
        '<h3>'+p.name+'</h3>' +
        '<p>'+p.desc+'</p>' +
        '<div class="pc-actions">' +
          '<span class="pc-price">اطلب السعر</span>' +
          '<button class="pc-btn" type="button">اكتشف التفاصيل</button>' +
        '</div>' +
      '</div>';
    card.querySelector('.pc-btn').addEventListener('click', function(){ openModal(p.id); });
    card.querySelector('.pc-media img').addEventListener('click', function(){ openModal(p.id); });
    productGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------------- COLLECTION CARD -> PRODUCT MODAL ---------------- */
  const collectionToProduct = {
    wahaj: 'siwar-wahaj',
    naqaa: 'khatam-naqaa',
    sumou: 'qiladat-sumou',
    asala: 'qiladat-asala',
    riqqa: 'siwar-riqqa',
    layali: 'aqrat-layali'
  };
  document.querySelectorAll('[data-product]').forEach(function(btn){
    btn.addEventListener('click', function(){
      const key = btn.getAttribute('data-product');
      openModal(collectionToProduct[key] || PRODUCTS[0].id);
    });
  });

  /* ---------------- PRODUCT MODAL ---------------- */
  const modal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalDesc = document.getElementById('modalDesc');
  const modalCollection = document.getElementById('modalCollection');
  const modalMaterial = document.getElementById('modalMaterial');
  const modalClose = document.getElementById('modalClose');

  function openModal(id){
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return;
    modalImg.src = p.img;
    modalImg.alt = p.name;
    modalName.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalCollection.textContent = 'مجموعة ' + p.collection;
    modalMaterial.textContent = p.material;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });

  /* ---------------- GALLERY (MASONRY + LIGHTBOX) ---------------- */
  const GALLERY_IMAGES = [
    { src:'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=900&auto=format&fit=crop', alt:'إطلالة بمجوهرات ذهبية' },
    { src:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=900&auto=format&fit=crop', alt:'سوار ذهبي على مجلة' },
    { src:'https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?q=80&w=900&auto=format&fit=crop', alt:'خواتم ذهبية في صندوق' },
    { src:'https://images.unsplash.com/photo-1651160670627-2896ddf7822f?q=80&w=900&auto=format&fit=crop', alt:'قلادة ذهبية وسوداء' },
    { src:'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=900&auto=format&fit=crop', alt:'خواتم ذهبية مرصّعة' },
    { src:'https://images.unsplash.com/photo-1719924998065-0c60e329ef58?q=80&w=900&auto=format&fit=crop', alt:'خواتم على طاولة' },
    { src:'https://images.unsplash.com/photo-1650389236412-e7413cbcf2fe?q=80&w=900&auto=format&fit=crop', alt:'عرض مجوهرات فاخر' },
    { src:'https://images.unsplash.com/photo-1626784215013-13322cb0e471?q=80&w=900&auto=format&fit=crop', alt:'أساور ذهبية وفضية' },
    { src:'https://images.unsplash.com/photo-1705326454933-9685fc6888e1?q=80&w=900&auto=format&fit=crop', alt:'أقراط ذهبية' },
    { src:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop', alt:'قلادة لؤلؤية مع صندوق' },
    { src:'https://images.unsplash.com/photo-1578469488462-96f9af23e4b8?q=80&w=900&auto=format&fit=crop', alt:'مجموعة مجوهرات ذهبية' },
    { src:'https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?q=80&w=900&auto=format&fit=crop', alt:'مجوهرات في صندوق عرض' },
    { src:'https://images.unsplash.com/photo-1611107683227-e9060eccd846?q=80&w=900&auto=format&fit=crop', alt:'سلسلة ذهبية على سطح ناصع' },
    { src:'https://images.unsplash.com/photo-1701777892770-df3bf8006fd8?q=80&w=900&auto=format&fit=crop', alt:'أقراط بتفاصيل دقيقة' }
  ];

  const masonry = document.getElementById('masonryGallery');
  GALLERY_IMAGES.forEach(function(item, idx){
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.addEventListener('click', function(){ openLightbox(idx); });
    masonry.appendChild(img);
  });

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  let currentIndex = 0;

  function openLightbox(idx){
    currentIndex = idx;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function updateLightbox(){
    const item = GALLERY_IMAGES[currentIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', function(){
    currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    updateLightbox();
  });
  document.getElementById('lbNext').addEventListener('click', function(){
    currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') document.getElementById('lbPrev').click();
    if(e.key === 'ArrowLeft') document.getElementById('lbNext').click();
  });

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    formNote.textContent = 'شكرًا لتواصلك معنا، سيقوم فريقنا بالرد قريبًا.';
    contactForm.reset();
    setTimeout(function(){ formNote.textContent = ''; }, 6000);
  });

})();