/* Seiteninteraktionen */
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile hamburger navigation
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    function closeMobileMenu() {
      if (!navbar || !mobileMenuToggle) return;
      navbar.classList.remove('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.setAttribute('aria-label', 'Menü öffnen');
    }

    function toggleMobileMenu() {
      if (!navbar || !mobileMenuToggle) return;
      const isOpen = navbar.classList.toggle('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    }

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
      document.addEventListener('click', e => {
        if (navbar?.classList.contains('mobile-menu-open') && !navbar.contains(e.target)) {
          closeMobileMenu();
        }
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMobileMenu();
      }, { passive: true });
    }


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


    // Hide the floating telephone button when the full contact CTA is available.
    const mobileCallButton = document.getElementById('mobile-cta-fab');
    const contactOrderCta = document.querySelector('#contact .contact-order-cta');

    if (mobileCallButton && contactOrderCta && 'IntersectionObserver' in window) {
      const contactCtaObserver = new IntersectionObserver(entries => {
        const contactCtaVisible = entries.some(entry =>
          entry.isIntersecting && entry.intersectionRatio >= 0.12
        );
        mobileCallButton.classList.toggle('is-contact-cta-visible', contactCtaVisible);
      }, {
        threshold: [0, 0.12, 0.35],
        rootMargin: '0px 0px -5% 0px'
      });

      contactCtaObserver.observe(contactOrderCta);
    }



    // Gallery focus weighting
    // The centered image is highlighted automatically. Neighboring cards scale
    // continuously according to their distance from the carousel center.
    const galleryTrack = document.querySelector('#gallery .gallery-mobile-carousel');

    if (galleryTrack) {
      const galleryItems = [...galleryTrack.querySelectorAll(':scope > .gallery-item')];
      const galleryIndicator = document.querySelector('#gallery .gallery-scroll-indicator');
      const nativeGalleryMarkersSupported = typeof CSS !== 'undefined'
        && typeof CSS.supports === 'function'
        && CSS.supports('selector(::scroll-marker)');
      const galleryIndicatorDots = !nativeGalleryMarkersSupported
        && galleryIndicator
        && galleryItems.length > 1
        ? galleryItems.map((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'gallery-scroll-indicator__dot';
            dot.dataset.galleryIndex = String(index);
            galleryIndicator.appendChild(dot);
            return dot;
          })
        : [];
      let galleryFrame = 0;
      let galleryFocusInitialized = false;

      function markGalleryImageReady(item, image) {
        let finished = false;

        const reveal = () => {
          if (finished) return;
          finished = true;

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              item.classList.add('is-image-ready');
              requestGalleryFocusUpdate();
            });
          });
        };

        const decodeThenReveal = () => {
          if (typeof image.decode === 'function') {
            image.decode().then(reveal).catch(reveal);
          } else {
            reveal();
          }
        };

        if (image.complete && image.naturalWidth > 0) {
          decodeThenReveal();
        } else {
          image.addEventListener('load', decodeThenReveal, { once: true });
          image.addEventListener('error', reveal, { once: true });
        }
      }

      function updateGalleryFocus() {
        galleryFrame = 0;

        const trackRect = galleryTrack.getBoundingClientRect();
        const trackCenter = trackRect.left + (trackRect.width / 2);
        const firstWidth = galleryItems[0]?.getBoundingClientRect().width || trackRect.width;
        const influenceDistance = Math.max(firstWidth * 1.15, trackRect.width * 0.58);

        let closestItem = null;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        galleryItems.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + (rect.width / 2);
          const distance = Math.abs(itemCenter - trackCenter);
          const linearFocus = Math.max(0, Math.min(1, 1 - (distance / influenceDistance)));
          const smoothFocus = linearFocus * linearFocus * (3 - (2 * linearFocus));

          item.style.setProperty('--gallery-focus', smoothFocus.toFixed(4));

          if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
            closestIndex = index;
          }
        });

        galleryItems.forEach(item => {
          item.classList.toggle('is-gallery-focus', item === closestItem);
        });

        galleryIndicatorDots.forEach((dot, index) => {
          dot.classList.toggle('is-active', index === closestIndex);
        });

        if (!galleryFocusInitialized) {
          galleryFocusInitialized = true;
          galleryTrack.classList.add('is-gallery-focus-ready');
        }
      }

      function requestGalleryFocusUpdate() {
        if (galleryFrame) return;
        galleryFrame = window.requestAnimationFrame(updateGalleryFocus);
      }

      galleryTrack.addEventListener('scroll', requestGalleryFocusUpdate, { passive: true });
      window.addEventListener('resize', requestGalleryFocusUpdate, { passive: true });
      window.addEventListener('orientationchange', requestGalleryFocusUpdate, { passive: true });

      if ('ResizeObserver' in window) {
        const galleryResizeObserver = new ResizeObserver(requestGalleryFocusUpdate);
        galleryResizeObserver.observe(galleryTrack);
        galleryItems.forEach(item => galleryResizeObserver.observe(item));
      }

      galleryItems.forEach(item => {
        const image = item.querySelector('img');
        if (image) markGalleryImageReady(item, image);
      });

      requestGalleryFocusUpdate();
    }

    // Menu tabs
    const tabButtons = [...document.querySelectorAll('.tab-btn')];
    const tabPanels = [...document.querySelectorAll('.tab-content')];
    let tabSwitchTimeout = null;

    function updateTabState(activeButton) {
      tabButtons.forEach(button => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
      });
    }

    function activateTab(button, { focus = false } = {}) {
      if (!button) return;

      const targetTab = document.getElementById('tab-' + button.dataset.tab);
      const currentTab = tabPanels.find(panel => !panel.hidden);
      if (!targetTab) return;

      if (focus) button.focus();

      if (currentTab === targetTab) {
        updateTabState(button);
        return;
      }

      if (tabSwitchTimeout) clearTimeout(tabSwitchTimeout);

      const showNext = () => {
        tabPanels.forEach(panel => {
          if (panel !== targetTab) {
            panel.hidden = true;
            panel.classList.add('hidden');
            panel.classList.remove('tab-fading-out', 'tab-entering');
          }
        });

        targetTab.hidden = false;
        targetTab.classList.remove('hidden', 'tab-entering');
        void targetTab.offsetWidth;
        targetTab.classList.add('tab-entering');
        updateTabState(button);
      };

      if (currentTab) {
        currentTab.classList.add('tab-fading-out');
        tabSwitchTimeout = setTimeout(showNext, 310);
      } else {
        showNext();
      }
    }

    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => activateTab(button));
      button.addEventListener('keydown', event => {
        let nextIndex = null;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabButtons.length - 1;
        if (nextIndex === null) return;

        event.preventDefault();
        activateTab(tabButtons[nextIndex], { focus: true });
      });
    });

    // Menu tabs: Swipe-Geste links/rechts wechselt Tab
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const tabOrder = tabButtons.map(button => button.dataset.tab);
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
        activateTab(tabButtons[next]);
      }, { passive: true });
    }

    document.querySelectorAll('[data-open-menu-tab]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetButton = tabButtons.find(button => button.dataset.tab === trigger.dataset.openMenuTab);
        activateTab(targetButton);
        menuSection?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
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
    const modalIds = ['modal-impressum', 'modal-datenschutz'];
    let activeModal = null;
    let modalOpener = null;
    let previousBodyOverflow = '';

    function setPageInert(isInert) {
      [...document.body.children].forEach(element => {
        if (element.getAttribute('role') !== 'dialog') element.inert = isInert;
      });
    }

    function getModalFocusables(modal) {
      return [...modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(element => !element.hidden && element.getClientRects().length > 0);
    }

    function closeModal(id, { restoreFocus = true } = {}) {
      const modal = document.getElementById(id);
      if (!modal || modal.hidden) return;

      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.setAttribute('aria-hidden', 'true');
      modal.hidden = true;

      if (activeModal === modal) {
        activeModal = null;
        setPageInert(false);
        document.body.style.overflow = previousBodyOverflow;

        const opener = modalOpener;
        modalOpener = null;
        if (restoreFocus && opener instanceof HTMLElement) {
          window.requestAnimationFrame(() => opener.focus());
        }
      }
    }

    function openModal(id, opener) {
      const modal = document.getElementById(id);
      if (!modal) return;

      if (activeModal && activeModal !== modal) {
        closeModal(activeModal.id, { restoreFocus: false });
      }

      modalOpener = opener || document.activeElement;
      previousBodyOverflow = document.body.style.overflow;
      activeModal = modal;
      modal.hidden = false;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setPageInert(true);

      window.requestAnimationFrame(() => {
        const focusTarget = getModalFocusables(modal)[0] || modal;
        focusTarget.focus();
      });
    }

    document.getElementById('open-impressum')?.addEventListener('click', event => {
      event.preventDefault();
      openModal('modal-impressum', event.currentTarget);
    });
    document.getElementById('open-datenschutz')?.addEventListener('click', event => {
      event.preventDefault();
      openModal('modal-datenschutz', event.currentTarget);
    });

    modalIds.forEach(id => {
      document.getElementById(id + '-close')?.addEventListener('click', () => closeModal(id));
      document.getElementById(id + '-backdrop')?.addEventListener('click', () => closeModal(id));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (activeModal) closeModal(activeModal.id);
        closeMobileMenu();
        return;
      }

      if (event.key !== 'Tab' || !activeModal) return;
      const focusables = getModalFocusables(activeModal);
      if (!focusables.length) {
        event.preventDefault();
        activeModal.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* === Background video loading, visibility playback and fallback ===
       Below-the-fold videos load only when scrolled near the viewport, and their
       large poster is deferred (data-poster) so it is never fetched off-screen.
       Every video pauses outside the viewport or while the browser tab is hidden,
       then resumes only when it is on-screen again. The hero loads eagerly and picks
       one source per device (data-src / data-src-mobile), so exactly one file ever
       downloads, swapping if the viewport crosses the mobile breakpoint. */
    (function () {
      const videos = [...document.querySelectorAll('video[data-autoplay-video]')];
      const mobileQuery = window.matchMedia('(max-width: 767px)');
      const responsiveVideos = videos.filter(video => video.dataset.src);
      const lazyVideos = videos.filter(video => !video.dataset.src);
      const onscreenVideos = new Set();
      const loadedLazyVideos = new WeakSet();

      function prepareVideo(video) {
        video.autoplay = false;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.removeAttribute('autoplay');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
      }

      function play(video) {
        if (document.hidden || !onscreenVideos.has(video)) return;
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          /* A rejected play is just autoplay timing: the muted autoplay attribute and
             the canplay handler retry it. A genuine failure fires the 'error' event. */
          p.then(() => video.classList.remove('is-video-fallback')).catch(() => {});
        }
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

      function applyResponsiveSource(video) {
        const wanted = (mobileQuery.matches && video.dataset.srcMobile)
          ? video.dataset.srcMobile
          : video.dataset.src;
        const wantedPoster = (mobileQuery.matches && video.dataset.posterMobile)
          ? video.dataset.posterMobile
          : video.dataset.poster;
        if (wantedPoster && video.getAttribute('poster') !== wantedPoster) {
          video.setAttribute('poster', wantedPoster);
        }
        if (video.getAttribute('src') === wanted) { play(video); return; }
        video.setAttribute('src', wanted);   /* only the matching file is ever requested */
        prepareVideo(video);
        video.load();
        play(video);
      }

      responsiveVideos.forEach(video => {
        prepareVideo(video);
        video.addEventListener('canplay', () => play(video));
        video.addEventListener('error', () => showPosterFallback(video));
        applyResponsiveSource(video);
      });

      /* Crossing the mobile breakpoint swaps the source; the other file is dropped. */
      const onBreakpointChange = () => responsiveVideos.forEach(applyResponsiveSource);
      if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onBreakpointChange);
      else mobileQuery.addListener(onBreakpointChange);

      /* --- Below-the-fold videos: preload only when near the viewport --- */
      function loadLazyVideo(video) {
        if (loadedLazyVideos.has(video)) return;
        loadedLazyVideos.add(video);
        if (!video.getAttribute('poster') && video.dataset.poster) {
          video.setAttribute('poster', video.dataset.poster);
        }
        prepareVideo(video);
        video.load();
      }

      lazyVideos.forEach(video => {
        prepareVideo(video);
        video.addEventListener('canplay', () => play(video));
        video.addEventListener('error', () => showPosterFallback(video));
      });

      if ('IntersectionObserver' in window) {
        const preloadObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            loadLazyVideo(entry.target);
            preloadObserver.unobserve(entry.target);
          });
        }, { rootMargin: '200px 0px' });

        const playbackObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              onscreenVideos.add(video);
              if (lazyVideos.includes(video)) loadLazyVideo(video);
              play(video);
              return;
            }

            onscreenVideos.delete(video);
            video.pause();
          });
        }, { threshold: 0.01 });

        lazyVideos.forEach(video => preloadObserver.observe(video));
        videos.forEach(video => playbackObserver.observe(video));
      } else {
        videos.forEach(video => onscreenVideos.add(video));
        lazyVideos.forEach(loadLazyVideo);
      }

      /* A first user gesture retries autoplay only for on-screen videos. */
      function resumeOnscreen() {
        videos.forEach(video => {
          if (onscreenVideos.has(video)) play(video);
        });
      }

      ['touchstart', 'click'].forEach(eventName => {
        window.addEventListener(eventName, resumeOnscreen, { once: true, passive: true });
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          videos.forEach(video => video.pause());
          return;
        }
        resumeOnscreen();
      });

      resumeOnscreen();
    })();
});
