// eslint-disable-next-line prettier/prettier
import { gsap } from "gsap";
// eslint-disable-next-line prettier/prettier
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// // import { greetUser } from '$utils/greet';

// // window.Webflow ||= [];
// // window.Webflow.push(() => {
// //   const name = 'Mateusz Fabjan12';
// //   greetUser(name);
// // });

// // // Pobranie elementów
// // const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.menu_nav_link');
// // const categories = gsap.utils.toArray('.menu_category') as HTMLElement[]; // Rzutowanie na HTMLElement[]
// // const scroller = document.querySelector('.menu_category_nav_mobile') as HTMLElement;

// // // Funkcja do podświetlania aktywnej kategorii
// // const highlightActiveCategory = (categoryId: string): void => {
// //   links.forEach((link: HTMLAnchorElement) => {
// //     link.classList.remove('active');
// //     if (link.getAttribute('href') === `#${categoryId}`) {
// //       link.classList.add('active');
// //     }
// //   });
// // };

// Pobranie elementów
const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.menu_nav_link');
const categories = gsap.utils.toArray('.menu_category') as HTMLElement[];
const navbarHeight =
  document.querySelector('.menu_section_nav_mobile').offsetHeight +
  document.querySelector('.menu_category_nav_mobile').offsetHeight;

// Funkcja do podświetlania aktywnej kategorii
const highlightActiveCategory = (categoryId: string): void => {
  links.forEach((link: HTMLAnchorElement) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${categoryId}`) {
      link.classList.add('active');
    }
  });
};

// Zmienna do monitorowania aktualnie aktywnej sekcji
let currentSection: string | null = null;

// Inicjalizacja ScrollTrigger dla wszystkich sekcji w sposób bardziej wydajny
categories.forEach((category: HTMLElement) => {
  const categoryId = category.id;
  ScrollTrigger.create({
    trigger: category,
    markers: true,
    start: `top top+=${navbarHeight + 3}`,
    end: `bottom top+=${navbarHeight + 3}`,
    onEnter: () => {
      if (currentSection !== categoryId) {
        highlightActiveCategory(categoryId);
        currentSection = categoryId; // Zaktualizowanie aktywnej sekcji
      }
    },
    onLeave: () => {
      if (currentSection === categoryId) {
        highlightActiveCategory('');
        currentSection = null; // Zresetowanie aktywnej sekcji
      }
    },
    onEnterBack: () => {
      if (currentSection !== categoryId) {
        highlightActiveCategory(categoryId);
        currentSection = categoryId; // Zaktualizowanie aktywnej sekcji
      }
    },
    onLeaveBack: () => {
      if (currentSection === categoryId) {
        highlightActiveCategory('');
        currentSection = null; // Zresetowanie aktywnej sekcji
      }
    },
  });
});

// Dodanie animacji do sekcji podczas przewijania
categories.forEach((category) => {
  gsap.from(category, {
    opacity: 0,
    y: 50, // Przesunięcie o 50px w dół
    duration: 0.5, // Czas trwania animacji
    scrollTrigger: {
      trigger: category,
      start: 'top 80%', // Animacja rozpoczyna się, gdy sekcja jest w 80% wysokości widocznego obszaru
      end: 'bottom 20%', // Kończy się, gdy sekcja osiągnie 20% wysokości widocznego obszaru
      scrub: true, // Animacja płynna, powiązana z przewijaniem
    },
  });
});
