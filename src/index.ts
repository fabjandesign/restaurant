import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Mateusz Fabjan12';
  greetUser(name);
});

// Pobranie elementów
const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.category-link');
const categories: NodeListOf<HTMLElement> = document.querySelectorAll('.menu-category');

// Funkcja do podświetlania aktywnej kategorii
const highlightActiveCategory = () => {
  let activeCategory = '';

  categories.forEach((category: HTMLElement) => {
    const rect = category.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      activeCategory = category.id;
    }
  });

  links.forEach((link: HTMLAnchorElement) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${activeCategory}`) {
      link.classList.add('active');
    }
  });
};

// Dodanie płynnego przewijania
links.forEach((link: HTMLAnchorElement) => {
  link.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    const targetId: string = link.getAttribute('href')?.substring(1) || '';
    const targetElement: HTMLElement | null = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Ustawienie offsetu od góry
        behavior: 'smooth',
      });
    }
  });
});

// Monitorowanie przewijania
window.addEventListener('scroll', highlightActiveCategory);
