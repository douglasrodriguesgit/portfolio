export default function initScrollSuave() {
  const navMenu = document.querySelectorAll('.js-menu a[href^="#"]');
  function scrollMenu(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const menu = document.querySelector(href);
    window.scrollTo({
      top: menu.getBoundingClientRect().top + window.scrollY - 60,
      behavior: "smooth",
    });
  }
  navMenu.forEach((link) => {
    link.addEventListener("click", scrollMenu);
  });
}
