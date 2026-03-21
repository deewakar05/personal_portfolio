/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Nav scroll + active ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  document.querySelectorAll('section, .section-wrap').forEach(sec => {
    if (sec.id) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 180) {
        current = sec.id;
      }
    }
  });

  // Group Training, Education, and Certifications under one link
  if (current === 'training' || current === 'certifications') {
    current = 'education';
  }

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('up'), i * 75);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Project filter ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectItems.forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
    });
  });
});

/* ── Copy Email & Contact Form ── */
const emailLink = document.getElementById('email-link');
const emailVal = document.getElementById('email-val');

if (emailLink && emailVal) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailVal.innerText).then(() => {
      const originalText = 
      emailVal.innerText;
      emailVal.innerText = "Copied to clipboard!";
      emailVal.style.color = "var(--green)";
      setTimeout(() => {
        emailVal.innerText = originalText;
        emailVal.style.color = "";
      }, 2000);
    });
  });
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalBtnText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        contactForm.reset();
        contactStatus.style.display = 'block';
        setTimeout(() => { contactStatus.style.display = 'none'; }, 5000);
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      btn.innerText = originalBtnText;
      btn.disabled = false;
    }
  });
}
