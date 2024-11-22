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
//const headings = gsap.utils.toArray('.heading_menu_category') as HTMLElement[];
//const cards = gsap.utils.toArray('.card') as HTMLElement[];

// Funkcja do podświetlania aktywnej kategorii
const highlightActiveCategory = (categoryId: string): void => {
  links.forEach((link: HTMLAnchorElement) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${categoryId}`) {
      link.classList.add('active');
    }
  });
  centerActiveLink();
};

function centerActiveLink() {
  //const mobileWrapper = document.querySelector
  const navWrapper = document.querySelector('.menu_section');
  console.log(navWrapper);
  const wrapper = navWrapper?.querySelector('.category-list.no-scrollbar');
  const activeLink = navWrapper?.querySelector('.menu_nav_link.active');

  if (wrapper && activeLink) {
    const wrapperRect = wrapper.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    console.log('centerActiveLink');
    console.log('wrapper: ' + wrapper);
    console.log('activeLink: ' + activeLink);
    console.log('wrapperRect: ' + wrapperRect.width);
    console.log('linkRect: ' + linkRect.width);
    // Obliczenie przesunięcia do wyśrodkowania aktywnego linku
    const offset = linkRect.left - wrapperRect.left - wrapperRect.width / 2 + linkRect.width / 2;

    // Przewinięcie z animacją
    wrapper.scrollTo({
      left: wrapper.scrollLeft + offset,
      behavior: 'smooth',
    });
  }
}

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
// cards.forEach((card) => {
//   gsap.from(card, {
//     opacity: 0,
//     y: 10, // Przesunięcie o 50px w dół
//    // duration: 0.5, // Czas trwania animacji
//     scale: 0.99,
//     scrollTrigger: {
//       trigger: card,
//       start: 'top 90%', // Animacja rozpoczyna się, gdy sekcja jest w 80% wysokości widocznego obszaru
//       end: 'bottom 60%', // Kończy się, gdy sekcja osiągnie 20% wysokości widocznego obszaru
//       scrub: true, // Animacja płynna, powiązana z przewijaniem
//     },
//   });
// });