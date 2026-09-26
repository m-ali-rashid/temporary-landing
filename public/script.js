/**
 * Ali Rashid — Personal Portfolio Script
 * Zero-scroll, light aesthetic, authentic behavior
 */

(function () {
  'use strict';

  // 1. Live Dubai Time (GST, UTC+4)
  const timeEl = document.getElementById('dubai-time');
  function updateTime() {
    if (!timeEl) return;
    try {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      timeEl.textContent = `${formatted} GST`;
    } catch (e) {
      timeEl.textContent = 'GST (UTC+4)';
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 2. Toggle Inline Contact Form
  const toggleBtn = document.getElementById('toggle-form-btn');
  const stickySayHello = document.getElementById('sticky-say-hello');
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const messageInput = document.getElementById('sender-message');
  const feedbackEl = document.getElementById('form-feedback');

  function openContactForm() {
    if (!contactForm) return;
    contactForm.removeAttribute('hidden');
    if (toggleBtn) toggleBtn.textContent = 'Close Note';
    if (nameInput) nameInput.focus();
  }

  function closeContactForm() {
    if (!contactForm) return;
    contactForm.setAttribute('hidden', '');
    if (toggleBtn) toggleBtn.textContent = 'Send Note';
  }

  if (toggleBtn && contactForm) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = contactForm.hasAttribute('hidden');
      if (isHidden) {
        openContactForm();
      } else {
        closeContactForm();
      }
    });
  }

  if (stickySayHello) {
    stickySayHello.addEventListener('click', (e) => {
      e.preventDefault();
      openContactForm();
    });
  }

  // 3. Contact Form Submission (Mailto Fallback)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (feedbackEl) feedbackEl.textContent = '';

      const name = (nameInput?.value || '').trim();
      const email = (emailInput?.value || '').trim();
      const message = (messageInput?.value || '').trim();

      if (!name || !email || !message) {
        if (feedbackEl) feedbackEl.textContent = 'Please fill in all fields.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (feedbackEl) feedbackEl.textContent = 'Please enter a valid email address.';
        return;
      }

      const recipient = 'ali.rashed@live.com';
      const subject = `Hello Ali — from ${name}`;
      const body = `${message}\n\n---\nSender: ${name}\nEmail: ${email}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    });
  }

  // 4. Subtle, calm GSAP fade-in
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && window.gsap) {
    window.gsap.from('.portfolio-card', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  // 5. Interactive Mouse-Following AI Robot
  const robotInteractive = document.getElementById('robot-interactive');
  const robotEyesGroup = document.getElementById('robot-eyes-group');
  const robotHeadGroup = document.getElementById('robot-head-group');
  const robotArmLeft = document.getElementById('robot-arm-left');
  const robotArmRight = document.getElementById('robot-arm-right');
  const robotHoverGroup = document.getElementById('robot-hover-group');
  const robotGroundShadow = document.getElementById('robot-ground-shadow');
  const robotBubble = document.getElementById('robot-bubble');
  const robotSpeechText = document.getElementById('robot-speech-text');
  const eyesNormal = document.getElementById('eyes-normal');
  const eyesHappy = document.getElementById('eyes-happy');

  if (robotInteractive && robotEyesGroup && robotHeadGroup) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isHappy = false;
    let happyTimeout = null;

    // Smooth physics states
    let currEyeX = 0, currEyeY = 0;
    let currHeadRot = 0;
    let currArmRot = 0;

    // Window mouse and pointer movement listener
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    // Touch support for mobile/tablets
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    // Interactive speech quotes on click
    const quotes = [
      "Tracking your cursor... 👀",
      "Beep boop! All systems go. ⚡",
      "Ali's code is live in banking! 🏦",
      "Checking code... 0 errors ✨",
      "Full-Stack & Mobile Engineer 🚀",
      "Real-time systems & clean APIs 🛠️",
      "100% clean vanilla JS & SVG 🤖",
      "Don't forget to grab the CV! 📄",
      "Watching your cursor navigate 🎯",
      "Hi there! Nice to meet you 👋"
    ];
    let quoteIndex = 0;

    function playBeepChime() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (err) {
        // audio context blocked or not supported
      }
    }

    function triggerHappyReaction() {
      isHappy = true;
      if (eyesNormal && eyesHappy) {
        eyesNormal.style.display = 'none';
        eyesHappy.style.display = 'block';
      }

      quoteIndex = (quoteIndex + 1) % quotes.length;
      if (robotSpeechText) {
        robotSpeechText.textContent = quotes[quoteIndex];
      }
      if (robotBubble) {
        robotBubble.style.transform = 'scale(1.08)';
        setTimeout(() => {
          if (robotBubble) robotBubble.style.transform = 'scale(1)';
        }, 180);
      }

      playBeepChime();

      clearTimeout(happyTimeout);
      happyTimeout = setTimeout(() => {
        isHappy = false;
        if (eyesNormal && eyesHappy) {
          eyesNormal.style.display = 'block';
          eyesHappy.style.display = 'none';
        }
      }, 1400);
    }

    robotInteractive.addEventListener('click', triggerHappyReaction);
    robotInteractive.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerHappyReaction();
      }
    });

    // Periodic organic eye blink
    function scheduleBlink() {
      const nextBlink = 3000 + Math.random() * 3500;
      setTimeout(() => {
        if (!isHappy && eyesNormal && eyesNormal.style.display !== 'none') {
          eyesNormal.style.transform = 'scaleY(0.1)';
          eyesNormal.style.transformOrigin = '80px 69px';
          setTimeout(() => {
            if (eyesNormal) eyesNormal.style.transform = 'scaleY(1)';
            scheduleBlink();
          }, 140);
        } else {
          scheduleBlink();
        }
      }, nextBlink);
    }
    scheduleBlink();

    // Smooth animation frame loop
    const startTime = performance.now();
    function animate(time) {
      const elapsed = time - startTime;

      // Gentle floating sine wave
      const hoverOffset = Math.sin(elapsed * 0.0035) * 3.5;
      if (robotHoverGroup) {
        robotHoverGroup.setAttribute('transform', `translate(0, ${hoverOffset.toFixed(2)})`);
      }
      if (robotGroundShadow) {
        const shadowScale = 1 - (hoverOffset / 25);
        robotGroundShadow.setAttribute('transform', `scale(${shadowScale.toFixed(3)})`);
        robotGroundShadow.setAttribute('transform-origin', '80 166');
      }

      // Calculate vector from robot center to mouse cursor
      const rect = robotInteractive.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height * 0.42;

      const dx = mouseX - robotCenterX;
      const dy = mouseY - robotCenterY;

      // Normalised coordinates between -1 and 1
      const normX = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.45)));
      const normY = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.45)));

      // Target movements:
      // Eye shift inside visor: ±11px in X, ±7px in Y
      const targetEyeX = normX * 11;
      const targetEyeY = normY * 7;

      // Head tilt angle: ±13deg
      const targetHeadRot = normX * 13;
      // Arm swing: ±9deg
      const targetArmRot = normX * 9;

      // Physics lerping (smoothing)
      currEyeX += (targetEyeX - currEyeX) * 0.12;
      currEyeY += (targetEyeY - currEyeY) * 0.12;
      currHeadRot += (targetHeadRot - currHeadRot) * 0.09;
      currArmRot += (targetArmRot - currArmRot) * 0.09;

      // Apply transformations to SVG components
      robotEyesGroup.setAttribute(
        'transform',
        `translate(${currEyeX.toFixed(2)}, ${currEyeY.toFixed(2)})`
      );

      // Head rotates subtly around its center (80, 68) with a tiny translation
      const headShiftX = currEyeX * 0.3;
      const headShiftY = currEyeY * 0.3;
      robotHeadGroup.setAttribute(
        'transform',
        `rotate(${currHeadRot.toFixed(2)}, 80, 68) translate(${headShiftX.toFixed(2)}, ${headShiftY.toFixed(2)})`
      );

      // Arms sway slightly
      if (robotArmLeft) {
        robotArmLeft.setAttribute('transform', `rotate(${(-currArmRot * 0.7).toFixed(2)}, 39, 112)`);
      }
      if (robotArmRight) {
        robotArmRight.setAttribute('transform', `rotate(${(-currArmRot * 0.7).toFixed(2)}, 121, 112)`);
      }

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
})();
