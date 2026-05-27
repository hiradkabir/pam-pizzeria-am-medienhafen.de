/* Tailwind-Konfiguration */
tailwind.config = {
      theme: {
        extend: {
          colors: {
            'brand-red': '#DC2626',
            'brand-gold': '#C05E35',
            'brand-gold-light': '#D9895A',
            'brand-cream': '#FEF2F2',
            'brand-warm': '#F5E6D0',
            'brand-dark': '#0D0500',
            'brand-surface': '#1A0A00',
            'brand-surface-2': '#2D1200',
            'brand-muted': '#C4A882',
          },
          fontFamily: {
            'display': ['"Bodoni Moda"', 'serif'],
            'serif': ['"Bodoni Moda"', 'serif'],
            'sans': ['Jost', 'sans-serif'],
          },
        }
      }
    }

/* Seiteninteraktionen */
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile menu
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(a =>
      a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'))
    );

    // Scroll reveal
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Menu tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        btn.classList.add('active');
        const tab = document.getElementById('tab-' + btn.dataset.tab);
        tab.classList.remove('hidden');
        tab.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      });
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Modals
    function openModal(id) {
      const m = document.getElementById(id);
      m.classList.remove('hidden');
      m.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(id) {
      const m = document.getElementById(id);
      m.classList.add('hidden');
      m.classList.remove('flex');
      document.body.style.overflow = '';
    }
    document.getElementById('open-impressum').addEventListener('click', e => { e.preventDefault(); openModal('modal-impressum'); });
    document.getElementById('open-datenschutz').addEventListener('click', e => { e.preventDefault(); openModal('modal-datenschutz'); });
    ['modal-impressum','modal-datenschutz'].forEach(id => {
      document.getElementById(id + '-close').addEventListener('click', () => closeModal(id));
      document.getElementById(id + '-backdrop').addEventListener('click', () => closeModal(id));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeModal('modal-impressum'); closeModal('modal-datenschutz'); }
    });

    /* === FORCE VIDEO AUTOPLAY === */
    (function () {
      const videos = [
        document.getElementById('heroVideo'),
        document.getElementById('menuFireplaceVideo')
      ].filter(Boolean);

      function startVideo(video) {
        video.muted = true;
        video.defaultMuted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(function () {
            video.load();
            video.play().catch(function () {});
          });
        }
      }

      videos.forEach(function (video) {
        startVideo(video);

        video.addEventListener('loadeddata', function () {
          startVideo(video);
        });

        video.addEventListener('pause', function () {
          if (!document.hidden) {
            startVideo(video);
          }
        });
      });

      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
          videos.forEach(startVideo);
        }
      });
    })();
});
