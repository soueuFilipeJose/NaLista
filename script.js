const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const chips = [...document.querySelectorAll('.chip')];
const cards = [...document.querySelectorAll('.event-card')];
const eventSearch = document.querySelector('#event-search');
const emptyState = document.querySelector('#empty-state');
let currentCategory = 'todos';

function normalize(value = '') {
  return value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function filterEvents() {
  const term = normalize(eventSearch?.value.trim());
  let visible = 0;

  cards.forEach(card => {
    const categoryMatches = currentCategory === 'todos' || card.dataset.category === currentCategory;
    const textMatches = !term || normalize(card.dataset.search).includes(term) || normalize(card.textContent).includes(term);
    const show = categoryMatches && textMatches;
    card.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

chips.forEach(chip => chip.addEventListener('click', () => {
  currentCategory = chip.dataset.category;
  chips.forEach(item => item.classList.toggle('active', item === chip));
  filterEvents();
}));

eventSearch?.addEventListener('input', filterEvents);

const heroForm = document.querySelector('#hero-search');
const heroQuery = document.querySelector('#hero-query');
heroForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (eventSearch && heroQuery) eventSearch.value = heroQuery.value;
  currentCategory = 'todos';
  chips.forEach(item => item.classList.toggle('active', item.dataset.category === 'todos'));
  filterEvents();
  document.querySelector('#eventos')?.scrollIntoView({ behavior: 'smooth' });
});
