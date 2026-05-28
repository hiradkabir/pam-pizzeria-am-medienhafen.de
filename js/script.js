/* Seiteninteraktionen */
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile hamburger navigation removed intentionally.


    // Desktop-only back-to-top button
    const backToTopBtn = document.getElementById('back-to-top');
    const desktopBackToTopQuery = window.matchMedia('(min-width: 768px)');
    let backToTopTicking = false;

    function updateBackToTopButton() {
      if (!backToTopBtn) return;
      const revealPoint = Math.min(window.innerHeight * 0.65, 620);
      const shouldShow = desktopBackToTopQuery.matches && window.scrollY > revealPoint;
      backToTopBtn.classList.toggle('is-visible', shouldShow);
      backToTopTicking = false;
    }

    function requestBackToTopUpdate() {
      if (backToTopTicking) return;
      backToTopTicking = true;
      window.requestAnimationFrame(updateBackToTopButton);
    }

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', requestBackToTopUpdate, { passive: true });
      window.addEventListener('resize', requestBackToTopUpdate, { passive: true });
      desktopBackToTopQuery.addEventListener?.('change', updateBackToTopButton);
      updateBackToTopButton();
    }

    // Scroll reveal
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Menu tabs
    let tabSwitchTimeout = null;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = document.getElementById('tab-' + btn.dataset.tab);
        const currentTab = document.querySelector('.tab-content:not(.hidden)');
        if (currentTab === targetTab) return;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (tabSwitchTimeout) clearTimeout(tabSwitchTimeout);

        const showNext = () => {
          document.querySelectorAll('.tab-content').forEach(c => {
            if (c !== targetTab) {
              c.classList.add('hidden');
              c.classList.remove('tab-fading-out', 'tab-entering');
            }
          });
          targetTab.classList.remove('hidden', 'tab-entering');
          void targetTab.offsetWidth;
          targetTab.classList.add('tab-entering');
          targetTab.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        };

        if (currentTab) {
          currentTab.classList.add('tab-fading-out');
          tabSwitchTimeout = setTimeout(showNext, 310);
        } else {
          showNext();
        }
      });
    });

    // Menu tabs: Swipe-Geste links/rechts wechselt Tab
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const tabOrder = [...document.querySelectorAll('.tab-btn')].map(b => b.dataset.tab);
      let touchStartX = 0, touchStartY = 0, touchActive = false;
      menuSection.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchActive = true;
      }, { passive: true });
      menuSection.addEventListener('touchend', (e) => {
        if (!touchActive) return;
        touchActive = false;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        const curr = document.querySelector('.tab-btn.active')?.dataset.tab;
        if (!curr) return;
        const i = tabOrder.indexOf(curr);
        const next = i + (dx < 0 ? 1 : -1);
        if (next < 0 || next >= tabOrder.length) return;
        document.querySelector(`.tab-btn[data-tab="${tabOrder[next]}"]`)?.click();
      }, { passive: true });
    }

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

    /* === Responsive video autoplay and fallback handling === */
    (function () {
      const videos = [...document.querySelectorAll('video[data-autoplay-video]')];

      function prepareVideo(video) {
        video.muted = true;
        video.defaultMuted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
      }

      function showPosterFallback(video) {
        video.classList.add('is-video-fallback');
        const poster = video.getAttribute('poster');
        const parent = video.parentElement;
        if (poster && parent) {
          parent.style.backgroundImage = `url("${poster}")`;
          parent.style.backgroundSize = 'cover';
          parent.style.backgroundPosition = getComputedStyle(video).objectPosition || 'center center';
        }
      }

      function startVideo(video) {
        prepareVideo(video);
        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise
            .then(() => video.classList.remove('is-video-fallback'))
            .catch(() => {
              video.load();
              video.play()
                .then(() => video.classList.remove('is-video-fallback'))
                .catch(() => showPosterFallback(video));
            });
        }
      }

      videos.forEach(video => {
        prepareVideo(video);
        startVideo(video);
        video.addEventListener('canplay', () => startVideo(video), { once: true });
        video.addEventListener('error', () => showPosterFallback(video));
        video.addEventListener('pause', () => {
          if (!document.hidden) startVideo(video);
        });
      });

      ['touchstart', 'click'].forEach(eventName => {
        window.addEventListener(eventName, () => videos.forEach(startVideo), {
          once: true,
          passive: true
        });
      });

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) videos.forEach(startVideo);
      });
    })();
});
