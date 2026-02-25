const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const viewAllBtn = document.getElementById('viewAllBtn');
const courseGrid = document.querySelector('.course-grid');
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const navLinks = [...document.querySelectorAll('.mobile-dock a')];

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

viewAllBtn?.addEventListener('click', () => {
  const isExpanded = courseGrid.classList.toggle('show-all');
  viewAllBtn.textContent = isExpanded ? 'Show Less' : 'View All Courses';
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  formNote.textContent = `Thanks ${data.get('name')}! We will contact you for ${data.get('interest')} soon.`;
  form.reset();
});

const sections = ['home', 'courses', 'contact'].map((id) => document.getElementById(id));

const syncActiveLink = () => {
  const offset = window.innerHeight * 0.4;
  let current = 'home';

  sections.forEach((section) => {
    if (!section) return;
    if (section.getBoundingClientRect().top <= offset) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', syncActiveLink);
window.addEventListener('load', syncActiveLink);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
