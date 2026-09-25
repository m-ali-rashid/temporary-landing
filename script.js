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
})();
