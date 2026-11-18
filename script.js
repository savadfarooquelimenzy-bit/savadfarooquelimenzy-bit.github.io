/**
 * Limenzy - Gitex Landing Page Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Smooth Scrolling with Lenis Engine
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;

    // Smooth scroll for internal anchor links with sticky header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
          try {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl, { offset: -54, duration: 1.2 });
            }
          } catch (err) {
            // Ignore invalid selector
          }
        }
      });
    });
  }

  // 1. Dark Mode / Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Initialize theme from storage (default to light mode matching Figma design)
  const savedTheme = localStorage.getItem('limenzy_theme');
  
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
    updateThemeIcon(true);
  } else {
    htmlEl.classList.remove('dark');
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('limenzy_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });

  function updateThemeIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      // Sun icon for dark mode (click to switch to light)
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to light theme');
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      // Moon icon for light mode (click to switch to dark)
      themeIcon.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.99 8.324C13.9275 9.48143 13.5311 10.596 12.8487 11.5329C12.1663 12.4699 11.2271 13.1891 10.1447 13.6037C9.06224 14.0183 7.88288 14.1104 6.74918 13.869C5.61548 13.6276 4.57597 13.063 3.75631 12.2434C2.93664 11.4239 2.37192 10.3844 2.13041 9.25074C1.8889 8.11706 1.98093 6.9377 2.39538 5.85521C2.80984 4.77272 3.52897 3.83346 4.46585 3.15096C5.40273 2.46846 6.51724 2.07194 7.67467 2.00933C7.94467 1.99467 8.086 2.316 7.94267 2.54467C7.46326 3.3117 7.25798 4.21858 7.36033 5.1173C7.46268 6.01602 7.86661 6.85352 8.50621 7.49312C9.14581 8.13272 9.98331 8.53665 10.882 8.639C11.7808 8.74135 12.6876 8.53607 13.4547 8.05667C13.684 7.91333 14.0047 8.054 13.99 8.324Z" 
            stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to dark theme');
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // 2. Sticky Header Elevation on Scroll
  const stickyHeader = document.getElementById('stickyHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) {
      stickyHeader.classList.add('scrolled');
    } else {
      stickyHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Phone Number Click to Copy with Toast Feedback
  const phoneBtn = document.getElementById('phoneLink');
  const toast = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  if (phoneBtn) {
    phoneBtn.addEventListener('click', (e) => {
      // Don't prevent default on mobile if user wants to call, but copy on desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const phoneNumber = '+919496245337';
      
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast('Phone number copied: +91 9496 245 337');
      }).catch(() => {
        showToast('Direct line: +91 9496 245 337');
      });

      if (!isMobile) {
        e.preventDefault();
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 4. Consultation Modal Logic
  const modalOverlay = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('.open-consultation-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  const successCloseBtn = document.getElementById('successCloseBtn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
      const firstInput = modalOverlay.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 150);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
    setTimeout(() => {
      if (bookingForm) bookingForm.style.display = 'flex';
      if (formSuccess) formSuccess.classList.add('hidden');
    }, 250);
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.remove('hidden');
    });
  }

  // Topic Pills Interactive Selection
  const topicPills = document.querySelectorAll('.topic-pill');
  const selectedTopicInput = document.getElementById('selectedTopicInput');
  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      if (selectedTopicInput) {
        selectedTopicInput.value = pill.getAttribute('data-topic') || '';
      }
    });
  });

  // Check hash or query param to auto-open modal if requested
  if (window.location.hash === '#book' || window.location.hash === '#consultation' || window.location.search.includes('modal=true')) {
    modalOverlay.classList.add('active');
  }

  // 5. Headline Scaling Info & Dynamic Viewport Observer
  const headlineSvg = document.querySelector('.headline-svg');
  if (headlineSvg) {
    // Ensure smooth scaling and zero distortion
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        // Optionally update any scaling parameters
      }
    });
    resizeObserver.observe(headlineSvg);
  }
});



// =========================================================================
// INTERACTIVE SECTION BEHAVIORS (Tabs, Carousels, Accordions)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {

  // Global consultation modal opener helper
  window.openConsultationModal = function() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    }
  };

  // 1. Interactive Services Showcase Tabs (01 / What we build)
  window.serviceData = {
    '1': {
      num: '1',
      title: 'AI Chatbots & Assistants',
      desc: 'Answer, qualify and book, around the clock.',
      img: 'assets/service_1_chatbots.png',
      imgDark: 'assets/service_1_chatbots_dark.png'
    },
    '2': {
      num: '2',
      title: 'WhatsApp Business Automation',
      desc: 'Campaigns, support and sales inside WhatsApp.',
      img: 'assets/service_2_whatsapp.png',
      imgDark: 'assets/service_2_whatsapp_dark.png'
    },
    '3': {
      num: '3',
      title: 'Custom AI Solutions',
      desc: 'Models and tools built around your data and workflows.',
      img: 'assets/service_3_custom_ai.png',
      imgDark: 'assets/service_3_custom_ai_dark.png'
    },
    '4': {
      num: '4',
      title: 'Web & Mobile App Development',
      desc: 'Fast, scalable products your customers enjoy.',
      img: 'assets/service_4_web_mobile.png',
      imgDark: 'assets/service_4_web_mobile_dark.png'
    },
    '5': {
      num: '5',
      title: 'Workflow & Process Automation',
      desc: 'Remove repetitive tasks across your teams.',
      img: 'assets/service_5_workflow.png',
      imgDark: 'assets/service_5_workflow_dark.png'
    },
    '6': {
      num: '6',
      title: 'AI Consulting & Integration',
      desc: 'Connect AI to your CRM, ERP and existing systems.',
      img: 'assets/service_6_consulting.png',
      imgDark: 'assets/service_6_consulting_dark.png'
    }
  };
  const serviceData = window.serviceData;

  // Global handler for selecting/opening a service tab (works across mobile and desktop)
  window.openServiceTab = function(id) {
    const targetGroup = document.querySelector(`.service-tab-group[data-service="${id}"]`);
    const targetBtn = document.querySelector(`.service-tab-btn[data-service="${id}"]`);
    const allGroups = document.querySelectorAll('.service-tab-group');
    const allBtns = document.querySelectorAll('.service-tab-btn');

    if (!targetGroup || !targetBtn) return;

    // Activate this tab and close all others (always open the selected tab)
    allGroups.forEach(g => {
      if (g.getAttribute('data-service') === String(id)) {
        g.classList.add('is-active');
      } else {
        g.classList.remove('is-active');
      }
    });

    allBtns.forEach(b => {
      if (b.getAttribute('data-service') === String(id)) {
        b.classList.add('is-active');
      } else {
        b.classList.remove('is-active');
      }
    });

    // Update desktop card
    const data = window.serviceData ? window.serviceData[id] : null;
    const serviceDisplayCard = document.getElementById('serviceDisplayCard');
    const serviceDisplayNum = document.getElementById('serviceDisplayNum');
    const serviceDisplayTitle = document.getElementById('serviceDisplayTitle');
    const serviceDisplayDesc = document.getElementById('serviceDisplayDesc');
    const serviceDisplayGraphic = document.getElementById('serviceDisplayGraphic');
    const serviceDisplayGraphicDark = document.getElementById('serviceDisplayGraphicDark');

    if (data && serviceDisplayCard) {
      serviceDisplayCard.style.opacity = '0.5';
      setTimeout(() => {
        if (serviceDisplayNum) serviceDisplayNum.textContent = data.num;
        if (serviceDisplayTitle) serviceDisplayTitle.textContent = data.title;
        if (serviceDisplayDesc) serviceDisplayDesc.textContent = data.desc;
        if (serviceDisplayGraphic) serviceDisplayGraphic.src = data.img;
        if (serviceDisplayGraphicDark) serviceDisplayGraphicDark.src = data.imgDark || data.img;
        serviceDisplayCard.style.opacity = '1';
      }, 150);
    }
  };

  // 2. Interactive Testimonials Carousel (04 / Testimonials)
  const testimonials = [
    {
      quote: '“Great work, Consistent and good quality. Great support anytime and always professional.”',
      author: 'Nafsudheen',
      role: 'CEO of XYZ',
      photo: 'assets/41c3aa49b28bc505dd548d707d118c1781acb77f.png'
    },
    {
      quote: '“Limenzy built our automated WhatsApp sales engine in just 3 weeks. Conversion increased by 40% immediately.”',
      author: 'Rashid Al-Maktoum',
      role: 'Founder, RetailFlow Dubai',
      photo: 'assets/testimonial_rashid.jpg'
    },
    {
      quote: '“Their AI chatbot handles 80% of our daily customer inquiries without any human intervention. Phenomenal ROI.”',
      author: 'Sarah Jenkins',
      role: 'Head of Operations, FinEdge',
      photo: 'assets/testimonial_sarah.jpg'
    }
  ];

  let currentTestimonialIdx = 0;
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  const testimonialQuote = document.getElementById('testimonialQuote');
  const testimonialAuthorName = document.getElementById('testimonialAuthorName');
  const testimonialAuthorRole = document.getElementById('testimonialAuthorRole');
  const testimonialPhoto = document.getElementById('testimonialPhoto');

  function renderTestimonial(idx) {
    const item = testimonials[idx];
    if (!item) return;

    if (testimonialQuote) testimonialQuote.style.opacity = '0';
    if (testimonialAuthorName) testimonialAuthorName.style.opacity = '0';
    if (testimonialAuthorRole) testimonialAuthorRole.style.opacity = '0';
    if (testimonialPhoto) testimonialPhoto.style.opacity = '0.5';

    setTimeout(() => {
      if (testimonialQuote) testimonialQuote.textContent = item.quote;
      if (testimonialAuthorName) testimonialAuthorName.textContent = item.author;
      if (testimonialAuthorRole) testimonialAuthorRole.textContent = item.role;
      if (testimonialPhoto) testimonialPhoto.src = item.photo;

      if (testimonialQuote) testimonialQuote.style.opacity = '1';
      if (testimonialAuthorName) testimonialAuthorName.style.opacity = '1';
      if (testimonialAuthorRole) testimonialAuthorRole.style.opacity = '1';
      if (testimonialPhoto) testimonialPhoto.style.opacity = '1';
    }, 180);
  }

  window.navigateTestimonial = function(dir) {
    currentTestimonialIdx = (currentTestimonialIdx + dir + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonialIdx);
  };

  document.querySelectorAll('.prev-testimonial-btn, #prevTestimonialBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigateTestimonial(-1);
    });
  });

  document.querySelectorAll('.next-testimonial-btn, #nextTestimonialBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigateTestimonial(1);
    });
  });

  // 3. Interactive FAQs Accordion (05 / FAQs) - Smooth animated accordion (only one open at a time)
  const faqItems = document.querySelectorAll('.faq-item');

  // Initialize all FAQ panels: remove .hidden so CSS max-height transitions can work smoothly
  faqItems.forEach(item => {
    const panel = item.querySelector('.faq-answer-panel');
    if (panel) {
      panel.classList.remove('hidden');
      if (item.classList.contains('is-open')) {
        panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
        panel.style.opacity = '1';
      } else {
        panel.style.maxHeight = '0px';
        panel.style.opacity = '0';
      }
    }
  });

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (btn && panel) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Smoothly close all FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherPanel) {
              otherPanel.style.maxHeight = '0px';
              otherPanel.style.opacity = '0';
            }
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherIcon) otherIcon.classList.remove('rotate-45');
          }
        });

        // If it wasn't open, smoothly open it now
        if (!isOpen) {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
          panel.style.opacity = '1';
          btn.setAttribute('aria-expanded', 'true');
          const icon = item.querySelector('.faq-icon');
          if (icon) icon.classList.add('rotate-45');
        }
      });
    }
  });

  window.addEventListener('resize', () => {
    const openItem = document.querySelector('.faq-item.is-open');
    if (openItem) {
      const openPanel = openItem.querySelector('.faq-answer-panel');
      if (openPanel) {
        openPanel.style.maxHeight = openPanel.scrollHeight + 30 + 'px';
      }
    }
  });

  // 4. Interactive Hero Halftone Dot Sphere / Toroid Cursor Follower
  const heroSection = document.querySelector('.hero-section');
  const canvas = document.getElementById('heroDotsCanvas');

  if (heroSection && canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Parameters tuned to match the reference visual:
    const gridSpacing = 13;       // Distance between dots in square grid
    const rInner = 55;            // Inner radius where dots begin appearing (empty around cursor)
    const rPeak = 175;            // Radius where dots reach maximum size
    const rOuter = 295;           // Outer radius where dots fade out completely to 0
    const maxDotRadius = 3.2;     // Peak dot radius

    // Position & Fade Opacity State:
    // Starts invisible and only fades in when mouse enters hero section
    let currentX = window.innerWidth * 0.22;
    let currentY = window.innerHeight * 0.58;
    let targetX = currentX;
    let targetY = currentY;
    let currentOpacity = 0;
    let targetOpacity = 0;

    function resizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse tracking across hero section (fades in on enter, follows cursor, fades out on leave)
    heroSection.addEventListener('mouseenter', () => {
      targetOpacity = 1;
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = 1;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetOpacity = 0;
    });

    // Touch support for mobile/tablets
    heroSection.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        const rect = heroSection.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
        targetOpacity = 1;
      }
    }, { passive: true });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        const rect = heroSection.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
        targetOpacity = 1;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      targetOpacity = 0;
    });

    function renderDots() {
      // Smooth spring lerp following mouse cursor
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      // Smooth fade transition (in on hover, out on leave)
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // If completely faded out, skip expensive dot loops
      if (currentOpacity < 0.005) {
        requestAnimationFrame(renderDots);
        return;
      }

      // Limenzy Signal Red (adapted for dark mode)
      const isDark = document.documentElement.classList.contains('dark');
      const dotR = isDark ? 235 : 210;
      const dotG = isDark ? 45 : 38;
      const dotB = isDark ? 55 : 48;

      // Only iterate over the bounding box of the active circle
      const startX = Math.max(0, Math.floor((currentX - rOuter) / gridSpacing) * gridSpacing);
      const endX = Math.min(width, Math.ceil((currentX + rOuter) / gridSpacing) * gridSpacing);
      const startY = Math.max(0, Math.floor((currentY - rOuter) / gridSpacing) * gridSpacing);
      const endY = Math.min(height, Math.ceil((currentY + rOuter) / gridSpacing) * gridSpacing);

      ctx.fillStyle = `rgb(${dotR}, ${dotG}, ${dotB})`;

      for (let gx = startX; gx <= endX; gx += gridSpacing) {
        for (let gy = startY; gy <= endY; gy += gridSpacing) {
          const dx = gx - currentX;
          const dy = gy - currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Skip if outside outer radius or inside the inner cursor void
          if (dist > rOuter || dist < rInner) continue;

          let factor = 0;
          if (dist < rPeak) {
            // Gradually increases in size from rInner to rPeak
            const u = (dist - rInner) / (rPeak - rInner);
            factor = Math.sin(u * Math.PI * 0.5);
          } else {
            // Gradually decreases in size from rPeak to rOuter until gone
            const v = (dist - rPeak) / (rOuter - rPeak);
            factor = Math.cos(v * Math.PI * 0.5);
          }

          if (factor <= 0.01) continue;

          // Subtle 3D spherical lens displacement
          const normDist = dist / rOuter;
          const warp = Math.sin(normDist * Math.PI) * 4.5;
          const renderX = gx + (dx / dist) * warp;
          const renderY = gy + (dy / dist) * warp;

          const radius = maxDotRadius * factor;
          const alpha = Math.min(1, Math.max(0, factor * 0.95 * currentOpacity));

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(renderDots);
    }

    renderDots();
  }

});
