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

    let backToTopAnimationFrame = null;

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function scrollSoftlyToTop() {
      const startY = window.scrollY || document.documentElement.scrollTop || 0;
      if (startY <= 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        window.scrollTo(0, 0);
        return;
      }

      if (backToTopAnimationFrame) {
        window.cancelAnimationFrame(backToTopAnimationFrame);
      }

      backToTopBtn?.classList.add('is-scrolling-top');

      const html = document.documentElement;
      const body = document.body;
      const previousHtmlScrollBehavior = html.style.scrollBehavior;
      const previousBodyScrollBehavior = body.style.scrollBehavior;

      /* Prevent CSS scroll-behavior: smooth from fighting the custom frame-by-frame scroll. */
      html.style.scrollBehavior = 'auto';
      body.style.scrollBehavior = 'auto';

      const startTime = performance.now();
      const duration = Math.min(18000, Math.max(5500, startY * 1.55));

      function finishScroll() {
        window.scrollTo(0, 0);
        html.style.scrollBehavior = previousHtmlScrollBehavior;
        body.style.scrollBehavior = previousBodyScrollBehavior;
        backToTopBtn?.classList.remove('is-scrolling-top');
        backToTopAnimationFrame = null;
        updateBackToTopButton();
      }

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutCubic(progress);
        const nextY = Math.max(0, startY * (1 - eased));

        window.scrollTo(0, nextY);

        if (progress < 1 && nextY > 0.5) {
          backToTopAnimationFrame = window.requestAnimationFrame(step);
        } else {
          finishScroll();
        }
      }

      backToTopAnimationFrame = window.requestAnimationFrame(step);
    }

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', scrollSoftlyToTop);
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

    /* === Background video loading and fallback ===
       Videos start only when they scroll near the viewport, so below-the-fold
       and mobile-hidden (display:none) videos never download or decode. Their
       poster is deferred via data-poster so large poster images are not fetched
       off-screen. The hero keeps its eager poster/preload in the markup. */
    (function () {
      const videos = [...document.querySelectorAll('video[data-autoplay-video]')];
      const started = new WeakSet();

      function prepareVideo(video) {
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
      }

      /* Pick a per-viewport source for videos that declare data-src / data-src-mobile.
         Resolved once, the first time the video starts, so the right file loads and
         the other never downloads. Videos using <source> children are left untouched. */
      function applySource(video) {
        if (!video.dataset.src || video.dataset.srcApplied) return;
        const useMobile = window.matchMedia('(max-width: 767px)').matches && video.dataset.srcMobile;
        video.src = useMobile ? video.dataset.srcMobile : video.dataset.src;
        video.dataset.srcApplied = '1';
      }

      function showPosterFallback(video) {
        video.classList.add('is-video-fallback');
        const poster = video.getAttribute('poster') || video.dataset.poster;
        const parent = video.parentElement;
        if (poster && parent) {
          parent.style.backgroundImage = `url("${poster}")`;
          parent.style.backgroundSize = 'cover';
          parent.style.backgroundPosition = getComputedStyle(video).objectPosition || 'center center';
        }
      }

      function startVideo(video) {
        /* Attach the deferred poster on first play so it is not fetched off-screen. */
        if (!video.getAttribute('poster') && video.dataset.poster) {
          video.setAttribute('poster', video.dataset.poster);
        }
        applySource(video);
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

      const inView = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            started.add(entry.target);
            startVideo(entry.target);
          }
        });
      }, { rootMargin: '200px 0px' });

      videos.forEach(video => {
        prepareVideo(video);
        inView.observe(video);
        video.addEventListener('error', () => showPosterFallback(video));
        video.addEventListener('pause', () => {
          if (!document.hidden && started.has(video)) startVideo(video);
        });
      });

      /* A first user gesture and tab refocus resume only the videos already in view. */
      ['touchstart', 'click'].forEach(eventName => {
        window.addEventListener(eventName, () => {
          videos.forEach(video => { if (started.has(video)) startVideo(video); });
        }, { once: true, passive: true });
      });

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          videos.forEach(video => { if (started.has(video)) startVideo(video); });
        }
      });
    })();
});
