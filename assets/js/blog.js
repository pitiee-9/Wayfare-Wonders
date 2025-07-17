// Dark/Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  icon.classList.replace('fa-moon', 'fa-sun');
}

// toggle
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    localStorage.setItem('theme', 'light');
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
mobileBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Traveling Objects Animation (using plane, car, ship, suitcase)
const bg = document.getElementById('traveling-objects-bg');
const types = ['plane','car','ship','suitcase'];
const count = 12;

function rand(min,max){ return Math.random()*(max-min)+min; }

function createObj(){
  const el = document.createElement('div');
  const type = types[Math.floor(rand(0,types.length))];
  const rev = Math.random()<0.5 ? ' reverse' : '';
  el.className = `traveling-object ${type}${rev}`;
  // pick a font‑awesome icon
  el.innerHTML = `<i class="fas fa-${type === 'suitcase' ? 'suitcase' : type}"></i>`;

  // random top position & speed
  el.style.top = rand(5,90)+'vh';
  el.style.setProperty('--travel-duration', rand(15,40)+'s');

  bg.appendChild(el);
  // after one loop, remove & re-create
  const dur = parseFloat(el.style.getPropertyValue('--travel-duration'))*1000;
  setTimeout(()=>{
    el.remove();
    createObj();
  }, dur);
}

// kick off multiple
for(let i=0;i<count;i++){
  setTimeout(createObj, i*1500);
}
