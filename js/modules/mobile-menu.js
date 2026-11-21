export default function initMobileMenu() {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".menu_toggle");
  const navLinks = document.querySelectorAll(".header_menu a");

  if (!header || !toggle) return;

  function closeMenu() {
    header.classList.remove("menu_open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu_open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
}
