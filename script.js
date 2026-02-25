const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
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
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const interest = data.get('interest');
  formNote.textContent = `Thank you ${name}! Your enquiry for ${interest} has been received.`;
  form.reset();
});

const sections = ['home', 'programs', 'why', 'contact'].map((id) => document.getElementById(id));

const syncActiveLink = () => {
  const offset = window.innerHeight * 0.35;
  let current = 'home';

  sections.forEach((section) => {
    if (!section) return;
    const top = section.getBoundingClientRect().top;
    if (top <= offset) {
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
