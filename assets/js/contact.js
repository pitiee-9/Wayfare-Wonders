// Dark/Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyEl = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  bodyEl.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
  bodyEl.classList.toggle('dark');
  if (bodyEl.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
mobileBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Traveling Objects Animation
const bg = document.getElementById('traveling-objects-bg');
const types = ['plane', 'car', 'ship', 'suitcase'];
const count = 12;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createObj() {
  const el = document.createElement('div');
  const type = types[Math.floor(rand(0, types.length))];
  const rev = Math.random() < 0.5 ? ' reverse' : '';
  el.className = `traveling-object ${type}${rev}`;
  el.innerHTML = `<i class="fas fa-${type}"></i>`;

  el.style.top = rand(5, 90) + 'vh';
  el.style.setProperty('--travel-duration', rand(15, 40) + 's');

  bg.appendChild(el);
  const dur =
    parseFloat(el.style.getPropertyValue('--travel-duration')) * 1000;
  setTimeout(() => {
    el.remove();
    createObj();
  }, dur);
}

for (let i = 0; i < count; i++) {
  setTimeout(createObj, i * 1500);
}

// Form submission handling
document
  .getElementById('contact-form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    e.target.reset();
  });
