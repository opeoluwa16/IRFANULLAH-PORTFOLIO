const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);

  if (iconMoon && iconSun) {
    iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
    iconSun.style.display = theme === 'dark' ? 'none' : 'block';
  }
}

const prefersLight = window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

applyTheme(prefersLight ? 'light' : 'dark');

if (toggle) {
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false'
    );
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Typing animation
(function () {
  var el = document.getElementById('typedText');

  if (!el) return;

  var line = el.parentElement;

  var phrases = [
    "Advanced Excel",
    "Power BI",
    "Digital Literacy",
    "Digital Marketing",
    "Flutter Development",
    "Python for Data Analysis",
    "SQL (Structured Query Language)",
    "Video Editing",
    "Virtual Assistant Professional"
  ];

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    el.textContent = phrases[0];
    return;
  }

  var TYPE = 90;
  var DEL = 45;
  var HOLD = 1500;
  var GAP = 350;

  var p = 0;
  var c = 0;
  var deleting = false;

  function tick() {
    var full = phrases[p];

    line.classList.add('is-typing');

    if (!deleting) {
      c++;
      el.textContent = full.slice(0, c);

      if (c === full.length) {
        deleting = true;
        line.classList.remove('is-typing');
        return setTimeout(tick, HOLD);
      }

      return setTimeout(
        tick,
        TYPE + Math.random() * 20 - 10
      );
    }

    c--;
    el.textContent = full.slice(0, c);

    if (c === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
      line.classList.remove('is-typing');
      return setTimeout(tick, GAP);
    }

    setTimeout(tick, DEL);
  }

  setTimeout(tick, 600);
})();